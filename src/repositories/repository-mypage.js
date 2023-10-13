import Repository from "./repository";
const resource = "/v1/mypage";
const resource_stay = "/v1/mypage";
const resource_mypage_order = "/v1/mypage/order";
// import mockData from "./mock/mockdata/mypage";

export default {
  /**
   * マイページトップ取得
   */
  getMypageTop() {
    return Repository.get(`${resource}/top`);
  },
  /**
   * マイページベネポ取得
   */
  getMyBenepo(params) {
    return Repository.get(
      `${resource}/member/point/history?pointFrom=${params.pointFrom}&pointTo=${params.pointTo}`
    );
  },
  getBenepoPoint(params) {
    // return mockData.getMyBenepo();
    return new Promise((resolve, reject) => {
      Repository.get(`${resource}/member/point/history`, { params: params }).then(
        (response) => {
          resolve(response)
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
  getMyexpiryPoints(params) {
    return Repository.get(
      `${resource}/member/point/expiryPoints?months=${params.months}`
    );
  },  
  /**
   * マイページ補助クーポン取得
   */
  getMyCoupons() {
    return Repository.get(`${resource}/sbsd/available_login`);
  },
  /**
   * マイクーポンリスト取得
   */
  getMycoupon(params) {
    return new Promise((resolve, reject) => {
      Repository.get(`${resource}/coupon`, { params: params }).then(
        (response) => {
          // resolve(mockData.getMycoupon(params))
          resolve(response);
        },
        (error) => {
          // resolve(mockData.getMycoupon(params))
          resolve(error);
        }
      );
    });
  },
  /**
   * マイクーポン削除
   */
  deleteMycoupon(params) {
    return Repository.put(`${resource}/coupon/delete`, params);
  },
  /**
   * マイクーポン詳細（会員証提示）
   */
  getMyCouponDetail(params) {
    return Repository.get(
      `${resource}/coupon/member/${params.menuNo}/${params.planId}`
    );
  },
  /**
   * マイクーポン詳細
   */
  getCouponDetail(params) {
    // return mockData.getCouponDetail(params);
    return Repository.get(`${resource}/coupon/${params.acptNo}`);
  },
  /**
   * マイクーポン詳細（デジチケ・デジポン）もぎりパスコードを確認する。
   */
  postTicketCollectorPassword(params) {
    return Repository.post(
      `${resource}/coupon/ticket_collector_password`,
      params
    );
  },
  /**
   * マイクーポン詳細（デジチケ・デジポン) もぎりボタン押下の動作API
   */
  putTicketCollector(params) {
    return Repository.put(`${resource}/coupon/ticket_collector`, params);
  },

  getOrderHistory(params) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage_order}/order-list`,
        { params: params }
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error?.error);
        }
      );
    });
  },

  async getViewedListHistory(params) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_stay}/menu-item-info`,
        { params }
      ).then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error?.error);
        }
      );
    });
  },
  async addFavorite(data) {
    data.serviceType = data.serviceType ? data.serviceType : null;
    return new Promise((resolve, reject) => {
      Repository.post(
        `${resource_stay}/menu-item-info`,
        data
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error.error);
        }
      );
    });
  },
  async deleteFavorite(menuNo) {
    return new Promise((resolve, reject) => {
      Repository.delete(
        `${resource_stay}/menu-item-info/${menuNo}`
      ).then(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error?.error);
        }
      );
    });
  },
  async removeItemInList(id) {
    // 10170243
    return new Promise((resolve, reject) => {
      Repository.delete(
        `${resource_stay}/menu-item-info/${id}`
      )
        .then(
          (response) => {
            resolve(response.data);
          },
          (error) => {
            reject(error?.error);
          }
        )
        .catch(() => {});
    });
  },

  getFavoriteList(params) {
    const payload = {
      itemType: params.itemType,
      page: params.page,
      size: params.size,
      sort: params.sort,
      cat: params.cat
    };
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource}/menu-item-info`,
        { params: payload }
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error?.error);
        }
      );
    });
  },
  async getSingleItemInfo(menuNo) {
    console.log("@@@Call getSingleItemInfo")
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource}/menu-item-info/singleItemInfo?menuNo=${menuNo}`
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error?.error);
        }
      );
    });
  },
  async addInterestList(data) {
    console.log("InterestList", data);
    return new Promise((resolve, reject) => {
      Repository.get(
        `$${resource}/interest`,
        data
      ).then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  async addFavoriteArea(data) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource}/interest/interest-location`,
        data
      ).then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  async getPointHistory(params) {
    return Repository.get(
      `${resource}/member/point/history`,
      { params }
    );
  },
  async getCategory() {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource}/codes/category`
      ).then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  cardRegistration() {
    return Repository.get(`${resource}/payment/card-registration`);
  },
  getAccountManamagementPortalEndpoint() {
    return Repository.get(`${resource}/account-management-portal`);
  },
  getLoginSecurityEndpoint() {
    return Repository.get(`${resource}/login-security-settings`);
  },
  getPasswordReminderEndpoint() {
    return Repository.get(`${resource}/password-reminder`);
  },
  /**
   * Netflix
   */ 
  getNetflix() {
    return Repository.get(`${resource}/netflix/situation`);
  },
   /**
   * Netflix解約API
   */ 
   cancelNetflix(subscriptionServiceId) {
    return Repository.delete(`${resource}/netflix/cancel`, {
      data: {
        subscriptionServiceId: subscriptionServiceId,
      },
    });
  },
   /**
   * Netflix個人連絡先変更API
   */ 
   changeMail(personalMailAddress,personalPhoneNumber) {
    return Repository.put(`${resource}/netflix/personalContactChanging`, {
        personalMailAddress: personalMailAddress,
        personalPhoneNumber: personalPhoneNumber,
    });
  },
  changeOpt(subscriptionServiceId,newsLetterOptInFlg) {
    return Repository.put(`${resource}/netflix/optInFlgChanging`, {
        subscriptionServiceId: subscriptionServiceId,
        newsLetterOptInFlg: newsLetterOptInFlg,
    });
  },
  /**
   * プロフィール更新
   */ 
  putProfile(params) {
    return Repository.put(`${resource}/profile/me`, params);
  },
  async getMenuNoPlandIdInfo(menuNo, planId) {
    console.log("@@@Call getSingleItemInfo")
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource}/menus/${menuNo}/plans/${planId}`
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error?.error);
        }
      );
    });
  }
};
