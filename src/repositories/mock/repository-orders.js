import Repository from "../repository";
import mockData from "./mockdata/orders";
import menu_info from "./mockdata/menu-info.json";
import menu_info_gc from "./mockdata/menu-info-gc.json";
import plan_dp from "./mockdata/plan-dp.json";
import orderDetailGC from "./mockdata/order-gc-detail.json";
const resource_address = "/v1/life/member/address";
const resource_mypage = "/v1/mypage";
const resource_mypage_order = "/v1/mypage/order";
const resource_mypage_menus = "/v1/mypage/menus";

export default {
  /**
   * 保有しているベネポの取得
   */
  putAddress(param) {
    return Repository.put(resource_address, param);
  },

  getOrderReceipt(acptNo) {
    return mockData.getOrderReceipt();
  },

  getOrderDetailShop(acptNo){
    return mockData.getOrderDetailShop();
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
    if (data && data.acptNo) {
      acptNo = data.acptNo;
      delete data.acptNo;
    }
    if (data && data.param) {
      p = data.param;
      delete data.param;
    }
    if (!p) {
      return new Promise((resolve, reject) => {
        Repository.put(
          `${resource_mypage_order}/order-cancel?acptNo=${acptNo}`,
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
    } else {
      return new Promise((resolve, reject) => {
        Repository.put(
          `${resource_mypage_order}/order-cancel?acptNo=${acptNo}&p=${p}`,
          data
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
  },
  async cancelOrderGC(data) {
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          acptDtlNo: "string",
          transactionId: "string",
          cancelNo: "12345"
        }
      })
    })
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
    return mockData.getOrderDetail();
  },
  async getOrderDetailShop(acptNo) {
    return mockData.getOrderDetailShop();
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
  async getOrderDetailDp(acptNo,outsideResrvId, extSystemCd) {
    return new Promise((resolve, reject) => {
        resolve(plan_dp)
      // Repository.get(
      //   `${resource_mypage_order}/${acptNo}/dp/${outsideResrvId}?extSystemCd=${extSystemCd}`
      // ).then(
      //   (response) => {
      //     // resolve(plan_dp)
      //     resolve(response.data);
      //   },
      //   (error) => {
      //       // resolve(plan_dp)
      //     reject(error);
      //   }
      // );
    });
  },
  async getOrderDetailGC(acptNo) {
    return new Promise((resolve, reject) => {
      resolve(orderDetailGC)
    });
  },
  async getMenuBasicInfo(menuNo) {
    return new Promise((resolve, reject) => {
      
          resolve(menu_info)
      // Repository.get(
      //   `${resource_mypage}/menus/${menuNo}`
      // ).then(
      //   (res) => {
      //     // resolve(menu_info)
      //     // resolve(res.data);
      //   },
      //   (error) => {
      //     // resolve(menu_info)
      //     reject(error);
        // }
      // );
    });
  },
  async getMenuBasicInfoGC(menuNo) {
    return new Promise((resolve, reject) => {
      resolve(menu_info_gc)
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
