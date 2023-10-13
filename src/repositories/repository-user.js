import Repository from './repository';
const resource = '/v1/users';
const resource_update = '/v1/users/member-info';
const contract_info = '/v1/users/contract-info';
const user_session = '/v1/users/user-session';
const ic_user_session = '/v1/users/ic-user-session';

export default {
  /**
   * ユーザー個人情報を取得する
   */
  postUser(boCode) {
    /**
     * CRM汎用用の SSO 認証対応
     */
    if (boCode == "CR" || boCode == "LY" || boCode == "TH" || boCode == "GC") {
      return Repository.post(`${resource}/my?bo-code=${boCode}`);
    } else {
      return Repository.post(`${resource}/my`);
    }
  },
  /**
   * ユーザー情報更新
   */
  updateUser(params, boCode) {
    /**
     * CRM汎用用の SSO 認証対応
     */
    if (boCode == "CR" || boCode == "LY" || boCode == "TH" || boCode == "GC") {
      return Repository.put(`${resource_update}?bo-code=${boCode}`, params);
    } else {
      return Repository.put(`${resource_update}`, params);
    }
  },

  contractInfo(boCode) {
    /**
     * CRM汎用用の SSO 認証対応
     */
    if (boCode == "CR" || boCode == "LY" || boCode == "TH" || boCode == "GC") {
      return Repository.post(`${contract_info}?bo-code=${boCode}`);
    } else {
      return Repository.post(`${contract_info}`);
    }
  },

  /**
   * ログインユーザセッション情報を取得する
   */
  userSession() {
    return Repository.get(`${user_session}`);
  },

  /**
   * IC ログインユーザセッション情報を取得する
   */
  icUserSession() {
    return Repository.get(`${ic_user_session}`);
  },
}
