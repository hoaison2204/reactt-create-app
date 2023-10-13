import axios from "axios";
import Vue from "vue";
import router from "../router/index";

const baseURL = process.env.VUE_APP_API_DOMAIN_CMS + "/";
// const baseURL = "/";
const DEBUG = process.env.NODE_ENV === "development";

const API = axios.create({
  baseURL,
  withCredentials: true
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
        process.env.VUE_APP_API_DOMAIN_CMS + "/" ===
        error.response.config.baseURL
      ) {
        // APIのエラー結果を入れる前に、残っているエラー情報を削除する
        Vue.prototype.$error.reset();
        // 失敗時のレスポンス情報をstore(localstorage)に保存
        Vue.prototype.$error.code = error.response.status;
        Vue.prototype.$error.url = `[${error.response.config.method}] ${error.response.config.url}`;
        Vue.prototype.$error.data = error.response.data;
      }

      const statuscode = error.response.status;
      if ( statuscode == 401) {
        location.href = process.env.VUE_APP_AUTHORIZATION + "/v1/mypage/login"
      }

      return {
        ...error.response,
        isError: true
      };
    } else {
      return false;
    }
  }
);

export default API;
