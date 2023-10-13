import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import routesConfig from "@/router/routes";
import { createSetCookie, parseCookie } from "@/utils/cookie";
import VueGtag from "vue-gtag";
import CONST_DATA from "@/mixins/const/constData";
import UserRepository from '@/repositories/repository-user'
import UserRepositoryMock from '@/repositories/mock/repository-user'
import UserProfile from '@/repositories/repository-mypage'

Vue.use(Router);

const NO_AUTHENTICATION_URL = [
  '/authorization/cb',
  '/session-time-out',
  "/not-available"
];
const UserRepo = process.env.VUE_APP_DEV_MODE === CONST_DATA.ENV.LOCAL ? UserRepositoryMock : UserRepository

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
 * 各サイトの TOP のセッションタイムアウト画面に遷移
 * @param {string} boCode サイトコード
 */
function toSessionTimeOut(boCode){
  const mappingArr = getMapping(process.env.VUE_APP_TOP_DOMAIN_AND_CODE_MAPPING);
  let selected = mappingArr.find(map => map.mypageDisplayCode === boCode);

  window.location.href = selected.url + `/session-time-out`;
}

/**
 * サイトコードに該当する mypageBFFDomain を判定する
 * @param {string} boCode サイトコード
 * @returns {string} 指定されたサイトコードの mypageBFFDomain ドメイン
 */
function getMypageBFFDomain(boCode){
  const mappingArr = getMapping(process.env.VUE_APP_API_DOMAIN_AND_CODE_MAPPING);
  const selected = mappingArr.find(map => map.mypageDisplayCode === boCode);
  return selected.url;
}

/**
 * とく放題・ライフエールの認証対応
 * @param {string} siteCode 小文字サイトコード
 * @param {string} domain ドメイン
 * @param {string} path 遷移先URL
 * @returns {boolean} 
 */
function LoginSB(siteCode, domain, path) {
  const fullPath = location.origin + path;
  // ライフエール、とく放題 M 認証画面に遷移
  window.open(
    domain + "/v1/mypage/sb-" + siteCode + "-login" +
    "?acr_value=2&back_uri=" +
    fullPath,
    "_self"
  );
  return false;
}

//認証不必要画面の path 一覧
const pathList = [
  "/authorization/cb",
  "/access-error",
  "/404",
  "/tokuhodai-login"
]

//認証不必要画面の名前一覧
const nameList = [
  "sessionTimeOut",
  "error"
]

/**
 * 認証不必要画面かどうか
 * @param {Object} [nextTo] 遷移先情報
 * @returns {boolean} 遷移先が認証不必要画面なら false
 */
const nextAuthCheck = (nextTo) => {
  if (pathList.includes(nextTo.path) || nameList.includes(nextTo.name)) {
    return false;
  }
  return true;
}

/**
 * 認証画面呼び出し対応
 * @param {string} boCode サイトコード
 * @param {Object} to 遷移先情報
 * @returns {boolean} 
 */
function AuthSB(boCode, to) {
  // クッキーの back_uri に遷移先を絶対パスで設定
  document.cookie = createSetCookie('back_uri', location.origin + to.fullPath);
  // bff を呼び出す domain を判定する
  const bffDomain = getMypageBFFDomain(boCode);
  // 認証画面に直接飛ばす
  LoginSB(boCode.toLowerCase(), bffDomain, to.fullPath);
}

const routes = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    if (from.path !== to.path) {
      return { x: 0, y: 0 };
    }
    return false;
  },
  routes: routesConfig
});

