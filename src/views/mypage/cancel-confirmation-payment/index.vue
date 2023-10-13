<template>
  <section class="p-mypage-coupons">
    <div class="right-content">
      <div class="p-mypage-benepo__textLink__left">
        <a @click="handleBack" class="c-text-button c-text-button--left">
          <Icon name="arrow_left" :color="$colors.brand.red" />
          お申し込み情報詳細に戻る
        </a>
      </div>
      <div class="c-card">
        <div class="c-card__inner">
          <div class="c-box m-4 mr-0">
            <div class="ml-6 mr-6">
              <div class="main-top flex flex-wrap">
                <div class="main-top-left">
                  <div class="item" v-if="acptDatetime">
                    <span class="date-time">申込日：{{ acptDatetime }}</span>
                  </div>
                  <div class="item">
                    <span class="date-time">受付番号： {{ acptNo }}</span>
                  </div>
                </div>
                <div class="main-top-right" v-if="reserveSts === CONST.RESERVE_STS.CANCELED">
                  <div class="label label-grey-200">
                    手配状況：キャンセル済み
                  </div>
                </div>
                <div class="main-top-right" v-if="reserveSts !== CONST.RESERVE_STS.CANCELED">
                  <div class="label label-grey-200">
                    手配状況：成立 手配完了
                  </div>
                  <div class="label label-grey-200" v-if="statusOrder">
                    {{ statusOrder }}
                  </div>
                </div>
              </div>
              <ItemOrder v-bind="dataItem" />
              <div>
                <SectionContentTitle
                  :lineType="lineType.vertical"
                  :titleContent="titleContent[0]"
                />
                <div class="box-content">
                  <p>
                    {{ planNm }}
                  </p>
                </div>
              </div>
              <div>
                <SectionContentTitle
                  :lineType="lineType.vertical"
                  :titleContent="titleContent[1]"
                />
                <div class="box-content">
                  <div class="style-div">
                    <span class="title">宿泊期間</span>
                    <span class="results">
                      {{ useDate }}
                      <span class="tm-date" v-if="useDate && endDate">〜</span>
                      {{ endDate }}
                    </span>
                  </div>
                  <div class="style-div">
                    <span class="title">宿泊代表者名</span>
                    <span class="results" wovn-ignore>{{ fullName }}</span>
                  </div>
                  <div class="style-div">
                    <span class="title">部屋数</span>
                    <span class="results">{{ roomCount }}</span>
                  </div>
                </div>
              </div>
              <div>
                <SectionContentTitle
                  v-if="cancelAmt > 0"
                  :lineType="lineType.vertical"
                  :titleContent="titleContent[2]"
                />
                <div v-if="cancelAmt > 0">
                  <span class="font-bold pr-5">支払方法</span>
                  <a-select
                    class="pr-5"
                    default-value="10"
                    style="width: 180px;"
                    @change="handleChange"
                  >
                    <a-select-option value="10">
                      銀行
                    </a-select-option>
                    <a-select-option value="20">
                      クレジットカード
                    </a-select-option>
                  </a-select>
                </div>
                <div class="box-content hidden">
                  <div class="style-div">
                    <span class="title pt-2">決済なし・現地決済</span>
                    <span class="results pt-2" wovn-ignore>AMEX</span>
                    <div class="card flex justify-between">
                      <span class="results pt-2 " wovn-ignore>***********8100 06/2024</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="confirm mt-6">
                <span class="confirm-title"
                  >こちらのお申し込みをキャンセルしてもよろしいでしょうか？
                </span>
                <span class="value"
                  >キャンセルポリシーをご確認ください<span class="value">{{
                    cancelAmt | formatInteger
                  }}</span
                  >円</span
                >
              </div>
            </div>
            <div class="divider mt-16"></div>
            <div class="mt-8 pb-8 w-full text-center">
              <div class="bottom-content mb-2">
                <button class="c-btn btn-grey" @click="handleNext">
                  <span class="pal par">お申し込みをキャンセルする</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      mypageDisplayCode: '',
      orderDetail: null,
      acptDatetime: null,
      acptNo: null,
      acptDtlNo: null,
      planNm: null,
      useDate: "",
      endDate: "",
      fullName: "",
      roomCount: null,
      reserveSts: "",
      menuNm: null,
      feeCancel: 10,
      cancelPolicy: null,
      cancelChrDiv: null,
      memberChrgTotalAll: 0,
      tieupChrgTotalAll: 0,
      boneSbsidChrgTotalAll: 0,
      payMethod: "10",
      cancelChrgRate: "0",
      cancelCharge: null,
      useHeadCnt: 1,
      cancelChrgUnit: 0,
      nightCnt: 0,
      cancelAmt: 0,
      stayPlanCancelPrticKey: null,
      stayCancelAcptPrticList: [],
      titleContent: ["プラン名", "ご宿泊期間", "支払方法"],
      lineType: { horizontal: "h-line", vertical: "v-line" },
      breadcrumb_data: [
        "トップ",
        "マイページ",
        "お申し込み一覧",
        "お申し込み情報詳細",
        "お申し込みキャンセル（内容確認）"
      ],
      dataItem: {
        type: "type-small-1",
        icon: "icon icon-bor-phone-call",
        label: "",
        menu_id: "",
        title3: "",
        phone: "",
        text: ""
      },
      navBars: [
        { path: "/mypage", name: "マイページトップ" },
        { type: "divider" },
        { path: "/mypage/benepo-history", name: "総保有ベネポ・ベネポ履歴" },
        { path: "/mypage/benepo-collect", name: "獲得予定のベネポ" },
        { type: "divider" },
        { path: "/mypage/coupons", name: "専用ポイント・補助クーポン" },
        { type: "divider" },
        { path: "bs-myp-02-001", name: "マイクーポン" },
        { path: "bs-myp-02-010", name: "過去のクーポン" },
        { type: "divider" },
        { path: "/mypage/orders", name: "お申し込み履歴" },
        { path: "", name: "給トク払いご利用履歴", icon: "icon-bor-copy" },
        { type: "divider" },
        { path: "/mypage/visits", name: "閲覧履歴" },
        { type: "divider" },
        { path: "/mypage/favorites", name: "お気に入りメニュー" },
        { type: "divider" },
        {
          path: "/mypage/setting",
          name: "会員プロフィール",
          icon: "icon-bor-copy"
        },
        { path: "", name: "メール受信・通知", icon: "icon-bor-copy" },
        { path: "", name: "クレジットカード", icon: "icon-bor-copy" },
        { type: "divider" },
        { path: "", name: "家族アカウント管理", icon: "icon-bor-copy" },
        { type: "divider" },
        { path: "", name: "ログアウト", icon: "icon icon-bor-logout" }
      ]
    };
  },
  created() {},
  async mounted() {
    this.$meta.setDocumentTitle("お申し込みキャンセル（内容確認）");
    this.$page.showSideMenu = false;
    this.setBreadcrumb();

    // if (this.loggedIn) {
    //   this.getOrderBasicInfo()
    // } else {
    //   const params = {
    //     loggin: 1
    //   }
    //   this.$router.push({path: '/', query: params})
    // }
  },
  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    loggedIn() {
      return this.$auth.loggedIn;
    },
    getOrderInfo() {
      return _.cloneDeep(
        _.get(this.$store.state, "order_old.bs_myp_05_040", null)
      );
    }
  },
  methods: {
    getOrderBasicInfo() {
      const data = this.getOrderInfo;
      if (data !== null) {
        this.orderDetail = _.get(data, "orderDetail", "");
        this.acptDatetime = _.get(data, "acptDatetime", "");
        this.acptNo = _.get(data, "acptNo", "");
        this.acptDtlNo = _.get(data, "acptDtlNo", "");
        this.dataItem = _.get(data, "dataItem", "");
        this.planNm = _.get(data, "planNm", "");
        this.roomCount = _.get(data, "roomCount", "");
        this.useDate = _.get(data, "useDate", "");
        this.endDate = _.get(data, "endDate", "");
        this.fullName = _.get(data, "fullName", "");
        this.reserveSts = _.get(data, "reserveSts", "");
        this.statusOrder = _.get(data, "statusOrder", "");
        this.menuNm = _.get(data, "menuNm", "");
        this.memberChrgTotal = _.get(
          this.orderDetail,
          "orderStayDetail.acptDtlList[0].dtlChrgTotal.memberChrgTotal",
          ""
        );
        this.tieupChrgTotal = _.get(
          this.orderDetail,
          "orderStayDetail.acptDtlList[0].dtlChrgTotal.tieupChrgTotal",
          ""
        );
        this.boneSbsidChrgTotal = _.get(
          this.orderDetail,
          "orderStayDetail.acptDtlList[0].dtlChrgTotal.boneSbsidChrgTotal",
          ""
        );
        this.billAmtTotal = _.get(data, "billAmtTotal", "");
        this.$repositories("order")
          .getCanclePolicy(this.acptNo)
          .then(
            (response) => {
              if (response) {
                this.cancelPolicy = response;
                this.nightCnt = _.get(
                  this.orderDetail,
                  "orderStayDetail.acptDtlList[0].stayAcptDtl.nightCnt",
                  1
                );
                const useDate = moment(
                  _.get(
                    this.orderDetail,
                    "orderStayDetail.acptDtlList[0].acptDtl.useDate",
                    ""
                  )
                ).format("DD");
                const currDate = moment().format("DD");
                // const aboutDayEnd = _.get(response, 'stayPlanCancelList[0].stayPlanCancelPrticList[0].cancelPolicyEndDay', 0)
                // const aboutDayBegin = _.get(response, 'stayPlanCancelList[0].stayPlanCancelPrticList[0].cancelPolicySttDay', 0)
                // if((useDate - currDate) >= +aboutDayEnd && (useDate - currDate) <= +aboutDayBegin) {
                //   const noneContactFlag =  _.get(response, 'stayPlanCancelList[0].stayPlanCancelPrticList[0].noneContactFlag', 0)
                //   if(noneContactFlag === '0') {
                //     this.cancelChrgRate = +(_.get(response, 'stayPlanCancelList[0].stayPlanCancelPrticList[0].cancelChargeRate', 0))
                //     this.cancelChrDiv = +(_.get(response, 'stayPlanCancelList[0].stayPlanCancelPrticList[0].cancelChargeDiv', null))
                //   }
                //   this.stayPlanCancelPrticKey = _.get(response, 'stayPlanCancelList[0].stayPlanCancelPrticList[0].stayPlanCancelPrticKey', '')
                //   this.cancelCharge = +(_.get(response, 'stayPlanCancelList[0].stayPlanCancelPrticList[0].cancelCharge', null))
                // } else if ((useDate - currDate) === 0) {
                //   const noneContactFlag1 = _.get(response, 'stayPlanCancelList[0].stayPlanCancelPrticList[1].noneContactFlag', 0)
                //   if(noneContactFlag1 === '0') {
                //     this.cancelChrgRate = +(_.get(response, 'stayPlanCancelList[0].stayPlanCancelPrticList[1].cancelChargeRate', 0))
                //     this.cancelChrDiv = +(_.get(response, 'stayPlanCancelList[0].stayPlanCancelPrticList[1].cancelChargeDiv', null))
                //   }
                //   this.stayPlanCancelPrticKey = _.get(response, 'stayPlanCancelList[0].stayPlanCancelPrticList[1].stayPlanCancelPrticKey', '')
                //   this.cancelCharge = +(_.get(response, 'stayPlanCancelList[0].stayPlanCancelPrticList[1].cancelCharge', null))
                // }
                const stayPlanCancelPrticList = _.get(
                  response,
                  "stayPlanCancelList[0].stayPlanCancelPrticList",
                  null
                );
                console.log("stayPlanCellIst", stayPlanCancelPrticList);
                if (stayPlanCancelPrticList) {
                  let flag = 0;
                  for (
                    let index = 0;
                    index < stayPlanCancelPrticList.length;
                    index++
                  ) {
                    const element = stayPlanCancelPrticList[index];
                    const dayEnd = _.get(element, "cancelPolicyEndDay", 0);
                    const dayBegin = _.get(element, "cancelPolicySttDay", 0);
                    if (
                      useDate - currDate >= +dayEnd &&
                      useDate - currDate <= dayBegin
                    ) {
                      const noneContactFlag = _.get(
                        element,
                        "noneContactFlag",
                        null
                      );
                      if (+noneContactFlag === 0) {
                        flag = flag + 1;
                        this.cancelChrgRate = +_.get(
                          element,
                          "cancelChargeRate",
                          0
                        );
                        this.cancelCharge = +_.get(
                          element,
                          "cancelCharge",
                          null
                        );
                        this.cancelChrDiv = +_.get(
                          element,
                          "cancelChargeDiv",
                          null
                        );
                        this.stayPlanCancelPrticKey = _.get(
                          element,
                          "stayPlanCancelPrticKey",
                          ""
                        );
                      }
                    }
                    if (flag > 0) {
                      break;
                    }
                  }
                }
                if (+this.cancelCharge > 0) {
                  this.useHeadCnt = +_.get(
                    this.orderDetail,
                    "orderStayDetail.acptDtlList[0].acptDtl.useHeadCnt",
                    1
                  );
                  this.cancelChrgUnit = +(
                    this.cancelCharge /
                    this.useHeadCnt /
                    this.nightCnt
                  );
                  this.cancelChrgRate = 0;
                }
                this.cancelAmt =
                  (this.memberChrgTotal * this.cancelChrgRate) / 100
                    ? (this.memberChrgTotal * this.cancelChrgRate) / 100
                    : this.cancelCharge
                    ? this.cancelCharge
                    : 0;
              }
              this.getInfoChrgRoom(_.get(data, "orderDetail", ""));
            },
            (error) => {
              this.$toasted.error(error?.message);
            }
          );
      }
    },
    handleBack() {
      const query = this.$route.query;
      const menuNo = this.$route.query.menuNo;
      this.$router.push({ path: `/mypage/orders/${menuNo}`, query });
    },
    handleNext() {
      this.showConfirm();
    },
    handleChange($event) {
      this.payMethod = $event;
    },
    getInfoChrgRoom(data) {
      this.stayCancelAcptPrticList = [];

      const useAgeDiv = _.get(
        data,
        "orderStayDetail.acptDtlList[0].acptDtl.usageDiv",
        ""
      );
      const acptPrticList = _.get(
        data,
        "orderStayDetail.acptDtlList[0].acptPrticList",
        ""
      );
      if (acptPrticList) {
        acptPrticList.forEach((ele1) => {
          const acptPrticNoEle = _.get(ele1, "acptPrtic.acptPrticNo", "");
          const aloctRoomEle = _.get(ele1, "stayPrtic.aloctRoom", "");
          const roomIdEle = _.get(ele1, "stayPrtic.roomId", "");
          const stayRoomDayPrticList = _.get(ele1, "stayRoomDayPrticList", "");
          if (stayRoomDayPrticList) {
            stayRoomDayPrticList.forEach((ele2) => {
              const stayRoomDayPrtic = _.get(ele2, "stayRoomDayPrtic", "");
              let chrgTotal = {};
              if (stayRoomDayPrtic) {
                const memberChrgChildTotal =
                  _.get(stayRoomDayPrtic, "chldaMemberChrgSubtl", null) +
                  _.get(stayRoomDayPrtic, "chldbMemberChrgSubtl", null) +
                  _.get(stayRoomDayPrtic, "chldcMemberChrgSubtl", null) +
                  _.get(stayRoomDayPrtic, "chlddMemberChrgSubtl", null) +
                  _.get(stayRoomDayPrtic, "chldeMemberChrgSubtl", null) +
                  _.get(stayRoomDayPrtic, "chldfMemberChrgSubtl", null);
                const boneSbsidChrgChildTotal =
                  _.get(stayRoomDayPrtic, "chldaBoneSbsidChrgSubtl", null) +
                  _.get(stayRoomDayPrtic, "chldbBoneSbsidChrgSubtl", null) +
                  _.get(stayRoomDayPrtic, "chldcBoneSbsidChrgSubtl", null) +
                  _.get(stayRoomDayPrtic, "chlddBoneSbsidChrgSubtl", null) +
                  _.get(stayRoomDayPrtic, "chldeBoneSbsidChrgSubtl", null) +
                  _.get(stayRoomDayPrtic, "chldfBoneSbsidChrgSubtl", null);
                let memberChrgTotal =
                  _.get(stayRoomDayPrtic, "adultMemberChrgSubtl", null) +
                  memberChrgChildTotal;
                if (!memberChrgTotal) {
                  memberChrgTotal = _.get(
                    stayRoomDayPrtic,
                    "roomMemberChrgSubtl",
                    0
                  );
                }
                let boneSbsidChrgTotal =
                  _.get(stayRoomDayPrtic, "adultBoneSbsidChrgSubtl", 0) +
                  boneSbsidChrgChildTotal;
                if (!boneSbsidChrgTotal) {
                  boneSbsidChrgTotal = _.get(
                    stayRoomDayPrtic,
                    "roomBoneSbsidChrgSubtl",
                    0
                  );
                }
                const tieupChrgTotal = +memberChrgTotal + boneSbsidChrgTotal;
                const headCnt =
                  +_.get(stayRoomDayPrtic, "adultTotalHeadCnt", 0) +
                  _.get(stayRoomDayPrtic, "vistrAdultTotalHeadCnt", 0) +
                  _.get(stayRoomDayPrtic, "chldHeadCnt", 0) +
                  _.get(stayRoomDayPrtic, "vistrChldHeadCnt", 0);

                const cancelChrgUnitT =
                  (+memberChrgTotal * this.cancelChrgRate) / 100 / headCnt;
                const cancelChrgSubtlT =
                  (+memberChrgTotal * this.cancelChrgRate) / 100;
                const cancelSbsidT =
                  (+tieupChrgTotal * this.cancelChrgRate) / 100 -
                  (+memberChrgTotal * this.cancelChrgRate) / 100;
                const tieupCancelChrgUniT =
                  (+tieupChrgTotal * this.cancelChrgRate) / 100 / headCnt;
                const tieupCancelChrgSubtl =
                  (+tieupChrgTotal * this.cancelChrgRate) / 100;

                chrgTotal = {
                  acptPrticNo: acptPrticNoEle,
                  aloctRoom: aloctRoomEle,
                  roomId: roomIdEle,
                  stayDay: _.get(stayRoomDayPrtic, "stayDay", ""),
                  ageDiv: useAgeDiv,
                  vistrFlag: _.get(stayRoomDayPrtic, "vistrFlag", ""),
                  cancelHeadCnt: headCnt,
                  cancelChrgUnit: cancelChrgUnitT
                    ? cancelChrgUnitT
                    : this.cancelChrgUnit,
                  cancelChrgSubtl: cancelChrgSubtlT
                    ? cancelChrgSubtlT
                    : this.cancelChrgUnit * headCnt,
                  cancelSbsid: cancelSbsidT ? cancelSbsidT : 0,
                  tieupCancelChrgUnit: tieupCancelChrgUniT
                    ? tieupCancelChrgUniT
                    : this.cancelChrgUnit,
                  tieupCancelChrgSubtl: tieupCancelChrgSubtl
                    ? tieupCancelChrgSubtl
                    : this.cancelChrgUnit * headCnt
                };
              }
              this.stayCancelAcptPrticList.push(chrgTotal);
            });
          }
        });
      }
    },
    showConfirm() {
      const context = this;
      this.$confirm({
        title: "オーダーをキャンセルします。よろしいでしょうか。",
        content: "",
        onOk() {
          context.checkFeeCancel();
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log(""));
        },
        onCancel() {}
      });
    },
    checkFeeCancel() {
      const orderInfo = this.getOrderInfo;
      const orderDetail = this.orderDetail;
      const cancelPolicy = this.cancelPolicy;
      let dateDiff = moment(
        _.get(orderDetail, "orderStayDetail.acptDtlList[0].acptDtl.useDate", "")
      ).diff(moment(), "days");
      if (
        !moment(_.get(this.cardObj, "useDate", "")).isSame(new Date(), "day")
      ) {
        dateDiff = dateDiff + 1;
      }
      const data = {
        totalAmt: _.get(orderInfo, "totalAmt", null),
        billAmtTotal: _.get(orderInfo, "billAmtTotal", null),
        boneBillAmtTotal: _.get(orderInfo, "boneBillAmtTotal", null),
        setlSts: _.get(orderInfo, "setlSts", null),
        rciptReqrdFlag: null,
        rciptAddrNm: null,
        acptRomDtl: {
          romSchAmt:
            (this.memberChrgTotal * this.cancelChrgRate) / 100
              ? (this.memberChrgTotal * this.cancelChrgRate) / 100
              : this.cancelCharge
              ? this.cancelCharge
              : 0,
          payMethod: this.payMethod,
          creditCardExpirYm: null,
          romSts: "1",
          setlSystem: null,
          setlTrnId: null
        },
        acptDtlDomesticStayCancelList: [
          {
            dtlChrgTotal: {
              acptDtlNo: _.get(
                orderDetail,
                "orderStayDetail.acptDtlList[0].acptDtl.acptDtlNo",
                ""
              ),
              cancelAmt:
                (this.memberChrgTotal * this.cancelChrgRate) / 100
                  ? (this.memberChrgTotal * this.cancelChrgRate) / 100
                  : this.cancelCharge
                  ? this.cancelCharge
                  : 0,
              tieupCancelAmt:
                (this.tieupChrgTotal * this.cancelChrgRate) / 100
                  ? (this.tieupChrgTotal * this.cancelChrgRate) / 100
                  : this.cancelCharge
                  ? this.cancelCharge
                  : 0,
              cancelSbsidTotal:
                (this.boneSbsidChrgTotal * this.cancelChrgRate) / 100
                  ? (this.boneSbsidChrgTotal * this.cancelChrgRate) / 100
                  : "0"
            },
            ccCancelPolicyList: [
              {
                stayPlanCancelPrticKey: this.stayPlanCancelPrticKey,
                cancelPolicyDays: dateDiff,
                cancelChrgOccurDate: moment().format("YYYY-MM-DD"),
                cancelChrgDiv: _.get(
                  cancelPolicy,
                  "stayPlanCancelList[0].stayPlanCancelPrticList[0].cancelChargeDiv",
                  null
                ),
                cancelChargeBaseValue:
                  +this.cancelChrDiv === 0
                    ? this.cancelChrgRate
                    : +this.cancelChrDiv === 1
                    ? this.cancelCharge
                    : null,
                stayCancelAcptPrticList: this.stayCancelAcptPrticList
              }
            ]
          }
        ]
      };
      data.acptNo = this.acptNo;
      this.$store.commit("order/setOrderCancel", data);
      if (this.cancelAmt > 0) {
        this.handlePayment();
      } else {
        this.handleCancelOrder(data);
      }
    },
    handlePayment() {
      this.$repositories("orders")
        .putPay({
          menuNm: this.menuNm,
          billingAmount: this.cancelAmt
        })
        .then(
          (response) => {
            if (response) {
              if (process.env.VUE_APP_DEV_MODE !== this.CONST.ENV.LOCAL) {
                location.href = `${process.env.VUE_APP_URL_PAYMENT_GATEWAY}${response}`;
              } else {
                this.$router.push({
                  path: "/mypage/cancel-confirmation-payment/loading",
                  query: {
                    param:
                      "1G26a0BWFO0mug0e82DeCW74TUzQquDhSYY7v7ha6Nl%2FLeFDxSFiMqjQ8I4J%2F%2BsYvB5V92jFkpMuqGp0z42NN9IzQQe86Jq4FRU1a9ebQuo8Tza0k0KSxyK7TUXliFEtxQoPqxObpWzvUxuBYxvuM3ofP%2FO47Q5IszsSs%2FJ%2FIYGQsXRM1YcxdlG26TDNOamxtUyQmMLGJbmtpnavcosnFNeMK%2F%2BpDgjJZD6TMfqiqJZk9d%2FzEA%2FrHEy94nT46dPEpRALW2sTMpDPed5ytcextw%3D%3D"
                  }
                });
              }
            }
          },
          /* eslint-disable no-unused-vars */
          (error) => {
            this.$toasted.error("エラーが発生しました");
          }
        );
    },
    handleCancelOrder(data) {
      this.$store.dispatch(CANCEL_ORDER, data).then(
        (response) => {
          console.log("-------> response", response);
          const cancelNo = response.cancelNo?.[0] || '';
          this.$store.dispatch(SAVE_CANCEL_NO, cancelNo);
          this.$toasted.success("オーダーがキャンセルされました。");

          const query = this.$route.query;
          // キャンセル完了画面のリロードで キャンセル番号を表示する為に、パラメータ付与
          query.cancelNo = cancelNo;

          this.$router.push({ path: "/mypage/cancel-complete", query });
        },
        (err) => {
          const error = err.error;
          this.$toasted.error(error && error.message ? error.message : error);
        }
      );
    },

    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("お申し込み一覧", "/mypage/orders")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("お申し込み情報詳細", "/mypage/orders")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb(
          "お申し込みキャンセル（内容確認）",
          "/mypage/cancel-confirmation-information"
        )
      );
    }
  },
  watch: {
    $route() {
      this.setBreadcrumb();
    }
  }
};
</script>
