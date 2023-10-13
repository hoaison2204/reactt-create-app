import Repository from "./../repository";
const resource = '/v1/mypage';
const resource_logout = '/v1/mypage/logout';
const resource_sb_logout = '/v1/mypage/sb-logout';
const resource_isp_logout = '/v1/mypage/isp-logout';

export default {
  /**
   * redisに保存（session更新処理）
   */
  postSession() {
    const data = {
      data: {
        sessionKey: "dummy"
      }
    };
    return new Promise((resolve) => {
      return resolve(data);
    });
  },
  /**
   * 初回ログイン完了
   */
  putComplete() {
    const data = {};
    return new Promise((resolve) => {
      return resolve(data);
    });
  },
  /**
   * ログアウト
   */
  getLogout() {
    return Repository.get(`${resource_logout}`);
  },
  /**
   * ソフトバンクのログアウト
   */
  getSBLogout() {
    return Repository.get(`${resource_sb_logout}`);
  },
  /**
   * ソフトバンクのログアウト
   */
  getISPLogout() {
    return Repository.get(`${resource_isp_logout}`);
  },
  /** 楽天ログインチェック */
  checkLoginRakuten() {
    return Repository.get(`${resource}/rakuten/check-login-rakuten`)
  }
};