routes.beforeEach(async (to, from, next) => {
  // 動的に追加されている場合のmetaタグの初期化
  Vue.prototype.$meta.deleteDocumentMetaData();
  // ドキュメントタイトルの初期化
  Vue.prototype.$meta.setDocumentTitle();
  // ディスクリプションの初期化
  Vue.prototype.$meta.setDocumentDesctiption();
  // inert属性を無効にする
  Vue.prototype.$modal.inert = false;
  // boCode取得
  let boCode = getMypageDisplayCode(location.origin);

  const cookie = parseCookie(document.cookie);
  // Dont use this cookie anymore
  // if (!cookie["userInfo"]) Vue.prototype.$auth.removeUser();
  if (!NO_AUTHENTICATION_URL.includes(to.path)) {
    // プロフィール情報の更新
    const log = await UserProfile.putProfile();
    console.log("プロフィール更新：", log);

    // Call user session for update userSessionInfo (in redis) in every request
    console.log('userSession - src/router/index.js');
    const userSessionResult = await UserRepo.userSession();

    if (userSessionResult && !userSessionResult.isError && userSessionResult.data && !store.getters['auth/get'].user) {
      const postUserResult = await UserRepo.postUser(getMypageDisplayCode(location.origin));
      if(postUserResult && !postUserResult.isError && postUserResult.data) {
        store.commit("auth/set", {user: postUserResult.data});
      }
    }
  }

  // CRM汎用マイページ直打ちURL対応（エラー画面に飛ばす処理）
  if (boCode == 'CR') {
    if (!store.getters["auth/get"].user && nextAuthCheck(to)) {
      store.commit("page/crmHeaderFlag", false);
      next({
        path: "/access-error"
      });
      return false;
    } else if (to.path == "/session-time-out") {
      // CRM 汎用 top のセッションタイムアウト画面に遷移するように修正
      toSessionTimeOut(boCode);
      return false;
    }
    if (location.pathname == "/access-error") {
      store.commit("page/crmHeaderFlag", false);
    }
  } else {
    store.commit("page/crmHeaderFlag", true);
  }

  // ライフエール用マイページURL直打ち対応
  if (boCode == 'LY') {
    // ヘッダー非表示対応
    store.commit("page/crmHeaderFlag", true);
    // 認証が必要な画面に遷移する場合
    if (nextAuthCheck(to)) {
      // ライフエールレベル2認証がない場合(未ログインの場合)
      if (!cookie.LYLv2AtLimitAuthenticatedCookie) {
        // 認証画面呼び出し対応
        AuthSB(boCode, to);
        return false;
      } else {
        // ユーザー情報の確認
        if (!cookie.LYUserLimitCookie) {
          // 認証画面呼び出し対応
          AuthSB(boCode, to);
          return false;
        }
      }
    } else if (to.name == "sessionTimeOut") {
      // ライフエールの top のセッションタイムアウト画面に遷移するように修正
      toSessionTimeOut(boCode);
      return false;
    }
  }

  // とく放題用マイページURL直打ち対応
  if (boCode == 'TH') {
    // ヘッダー非表示対応
    store.commit("page/crmHeaderFlag", true);
    // とく放題 B か M かを判断
    if (!cookie.THRtAuthenticatedCookie) {
      // 認証が必要な画面に遷移する場合
      if (nextAuthCheck(to)) {
        // とく放題 B 認証がない場合
        if (!store.getters["auth/get"].user) {
          // クッキーの back_uri に遷移先を絶対パスで設定
          document.cookie = createSetCookie('back_uri', location.origin + to.fullPath);
          next({
            path: "/tokuhodai-login"
          });
          return false;
        }
      }
      if (to.path == "/session-time-out") {
        // とく放題の top のセッションタイムアウト画面に遷移するように修正
        toSessionTimeOut(boCode);
        return false;
      } else if (store.getters["auth/get"].user && to.path == "/tokuhodai-login") {
        // ログイン済みでとく放題のログイン画面に遷移する時はアクセスエラー画面を表示
        next({
          path: "/access-error"
        });
        return false;
      }
    } else {
      // 認証が必要ない画面(エラー画面やくるくる画面)以外に遷移する場合
      if (nextAuthCheck(to)) {
        // とく放題 M 認証がない場合(未ログインの場合)
        if (!cookie.THLv2AtLimitAuthenticatedCookie) {
          // 認証画面呼び出し対応
          AuthSB(boCode, to);
          return false;
        } else {
          // ユーザー情報の確認
          if (!cookie.THUserLimitCookie) {
            // 認証画面呼び出し対応
            AuthSB(boCode, to);
            return false;
          }
        }
      }
      if (to.name == "sessionTimeOut") {
        // とく放題の top のセッションタイムアウト画面に遷移するように修正
        toSessionTimeOut(boCode);
        return false;
      } else if (cookie.THUserLimitCookie && to.path == "/tokuhodai-login") {
        // ログイン済みでとく放題のログイン画面に遷移する時はアクセスエラー画面を表示
        next({
          path: "/access-error"
        });
        return false;
      }
    }
  }

  console.log('routes.beforeEach: !store.getters["auth/get"].user - ', !store.getters["auth/get"].user);
  console.log("routes.beforeEach: from.path - ", from.path);
  console.log("routes.beforeEach: to.path - ", to.path);
  if (
    process.env.VUE_APP_DEV_MODE !== CONST_DATA.ENV.LOCAL &&
    to.matched.some((page) => page.meta.isAuthenticate) &&
    !store.getters["auth/get"].user &&
    // !cookie["userInfo"] &&
    from.path != "/auth" &&
    from.path != "/authorization/cb" &&
    from.path != "/session-time-out" &&
    to.path != "/tokuhodai-login" &&
    from.path != "/not-available" &&
    to.path != "/"
  ) {
    store.commit("auth/set", { authenticate: true });
    next({
      path: from.path + "?back_uri=" + to.fullPath
    });

// Remove logic authenticationLevel
//     // authenticationLevelが１で下記ページにアクセスした場合は再ログイン処理を実行する
//     // 申込ページ or マイページ
//   } else if (
//     process.env.VUE_APP_DEV_MODE !== "local" &&
//     store.getters["auth/get"].user &&
//     store.getters["auth/get"].user.authenticationLevel !== 1 &&
//     new RegExp(/^\/(mypage)|(orders)\/.*/).test(to.path)
//   ) {
//     store.commit("auth/set", { authenticate: true });
//     next({
//       path: from.path + "?back_uri=" + to.fullPath
//     });
  } else {
    // とく放題ログイン画面の遷移はとく放題以外アクセスエラー画面を表示
    if (boCode != 'TH' && to.path == "/tokuhodai-login") {
      next({
        path: "/access-error"
      });
      return false;
    }
    const route = to.matched.map((matched) => ({
      name: (matched.meta.page || {}).name,
      path: matched.path
    }));

    store.commit("page/set", { routes: [] });
    store.commit("page/isPageHeader", true);
    store.commit("page/isBreadcrumb", true);
    store.commit("page/isTitle", true);
    store.commit("page/showFooterMenu", true);
    store.commit("page/isFooterText", false);
    next();
  }
});

Vue.use(
  VueGtag,
  {
    config: { id: process.env.VUE_APP_GOOGLE_CODE }
  },
  routes
);

export default routes;
