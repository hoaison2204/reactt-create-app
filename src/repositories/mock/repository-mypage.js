// モックデータ
import Repository from "./../repository";
import mockData from "./mockdata/mypage.js";
import ViewList from "./mockdata/view-history.json";
const resource_stay = "/v1/mypage";
import FavoriteList from "./mockdata/favorite_list.json";
import OrderList from "./mockdata/order-list.json";
import pointHistory from "./mockdata/point-history.json";
const resource = "/v1/mypage";



export default {
  /**
   * マイページトップ取得
   */
  getMypageTop(params) {
    return Repository.get(`${resource}/top`);
  },
  /**
   * マイページベネポ取得
   */
  getMyBenepo(params) {
    Repository.get(
      `${resource}/member/point/history?pointFrom=${params.pointFrom}&pointTo=${params.pointTo}`
    );
    return mockData.getMyBenepo();
  },
  getMyexpiryPoints(params) {
    Repository.get(
      `${resource}/member/point/expiryPoints?months=${params.months}`
    );
    return mockData.getMyexpiryPoints();
  },  
  /**
   * マイページ補助クーポン取得
   */
  getMyCoupons() {
    return mockData.getMyCoupons();
  },
  /**
   * マイクーポンリスト取得
   */
  getMycoupon(params) {
    return Repository.get(`${resource}/coupon`, { params: params }).then(() => {
      return mockData.getMycoupon(params);
    });
  },
  /**
   * マイクーポン削除
   */
  deleteMycoupon() {
    return {
      data: "success"
    };
  },
  /**
   * マイクーポン詳細（会員証提示）
   */
  getMyCouponDetail(params) {
    return mockData.getMyCouponDetail(params);
  },
  /**
   * マイクーポン詳細
   */
  getCouponDetail(params) {
    return mockData.getCouponDetail(params);
  },
  /**
   * マイクーポン詳細（デジチケ・デジポン）もぎりパスコードを確認する。
   */
  postTicketCollectorPassword(params) {
    return mockData.postTicketCollectorPassword(params);
  },
  /**
   * マイクーポン詳細（デジチケ・デジポン) もぎりボタン押下の動作API
   */
  putTicketCollector(params) {
    return mockData.putTicketCollector(params);
  },
  /**
   * 申し込み履歴
   */
  getOrderHistory(params) {
    return mockData.getOrderHistory(params);
  },

  async getViewedListHistory(params) {
    return new Promise((resolve, reject) => {
      Repository.get(`${resource_stay}/menu-item-info`, { params }).then(
        () => {
          resolve(ViewList);
        },
        () => {
          resolve(ViewList);
        }
      );
    });
  },
  async addFavorite(data) {
    data.serviceType = data.serviceType ? data.serviceType : null;
    return new Promise((resolve, reject) => {
      Repository.post(`${resource_stay}/menu-item-info`, data).then(
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
      Repository.delete(`${resource_stay}/menu-item-info/${menuNo}`).then(
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
      Repository.delete(`${resource_stay}/menu-item-info/${id}`)
        .then(
          (response) => {
            resolve(response.data);
          },
          (error) => {
            // resolve(ViewList)
            reject(error?.error);
          }
        )
        .catch(() => {});
    });
  },
  async getFavoriteList(params) {
    const payload = {
      itemType: params.itemType,
      page: params.page,
      size: params.size,
      sort: params.sort
    };
    return new Promise((resolve, reject) => {
      resolve(FavoriteList);
    });
  },

  async deleteFavorite(menuNo) {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  },

  async getPointHistory(params) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource}/member/point/history`,
        { params }
      ).then(
        (response) => {
          resolve({ data: pointHistory });
        },
        (error) => {
          resolve({ data: pointHistory });
        }
      );
    });
  },
  cardRegistration() {
    return Repository.get(`${resource}/payment/card-registration`);
  },
  getAccountManamagementPortalEndpoint() {
    return Repository.get(`${resource}/v1/mypage/account-management-portal`);
  },
  getLoginSecurityEndpoint() {
    return Repository.get(`${resource}/v1/mypage/login-security-settings`);
  },
  getPasswordReminderEndpoint() {
    return Repository.get(`${resource}/v1/mypage/password-reminder`);
  },
  /**
  * netflix
  */ 
  getNetflix() {
    return mockData.getNetflix();
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
  async getSingleItemInfo(menuNo) {
    return mockData.getSingleItemInfo(menuNo);
  },
  async getMenuNoPlandIdInfo(menuNo, planId) {
    return mockData.getMenuNoPlandIdInfo(menuNo, planId).data;
  }
  
};
