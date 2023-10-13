import Repository from './repository';
const resource = '/v1/mypage';
const resource_session = '/v1/top/session';
const resource_complete = '/v1/top/complete_first_login';
const resource_logout = '/v1/mypage/logout';
const resource_sb_logout = '/v1/mypage/sb-logout';
const resource_isp_logout = '/v1/mypage/isp-logout';

export default {
  /**
   * redisに保存（session更新処理）
   */
  postSession(params) {
    return Repository.post(`${resource_session}`, params);
  },
  /**
   * 初回ログイン完了
   */
   putComplete(params) {
    return Repository.put(`${resource_complete}`, params);
  },
  /**
   * ログアウト
   */
  getLogout() {
    return Repository.get(`${resource_logout}`);
  },
  /**
   * ライフエール、とく放題 M のログアウト
   */
  getSBLogout() {
    return Repository.get(`${resource_sb_logout}`);
  },
  /**
   * とく放題 B のログアウト
   */
  getISPLogout(params) {
    return Repository.get(`${resource_isp_logout}`, params);
  },
  /** 楽天ログインチェック */
  checkLoginRakuten() {
    return Repository.get(`${resource}/rakuten/check-login-rakuten`)
  }
}
