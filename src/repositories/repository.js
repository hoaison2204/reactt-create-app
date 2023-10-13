import axios from "axios";
import Vue from "vue";
import router from "../router/index";
import get from 'lodash/get'
import app from '@/main'
import ENV from "@/mixins/const/framework/common/env";
import { parseCookie } from "@/utils/cookie";

const baseURL = process.env.VUE_APP_API_DOMAIN + "/";

function getMapping(urlandCodeMapping) {
  if (!urlandCodeMapping) {
    throw new Error(`env variable is not setted`);
  }

  return urlandCodeMapping.split(";").map(map => {
      const arr = map.split(",");
      if (arr.length != 2) {
          return {
              mypageDisplayCode: null,
              url: null
          }
      }
      return {
          mypageDisplayCode: arr[1],
          url: arr[0],
      }
  });
};

/**
 * mypageDomainに該当するdisplay codeを判定する
 * @param {string} mypageDomain
 * @returns {string} mypageDisplayCodeドメイン
 */
function getMypageDisplayCode(mypageDomain) {
  const mappingArr = getMapping(process.env.VUE_APP_MYPAGE_DOMAIN_AND_CODE_MAPPING);

  const selected = mappingArr.find(map => map.url === mypageDomain);
  return selected ? selected.mypageDisplayCode : "BS";
};

/**
 * mypageDisplayCodeに該当するapp api domainを判定する
 * @param {string} mypageDisplayCode
 * @returns {string} 該当のapp api domain
 */
function getAppApiDomain(mypageDisplayCode) {
  const mappingArr = getMapping(process.env.VUE_APP_API_DOMAIN_AND_CODE_MAPPING);

  const selected = mappingArr.find(map => map.mypageDisplayCode === mypageDisplayCode);
  return selected ? selected.url : process.env.VUE_APP_API_DOMAIN;
};

function getBaseURL() {
  const mypageDisplayCode = getMypageDisplayCode(location.origin);

  return getAppApiDomain(mypageDisplayCode) + "/";
}

/**
 * とく放題・ライフエールの認証対応
 * @param {string} siteCode 小文字サイトコード
 * @param {string} domain ドメイン
 * @param {string} path 遷移先URL
 * @returns {boolean} 
 */
function LoginSB(siteCode, domain) {
  console.log("href: ", location.href)
  // ライフエール、とく放題 M 認証画面に遷移
  window.open(
    domain + "/v1/mypage/sb-" + siteCode + "-login" +
    "?acr_value=2&back_uri=" +
    location.href,
    "_self"
  );
  return false;
}

/**
 * 認証画面呼び出し対応
 * @param {string} boCode サイトコード
 * @returns {boolean} 
 */
function AuthSB(boCode) {
  // bff を呼び出す domain を判定する
  const bffDomain = getAppApiDomain(boCode);
  // 認証画面に直接飛ばす
  LoginSB(boCode.toLowerCase(), bffDomain);
}

const DEBUG = process.env.NODE_ENV === ENV.DEVELOPMENT;

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    "Origin": location.host
  },
});

// axios.interceptors.request.use(request => {
// 	console.log('%c>>>>>>>>>>>>>>>>>>>>>>>>>>>> Axios['+request.method+'] '+request.url, 'color:#9664c3');
//   return request;
// });

/**
 * レスポンス共通処理
 */
API.interceptors.response.use(
  (response) => {
    // Vue.prototype.$error.reset();
    if (DEBUG) {
      //console.log('%c<<<<<<<<<<<< Axios['+response.config.method+'] '+response.config.url, 'color:#6c03ca; font-weight: bold');
      //console.log(response);
    }
    return response;
  },
  (error) => {
    // BFF APIのみcatchする
    if (error.response) {
      if (
        getBaseURL() === error.response.config.baseURL
      ) {
        // APIのエラー結果を入れる前に、残っているエラー情報を削除する
        Vue.prototype.$error.reset();
        // 失敗時のレスポンス情報をstore(localstorage)に保存
        Vue.prototype.$error.code = error.response.status;
        Vue.prototype.$error.url = `[${error.response.config.method}] ${error.response.config.url}`;
        Vue.prototype.$error.data = error.response.data;
      }

      const statuscode = error.response.status;
      const cookie = parseCookie(document.cookie);
      if (
        statuscode == 401 &&
        error.response.config.url != "/session-time-out"
      ) {
        let boCode = getMypageDisplayCode(location.origin);
        // CRM 汎用の場合、topのセッションタイムアウトエラーページへ遷移
        if (boCode == 'CR') {
          // CRM 汎用の top のドメインの URL を取得
          const mappingArr = getMapping(process.env.VUE_APP_TOP_DOMAIN_AND_CODE_MAPPING);
          let domain = mappingArr.find(map => map.mypageDisplayCode === boCode);
          
          // CRM 汎用・ライフエール・とく放題 top のセッションタイムアウト画面に遷移するように修正
          window.location.href = domain.url + `/session-time-out`;
          return false;
        }
        // ライフエールの場合 top へ遷移
        else if (boCode == 'LY') {
          // ライフエール認証処理
          // ライフエールレベル2認証がない場合(未ログインの場合)
          if (!cookie.LYLv2AtLimitAuthenticatedCookie) {
            // 認証画面呼び出し対応
            AuthSB(boCode);
            return false;
          } else {
            // ユーザー情報の確認
            if (!cookie.LYUserLimitCookie) {
              // 認証画面呼び出し対応
              AuthSB(boCode);
              return false;
            }
          }
        }
        // とく放題の場合 top へ遷移
        else if (boCode == 'TH') {
          // とく放題認証処理
          // とく放題 B か M かを判断
          if (!cookie.THRtAuthenticatedCookie) {
            // とく放題 B 認証がない場合
            // とく放題の top のドメインの URL を取得
            const mappingArr = getMapping(process.env.VUE_APP_TOP_DOMAIN_AND_CODE_MAPPING);
            let domain = mappingArr.find(map => map.mypageDisplayCode === boCode);
            
            // とく放題 top のセッションタイムアウト画面に遷移するように修正
            window.location.href = domain.url + `/session-time-out`;
            return false;
          } else {
            // とく放題 M 認証がない場合(未ログインの場合)
            if (!cookie.THLv2AtLimitAuthenticatedCookie) {
              // 認証画面呼び出し対応
              AuthSB(boCode);
              return false;
            } else {
              // ユーザー情報の確認
              if (!cookie.THUserLimitCookie) {
                // 認証画面呼び出し対応
                AuthSB(boCode);
                return false;
              }
            }
          }
        } else {
          router.push("/session-time-out");
        }
      }

      try {
        let message = get(error, 'response.data.error.message')
        if (message && typeof message === 'string') {
          message = message
            .substring(message.indexOf(':') + 1)
            .trim()
            .substring(1)
          message = JSON.parse(message.substring(0, message.length - 1))
          return {
            statuscode,
            isError: true,
            data: message
          }
        }
      } catch (e) {
        return {
          ...error.response,
          isError: true,
          statuscode,
          data: get(error, 'response.data')
        }
      }
      
      return {
        ...error.response,
        isError: true,
        statuscode,
        data: get(error, 'response.data')
      }
    } else {
      return false;
    }
  }
);

export default API;
