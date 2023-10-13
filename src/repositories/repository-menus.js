import Repository from "./repository";
const resource = "/v1/life/menu";
const resource_plan_detail = "/v1/mypage/menus/life_plan";
const resource_plan_detail_shop = "/v1/shop/menu/shop_plan";
const resource_mypage = "/v1/mypage";
const resource_stay = "/v1/stay";

export default {
  /**
   * メニュー詳細情報取得
   */
  getMenuDetail(params) {
    return Repository.get(`${resource}/${params}`);
  },

  getGcMenuImage(menuNo) {
    return new Promise((resolve, reject) => {
      Repository.get(`${resource_mypage}/menus/gourmet-images?menuNo=${menuNo}`)
        .then(
          (response) => {
            resolve(response.data);
          },
          (error) => {
            reject(error.data);
          }
        )
        .catch(() => {});
    });
  },

  async getInfoMenuDetail(param) {
    console.log("---menuNo", menuNo);
    const params = {
      companyCd: param.companyCd
    };
    // 10170243
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage}/menus/${param.menuNo}/stay`,
        {
          params
        }
      )
        .then(
          (response) => {
            resolve(response.data);
          },
          (error) => {
            reject(error.data);
          }
        )
        .catch(() => {});
    });
  },
  /**
   * プラン詳細情報取得(物販)
   */
  getPlanDetailShop(params, shopUrl) {
    return Repository.get(
      `${shopUrl}${resource_plan_detail_shop}?menuNo=${params.menuNo}&planId=${params.planId}`
    );
  },  
  /**
   * プラン詳細情報取得(Stay)
   */
  async getPlanDetail(menuNo, planId, roomId, queryParams = {}) {
    // eslint-disable-next-line no-sparse-arrays
    const supportQueryParams = [
      "priceDiv",
      "crmFlag",
      "loginFlag",
      "roomCnt",
      "adultHeadCnt",
      "exUpperGradesHeadCnt",
      "exLowerGradesHeadCnt",

      "youjiAHeadCnt",
      "youjiBHeadCnt",
      "youjiCHeadCnt",
      "youjiDHeadCnt",
      "designatedMo",
      "checkInDay",
      "checkOutDay"
    ];
    const params = {};
    Object.keys(queryParams).forEach((key) => {
      if (
        supportQueryParams.includes(key) &&
        queryParams[key] !== undefined &&
        queryParams[key] !== null
      ) {
        params[key] = queryParams[key];
      }
    });
    return new Promise((resolve, reject) => {
      // api/menus/1/plans/1/rooms/1?companyCd=1
      Repository.get(
        `${resource_mypage}/menus/${menuNo}/plans/${planId}/rooms/${roomId}`,
        { params, loading: false }
      ).then(
        (response) => {
          // resolve(plan)
          resolve(response.data);
        },
        (error) => {
          // resolve(plan)
          reject(error);
        }
      );
    });
  },

  async getPlanDetailGC(queryParams = {}) {
    return new Promise((resolve, reject) => {
      // TODO: パスの変更
      Repository.get(
        `${resource_mypage}/menus/gourmet-plan?menuNo=${queryParams.menuNo}&planId=${queryParams.planId}`
      ).then(
        (response) => {
          // resolve(plan)
          resolve(response.data);
        },
        (error) => {
          // resolve(plan)
          reject(error);
        }
      );
    });
  },

  /**
   * 支払先口座情報取得
   */
  async getPaymentInfoGC(menuNo) {
    return new Promise((resolve, reject) => {
      // TODO: パスの変更
      Repository.get(
        `${resource_mypage}/menus/${menuNo}/payment-info`
      ).then(
        (response) => {
          // resolve(plan)
          resolve(response.data);
        },
        (error) => {
          // resolve(plan)
          reject(error);
        }
      );
    });
  },


  async addViewedMenu(menuNo, stayUrl) {
    const data = {
      serviceType: "life",
      itemType: "viewed",
      menuNo
    };
    return new Promise((resolve, reject) => {
      Repository.post(
        `${stayUrl}${resource_stay}/menu-item-info`,
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
  async addFavoriteMenu(menuNo, stayUrl) {
    const data = {
      serviceType: "life",
      itemType: "favourite",
      menuNo
    };
    return new Promise((resolve, reject) => {
      Repository.post(
        `${stayUrl}${resource_stay}/menu-item-info`,
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
  async deleteFavoriteMenu(menuNo, stayDomain) {
    return new Promise((resolve, reject) => {
      Repository.delete(
        `${stayUrl}${resource_stay}/menu-item-info/${menuNo}`,
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
  getMenuPlanDetail(params) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_plan_detail}?menuNo=${params.menuNo}&planId=${params.planId}`
      )
        .then(
          (response) => {
            // resolve(lifePlan)
            resolve(response.data);
          },
          (error) => {
            // resolve(lifePlan)
            resolve(error.data);
          }
        )
        .catch(() => {});
    });
  }
};
