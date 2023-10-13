import Repository from "./repository";
const resource_address = "/v1/life/member/address";
const resource_mypage = "/v1/mypage";
const resource_orders = "/v1/orders";
const resource_mypage_order = "/v1/mypage/order";
const resource_mypage_menus = "/v1/mypage/menus";
const resource_ic = "/v1/ic";
const resource_gourmet = "/v1/gourmet/order/";

export default {
  /**
   * 保有しているベネポの取得
   */
  putAddress(param) {
    return Repository.put(resource_address, param);
  },

  getOrderReceipt(acptNo) {
    return Repository.get(`${resource_mypage_order}/${acptNo}/receipt`);
  },

  getRedemptionInfo(acptNo, acptDatetime, companyCd, pointUseCd) {
    let path = `${resource_ic}/redemption/${acptNo}`
    let paramFlag = 0
    if (companyCd !== null) {
      path = path + `?companyCd=${companyCd}`
      paramFlag = 1
    }
    if (acptDatetime !== null) {
      if (paramFlag === 0) {
        path = path + `?applyDate=${acptDatetime}`
        paramFlag = 1
      } else {
        path = path + `&applyDate=${acptDatetime}`
      }
    }
    if (pointUseCd !== null) {
      if (paramFlag === 0) {
        path = path + `?pointUseCd=${pointUseCd}`
        paramFlag = 1
      } else {
        path = path + `&pointUseCd=${pointUseCd}`
      }
    }
    return Repository.get(path);
  },

  async putPay(params) {
    const menuNm = params.menuNm;
    const billingAmount = params.billingAmount;
    return new Promise((resolve, reject) => {
      Repository.put(
        `${resource_mypage}/order/select_pay?menuNm=${menuNm}&billingAmount=${billingAmount}`
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  async getCanclePolicy(acptNo) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage}/order/cancel-policy/${acptNo}`
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  async cancelOrder(data) {
    let acptNo = null;
    let p = null;
    let orderRequestTransactionId = null;
    if (data && data.acptNo) {
      acptNo = data.acptNo;
      delete data.acptNo;
    }
    if (data && data.param) {
      p = data.param;
      orderRequestTransactionId = data.orderRequestTransactionId;
      delete data.param;
      delete data.orderRequestTransactionId;
    }
    if (!p) {
      return new Promise((resolve, reject) => {
        Repository.put(
          `${resource_mypage_order}/order-cancel?acptNo=${acptNo}`,
          data
        ).then(
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error?.data);
          }
        );
      });
    } else {
      return new Promise((resolve, reject) => {
        Repository.put(
          `${resource_mypage_order}/order-cancel?acptNo=${acptNo}&p=${p}&gwTran=${orderRequestTransactionId}`,
          data
        ).then(
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error?.error);
          }
        );
      });
    }
  },
  async cancelOrderGC(acptNo) {
    return new Promise((resolve, reject) => {
      Repository.put(
        `${resource_mypage_order}/${acptNo}/cancel`
      ).then(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error?.data);
        }
      );
    });
  },
  async getProfileInfo() {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage}/profile/me`
      ).then(
        (res) => {
          // resolve(profileInfo)
          resolve(res.data);
        },
        (error) => {
          // resolve(profileInfo)
          reject(error);
        }
      );
    });
  },
  async getZipCode(zipcode) {
    const params = {
      zipcode
    };
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage}/address`,
        { params }
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  async updateProfile(data) {
    return new Promise((resolve, reject) => {
      Repository.put(
        `${resource_mypage}/profile/me`,
        data
      )
        .then(
          (response) => {
            resolve(response.data);
          },
          (error) => {
            reject(error);
          }
        )
        .catch(() => {});
    });
  },
  async getPublicStayGuide(acptNo, data) {
    return new Promise((resolve, reject) => {
      Repository.post(
        `${resource_mypage_order}/${acptNo}/public-stay/guide`,
        data
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  async sendMailToAddress(data) {
    return new Promise((resolve, reject) => {
      Repository.post(
        `${resource_mypage_menus}/share`,
        data
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  async getOrderInfoPublicStay(acptNo) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage_order}/${acptNo}/public-stay`
      ).then(
        (res) => {
          //resolve(orderPublicStay)
          resolve(res.data);
        },
        (error) => {
          //resolve(orderPublicStay)
          reject(error);
        }
      );
    });
  },
  async getOrderDetail(acptNo) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage}/order/${acptNo}`
      ).then(
        (response) => {
          // resolve(order_details)
          resolve(response.data);
        },
        (error) => {
          // resolve(order_details)
          reject(error);
        }
      );
    });
  },
  // 受注詳細情報取得（物販）
  async getOrderDetailShop(acptNo) {
    console.log("Call getOrderDetailShop")
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage_order}/${acptNo}/product-sales`
      ).then(
        (response) => {
          // resolve(order_details)
          resolve(response.data);
        },
        (error) => {
          // resolve(order_details)
          reject(error);
        }
      );
    });
  },
  // 申込履歴｜公共の宿の詳細情報取得
  async getOrderDetailPublicStay(acptNo) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage}/order/${acptNo}/public-stay`
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
  async getOrderDetailLife(acptNo) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage_order}/${acptNo}/life`
      ).then(
        (response) => {
          // resolve(order_details_life)
          resolve(response.data);
        },
        (error) => {
          // resolve(order_details_life)
          reject(error);
        }
      );
    });
  },
  async getOrderDetailDp(outsideResrvId, extSystemCd) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage_order}/${outsideResrvId}/dp/${extSystemCd || ''}`
      ).then(
        (response) => {
          // resolve(order_details_life)
          resolve(response.data);
        },
        (error) => {
          // resolve(order_details_life)
          reject(error);
        }
      );
    });
  },
  async getOrderDetailGC(acptNo) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage_order}/${acptNo}/gourmet`
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
  async getMenuBasicInfo(menuNo) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage}/menus/${menuNo}`
      ).then(
        (res) => {
          // resolve(menu_info)
          resolve(res.data);
        },
        (error) => {
          // resolve(menu_info)
          reject(error);
        }
      );
    });
  },
  async getShopMenuBasicInfo(menuNo) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage}/menus/${menuNo}/shop`
      ).then(
        (res) => {
          // resolve(menu_info)
          resolve(res.data);
        },
        (error) => {
          // resolve(menu_info)
          reject(error);
        }
      );
    });
  },
  async getMenuBasicInfoGC(menuNo) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage_menus}/${menuNo}/gourmet`
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  async getPointExchange(menuNo, planId) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage}/menus/${menuNo}/plans/${planId}/orders/point-exchg/service-param`
      ).then(
        (res) => {
          // resolve(pointExchg)
          resolve(res.data);
        },
        (error) => {
          // resolve(pointExchg)
          reject(error);
        }
      );
    });
  },
  async getQstnLife(menuNo, planId, usageDiv) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage}/menus/${menuNo}/plans/${planId}/service-param?usageDiv=${usageDiv}`
      ).then(
        (res) => {
          // resolve(qstnLife)
          resolve(res.data);
        },
        (error) => {
          // resolve(qstnLife)
          reject(error);
        }
      );
    });
  },
  getSubsidyCouponList(params) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage}/sbsd/available`,
        { params }
      ).then(
        (res) => {
          resolve(res.data?.availableDataList || []);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  sendAddingUserEmail(acptNo, data) {
    return Repository.post(
      `${resource_mypage_order}/${acptNo}/companion-info`,
      data
    );
  },
  async getShippingTargetInfoList() {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage_order}/shipping-target-info-list`
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  async getShippingDetail(arngeKey) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_mypage_order}/${arngeKey}/shipping-detail`
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
};
