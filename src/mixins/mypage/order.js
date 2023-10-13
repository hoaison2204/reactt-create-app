import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

export default {
  methods: {
    async $_orderMixin_getMenuBasicInfo(menuNo) {
      const res = await this.$repositories("orders").getMenuBasicInfo(menuNo);
      if (isEmpty(res) || res?.isError) return {};
      return res;
    },
    async $_orderMixin_getMenuBasicInfoGC(menuNo) {
      const res = await this.$repositories("orders").getMenuBasicInfoGC(menuNo);
      if (isEmpty(res) || res?.isError) return {};
      return res;
    },
    async $_orderMixin_getSingleItemInfo(menuNo) {
      const res = await this.$repositories("mypage").getSingleItemInfo(menuNo);
      if (isEmpty(res) || res?.isError) return {};
      return res;
    },
    async $_orderMixin_getOrderDetailShop(acptNo) {
      const res = await this.$repositories("orders").getOrderDetailShop(acptNo);
      if (isEmpty(res) || res?.isError) return {};
      return res;
    },
    async $_orderMixin_getMenuNoPlandIdInfo(menuNo, planID) {
      const res = await this.$repositories("mypage").getMenuNoPlandIdInfo(menuNo, planID);
      if (isEmpty(res) || res?.isError) return {};
      return res;
    },
    async $_orderMixin_getOrderDetail(acptNo) {
      const res = await this.$repositories("orders").getOrderDetail(acptNo);
      if (isEmpty(res) || res?.isError) return {};
      return res;
    },
    async $_orderMixin_getOrderDetailLife(acptNo) {
      const res = await this.$repositories("orders").getOrderDetailLife(acptNo);
      if (isEmpty(res) || res?.isError || res?.error) return {};
      return res;
    },
    async $_orderMixin_getOrderDetailDp(outsideResrvId, extSystemCd) {
      const res = await this.$repositories("orders").getOrderDetailDp(outsideResrvId, extSystemCd);
      if (isEmpty(res) || res?.isError || res?.error) return {};
      return res;
    },
    async $_orderMixin_getLifePlanDetail(menuNo, acptNo) {
      const orderDetail = await this.$_orderMixin_getOrderDetail(acptNo);
      const planId = get(
        orderDetail,
        "orderStayDetail.acptDtlList[0].acptDtl.planId",
        ""
      );
      const roomId = get(
        orderDetail,
        "orderStayDetail.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList[0].stayRoomDayPrtic.roomId",
        ""
      );
      const res = await this.$repositories("menus")
        .getPlanDetail(menuNo, planId, roomId, {})
        .catch((error) => ({ error }));
      if (!res || res?.error) return {};

      const menuInfo = {
        categoryInfomation: get(res, "menuInformation.categoryInfomation", {}),
        menuImages: get(res, "planBasicInfo.planImages[0].imageUrl", ""),
        planRcSttDt:  get(res, "planBasicInfo.planRcSttDt", ""),
        planRcEndDt: get(res, "planBasicInfo.planRcEndDt", "")
      };
      return menuInfo;
    },
    // DP対応
    async $_orderMixin_getDpPlanDetail(menuNo, menuBasicInfo) {
      if(!menuBasicInfo){
        menuBasicInfo = await this.$_orderMixin_getMenuBasicInfo(menuNo);
      }
      const menuInfo = {
        categoryInfomation: get(menuBasicInfo, "categoryInfomation", {}),
        menuImages: get(menuBasicInfo, "menuImages[0].imageUrl", ""),
        planRcSttDt:  get(menuBasicInfo, "menuRcSttDt", ""),
        planRcEndDt: get(menuBasicInfo, "menuRcEndDt", "")
      };
      return menuInfo;
    },
    // srvicDivが「A20:公共の宿」の場合に実行
    async $_orderMixin_getOrderDetailPublicStay(acptNo) {
      const res = await this.$repositories("orders").getOrderDetailPublicStay(acptNo);
      if (isEmpty(res) || res?.isError) return {};
      return res;
    },
    // srvicDivが「A20:公共の宿」の場合に実行
    async $_orderMixin_getLifePlanDetailPublicStay(menuNo, acptNo) {
      /** メニュー詳細情報を取得 */
      const res = await this.$repositories("orders")
        .getMenuBasicInfo(menuNo)
        .catch((error) => ({ error }));

      /** カテゴリ情報 */
      const categoryInfomation = res.categoryInfomation || {}
      /** メニューのサムネイル */
      const menuImages = res.menuImages[0].imageUrl || ""
      /** メニューの申込開始日 */
      const menuRcSttDt = res.menuRcSttDt || ""
      /** メニューの申込終了日 */
      const menuRcEndDt = res.menuRcEndDt || ""

      /** 返却値を作成 */
      const menuInfo = {
        categoryInfomation: categoryInfomation,
        menuImages: menuImages,
        planRcSttDt:  menuRcSttDt,
        planRcEndDt: menuRcEndDt
      }
      return menuInfo;
    },
    // GC対応
    async $_orderMixin_getGCPlanDetail(menuNo, menuBasicInfo) {
      if(!menuBasicInfo){
        menuBasicInfo = await this.$_orderMixin_getMenuBasicInfoGC(menuNo);
        if (!menuBasicInfo || menuBasicInfo?.error) return {};
      }
      const menuInfo = {
        categoryInfomation: get(menuBasicInfo, "categoryInfomation", {}),
        menuImages: get(menuBasicInfo, "menuImages[0].imageUrl", ""),
        planRcSttDt:  get(menuBasicInfo, "menuRcSttDt", ""),
        planRcEndDt: get(menuBasicInfo, "menuRcEndDt", "")
      };
      return menuInfo;
    },
    async $_orderMixin_getMenuPlanDetail(menuNo, acptNo) {
      const orderDetail = await this.$_orderMixin_getOrderDetailLife(
        acptNo
      ).catch((error) => ({ error }));
      const planId = get(
        orderDetail,
        "acpt.acptDtlList[0].planId",
        ""
      );
      const params = { menuNo, planId };
      const res = await this.$repositories("menus")
        .getMenuPlanDetail(params)
        .catch((error) => ({ error }));
      if (!res || res?.error?.message?.includes('404 Not Found')) return {};

      const menuBasicInfo = await this.$_orderMixin_getMenuBasicInfo(menuNo);
      const menuInfo = {
        categoryInfomation: get(menuBasicInfo, "categoryInfomation", {}),
        menuImages: get(res, "imageUrl[0]", ""),
        planRcSttDt:  get(res, "planRcSttDt", ""),
        planRcEndDt: get(res, "planRcEndDt", "")

      };
      return menuInfo;
    },
    async $_orderMixin_getShopMenuPlanDetail(menuNo, acptNo) {
      const itemInfo = await this.$_orderMixin_getSingleItemInfo(menuNo);
      const shopOrderInfo = await this.$_orderMixin_getOrderDetailShop(acptNo);
      const shopMenuPlanInfo = await this.$_orderMixin_getMenuNoPlandIdInfo(menuNo, get(shopOrderInfo, "acpt.acptDtlList[0].planBasicInfo.planId", ""));

      const menuInfo = {
        categoryInfomation: get(itemInfo, "menuDetailResponse.categoryInfomation", {}),
        menuImages: get(itemInfo, "menuDetailResponse.menuImages[0].imageUrl", "/cdn/images/noimage.png"),
        planRcSttDt: get(shopMenuPlanInfo, "planShopInfo.saleDayStt", ""),
        planRcEndDt: get(shopMenuPlanInfo, "planShopInfo.saleDayEnd", "")
      };
      if (menuInfo.menuImages === "imageNothing") {
        menuInfo.menuImages = "/cdn/images/noimage.png"
      }
      return menuInfo;
    },
    async $_orderMixin_getOrderMenuInfo(item) {
      const { srvicDiv, menuNo, acptNo } = item;
      const isPublicStay =
        srvicDiv && srvicDiv !== "A10" && srvicDiv.startsWith("A");
      let menuInfo = {};

      if (isPublicStay) {
        menuInfo = await this.$_orderMixin_getLifePlanDetail(
          menuNo,
          acptNo
        ).catch((error) => {
          return { error };
        });
      } else if (srvicDiv.startsWith("A")) {
        menuInfo = await this.$_orderMixin_getLifePlanDetail(
          menuNo,
          acptNo
        ).catch((error) => {
          return { error };
        });
      } else {
        menuInfo = await this.$_orderMixin_getMenuPlanDetail(
          menuNo,
          acptNo
        ).catch((error) => {
          return { error };
        });
      }
      if (menuInfo && !menuInfo.error) {
        item.menuInfo = menuInfo;
      }
      item.loading = false;
    },
    async $_orderMixin_getPlanDetails(item, menuBasicInfo) {
      const { srvicDiv, menuNo, acptNo } = item;

      console.log("order.js > $_orderMixin_getPlanDetails: " + srvicDiv + " - " + menuNo);

      /** @see {@link src/mixins/const/framework/common/menus/srvicDiv.js} */
      /** 公共の宿区分かどうか判定(A15: 海外宿泊, A20: 公共の宿, A25: 全国の宿) */
      const isPublicStay =
        srvicDiv && srvicDiv !== "A10" && srvicDiv.startsWith("A");

      if (isPublicStay) {
        console.log("order.js > $_orderMixin_getPlanDetails > isPublicStay == true");
        // 公共の宿か判定
        if (srvicDiv == "A20") {
          console.log("order.js > $_orderMixin_getPlanDetails > isPublicStay == true && srcDiv == A20");
          return await this.$_orderMixin_getLifePlanDetailPublicStay(menuNo, acptNo).catch(
            (error) => {
              return { error };
            }
          );
        }
        console.log("order.js > $_orderMixin_getPlanDetails > isPublicStay == true && srcDiv != A20");
        return await this.$_orderMixin_getLifePlanDetail(menuNo, acptNo).catch(
          (error) => {
            return { error };
          }
        );
      } else if (srvicDiv.startsWith("A")) {
        console.log("order.js > $_orderMixin_getPlanDetails > isPublicStay == false && srcDiv.startWith A");
        return await this.$_orderMixin_getLifePlanDetail(menuNo, acptNo).catch(
          (error) => {
            return { error };
          }
        );
      } else if (srvicDiv == "B55") {
        return await this.$_orderMixin_getDpPlanDetail(menuNo, menuBasicInfo).catch(
          (error) => {
            return { error };
          }
        );
      } else if (srvicDiv.startsWith("C")) {
        console.log("order.js > $_orderMixin_getPlanDetails > isPublicStay == false && srcDiv.startWith C");
        return await this.$_orderMixin_getShopMenuPlanDetail(menuNo, acptNo).catch(
          (error) => {
            return { error };
          }
        );
      } else {
        console.log("order.js > $_orderMixin_getPlanDetails > Else");
        return await this.$_orderMixin_getMenuPlanDetail(menuNo, acptNo).catch(
          (error) => {
            return { error };
          }
        );
      }
    }
  }
};
