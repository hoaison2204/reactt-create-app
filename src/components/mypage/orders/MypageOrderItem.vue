<template>
  <div class="item-cards c-card mb-4 md:mb-3 font-size-override">
    <div v-if="loading" class="c-card-loading">
      <LoadingContent />
    </div>
    <!-- Header -->
    <div class="base-content-item py-8 md:py-5 px-10 md:px-3">
      <div class="base-content-item-header">
        <ItemOrder
          :imageUrl="getImageUrl"
          :menuNo="getMenuNo"
          :categoryInfomation="getCategoryNm"
          :reserveSts="getStatusOrders"
          :orderSts="getStatusOrder"
          class="mb-4 md:mb-2"
        />
      </div>

      <!-- Content -->
      <div class="mb-8 md:mb-4">
        <h3 class="font-bold text-xl md:text-base mb-3 md:mb-2">
          {{ getMenuNm }}
        </h3>
        <div class="flex">
          <div class="flex flex-col w-24">
            <span class="h-5" v-if="isDisplayBillAmountTotal">合計</span>
            <span class="h-5" v-if="!isGourmet && !isIcService(mypageDisplayCode) && getPointGrntNumAmt != null && getDtlSts != 9">付与ベネポ</span>
            <span class="h-5">申込日</span>
            <span v-if="getCheckInCheckOutDate" class="h-5">宿泊日</span>
            <span v-if="isGourmet" class="h-5">利用日時</span>
          </div>
          <div class="flex flex-col">
            <span class="h-5" v-if="isDisplayBillAmountTotal">：&nbsp;{{ billAmountTotalText }}</span>
            <span class="h-5" v-if="!isGourmet && !isIcService(mypageDisplayCode) && getPointGrntNumAmt != null && getDtlSts != 9">：&nbsp;{{ getPointGrntNumAmt || 0 | formatInteger }}ベネポ</span>
            <span class="h-5">：&nbsp;{{ getAcptDatetime }}</span>
            <span v-if="getCheckInCheckOutDate" class="h-5"
              >：&nbsp;{{ getCheckInCheckOutDate }}</span
            >
            <span v-if="isGourmet" class="h-5"
              >：&nbsp;{{ getGourmetUseDateTime }}</span
            >
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="grid grid-cols-2"
        :class="{ 'justify-items-center': type > 0 }"
      >
        <!--
          以下のいずれかの場合に「詳細を見る」を表示し、それ以外の場合は「提供期間が終了しました」を表示する
          1. typeが 1 以上
              ※ type == -1 : 初期値
                 type ==  0 : 期間終了 
          2. 領収証を発行できる
          3. ご利用案内書を発行できる
        -->
        <router-link
          v-if="type > 0 || (!inactiveButtonReceipt && isShowIssueReceipt) || (receivingMethod && +receivingMethod > 0)"
          :to="getLinkDetail()"
          class="text-gray-600"
        >
          <button class="btn-base show-detail-btn-border">
            詳細を見る
          </button>
        </router-link>

        <button
          v-else-if="type === 0"
          class="h-12 bg-gray-500 text-white font-bold rounded-md cursor-default"
          disabled
          style="grid-column: 1 / 3;"
        >
          提供期間が終了しました
        </button>

        <!-- divで囲まないとSafariでUIが崩れる -->
        <div v-if="type > 0">
          <button
            v-if="type == 1"
            @click="gotoURL"
            class="btn-base"
            :class="(disableApplyAgain || disableApplyAgainShop) ? 'btn-disable' : 'bg-red-500 text-white'"
          >
            もう一度申し込む
          </button>
          <button
            v-if="type == 2"
            @click="gotoURL"
            class="btn-base bg-red-500 text-white"
          >
            このメニューのプラン一覧を見る
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { get } from "lodash";
import downLoadMixin from "@/mixins/download";
import order from "@/mixins/mypage/order.js";
import func_utils from '@/mixins/func_utils';

const PLACEHOLDER_IMG = require("@/assets/images/img-placeholder-96x96.png");

export default {
  name: "MypageOrderItem",
  props: ["item", "pageChange", "shippingDetail", "mypageBoCode", "mypageDisplayCode"],
  mixins: [order, func_utils],
  data: () => {
    return {
      loading: true,
      extraData: null,
      billAmt: null,
      receivingMethod: null,
      type: -1,
      url: null,
      romSts: null,
      planNm: null,
      arngeStatus: null,
      dtlSts: null,
      lotteryInfo: null,
      judgeResult: null,
      disableApplyAgain: true,
      payeeDiv: null,
      menuBasicInfo: null,
      initBasicInfo: false,
      orderDetail: null,
      redemption: null,
      applicationDetail: {
        acptDatetime2: null,
        companyCd: null,
        pointUseCd: null,
      },
      disableApplyAgainShopFlg: false,
      planId: null,
      shopPlanInfo: null
    };
  },
  async created() {
    if (this.isGourmet) {
      this.gcMenuImages = await this.$repositories("menus").getGcMenuImage(this.item?.menuNo);
      this.orderDetail = await this.$repositories("orders").getOrderDetailGC(this.getAcptNo);
      this.getInfoOrderDetailGC();
      this.setMenuBasicInfoGC();
      this.getBillAmtTotal();
    } else if(this.item?.srvicDiv == 'C10') {
      // 物販の場合
      this.menuBasicInfo = null;
      this.getInfoOrderDeailShop();
    } else {
      this.menuBasicInfo = await this.$repositories("orders").getMenuBasicInfo(this.item?.menuNo);
      if (this.item?.srvicDiv == this.CONST.SRVIC_DIV.TOURS) {
        this.orderDetail = await this.$repositories("orders").getOrderDetailDp(this.item?.outsideResrvId, this.menuBasicInfo?.extSystemCd);
        this.getInfoOrderDeailDp();
      } else {
        this.getInfoOrderDeail();
      }
    }
    this.initBasicInfo = true;
  },
  mounted() {
    this.getBillAmtTotal();
    this.getMethodReceive();
  },
  watch: {
    initBasicInfo(){
      this.getOrderMenuDetails();
      this.getCategoryInfo();
    }
  },
  methods: {
    get,
    async getOrderMenuDetails() {
      let data = null;
      if (this.isGCService(this.mypageDisplayCode)) {
        // GC対応
        data = await this.$_orderMixin_getGCPlanDetail(
          this.item, this.menuBasicInfo
        ).catch((error) => ({ error }));
      } else {
        data = await this.$_orderMixin_getPlanDetails(
          this.item, this.menuBasicInfo
        ).catch((error) => ({ error }));
      }
      this.loading = false;
      console.log("---------------------------------------- data");
      console.log(data);
      if (!data || data.error || !data?.categoryInfomation) {
        return;
      } else this.disableApplyAgain = this.setDisableApplyAgain(data);
      if (!this.extraData) {
        this.extraData = data;
      } else {
        this.extraData = { ...this.extraData, ...data };
      }
    },
    checkHiddenBtn() {
      if (
        !(item.srvicDiv && item.srvicDiv.startsWith("B")) ||
        !(receivingMethod && +receivingMethod > 0)
      ) {
        return true;
      }
    },
    gotoBill() {
      const query = {
        acptNo: this.getAcptNo,
        menuNo: this.getMenuNo,
        srvicDiv: this.item.srvicDiv,
        isPublicStay:
          this.item.srvicDiv !== "A10" && this.item.srvicDiv.startsWith("A")
      };
      this.$router.push({ path: "/mypage/receipt", query });
    },
    getRedemption() {
      console.log("MypageOrderItem > getRedemption: ", this.getAcptNo);
      if (this.getAcptNo === null) return;
      this.$repositories('orders')
        .getRedemptionInfo(this.getAcptNo, this.applicationDetail.acptDatetime2, this.applicationDetail.companyCd, this.applicationDetail.pointUseCd)
        .then(
          (response) => {
            this.redemption = response.data
          },
          (error) => {}
        )
    },
    getPublicStayGuide() {
      const acptNo = this.getAcptNo;
      const data = {
        acptDtlNo: get(this.item, "acptDtlNo", ""),
        staffNm: "string"
      };
      this.$repositories("orders")
        .getPublicStayGuide(acptNo, data)
        .then(
          (response) => {
            const pdfFilePath = get(response, "pdfFilePath", "");
            downLoadMixin.$_downloadPdfUrlMixin(pdfFilePath);
          },
          (error) => {
            this.$toasted.error(error?.message);
          }
        );
    },
    getLinkDetail() {
      const acptNo = this.getAcptNo;
      const menuNo = this.getMenuNo;
      const srvicDiv = this.item.srvicDiv;
      const outsideResrvId = this.item?.outsideResrvId;
      const mypageBoCode = this.mypageBoCode;
      const isPublicStay = srvicDiv !== "A10" && srvicDiv.startsWith("A");
      return `/mypage/orders/${menuNo}?acptNo=${acptNo}&srvicDiv=${srvicDiv}&isPublicStay=${isPublicStay}&boCode=${mypageBoCode}${srvicDiv === this.CONST.SRVIC_DIV.TOURS ? '&outsideResrvId=' + outsideResrvId : ''}`;
    },
    async getCategoryInfo() {
      const today = moment();
      const acptNo = this.getAcptNo;
      const menuNo = this.getMenuNo;
      const srvicDiv = this.item.srvicDiv;
      const stayDomain = this.getStayDomain(this.mypageDisplayCode);
      if (srvicDiv === "A10") {
        this.$repositories("orders")
          .getOrderDetail(acptNo)
          .then((data) => {
            if (this.planNm === null) {
              this.planNm = get(
                data,
                "orderStayDetail.acptDtlList[0].planBasicInfo.planNm",
                ""
              );
            }
            const planId = get(
              data,
              "orderStayDetail.acptDtlList[0].acptDtl.planId",
              ""
            );
            const roomId = get(
              data,
              "orderStayDetail.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList[0].stayRoomDayPrtic.roomId",
              ""
            );
            const adultHeadCnt = get(
              data,
              "orderStayDetail.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList[0].stayRoomDayPrtic.adultTotalHeadCnt",
              ""
            );
            this.$repositories("menus")
              .getPlanDetail(menuNo, planId, roomId, {})
              .then((data) => {
                const planRcSttDt =
                  data.planBasicInfo?.planRcSttDt || null;
                const planRcEndDt =
                  data.planBasicInfo?.planRcEndDt || null;
                const menuRcSttDt = this.menuBasicInfo?.menuRcSttDt || null;
                const menuRcEndDt = this.menuBasicInfo?.menuRcEndDt || null;
                if (
                  (moment(planRcSttDt).isSameOrBefore(today) &&
                    moment(planRcEndDt).isSameOrAfter(today)) ||
                  !planRcSttDt ||
                  !planRcSttDt
                ) {
                  this.url = `${stayDomain}/menus/${menuNo}/plans/${planId}/rooms/${roomId}?adultHeadCnt=${adultHeadCnt}`;
                  this.type = 1;
                } else if (
                  (moment(menuRcSttDt).isSameOrBefore(today) &&
                    moment(menuRcEndDt).isSameOrAfter(today)) ||
                  !menuRcSttDt ||
                  !menuRcEndDt
                ) {
                  this.url = `${stayDomain}/menus/${menuNo}/plans`;
                  this.type = 2;
                } else {
                  this.type = 0;
                }
              })
              .catch(error => { this.type = 0 });
          });
      } else if (srvicDiv.substring(0, 1) === "A") {
        const menuRcSttDt = this.menuBasicInfo?.menuRcSttDt || null;
        const menuRcEndDt = this.menuBasicInfo?.menuRcEndDt || null;
        if (
          (moment(menuRcSttDt).isSameOrBefore(today) &&
            moment(menuRcEndDt).isSameOrAfter(today)) ||
          !menuRcSttDt ||
          !menuRcEndDt
        ) {
          this.url = `${stayDomain}/public-stay/menus/${menuNo}`;
          this.type = 1;
        } else {
          this.type = 0;
        }
      } else if (srvicDiv === this.CONST.SRVIC_DIV.TOURS) {
        const menuRcSttDt = this.menuBasicInfo?.menuRcSttDt || null;
        const menuRcEndDt = this.menuBasicInfo?.menuRcEndDt || null;
        let planId = null;
        if(this.menuBasicInfo?.extSystemCd === this.CONST.EXT_SYSTEMCD.ANA) {
          planId = get(
              this.orderDetail,
              "acptDtlANA.planBasicInfo.planId",
              null
            );
        }else {
          this.planId = get(this.orderDetail, "acptDtlJR.planBasicInfo.planId", null);   // JATO + JAL
        }
        if (
          (moment(menuRcSttDt).isSameOrBefore(today) &&
            moment(menuRcEndDt).isSameOrAfter(today)) ||
          !menuRcSttDt ||
          !menuRcEndDt
        ) {
          this.url = `${stayDomain}/dp/menus/${menuNo}/plans/${planId}`;
          this.type = 1;
        } else {
          this.type = 0;
        }
      } else if (this.isGourmet) {
        // GC対応
        this.type = 3;
      } else if (srvicDiv.substring(0, 1) === "B") {
        this.$repositories("orders")
          .getOrderDetailLife(acptNo)
          .then((data) => {
            if (data) {
              const planId = get(data, "acpt.acptDtlList[0].planId", "");
              const params = {
                menuNo: menuNo,
                planId: planId
              };
              this.$repositories("menus")
                .getMenuPlanDetail(params)
                .then((life) => {
                  console.log("----------->life:", life);
                  const prefixPath = this.isIcService(this.mypageDisplayCode) ? 'product/detail-life' : 'menus';
                  if (this.planNm === null) this.planNm = life.planNm;
                  const planRcSttDt = life.planRcSttDt || null;
                  const planRcEndDt = life.planRcEndDt || null;
                  const menuRcSttDt = this.menuBasicInfo?.menuRcSttDt || null;
                  const menuRcEndDt = this.menuBasicInfo?.menuRcEndDt || null;
                  const lifeDomain = this.getLifeDomain(this.mypageDisplayCode);
                  if (
                    (moment(planRcSttDt).isSameOrBefore(today) &&
                      moment(planRcEndDt).isSameOrAfter(today)) ||
                    !planRcSttDt ||
                    !planRcSttDt
                  ) {
                    this.url = `${lifeDomain}/${prefixPath}/catExl=${this.item?.catExlClassCd}/catLrg=${this.item?.catLrgClassCd}/catMid=${this.item?.catMidClassCd}/catSml=${this.item?.catSmlClassCd}/menuNo=${menuNo}/plans/planId=${planId}`;
                    this.type = 1;
                  } else if (
                    (moment(menuRcSttDt).isSameOrBefore(today) &&
                      moment(menuRcEndDt).isSameOrAfter(today)) ||
                    !menuRcSttDt ||
                    !menuRcEndDt
                  ) {
                    this.url = `${lifeDomain}/${prefixPath}/catExl=${this.item?.catExlClassCd}/catLrg=${this.item?.catLrgClassCd}/catMid=${this.item?.catMidClassCd}/catSml=${this.item?.catSmlClassCd}/menuNo=${menuNo}/plans`;
                    this.type = 2;
                  } else {
                    this.type = 0;
                  }
                })
                .catch(error => { this.type = 0 });
            }
          })
          .catch(error => { this.type = 0 });
      } else if (srvicDiv.substring(0, 1) === "C") {
        await this.$repositories("mypage")
          .getSingleItemInfo(menuNo)
          .then(
            (response) => {
              const prefixPath = this.isIcService(this.mypageBoCode) ? 'product/detail-goods' : 'menus';
              const menuStartDatetime = get(response, "menuDetailResponse.menuRcSttDt", "");
              const menuEndDatetime = get(response, "menuDetailResponse.menuRcEndDt", "");
              if ((moment(menuStartDatetime).isSameOrBefore(today) && moment(menuEndDatetime).isSameOrAfter(today))) {
                this.url = `${this.shopDomain}/${prefixPath}/menuNo=${menuNo}`;
                this.type = 1;
              } else {
                this.type = 1;
                this.disableApplyAgainShopFlg = true;
              }

            },
            (error) => { this.type = 0; }
        );        
      } else {
        this.type = 0;
      }
    },
    getBillAmtTotal() {
      const { acptNo, srvicDiv } = this.item;

      if (srvicDiv === "A10") {
        this.$repositories("orders")
          .getOrderDetail(acptNo)
          .then(
            (response) => {
              this.billAmt = _.get(
                response,
                "orderStayDetail.acpt.billAmtTotal",
                null
              );
            },
            (error) => {}
          );
     } else if (this.isGourmet) {
        this.billAmt = _.get(this.orderDetail, "acpt.billAmtTotal", null);
      } else if (srvicDiv.startsWith("B")) {
        this.$repositories("orders")
          .getOrderDetailLife(acptNo)
          .then(
            (response) => {
              if (this.isIcService(this.mypageDisplayCode)) {
                this.applicationDetail.acptDatetime2 = moment(
                  _.get(response, "acpt.acptDatetime", "")
                ).format("YYYY-MM-DD");
                this.applicationDetail.companyCd = _.get(
                  response,
                  "acpt.customer.companyCd",
                  null
                );
                this.applicationDetail.pointUseCd = _.get(
                  response,
                  "acpt.pointUseCd",
                  null
                );
                this.getRedemption();
                return;
              }

              this.billAmt = _.get(response, "acpt.billAmtTotal", null);
            },
            (error) => {}
          );
      } else if (srvicDiv.startsWith("C")) {
        this.$repositories("orders")
          .getOrderDetailShop(acptNo)
          .then(
            (response) => {
              if (this.isIcService(this.mypageDisplayCode)) {
                this.applicationDetail.acptDatetime2 = moment(
                  _.get(response, "acpt.acptDatetime", "")
                ).format("YYYY-MM-DD");
                this.applicationDetail.companyCd = _.get(
                  response,
                  "acpt.customer.companyCd",
                  null
                );
                this.applicationDetail.pointUseCd = _.get(
                  response,
                  "acpt.pointUseCd",
                  null
                );
                this.getRedemption();
                return;
              }

              this.billAmt = _.get(response, "acpt.billAmtTotal", null);
            },
            (error) => {}
        );
      }
    },
    async getMethodReceive() {
      const { acptNo, srvicDiv } = this.item;
      if (srvicDiv !== "A10" && srvicDiv.startsWith("A")) {
        await this.$repositories("orders")
          .getOrderInfoPublicStay(acptNo)
          .then(
            (response) => {
              this.receivingMethod = _.get(
                response,
                "orderPublicStayDetail.acptDtlList[0].stayAcptDtl.usageGuideReceiptDiv",
                null
              );
            },
            (error) => {}
          );
      }
      if (srvicDiv.startsWith("C")) {
        this.$repositories("orders").getOrderDetailShop(acptNo)
          .then(response => {
            this.receivingMethod = _.get(
              response,
              "acpt.acptDtlList[0].acptDtl.usageDiv",
              null
            );
          }
        );
      }
    },
    gotoURL() {
      if (this.type !== 1 || !this.disableApplyAgain) location.href = this.url;
    },
    getInfoOrderDeail() {
      const { acptNo } = this.item;
      this.$repositories("orders").getOrderDetailLife(acptNo).then(
        (response) => {
          if (this.planNm === null) {
            this.planNm = _.get(
              response,
              "acpt.acptDtlList[0].planBasicInfo.planNm",
              null
            );
          }
          this.romSts = _.get(
            response,
            "acpt.acptRomTotal.acptRomDtlList[0].romSts",
            null
          );
          this.arngeStatus = _.get(
            response,
            "acpt.acptDtlList[0].acptRomDtlList[0].acptPrticList[0].acptDlvryList[0].arngeList[0].arngeSts",
            null
          );
          const { lotteryInfo, judgeResult, payeeDiv } = _.get(
            response,
            "acpt.acptDtlList[0]",
            null
          );
          this.lotteryInfo = lotteryInfo;
          this.judgeResult = judgeResult;
          this.payeeDiv = payeeDiv;
        },
        (error) => { }
      );
    },
    getInfoOrderDeailDp() {
      if (this.planNm === null) {
        if(this.menuBasicInfo?.extSystemCd === this.CONST.EXT_SYSTEMCD.ANA) {
          this.planNm = _.get(
              this.orderDetail,
              "acptDtlANA.planBasicInfo.planNm",
              null
          );
        }else 
          this.planNm = _.get(
              this.orderDetail,
              "acptDtlJR.planBasicInfo.planNm",
              null
          );
      }
      this.romSts = _.get(
          this.orderDetail,
          "acptRomTotal.acptRomDtlList[0].romSts",
          null
      );
      this.arngeStatus = _.get(
          this.orderDetail,
          "acptRomTotal.acptRomDtlList[0].acptPrticList[0].acptDlvryList[0].arngeList[0].arngeSts",
          null
      );
      if(this.menuBasicInfo?.extSystemCd === this.CONST.EXT_SYSTEMCD.ANA) {
        this.payeeDiv = _.get(
            this.orderDetail,
            "acptDtlANA.acptDtl.payeeDiv",
            null
        );
      }else{
        this.payeeDiv = _.get(
            this.orderDetail,
            "acptDtlJR.acptDtl.payeeDiv",
            null
        );
      }
    },
    getInfoOrderDetailGC() {
      if (this.planNm === null) {
          this.planNm = _.get(
              this.orderDetail,
              "acptDtlJR.planBasicInfo.planNm",
              null
          );
      }
      this.romSts = _.get(
          this.orderDetail,
          "acptRomTotal.acptRomDtlList[0].romSts",
          null
      );
      this.arngeStatus = _.get(
          this.orderDetail,
          "acptRomTotal.acptRomDtlList[0].acptPrticList[0].acptDlvryList[0].arngeList[0].arngeSts",
          null
      );
      this.payeeDiv = _.get(
          this.orderDetail,
          "acptDtlJR.acptDtl.payeeDiv",
          null
      );
    },
    setMenuBasicInfoGC() {
      const imageUrl = get(this.gcMenuImages, "menuImages[0].imageUrl", PLACEHOLDER_IMG);
      const menuBasicInfoFromGcOrderDetail = get(this.orderDetail, "acpt.acptDtlList[0].menuBasicInfo", {});
      this.menuBasicInfo = {...menuBasicInfoFromGcOrderDetail, imageUrl: imageUrl};
    },
    async getInfoOrderDeailShop() {
      const { acptNo } = this.item;
      this.$repositories("orders")
        .getOrderDetailShop(acptNo)
        .then(
          (response) => {
            if (this.planNm === null) {
              this.planNm = _.get(
                response,
                "acpt.acptDtlList[0].planBasicInfo.planNm",
                null
              );
            }
            this.romSts = _.get(
              response,
              "acpt.acptRomTotal.acptRomDtlList[0].romSts",
              null
            );
            this.arngeStatus = _.get(
              response,
              "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.arngeSts",
              null
            );
            this.dtlSts = _.get(
              response,
              "acpt.acptDtlList[0].dtlSts",
              null
            );
            this.lotteryInfo = _.get(
              response,
              "acpt.acptDtlList[0].acptPrticList[0].prodSlsBenefit.lotteryResult",
              null
            );
            this.judgeResult = _.get(
              response,
              "acpt.acptDtlList[0].judgeResult",
              null
            );
            this.payeeDiv = _.get(
              response,
              "acpt.acptDtlList[0].payeeDiv",
              null
            );
            // プランID
            this.planId = _.get(
              response,
              "acpt.acptDtlList[0].planBasicInfo.planId",
              ""
            );
            this.$repositories("mypage").getMenuNoPlandIdInfo(this.getMenuNo, this.planId)
            .then(data => {
              this.shopPlanInfo = data;
            });
          },
          (error) => {}
      );
    },
    // getSatusDtlSts(dtl) {
    //   switch (dtl) {
    //     case "5":
    //       return "受付済み";
    //     case "6":
    //       return "キャンセル待ち";
    //     case "8":
    //       return "受付完了";
    //     case "9":
    //       return "キャンセル";
    //     default:
    //       return "";
    //   }
    // },
    // getSatusRomSts(rom) {
    //   switch (rom) {
    //     case "1":
    //       return "ご入金待ち";
    //     case "5":
    //       return "ご入金済";
    //     case "7":
    //       return "クレカ返金";
    //     case "8":
    //       return "口座返金";
    //     case "9":
    //       return "キャンセル";
    //     default:
    //       return "";
    //   }
    // }
    setDisableApplyAgain(val) {
      if (!val?.planRcSttDt || !val?.planRcEndDt) {
        return false;
      }
      let planRcSttDt = new Date(val.planRcSttDt).getTime();
      let planRcEndDt = new Date(val.planRcEndDt).getTime();
      let toDate = new Date().getTime();
      if (toDate < planRcSttDt || toDate > planRcEndDt) return true;
      return false;
    }
  },
  computed: {
    shopDomain() {
      return this.getShopReorderDomain(this.mypageDisplayCode);
    },
    lifeDomain() {
      return this.getLifeDomain(this.mypageDisplayCode);
    },
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    isDisplayBillAmountTotal() {
      return (this.isIcService(this.mypageDisplayCode) && this.redemption && this.redemption.usePoint)
        || (this.isShopService && this.billAmt !== null)
        || this.billAmt;
    },
    billAmountTotalText() {
      if (this.isIcService(this.mypageDisplayCode)) {
        return this.redemption ? `${this.redemption.usePoint} ${this.redemption.pointName}` : "";
      }
      return this.formatCurrency(this.billAmt);
    },
    getCheckInCheckOutDate() {
      const checkInDate = get(this.item, "checkInDate", null);
      const checkOutDate = get(this.item, "checkOutDate", null);
      if (!checkInDate && !checkOutDate) return false;
      const checkInDisplay =
        checkInDate && moment(checkInDate).isValid()
          ? moment(checkInDate).format("YYYY/MM/DD")
          : "";
      const checkOutDisplay =
        checkOutDate && moment(checkOutDate).isValid()
          ? moment(checkOutDate).format("YYYY/MM/DD")
          : "";

      return checkInDisplay && checkOutDisplay
        ? `${checkInDisplay} ~ ${checkOutDisplay}`
        : checkInDisplay || checkOutDisplay;
    },
    inactiveButtonReceipt() {
      const { romSts } = this;
      return (+romSts != 5 || (this.acpt && this.acpt.billAmtTotal == 0));
    },
    isShowIssueReceipt() {
      return (
        this.payeeDiv &&
        this.payeeDiv === this.CONST.PAYEE_DIV.MEMBER_STORE &&
        this.item?.srvicDiv.startsWith("A")
      );
    },
    getStatusOrders() {
      if (this.isGourmet) {
        return this.getStatusOrdersGC;
      }
      const { arngeStatus, lotteryInfo, judgeResult, getDtlSts, romSts, dtlSts } = this;
      const { srvicDiv } = this.item;
      if (srvicDiv.startsWith("C")) {
        if(+romSts === 1) return 'ご入金待ち'
        // キャンセル
        else if (+dtlSts === 9) {
          if (+romSts === 9) return 'キャンセル済み（ご入金待ち）'
          return 'キャンセル済み'  
        }
        else if (+arngeStatus === 1) return '手配待'
        else if (+arngeStatus === 3) return '手配中'
        else if (+arngeStatus === 8) return '手配完了'
        else if (+dtlSts === 8 && +romSts === 5) return "手配中"
      } else {
        if ([5, 8].includes(+getDtlSts)) {
          if (+romSts === 1) return "ご入金待ち";
          else if (+getDtlSts === 8) {
            if (+arngeStatus === 3) {
              return "手配中";
            }
            return "手配完了";
          }
          return "受付済み";
        } else if (+getDtlSts === 9) {
          if (+romSts === 1) return "キャンセル済み（ご入金待ち）";
          return "キャンセル済み";
        } else if (!+judgeResult && lotteryInfo === "落選") {
          return "手配不可 ( ポイント交換失敗 )";
        }
      }
      return "";
    },
    getStatusOrdersGC() {
      const data = get(this.orderDetail, "acpt.acptDtlList[0]", {});
      const dtlSts = data.dtlSts; // 受付明細ステータス
      const ccOperatorHandleFlag = data.ccOperatorHandleFlag; // 審査フラグ
      const judgeResult = data.judgeResult; // 審査結果
      const dtlStsParam = {
        accepted: '5', // 受付済み
        completed: '8', // 受付完了
        canceled: '9', // キャンセル
      }
      const ccOHFlagParam = {
        requestReservation: '1', // リクエスト予約
      }
      const judgeResultParam = {
        ok: '1',
        ng: '0',
        notSet: null,
      }
      if (dtlSts === dtlStsParam.accepted
        && ccOperatorHandleFlag === ccOHFlagParam.requestReservation
        && judgeResult === judgeResultParam.notSet
      ) {
        return "手配中"; // リクエスト未回答時
      } else if (dtlSts === dtlStsParam.completed
        && ccOperatorHandleFlag === ccOHFlagParam.requestReservation
        && judgeResult === judgeResultParam.ok
      ) {
        return "手配完了"; // リクエスト回答OK時
      } else if (dtlSts === dtlStsParam.completed
        && ccOperatorHandleFlag === ccOHFlagParam.requestReservation
        && judgeResult === judgeResultParam.ng
      ) {
        return "手配不可"; // リクエスト回答NG時
      } else if (dtlSts === dtlStsParam.canceled
        && ccOperatorHandleFlag === ccOHFlagParam.requestReservation
        && judgeResult === judgeResultParam.notSet
      ) {
        return "キャンセル"; // リクエスト未回答 キャンセル
      } else if (dtlSts === dtlStsParam.canceled
        && ccOperatorHandleFlag === ccOHFlagParam.requestReservation
        && judgeResult === judgeResultParam.ok
      ) {
        return "キャンセル"; // リクエスト回答OK キャンセル
      }
      return "";
    },
    getAcptDatetime() {
      const time = get(this.item, "acptDatetime", "");
      const timeJP = time ? moment(time).format("YYYY/MM/DD") : "";
      return timeJP;
    },
    getAcptNo() {
      return get(this.item, "acptNo", "");
    },
    getImageUrl() {
      if (this.isGourmet) {
        return get(this.menuBasicInfo, "imageUrl", PLACEHOLDER_IMG)
      }

      const imageUrl = get(this.extraData, "menuImages", null);
      if (imageUrl) {
        return imageUrl;
      }
      return PLACEHOLDER_IMG;
    },
    getCatLargClassNm() {
      if (!this.isIcService(this.mypageDisplayCode) ||
        this.extraData?.categoryInfomation?.catLrgClassCd !== this.CONST.CATEGORIES.BENE_MAIL_ORDER_CODE) {
          return this.extraData?.categoryInfomation?.catLrgClassNm;
      }
      return this.CONST.CATEGORIES.BENE_MAIL_ORDER_IC_NAME;
    },
    getCategoryNm() {
      if (this.isGourmet) {
        console.log("MypageOrderItem > getCategoryNm > this.menuBasicInfo: ", this.menuBasicInfo);
        return {
          catLrgClassNm: get(this.menuBasicInfo, "catLrgClassNm", ""),
          catMidClassNm: get(this.menuBasicInfo, "catMidClassNm", ""),
          catSmlClassNm: get(this.menuBasicInfo, "catSmlClassNm", ""),
        };
      }

      console.log("MypageOrderItem > getCategoryNm > this.extraData: ", this.extraData);
      return {
        catLrgClassNm: this.getCatLargClassNm,
        catMidClassNm: this.extraData?.categoryInfomation?.catMidClassNm,
        catSmlClassNm: this.extraData?.categoryInfomation?.catSmlClassNm
      };
    },
    getMenuNo() {
      return get(this.item, "menuNo", "");
    },
    getMenuNm() {
      return get(this.item, "menuNm", "");
    },
    getReserveSts() {
      return get(this.item, "reservedSts", "");
    },
    getDtlSts() {
      return get(this.item, "dtlSts", null);
    },
    getCancelDateTokyoInn() {
      const cancelDatetime = get(this.item, "cancelDatetime", null);
      if (cancelDatetime !== null && cancelDatetime !== "") {
        return true;
      }
      return false;
    },
    getStatusOrder() {
      let checkInDate = null;
      let checkOutDate = null;
      const today = moment().format("YYYY/MM/DD");
      if (
        get(this.item, "checkInDate", "") &&
        get(this.item, "checkOutDate", "")
      ) {
        checkInDate = moment(get(this.item, "checkInDate", "")).format(
          "YYYY/MM/DD"
        );
        checkOutDate = moment(get(this.item, "checkOutDate", "")).format(
          "YYYY/MM/DD"
        );
      }
      if (today < checkInDate) {
        return "利用前";
      }
      if (today > checkOutDate) {
        return "利用済み";
      }
      if (today >= checkInDate && today <= checkOutDate) {
        return "利用中";
      }
    },
    checkShowButton() {
      let showButton = true;
      if (
        !get(this.item, "checkInDate", "") &&
        !get(this.item, "checkOutDate", "")
      ) {
        showButton = false;
      } else {
        showButton = true;
      }
      return showButton;
    },
    getPointGrntNumAmt() {
      return this.item?.pointGrntNumAmt;
    },
    getAreaClassNm() {
      return (
        get(this.extraData, "areaInfomation.areaLrgClassNm", "") +
        get(this.extraData, "areaInfomation.areaSmlClassNm", "")
      );
    },
    isGourmet() {
      if (this.isGCService(this.mypageDisplayCode)) {
        return true;
      }
      return false;
    },
    getGourmetUseDateTime() {
      const data = get(this.orderDetail, "acpt.acptDtlList[0]", {});
      console.log("getGourmetUseDateTime: ", data);
      if (data) {
        const dateText = moment(data.useDate).format("YYYY/MM/DD");
        let timeText = data.useTime || "";
        if (!data.useTime?.includes(":")) {
          timeText = `${timeText.substr(0, 2)}:${timeText.substr(2, 2)}`;
        }
        return `${dateText} ${timeText}`;
      }
      return '';
    },
    /**
     * 物販かどうか
     */
    isShopService() {
      return this.item?.srvicDiv == 'C10';
    },
    /**
     * もう一度申し込むボタンを表示するか(物販用)
     */
    disableApplyAgainShop() {
      if (this.isShopService) {
        const memberBenefits = this.shopPlanInfo?.memberBenefits;
        if (!memberBenefits || !memberBenefits[0].stock || memberBenefits[0].stock <= 0) {
            // 在庫がない場合
          return true;
        }
      }
      return this.disableApplyAgainShopFlg;
    }
  }
};
</script>

<style lang="scss" scoped>
.font-size-override * {
  font-size: 15px;
  @include mq() {
    font-size: 13px;
  }
}

.c-card {
  position: relative;
  &-loading {
    position: absolute;
    width: 100%;
    height: 100%;
    ::v-deep {
      .c-loading-content__overlay {
        background-color: #ffffff5e;
      }
      .c-loading {
        width: 48px;
        height: 48px;
      }
    }
  }
}

.btn-base {
  @apply w-80 md:w-60 sm:w-36 h-12 sm:h-9 font-bold rounded-md;
}

.show-detail-btn-border {
  border: solid 1px #707070 !important;
}

.btn-disable {
  background-color: #cdcdcd;
  color: white;
  pointer-events: none;
}
</style>
