<template>
  <div class="p-mypage-order-detail-l-container p-mypage-order-detail-l-container-extend">
    <div class="p-mypage-order-detail">
      <div class="right-container">
        <div class="box-right box-right-extend">
          <template v-if="isIcService(mypageDisplayCode)">
            <CardMenuIC
              @gotoMap="scrollToMap($event)"
              class="card-menu"
              :cardObj="cardObj"
              :dataMail="dataMail"
              :isShowBtnPublicStay="isShowBtnPublicStay"
              v-model="applicationDetail"
            />
          </template>
          <template v-else-if="isGCService(mypageDisplayCode)">
            <CardMenuGC
              @gotoMap="scrollToMap($event)"
              class="card-menu"
              :cardObj="cardObj"
              :dataMail="dataMail"
              :extSystemCd="menuBasicInfo&&menuBasicInfo.extSystemCd"
              v-model="applicationDetail"
              :reserveSetting="reserveSetting"
              :cancelPolicy="cancelPolicyGC"
              :isShowBtnCancel="isShowBtnCancel"
            />
          </template>
          <template v-else>
            <CardMenu
              :mypageBoCode="mypageBoCode"
              :mypageDisplayCode="mypageDisplayCode"
              @gotoMap="scrollToMap($event)"
              class="card-menu"
              :cardObj="cardObj"
              :dataMail="dataMail"
              :isShowBtnPublicStay="isShowBtnPublicStay"
              :extSystemCd="menuBasicInfo&&menuBasicInfo.extSystemCd"
              v-model="applicationDetail"
            />
          </template>
          <!-- お申し込み情報 -->
          <!-- お申し込み情報(物販) -->
          <template v-if="isIcService(mypageDisplayCode)">
            <ApplicationDetailsIC v-model="applicationDetail" :mypageDisplayCode="mypageDisplayCode" :customerInfo="customerInfo"/>
          </template>
          <template v-else-if="cardObj.srvicDiv == CONST.SRVIC_DIV.MAIL_ORDER">
            <ApplicationDetailsShop v-model="applicationDetail" :mypageDisplayCode="mypageDisplayCode" />
          </template>
          <template v-else-if="isGCService(mypageDisplayCode)">
            <ApplicationDetailsGC 
              v-model="applicationDetail" 
              :mypageDisplayCode="mypageDisplayCode" 
              :customerInfo="customerInfo"
              :grmAcptDtl="grmAcptDtl"
              :grmacptPrticList="grmacptPrticList"
            />
          </template>
          <template v-else>
            <ApplicationDetails v-model="applicationDetail" :mypageDisplayCode="mypageDisplayCode" />
          </template>
          <!-- 店舗からのご連絡事項 GCのみ-->
          <div v-if="isGCService(mypageDisplayCode)">
            <QuestionsFromShopDataGC :grmQstnReplyList="grmQstnReplyList" :grmPlanPrtic="grmPlanPrtic" />
          </div>
          <!-- 申込者情報 -->
          <div v-if="!isPlanDb && !isGCService(mypageDisplayCode)">
            <ApplicantInfor :customerInfo="customerInfo" :mypageDisplayCode="mypageDisplayCode" />
          </div>
          <!-- 送り主情報 -->
          <template v-if="cardObj.srvicDiv == CONST.SRVIC_DIV.MAIL_ORDER">
            <SenderInfomation :senderInfo="senderInfo" />
          </template>

          <!-- 配送先情報 -->
          <div v-if="shippingDisplayFlg">
            <ShippingInfomation :shippingInfo="shippingDetail" :srvicDiv="srvicDiv" :shippingInfoListForShop="shippingInfoListForShop" />
          </div>

          <!-- 支払情報及びキャンセル規約。国内宿泊以外の宿泊は表示しない -->
          <template v-if="!isPublicStay">

            <div class="divider -mx-10 lg:-mx-3 mb-8 md:mb-6" />

            <template v-if="isIcService(mypageDisplayCode)">
              <PaymentInforIC
                :mypageBoCode="mypageBoCode"
                :paymentInfo="paymentInfo"
                :cancelPolicy="cancelPolicy"
                :couponUsedDetail="couponUsedDetail"
                :applicationDetail="applicationDetail"
                :cardObj="cardObj"
              />
            </template>
            <template v-else-if="isGCService(mypageDisplayCode)">
              <PaymentInforGC
                :paymentInfo="paymentInfo"
                :cancelPolicy="cancelPolicyGC"
                :couponUsedDetail="couponUsedDetail"
                :applicationDetail="applicationDetail"
                :cardObj="cardObj"
                :menuNo="menuNo"
                :planId="planId"
              />
            </template>
            <template v-else-if="cardObj.srvicDiv == CONST.SRVIC_DIV.MAIL_ORDER">
              <PaymentInforShop
                :mypageBoCode="mypageBoCode"
                :paymentInfo="paymentInfo"
                :cancelPolicy="cancelPolicy"
                :couponUsedDetail="couponUsedDetail"
                :applicationDetail="applicationDetail"
                :cardObj="cardObj"
              />
            </template>
            <template v-else>
              <PaymentInfor
                :mypageBoCode="mypageBoCode"
                :paymentInfo="paymentInfo"
                :cancelPolicy="cancelPolicy"
                :couponUsedDetail="couponUsedDetail"
                :applicationDetail="applicationDetail"
                :cardObj="cardObj"
              />
            </template>
          </template>
        </div>

        <div
          class="meta-item-back ml-2 mt-4 text-sm cursor-pointer"
          @click="gotoPath"
        >
          <Icon name="arrow_left" color="red" />
          <a class="back-link">お申込み履歴一覧に戻る</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";
import { RELATIONSHIP_AVAILABLES } from "@/repositories/mock/mockdata/relationship.js";
import { COUPON_AGE_TYPE, COUPON_PRICE_TYPE } from "@/constants/coupon";

export default {
  props: {
    mypageBoCode: {
      type: String
    },
    mypageDisplayCode: {
      type: String
    },
  },
  data() {
    return {
      orderStayDetail: null,
      acptNo: "",
      menuNo: "",
      planId: "",
      roomId: "",
      companyCd: "",
      imageUrl: "",
      useDate: "",
      endDate: "",
      totalAmt: "",
      cafeAmtTotal: "",
      pointUse: "",
      isShowBtnPublicStay: false,
      rpsntFamilyNmKana: "",
      rpsntFirstNmKana: "",
      resrvFamilyNmKana: "",
      resrvFirstNmKana: "",
      fullName: "",
      billAmtTotal: null,
      billAmtTotalPstgIn: null,
      taxAmtTotal: null,
      pstg: null,
      pstgTaxAmtTotal: null,
      cancelPolicy: {},
      cancelPolicyGC: null,
      isShowBtnCancel: true,
      pointGrntNumAmt: null,
      isPublicStay: false,
      srvicDiv: null,
      applicationDetail: {
        acptDtlNo: null,
        planNm: null,
        planLeadCopy: null,
        pointGrntNumAmt: null,
        useDate: null,
        endDate: null,
        fullName: null,
        acptDatetime: null,
        acptDatetime2: null,
        totalAmt: null,
        pstg: null,
        nightCnt: null,
        roomCnt: null,
        totalPeople: null,
        priceRemarks: null,
        cautContList: [],
        memberBenefits: [],
        payType: null,
        totalAdult: null,
        totalChild: null,
        checkInTm: null,
        cponStartDatetime: null,
        cponEndDatetime: null,
        shoppingGuideVal: null,
        shoppingGuideCancelRuleVal: null,
        usePoint: null,
        exchangeToPoint: null,
        acptLifeAnswerList: [],
        stayPlanQstnReplyList: [],
        qstn: null,
        replyRem: null,
        noteWhenApply: null,
        benefitImportantPoints: null,
        companyCd: null,
        pointUseCd: null,
        usageDiv: null,
      },
      dataMail: {
        menuNo: null,
        menuNm: null,
        planId: null,
        planNm: null,
        catSmlClassCd: null,
        catMidClassCd: null,
        catLrgClassCd: null,
        catExlClassCd: null,
        roomId: null,
        memberName: null,
        typeShare: null,
        menuStartDatetime: null,
        menuEndDatetime: null,
        planStartDatetime: null,
        planEndDatetime: null,
        url: null
      },
      cardObj: {
        acptNo: null,
        acptDtlNo: null,
        acptDatetime: null,
        menuNo: null,
        menuNm: null,
        menuBasicInfo: {},
        billAmtTotal: null,
        billAmtTotalPstgIn: null,
        pointGrntNumAmt: null,
        reserveSts: null,
        dtlSts: null,
        romSts: null,
        JudgeResult: null,
        arngeSts: null,
        payeeDiv: null,
        checkInDate: null,
        checkOutDate: null,
        cancelCloseUpDay: null,
        cancelCloseUpTime: null,
        webCancelAvailDiv: null,
        srvicDiv: null,
        location: {
          areaMidClassNm: "",
          areaSmlClassNm: ""
        },
        menuThumbnail: "",
        urlPath: "",
        cancelNo: null,
        lotteryInfo: null,
        lotteryResult: null,
        useDate: null,
        useTime: null,
        stayPlanCancelPrticList: null,
        pointGrntDate: null,
        cautContTitle: null,
        cautContCount: null
      },
      paymentInfo: {
        totalAmt: null,
        sbsidTotal: null,
        cafeAmtTotal: null,
        boneSbsidChrgTotal: null,
        pointUse: null,
        billAmtTotal: null,
        billAmtTotalPstgIn: null,
        taxAmtTotal: null,
        pstg: null,
        pstgTaxAmtTotal: null,
        endDate: null,
        pointGrntNumAmt: null,
        taxDiv: null,
        taxRate: null,
        shippingTaxRate: null
      },
      customerInfo: {
        emailAddress: null,
        postalCode: null,
        address1: null,
        address2: null,
        tel: null,
        familyName: null,
        firstName: null,
        prefectureCode: null,
        companyName: null
      },
      senderInfo: {
        prodSenderList: {
          familyNm: null,
          firstNm: null,
          familyNmKana: null,
          firstNmKana: null,
          zipCd: null,
          prefectureCd: null,
          addr1: null,
          addr2: null,
          tel: null
        }
      },
      couponUsedDetail: null,
      sbsidRsvList: [],
      dataProfile: null,
      repFullName: null,
      shippingInfoList: [],
      shippingInfoListForShop: [],
      shippingDetail: {
        acptDlvry: {
          acptDlvryKey: undefined,
          acptPrticKey: undefined,
          acptPrticNo: undefined,
          dlvryZipCd: undefined,
          dlvryPrefectureCd: undefined,
          dlvryPrefectureCdNm: undefined,
          dlvryAddr1: undefined,
          dlvryAddr2: undefined,
          dlvryAddrNm: undefined,
          dlvryTel: undefined,
          email: undefined,
          cnt: undefined
        },
        arnge: {
          arngeKey: undefined,
          orderTo: undefined,
          dlvryDatetime: undefined,
          dlvrySlipNo: undefined,
          arngeSts: undefined,
          arngeStsNm: undefined,
          arngeStsCancelRsn: undefined,
          ptDlvryDatetime: undefined,
          shipDatetime: undefined,
          shipCancelHndlDate: undefined,
          sendItemTypeDiv: undefined,
          sendItemTypeDivNm: undefined,
          sendWay: undefined,
          sendWayNm: undefined,
          dlvryCompanyNmDisp: undefined,
          trackingUrl: undefined
        },
        shippingFlag: undefined
      },
      shippingDisplayFlg: false,
      menuBasicInfo: null,
      reserveSetting: null,
      grmAcptDtl: null,
      grmQstnReplyList: null,
      grmPlanPrtic:null,
      grmacptPrticList:null,
    };
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn;
    },
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    isPlanDb(){
      return this.$route.query?.srvicDiv === this.CONST.SRVIC_DIV.TOURS
    },
    topDomain() {
      return this.getTopDomain(this.mypageDisplayCode);
    }
  },
  mounted() {
    this.setBreadcrumb();
    const { isPublicStay } = this.$route.query;
    this.isPublicStay = JSON.parse(isPublicStay);
    this.srvicDiv = this.$route.query.srvicDiv;
    this.menuNo = this.$route?.params?.id || '';
    if (isPublicStay === "true") {
      this.getOrderInfoPublicStay();
    } else {
      this.getOrderInfo();
    }
    this.$page.isTitle = true;
  },
  destroyed() {
    const fromListOrder = false;
  },
  methods: {
    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("申込履歴", "/mypage/orders")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("申込内容")
      );
    },
    scrollToMap(index) {
      switch (index) {
        case 1:
          this.$scrollTo("#OrderApplicationDetails");
          return;
        case 2:
          this.$scrollTo("#OrderPaymentInfor");
          return;
        case 3:
          this.$scrollTo("#OrderCancelInfor");
          return;
      }
    },
    getOrderInfoPublicStay() {
      const { acptNo } = this.$route.query;
      this.acptNo = acptNo;
      this.$repositories("orders")
        .getOrderInfoPublicStay(acptNo)
        .then(
          (response) => {
            const receivingMethod = _.get(
              response,
              "orderPublicStayDetail.acptDtlList[0].stayAcptDtl.usageGuideReceiptDiv",
              null
            );
            if (!(+receivingMethod > 0) && receivingMethod !== null) {
              this.isShowBtnPublicStay = true;
            }
            this.handleResponseDataPublicStay(response);
          },
          (error) => {
            this.$toasted.error(error?.message);
          }
        );
    },
    getOrderInfo() {
      const { acptNo, outsideResrvId } = this.$route.query;
      this.acptNo = acptNo;
      this.srvicDiv = this.$route.query.srvicDiv;

      if (this.srvicDiv.startsWith("A")) {
        this.$repositories("orders")
          .getOrderDetail(acptNo)
          .then(
            (response) => {
              this.handleResponseDataStay(response);
            },
            (error) => {}
          );
      } else if (this.srvicDiv === this.CONST.SRVIC_DIV.TOURS) {
        this.$repositories("orders").getMenuBasicInfo(this.menuNo).then(
          (response) => { 
            this.menuBasicInfo = response;
            const extSystemCd = response?.extSystemCd || '';
            this.$repositories("orders")
              .getOrderDetailDp(outsideResrvId, extSystemCd)
              .then(
                (responseDp) => {
                  this.handleResponseDataDp(responseDp, extSystemCd);
                  this.getShippingDetail();
                },
                (error) => {}
              );
            },
            (error) => {}
          );
      } else if (this.srvicDiv.startsWith("C")) {
        this.$repositories("orders")
          .getOrderDetailShop(acptNo)
          .then(
            (response) => {
              this.handleResponseDataShop(response);
              this.checkShowDelivery();
            },
            (error) => {}
          );
      } else if (this.isGCService(this.mypageDisplayCode)) {
        this.$repositories("orders")
          .getOrderDetailGC(acptNo)
          .then(
            (response) => {
              this.handleResponseData(response); // レスポンスに対する処理は、ライフと同じでOKの認識
              // グルメでは配送先、送料が存在しないので不要の認識
              // this.getShippingDetail();
              // this.checkShowDelivery();
            },
            (error) => {}
          );
      } else {
        this.$repositories("orders")
          .getOrderDetailLife(acptNo)
          .then(
            (response) => {
              this.handleResponseData(response);
              this.getShippingDetail();
              this.checkShowDelivery();
            },
            (error) => {}
          );
      }
    },
    async handleResponseDataShop(data) {
      if (data !== null) {
        // メニュー番号
        this.menuNo = _.get(
          data,
          "acpt.acptDtlList[0].menuBasicInfo.menuNo",
          ""
        );
        // プランID
        this.planId = _.get(
          data,
          "acpt.acptDtlList[0].planBasicInfo.planId",
          ""
        );
        // 取引先コード
        this.companyCd = _.get(
          data, 
          "acpt.customer.companyCd", 
          ""
        );
        // 請求金額合計
        this.billAmtTotal = _.get(
          data,
          "acpt.billAmtTotal",
          ""
        );
        // 請求金額合計_送料込
        this.billAmtTotalPstgIn = _.get(
          data,
          "acpt.billAmtTotalPstgIn",
          ""
        );
        // 送料
        this.pstg = _.get(
          data,
          "acpt.pstg",
          ""
        );
        // ポイント付与数総額
        this.pointGrntNumAmt = _.get(
          data,
          "acpt.pointGrntNumAmt",
          null
        );
        // 補助金予約
        this.sbsidRsvList = _.get(
          data,
          "acpt.acptDtlList[0].sbsidRsvList",
          []
        );
        // 受付日時
        const acptTm = _.get(data, "acpt.acptDatetime", null);
        // 申請補助金総額
        this.sbsidTotal = _.get(data, "acpt.aplySbsidAmt", "");
        // 申請カフェポイント総額
        this.cafeAmtTotal = _.get(data, "acpt.aplyCafePointAmt", "");
        // ポイント利用数総額
        this.pointUse = _.get(data, "acpt.pointUseNumAmt", "");
        // 合計金額(ご利用料金: お支払い金額 - 送料 + 各種割引額)
        this.totalAmt = _.get(data, "acpt.acptDtlList[0].dtlChrgTotal.billAmtTotal", 0)
          - _.get(data, "acpt.acptDtlList[0].dtlChrgTotal.pstg", 0) - _.get(data, "acpt.acptDtlList[0].dtlChrgTotal.pstgTaxAmtTotal", 0)
          + (this.sbsidTotal + this.cafeAmtTotal + this.pointUse);
        // 消費税合計金額
        this.taxAmtTotal = _.get(data, "acpt.acptDtlList[0].dtlChrgTotal.taxAmtTotal", "");
        // 消費税合計金額（送料）
        this.pstgTaxAmtTotal = _.get(data, "acpt.acptDtlList[0].dtlChrgTotal.pstgTaxAmtTotal", "");
        // B-one補助金合計
        this.boneSbsidChrgTotal = _.get(
          data,
          "acpt.acptDtlList[0].dtlChrgTotal.boneSbsidChrgTotal",
          ""
        );
        this.dataMail = {
          menuNo: _.get(
            data,
            "acpt.acptDtlList[0].menuBasicInfo.menuNo",
            null
          ),
          menuNm: _.get(
            data,
            "acpt.acptDtlList[0].menuBasicInfo.menuNm",
            null
          ),
          menuStartDatetime: _.get(
            data,
            "acpt.acptDtlList[0].menuBasicInfo.menuStartDatetime",
            null
          ),
          menuEndDatetime: _.get(
            data,
            "acpt.acptDtlList[0].menuBasicInfo.menuEndDatetime",
            null
          ),
          planNm: _.get(
            data,
            "acpt.acptDtlList[0].planBasicInfo.planNm",
            null
          ),
          planId: _.get(
            data,
            "acpt.acptDtlList[0].planBasicInfo.planId",
            null
          ),
          planStartDatetime: _.get(
            data,
            "acpt.acptDtlList[0].planBasicInfo.planStartDatetime",
            null
          ),
          planEndDatetime: _.get(
            data,
            "acpt.acptDtlList[0].planBasicInfo.planEndDatetime",
            null
          ),         
          catSmlClassCd: _.get(
            data,
            "acpt.acptDtlList[0].menuBasicInfo.catSmlClassNm",
            null
          ),
          catMidClassCd: _.get(
            data,
            "acpt.acptDtlList[0].menuBasicInfo.catMidClassNm",
            null
          ),
          catLrgClassCd: _.get(
            data,
            "acpt.acptDtlList[0].menuBasicInfo.catLrgClassNm",
            null
          ),
          catExlClassCd: null,
          memberName: null,
          typeShare: 2
        };
        this.cardObj = {
          acptNo: this.acptNo,
          acptDtlNo: _.get(
            data,
            "acpt.acptDtlList[0].acptDtlNo",
            ""
          ),
          acptDatetime: acptTm,
          menuNo: _.get(
            data,
            "acpt.acptDtlList[0].menuBasicInfo.menuNo",
            null
          ),
          menuNm: _.get(
            data,
            "acpt.acptDtlList[0].menuBasicInfo.menuNm",
            null
          ),
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pointGrntNumAmt: this.pointGrntNumAmt,
          dtlSts: _.get(
            data,
            "acpt.acptDtlList[0].dtlSts",
            null
          ),
          romSts: _.get(
            data,
            "acpt.acptRomTotal.acptRomDtlList[0].romSts",
            null
          ),
          JudgeResult: _.get(
            data,
            "acpt.acptDtlList[0].judgeResult",
            null
          ),
          arngeSts: _.get(
            data,
            "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.arngeSts",
            null
          ),
          lotteryResult: _.get(
            data,
            "acpt.acptDtlList[0].acptPrticList[0].prodSlsBenefit.lotteryResult",
            null
          ),
          payeeDiv: _.get(
            data,
            "acpt.acptDtlList[0].payeeDiv",
            null
          ),
          checkInDate: null,
          checkOutDate: null,
          webCancelAvailDiv: null,
          srvicDiv: _.get(
            data,
            "acpt.acptDtlList[0].srvicDiv",
            null
          ),
          cancelNo: _.get(
            data,
            "acpt.acptDtlList[0].cancelNo",
            ""
          ),
          useDate: moment(
            _.get(data, "acpt.acptDtlList[0].useDate", "")
          ).format("YYYY/MM/DD"),
          cautContTitle: _.get(
            data,
            "acpt.acptDtlList[0].cautContList[0].title",
            ""
          ),
          cautContCount: _.get(
            data,
            "acpt.acptDtlList[0].cautContList[0].cont",
            ""
          ),
          pointGrntDate: _.get(
            data,
            "acpt.acptDtlList[0].pointGrnt.pointGrntDate",
            ""
          )
            ? moment(
                _.get(
                  data,
                  "acpt.acptDtlList[0].pointGrnt.pointGrntDate",
                  ""
                )
              ).format("YYYY/MM/DD")
            : null
        };
        this.applicationDetail = {
          acptDtlNo: _.get(
            data,
            "acpt.acptDtlList[0].acptDtlNo",
            ""
          ),
          planNm: _.get(
            data,
            "acpt.acptDtlList[0].menuBasicInfo.catchPhrase",
            null
          ),
          planLeadCopy: _.get(
            data,
            "acpt.acptDtlList[0].menuBasicInfo.leadCopy",
            null
          ),
          pointGrntNumAmt: this.pointGrntNumAmt,
          useDate: _.get(
            data,
            "acpt.acptDtlList[0].useDate",
            null
          ),
          endDate: this.endDate,
          fullName: this.fullName,
          repFullName: this.repFullName,
          outsideSysCd: _.get(
            data,
            "acpt.acptDtlList[0].menuBasicInfo.outsideSysCd",
            null
          ),
          totalPeople: _.get(
            data,
            "acpt.acptDtlList[0].useHeadCnt",
            null
          ),
          acptDatetime: acptTm
            ? moment(acptTm).format("YYYY/MM/DD HH:mm")
            : null,
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pstg: this.pstg,
          qstn: _.get(
            data,
            "acpt.acptDtlList[0].prodSlsMenuQstnReplyList[0].qstn",
            null
          ),
          replyRem: _.get(
            data,
            "acpt.acptDtlList[0].prodSlsMenuQstnReplyList[0].replyRem",
            null
          ),
          priceRemarks: _.get(
            data,
            "acpt.acptDtlList[0].cautContList[0].cont",
            null
          ),
          acptDatetime2: moment(
            _.get(data, "acpt.acptDatetime", "")
          ).format("YYYY-MM-DD"),
          companyCd: _.get(
            data,
            "acpt.customer.companyCd",
            null
          ),
          pointUseCd: _.get(
            data,
            "acpt.pointUseCd",
            null
          )
        };
        const taxRateArray = await this.getMenuPlanShop();
        this.shippingDisplayFlg = true;
        this.paymentInfo = {
          totalAmt: this.totalAmt,
          sbsidTotal: this.sbsidTotal,
          boneSbsidChrgTotal: this.boneSbsidChrgTotal,
          cafeAmtTotal: this.cafeAmtTotal,
          pointUse: this.pointUse,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          billAmtTotal: this.billAmtTotal,
          taxAmtTotal: this.taxAmtTotal,
          pstg: this.pstg,
          pstgTaxAmtTotal: this.pstgTaxAmtTotal,
          endDate: this.endDate,
          pointGrntNumAmt: this.pointGrntNumAmt,
          taxDiv: _.get(data, "acpt.acptDtlList[0].prodSlsPlanPrtic.taxDiv", null),
          taxRate: taxRateArray[0],
          shippingTaxRate: taxRateArray[1],
          shippingFeeTaxDiv: taxRateArray[2],
          payMethod: _.get(data,"acpt.acptDtlList[0].payMethod",null)
        };
        this.customerInfo = {
          emailAddress: _.get(data, "acpt.customer.email", null),
          tel: _.get(data, "acpt.customer.tel", null),
          postalCode: _.get(data, "acpt.customer.postalCode", null),
          address1: _.get(data, "acpt.customer.address1", null),
          address2: _.get(data, "acpt.customer.address2", null),
          familyName: _.get(data, "acpt.customer.familyName", null),
          firstName: _.get(data, "acpt.customer.firstName", null),
          prefectureCode: _.get(data, "acpt.customer.prefectureCode", null),
          companyName: _.get(data, "acpt.customer.company", null)
        };
        this.shippingInfoListForShop = _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList", null)
        this.shippingDetail = {
          acptDlvry: {
            acptDlvryKey: null,
            acptPrticKey: null,
            acptPrticNo: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptPrticNo", null),
            dlvryZipCd: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].dlvryZipCd", null),
            dlvryPrefectureCd: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].dlvryPrefectureCd", null),
            dlvryPrefectureCdNm: null,
            dlvryAddr1: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].dlvryAddr1", null),
            dlvryAddr2: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].dlvryAddr2", null),
            dlvryAddrNm: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].dlvryAddrNm", null),
            dlvryTel: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].dlvryTel", null),
            email: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].email", null),
            cnt: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].cnt", null)
          },
          arnge: {
            arngeKey: null,
            orderTo: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.orderTo", null),
            dlvryDatetime: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.dlvryDatetime", null),
            dlvrySlipNo: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.dlvrySlipNo", null),
            arngeSts: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.arngeSts", null),
            arngeStsNm: null,
            arngeStsCancelRsn: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.arngeStsCancelRsn", null),
            ptDlvryDatetime: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.ptDlvryDatetime", null),
            shipDatetime: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.shipDatetime", null),
            shipCancelHndlDate: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.shipCancelHndlDate", null),
            sendItemTypeDiv: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.sendItemTypeDiv", null),
            sendItemTypeDivNm: null,
            sendWay: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.sendWay", null),
            sendWayNm: null,
            dlvryCompanyNmDisp: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.dlvryCompanyNmDisp", null),
            trackingUrl: _.get(data, "acpt.acptDtlList[0].acptPrticList[0].acptDlvryList[0].arnge.trackingUrl", null),
          },
          shippingFlag: _.get(data, "acpt.acptDtlList[0].shippingFlag", "0")
        }
        // 
        // 送り主情報 
        this.senderInfo.prodSenderList = {
          familyNm: _.get(data,"acpt.acptDtlList[0].prodSenderList.familyNm",null),
          firstNm: _.get(data,"acpt.acptDtlList[0].prodSenderList.firstNm",null),
          familyNmKana: _.get(data,"acpt.acptDtlList[0].prodSenderList.familyNmKana",null),
          firstNmKana: _.get(data,"acpt.acptDtlList[0].prodSenderList.firstNmKana",null),
          zipCd: _.get(data,"acpt.acptDtlList[0].prodSenderList.zipCd",null),
          prefectureCd: _.get(data,"acpt.acptDtlList[0].prodSenderList.prefectureCd",null),
          addr1: _.get(data,"acpt.acptDtlList[0].prodSenderList.addr1",null),
          addr2: _.get(data,"acpt.acptDtlList[0].prodSenderList.addr2",null),
          tel: _.get(data,"acpt.acptDtlList[0].prodSenderList.tel",null)
        }
      }
      this.getPlanDetailShop();
      this.getCouponUsedDetail();
    },
    getPlanDetailShop() {
      this.$repositories("mypage")
        .getMenuNoPlandIdInfo(this.dataMail.menuNo, this.dataMail.planId)
        .then((data) => {
          const cloneApplicationDetail = _.cloneDeep(this.applicationDetail);
          cloneApplicationDetail.memberBenefits = _.get(
            data,
            "memberBenefits",
            null
          );

          const shoppingGuides = _.get(data.shoppingGuideInfo, "shoppingGuides", null);
          console.log("shoppingGuides", shoppingGuides)
          if (shoppingGuides) {
            // キャンセル規定のショッピングガイドを定義
            let shoppingGuidesCancelRuleFilter = shoppingGuides.filter((e) => e.shoppingGuideCd === "000206");
            this.shoppingGuideCancelRuleVal = _.get(shoppingGuidesCancelRuleFilter[0], "shoppingGuideValue", null);
            if (!this.shoppingGuideCancelRuleVal) {
              this.shoppingGuideCancelRuleVal = _.get(shoppingGuidesCancelRuleFilter[0], "shoppingGuideValues[0]", null);
            }
          }
          cloneApplicationDetail.shoppingGuideVal = this.shoppingGuideVal;
          cloneApplicationDetail.shoppingGuideCancelRuleVal = this.shoppingGuideCancelRuleVal;
          this.applicationDetail = cloneApplicationDetail;
        });
      this.$repositories("mypage")
        .getSingleItemInfo(
          this.menuNo)
        .then((data) => {
          // サムネイルリスト
          this.$set(this.cardObj,"menuThumbnail",_.get(data,"menuDetailResponse.menuImages[0].imageUrl", "/cdn/images/noimage.png"))
        });
    },
    // /menus/${menuNo}/plans/${planId}`をコール
    async getMenuPlanShop() {
      let taxRate = null;
      let shippingTaxRate = null;
      let shippingTaxDiv = null;
      await this.$repositories("mypage")
        .getMenuNoPlandIdInfo(this.menuNo, this.planId)
        .then((data) => {
          // 税率
          taxRate = _.get(data, "planShopInfo.taxRate", null);
          shippingTaxRate = _.get(data, "planShopInfo.shippingFeeTaxRate", null);
          shippingTaxDiv = _.get(data, "planShopInfo.shippingFeeTaxDiv", null);
          console.log({taxRate});
          console.log({shippingTaxRate});
        });
      return [taxRate, shippingTaxRate, shippingTaxDiv];
    },
    async handleResponseDataStay(data) {
      if (data !== null) {
        this.menuNo = _.get(
          data,
          "orderStayDetail.acptDtlList[0].acptDtl.menuNo",
          ""
        );
        this.planId = _.get(
          data,
          "orderStayDetail.acptDtlList[0].acptDtl.planId",
          ""
        );
        this.roomId = _.get(
          data,
          "orderStayDetail.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList[0].stayRoomDayPrtic.roomId",
          ""
        );
        this.companyCd = _.get(data, "orderStayDetail.customer.companyCd", "");
        const checkInTm = _.get(
          data,
          "orderStayDetail.acptDtlList[0].acptDtl.useDate",
          ""
        );
        const billAmtTotal = _.get(
          data,
          "orderStayDetail.acpt.billAmtTotal",
          ""
        );
        this.billAmtTotalPstgIn = _.get(
          data,
          "orderStayDetail.acpt.billAmtTotalPstgIn",
          ""
        );
        this.pstg = _.get(
          data,
          "orderStayDetail.acpt.pstg",
          ""
        );
        this.pointGrntNumAmt = _.get(
          data,
          "orderStayDetail.acpt.pointGrntNumAmt",
          null
        );
        this.sbsidRsvList = _.get(
          data,
          "orderStayDetail.acptDtlList[0].sbsidRsvList",
          []
        );
        if (checkInTm) {
          this.useDate = moment(
            _.get(data, "orderStayDetail.acptDtlList[0].acptDtl.useDate", "")
          ).format("YYYY/MM/DD");
          this.nightCnt = _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayAcptDtl.nightCnt",
            null
          );
          if (this.useDate && this.nightCnt) {
            const date = new Date(this.useDate);
            date.setDate(date.getDate() + this.nightCnt);
            this.endDate = moment(date).format("YYYY/MM/DD");
          }
        }
        const acptTm = _.get(data, "orderStayDetail.acpt.acptDatetime", null);
        this.totalAmt = _.get(data, "orderStayDetail.acpt.totalAmt", "");
        this.sbsidTotal = _.get(data, "orderStayDetail.acpt.aplySbsidAmt", "");
        this.cafeAmtTotal = _.get(data, "orderStayDetail.acpt.aplyCafePointAmt", "");
        this.pointUse = _.get(data, "orderStayDetail.acpt.pointUseNumAmt", "");
        this.boneSbsidChrgTotal = _.get(
          data,
          "orderStayDetail.acptDtlList[0].dtlChrgTotal.boneSbsidChrgTotal",
          ""
        );
        this.billAmtTotal = _.get(
          data,
          "orderStayDetail.acpt.billAmtTotal",
          ""
        );
        const rpFamilyNm = _.get(data, "orderStayDetail.acptDtlList[0].stayResrvRpsntInfo.rpsntFamilyNm")
        const rpFirstNm = _.get(data, "orderStayDetail.acptDtlList[0].stayResrvRpsntInfo.rpsntFirstNm")
        this.repFullName = [rpFamilyNm, rpFirstNm].filter(item => item).join('')
        this.billAmtTotalPstgIn = _.get(
          data,
          "orderStayDetail.acpt.billAmtTotalPstgIn",
          ""
        );
        this.rpsntFamilyNmKana = _.get(
          data,
          "orderStayDetail.customer.familyName",
          ""
        );
        this.rpsntFirstNmKana = _.get(
          data,
          "orderStayDetail.customer.firstName",
          ""
        );
        if (this.rpsntFamilyNmKana && this.rpsntFirstNmKana) {
          this.fullName = `${this.rpsntFamilyNmKana} ${this.rpsntFirstNmKana}`;
        } else if (this.rpsntFamilyNmKana && !this.rpsntFirstNmKana) {
          this.fullName = this.rpsntFamilyNmKana;
        } else if (!this.rpsntFamilyNmKana && this.rpsntFirstNmKana) {
          this.fullName = this.rpsntFirstNmKana;
        } else {
          this.resrvFamilyNmKana = _.get(
            data,
            "orderStayDetail.customer.familyNameKana",
            ""
          );
          this.resrvFirstNmKana = _.get(
            data,
            "orderStayDetail.customer.firstNameKana",
            ""
          );
          if (this.resrvFamilyNmKana && !this.resrvFirstNmKana) {
            this.fullName = this.resrvFamilyNmKana;
          }
          if (!this.resrvFamilyNmKana && this.resrvFirstNmKana) {
            this.fullName = this.resrvFirstNmKana;
          }
          if (this.resrvFamilyNmKana && this.resrvFirstNmKana) {
            this.fullName = this.resrvFamilyNmKana + this.resrvFirstNmKana;
          }
        }
        this.dataMail = {
          menuNo: _.get(
            data,
            "orderStayDetail.acptDtlList[0].menuBasicInfo.menuNo",
            null
          ),
          menuNm: _.get(
            data,
            "orderStayDetail.acptDtlList[0].menuBasicInfo.menuNm",
            null
          ),
          planNm: _.get(
            data,
            "orderStayDetail.acptDtlList[0].planBasicInfo.planNm",
            null
          ),
          planId: _.get(
            data,
            "orderStayDetail.acptDtlList[0].planBasicInfo.planId",
            null
          ),
          catSmlClassCd: null,
          catMidClassCd: null,
          catLrgClassCd: null,
          catExlClassCd: null,
          roomId: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList[0].stayRoomDayPrtic.roomId",
            ""
          ),
          memberName: this.fullName,
          typeShare: 2
        };
        this.cardObj = {
          acptNo: this.acptNo,
          acptDtlNo: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptDtl.acptDtlNo",
            ""
          ),
          acptDatetime: acptTm,
          menuNo: _.get(
            data,
            "orderStayDetail.acptDtlList[0].menuBasicInfo.menuNo",
            null
          ),
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pointGrntNumAmt: this.pointGrntNumAmt,
          reserveSts: _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayAcptDtl.resrvSts",
            null
          ),
          dtlSts: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptDtl.dtlSts",
            null
          ),
          checkInDate: this.useDate,
          checkOutDate: this.endDate,
          cancelCloseUpDay: _.get(this.cancelPolicy, "cancelCloseUpDay", null),
          cancelCloseUpTime: _.get(this.cancelPolicy, "cancelCloseUpDay", null),
          webCancelAvailDiv: null,
          srvicDiv: this.srvicDiv,
          cancelNo: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptDtl.cancelNo",
            ""
          ),
          useDate: moment(
            _.get(data, "orderStayDetail.acptDtlList[0].acptDtl.useDate", "")
          ).format("YYYY/MM/DD"),
          pointGrntDate: _.get(
            data,
            "orderStayDetail.acptDtlList[0].pointGrntInfo.pointGrntDate",
            ""
          )
            ? moment(
                _.get(
                  data,
                  "orderStayDetail.acptDtlList[0].pointGrntInfo.pointGrntDate",
                  ""
                )
              ).format("YYYY/MM/DD")
            : null
        };
        this.applicationDetail = {
          acptDtlNo: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptDtl.acptDtlNo",
            ""
          ),
          planNm: _.get(
            data,
            "orderStayDetail.acptDtlList[0].planBasicInfo.planNm",
            null
          ),
          planLeadCopy: _.get(
            data,
            "orderStayDetail.acptDtlList[0].planBasicInfo.planLeadCopy",
            null
          ),
          pointGrntNumAmt: this.pointGrntNumAmt,
          useDate: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptDtl.useDate",
            null
          ),
          endDate: this.endDate,
          fullName: this.fullName,
          repFullName: this.repFullName,
          nightCnt: _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayAcptDtl.nightCnt",
            null
          ),
          outsideSysCd: _.get(
            data,
            "orderStayDetail.acptDtlList[0].menuBasicInfo.outsideSysCd",
            null
          ),
          outsideResrvId: _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayAcptDtl.outsideResrvId",
            null
          ),
          totalPeople: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptDtl.useHeadCnt",
            null
          ),
          roomCnt: _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayAcptDtl.roomCnt",
            null
          ),
          acptDatetime: acptTm
            ? moment(acptTm).format("YYYY/MM/DD HH:mm")
            : null,
          totalAmt: this.totalAmt,
          priceRemarks: _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayAcptDtl.priceRemarks",
            null
          ),
          totalAdult:
            _.get(
              data,
              "orderStayDetail.acptDtlList[0].stayAcptDtl.adultTotalHeadCnt",
              0
            ) +
            _.get(
              data,
              "orderStayDetail.acptDtlList[0].stayAcptDtl.vistrAdultTotalHeadCnt",
              0
            ),
          totalChild:
            _.get(
              data,
              "orderStayDetail.acptDtlList[0].stayAcptDtl.chldHeadCnt",
              0
            ) +
            _.get(
              data,
              "orderStayDetail.acptDtlList[0].stayAcptDtl.vistrChldHeadCnt",
              0
            ),
          checkInTm: _.get(
            data,
            "orderStayDetail.acptDtlList[0].othInfo.ckinSchDatetime",
            null
          ),
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pstg: this.pstg,
          stayPlanQstnReplyList: _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayPlanQstnReplyList",
            null
          )
        };
        this.paymentInfo = {
          totalAmt: this.totalAmt,
          sbsidTotal: this.sbsidTotal,
          boneSbsidChrgTotal: this.boneSbsidChrgTotal,
          cafeAmtTotal: this.cafeAmtTotal,
          pointUse: this.pointUse,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          billAmtTotal: this.billAmtTotal,
          pstg: this.pstg,
          endDate: this.endDate,
          pointGrntNumAmt: this.pointGrntNumAmt
        };
        this.customerInfo = {
          emailAddress: _.get(data, "orderStayDetail.customer.email", null),
          tel: _.get(data, "orderStayDetail.customer.tel", null),
          postalCode: _.get(data, "orderStayDetail.customer.postalCode", null),
          address1: _.get(data, "orderStayDetail.customer.address1", null),
          address2: _.get(data, "orderStayDetail.customer.address2", null),
          familyName: _.get(data, "orderStayDetail.customer.familyName", null),
          firstName: _.get(data, "orderStayDetail.customer.firstName", null),
          prefectureCode: _.get(data, "orderStayDetail.customer.prefectureCode", null),
          companyName: _.get(data, "orderStayDetail.customer.company", null)
        };
        this.getPlanDetail();
        this.getCouponUsedDetail();
      }
    },
    getPlanDetail() {
      this.$repositories("menus")
        .getPlanDetail(this.menuNo, this.planId, this.roomId, {})
        .then((data) => {
          this.planDetail = data;
          this.cancelPolicy = _.get(this.planDetail, "cancelPolicy", []);
          this.cardObj.cancelCloseUpDay = _.get(
            data,
            "cancelPolicy.cancelCloseUpDay",
            null
          );
          this.cardObj.cancelCloseUpTime = _.get(
            data,
            "cancelPolicy.cancelCloseUpTime",
            null
          );
          this.cardObj.webCancelAvailDiv = _.get(
            data,
            "cancelPolicy.webCancelAvailDiv",
            null
          );
          this.cardObj.menuThumbnail = _.get(
            data,
            "planBasicInfo.planImages[0].imageUrl",
            null
          );
          this.cardObj.cancelPolicy = this.cancelPolicy;
          this.dataItem = {
            type: "type-small",
            menu_id: _.get(data, "menuInformation.menuNo", ""),
            label: _.get(data, "menuInformation.categoryInfomation", ""),
            baseImg: _.get(data, "roomBasicInfo.roomImages", ""),
            title3: _.get(data, "menuInformation.menuNm", "")
          };
        });
    },
    async handleResponseDataStay(data) {
      if (data !== null) {
        this.menuNo = _.get(
          data,
          "orderStayDetail.acptDtlList[0].acptDtl.menuNo",
          ""
        );
        this.planId = _.get(
          data,
          "orderStayDetail.acptDtlList[0].acptDtl.planId",
          ""
        );
        this.roomId = _.get(
          data,
          "orderStayDetail.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList[0].stayRoomDayPrtic.roomId",
          ""
        );
        this.companyCd = _.get(data, "orderStayDetail.customer.companyCd", "");
        const checkInTm = _.get(
          data,
          "orderStayDetail.acptDtlList[0].acptDtl.useDate",
          ""
        );

        const billAmtTotal = _.get(
          data,
          "orderStayDetail.acpt.billAmtTotal",
          ""
        );
        this.billAmtTotalPstgIn = _.get(
          data,
          "orderStayDetail.acpt.billAmtTotalPstgIn",
          ""
        );
        this.pstg = _.get(
          data,
          "orderStayDetail.acpt.pstg",
          ""
        );
        this.pointGrntNumAmt = _.get(
          data,
          "orderStayDetail.acpt.pointGrntNumAmt",
          null
        );
        this.sbsidRsvList = _.get(
          data,
          "orderStayDetail.acptDtlList[0].sbsidRsvList",
          []
        );

        if (checkInTm) {
          this.useDate = moment(
            _.get(data, "orderStayDetail.acptDtlList[0].acptDtl.useDate", "")
          ).format("YYYY/MM/DD");
          this.nightCnt = _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayAcptDtl.nightCnt",
            null
          );
          if (this.useDate && this.nightCnt) {
            const date = new Date(this.useDate);
            date.setDate(date.getDate() + this.nightCnt);
            this.endDate = moment(date).format("YYYY/MM/DD");
          }
        }
        const acptTm = _.get(data, "orderStayDetail.acpt.acptDatetime", null);
        this.totalAmt = _.get(data, "orderStayDetail.acpt.totalAmt", "");
        this.sbsidTotal = _.get(data, "orderStayDetail.acpt.aplySbsidAmt", "");
        this.cafeAmtTotal = _.get(data, "orderStayDetail.acpt.aplyCafePointAmt", "");
        this.pointUse = _.get(data, "orderStayDetail.acpt.pointUseNumAmt", "");
        this.boneSbsidChrgTotal = _.get(
          data,
          "orderStayDetail.acptDtlList[0].dtlChrgTotal.boneSbsidChrgTotal",
          ""
        );
        this.billAmtTotal = _.get(
          data,
          "orderStayDetail.acpt.billAmtTotal",
          ""
        );
        const rpFamilyNm = _.get(data, "orderStayDetail.acptDtlList[0].stayResrvRpsntInfo.rpsntFamilyNm")
        const rpFirstNm = _.get(data, "orderStayDetail.acptDtlList[0].stayResrvRpsntInfo.rpsntFirstNm")
        this.repFullName = [rpFamilyNm, rpFirstNm].filter(item => item).join('')
        this.billAmtTotalPstgIn = _.get(
          data,
          "orderStayDetail.acpt.billAmtTotalPstgIn",
          ""
        );
        this.rpsntFamilyNmKana = _.get(
          data,
          "orderStayDetail.customer.familyName",
          ""
        );
        this.rpsntFirstNmKana = _.get(
          data,
          "orderStayDetail.customer.firstName",
          ""
        );
        if (this.rpsntFamilyNmKana && this.rpsntFirstNmKana) {
          this.fullName = `${this.rpsntFamilyNmKana} ${this.rpsntFirstNmKana}`;
        } else if (this.rpsntFamilyNmKana && !this.rpsntFirstNmKana) {
          this.fullName = this.rpsntFamilyNmKana;
        } else if (!this.rpsntFamilyNmKana && this.rpsntFirstNmKana) {
          this.fullName = this.rpsntFirstNmKana;
        } else {
          this.resrvFamilyNmKana = _.get(
            data,
            "orderStayDetail.customer.familyNameKana",
            ""
          );
          this.resrvFirstNmKana = _.get(
            data,
            "orderStayDetail.customer.firstNameKana",
            ""
          );
          if (this.resrvFamilyNmKana && !this.resrvFirstNmKana) {
            this.fullName = this.resrvFamilyNmKana;
          }
          if (!this.resrvFamilyNmKana && this.resrvFirstNmKana) {
            this.fullName = this.resrvFirstNmKana;
          }
          if (this.resrvFamilyNmKana && this.resrvFirstNmKana) {
            this.fullName = this.resrvFamilyNmKana + this.resrvFirstNmKana;
          }
        }
        this.dataMail = {
          menuNo: _.get(
            data,
            "orderStayDetail.acptDtlList[0].menuBasicInfo.menuNo",
            null
          ),
          menuNm: _.get(
            data,
            "orderStayDetail.acptDtlList[0].menuBasicInfo.menuNm",
            null
          ),
          planNm: _.get(
            data,
            "orderStayDetail.acptDtlList[0].planBasicInfo.planNm",
            null
          ),
          planId: _.get(
            data,
            "orderStayDetail.acptDtlList[0].planBasicInfo.planId",
            null
          ),
          catSmlClassCd: null,
          catMidClassCd: null,
          catLrgClassCd: null,
          catExlClassCd: null,
          roomId: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList[0].stayRoomDayPrtic.roomId",
            ""
          ),
          memberName: this.fullName,
          typeShare: 2
        };
        this.cardObj = {
          acptNo: this.acptNo,
          acptDtlNo: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptDtl.acptDtlNo",
            ""
          ),
          acptDatetime: acptTm,
          menuNo: _.get(
            data,
            "orderStayDetail.acptDtlList[0].menuBasicInfo.menuNo",
            null
          ),
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pointGrntNumAmt: this.pointGrntNumAmt,
          reserveSts: _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayAcptDtl.resrvSts",
            null
          ),
          dtlSts: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptDtl.dtlSts",
            null
          ),
          checkInDate: this.useDate,
          checkOutDate: this.endDate,
          cancelCloseUpDay: _.get(this.cancelPolicy, "cancelCloseUpDay", null),
          cancelCloseUpTime: _.get(this.cancelPolicy, "cancelCloseUpDay", null),
          webCancelAvailDiv: null,
          srvicDiv: this.srvicDiv,
          cancelNo: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptDtl.cancelNo",
            ""
          ),
          useDate: moment(
            _.get(data, "orderStayDetail.acptDtlList[0].acptDtl.useDate", "")
          ).format("YYYY/MM/DD"),
          pointGrntDate: _.get(
            data,
            "orderStayDetail.acptDtlList[0].pointGrntInfo.pointGrntDate",
            ""
          )
            ? moment(
                _.get(
                  data,
                  "orderStayDetail.acptDtlList[0].pointGrntInfo.pointGrntDate",
                  ""
                )
              ).format("YYYY/MM/DD")
            : null
        };
        this.applicationDetail = {
          acptDtlNo: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptDtl.acptDtlNo",
            ""
          ),
          planNm: _.get(
            data,
            "orderStayDetail.acptDtlList[0].planBasicInfo.planNm",
            null
          ),
          planLeadCopy: _.get(
            data,
            "orderStayDetail.acptDtlList[0].planBasicInfo.planLeadCopy",
            null
          ),
          pointGrntNumAmt: this.pointGrntNumAmt,
          useDate: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptDtl.useDate",
            null
          ),
          endDate: this.endDate,
          fullName: this.fullName,
          repFullName: this.repFullName,
          nightCnt: _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayAcptDtl.nightCnt",
            null
          ),
          outsideSysCd: _.get(
            data,
            "orderStayDetail.acptDtlList[0].menuBasicInfo.outsideSysCd",
            null
          ),
          outsideResrvId: _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayAcptDtl.outsideResrvId",
            null
          ),
          totalPeople: _.get(
            data,
            "orderStayDetail.acptDtlList[0].acptDtl.useHeadCnt",
            null
          ),
          roomCnt: _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayAcptDtl.roomCnt",
            null
          ),
          acptDatetime: acptTm
            ? moment(acptTm).format("YYYY/MM/DD HH:mm")
            : null,
          totalAmt: this.totalAmt,
          priceRemarks: _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayAcptDtl.priceRemarks",
            null
          ),
          totalAdult:
            _.get(
              data,
              "orderStayDetail.acptDtlList[0].stayAcptDtl.adultTotalHeadCnt",
              0
            ) +
            _.get(
              data,
              "orderStayDetail.acptDtlList[0].stayAcptDtl.vistrAdultTotalHeadCnt",
              0
            ),
          totalChild:
            _.get(
              data,
              "orderStayDetail.acptDtlList[0].stayAcptDtl.chldHeadCnt",
              0
            ) +
            _.get(
              data,
              "orderStayDetail.acptDtlList[0].stayAcptDtl.vistrChldHeadCnt",
              0
            ),
          checkInTm: _.get(
            data,
            "orderStayDetail.acptDtlList[0].othInfo.ckinSchDatetime",
            null
          ),
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pstg: this.pstg,
          stayPlanQstnReplyList: _.get(
            data,
            "orderStayDetail.acptDtlList[0].stayPlanQstnReplyList",
            null
          )
        };
        this.paymentInfo = {
          totalAmt: this.totalAmt,
          sbsidTotal: this.sbsidTotal,
          boneSbsidChrgTotal: this.boneSbsidChrgTotal,
          cafeAmtTotal: this.cafeAmtTotal,
          pointUse: this.pointUse,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          billAmtTotal: this.billAmtTotal,
          pstg: this.pstg,
          endDate: this.endDate,
          pointGrntNumAmt: this.pointGrntNumAmt
        };
        this.customerInfo = {
          emailAddress: _.get(data, "orderStayDetail.customer.email", null),
          tel: _.get(data, "orderStayDetail.customer.tel", null),
          postalCode: _.get(data, "orderStayDetail.customer.postalCode", null),
          address1: _.get(data, "orderStayDetail.customer.address1", null),
          address2: _.get(data, "orderStayDetail.customer.address2", null),
          familyName: _.get(data, "orderStayDetail.customer.familyName", null),
          firstName: _.get(data, "orderStayDetail.customer.firstName", null),
          prefectureCode: _.get(data, "orderStayDetail.customer.prefectureCode", null),
          companyName: _.get(data, "orderStayDetail.customer.company", null)
        };
        this.getPlanDetail();
        this.getCouponUsedDetail();
      }
    },
    getPlanDetail() {
      this.$repositories("menus")
        .getPlanDetail(this.menuNo, this.planId, this.roomId, {})
        .then((data) => {
          this.planDetail = data;
          this.cancelPolicy = _.get(this.planDetail, "cancelPolicy", []);
          this.cardObj.cancelCloseUpDay = _.get(
            data,
            "cancelPolicy.cancelCloseUpDay",
            null
          );
          this.cardObj.cancelCloseUpTime = _.get(
            data,
            "cancelPolicy.cancelCloseUpTime",
            null
          );
          this.cardObj.webCancelAvailDiv = _.get(
            data,
            "cancelPolicy.webCancelAvailDiv",
            null
          );
          this.cardObj.menuThumbnail = _.get(
            data,
            "planBasicInfo.planImages[0].imageUrl",
            null
          );
          this.cardObj.cancelPolicy = this.cancelPolicy;
          this.dataItem = {
            type: "type-small",
            menu_id: _.get(data, "menuInformation.menuNo", ""),
            label: _.get(data, "menuInformation.categoryInfomation", ""),
            baseImg: _.get(data, "roomBasicInfo.roomImages", ""),
            title3: _.get(data, "menuInformation.menuNm", "")
          };
        });
    },
    gotoPath() {
      this.$router.push({ path: "/mypage/orders" });
    },
    async handleResponseData(data) {
      if (data) {
        this.menuNo = _.get(data, "acpt.acptDtlList[0].menuNo", "");
        this.planId = _.get(data, "acpt.acptDtlList[0].planId", "");
        // TODO roomId
        this.roomId = _.get(
          data,
          "acpt.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList[0].stayRoomDayPrtic.roomId",
          ""
        );
        this.sbsidRsvList = _.get(data, "acpt.acptDtlList[0].sbsidRsvList", []);
        this.companyCd = _.get(data, "acpt.customer.companyCd", "");
        const checkInTm = _.get(data, "acpt.acptDtlList[0].useDate", "");
        if (checkInTm) {
          this.useDate = moment(
            _.get(data, "acpt.acptDtlList[0].useDate", "")
          ).format("YYYY/MM/DD");
          // TODO nightCnt
          this.nightCnt = _.get(
            data,
            "acpt.acptDtlList[0].stayAcptDtl.nightCnt",
            null
          );
          if (this.useDate && this.nightCnt) {
            const date = new Date(this.useDate);
            date.setDate(date.getDate() + this.nightCnt);
            this.endDate = moment(date).format("YYYY/MM/DD");
          }
        }
        const acptTm = _.get(data, "acpt.acptDatetime", null);
        this.totalAmt = _.get(data, "acpt.totalAmt", "");
        this.sbsidTotal = _.get(
          data,
          "acpt.acptDtlList[0].dtlChrgTotal.sbsidTotal",
          ""
        );
        this.cafeAmtTotal = _.get(
          data,
          "acpt.acptDtlList[0].dtlChrgTotal.cafePointAmtTotal",
          ""
        );
        this.pointUse = _.get(
          data,
          "acpt.acptDtlList[0].dtlChrgTotal.pointUse",
          ""
        );
        this.boneSbsidChrgTotal = _.get(
          data,
          "acpt.acptDtlList[0].dtlChrgTotal.boneSbsidChrgTotal",
          ""
        );
        this.billAmtTotal = _.get(data, "acpt.billAmtTotal", "");
        this.billAmtTotalPstgIn = _.get(data, "acpt.billAmtTotalPstgIn", "");
        this.pstg = _.get(data, "acpt.pstg", "");
        this.rpsntFamilyNmKana = _.get(data, "acpt.customer.familyName", "");
        this.rpsntFirstNmKana = _.get(data, "acpt.customer.firstName", "");
        if (this.rpsntFamilyNmKana && this.rpsntFirstNmKana) {
          this.fullName = `${this.rpsntFamilyNmKana} ${this.rpsntFirstNmKana}`;
        } else if (this.rpsntFamilyNmKana && !this.rpsntFirstNmKana) {
          this.fullName = this.rpsntFamilyNmKana;
        } else if (!this.rpsntFamilyNmKana && this.rpsntFirstNmKana) {
          this.fullName = this.rpsntFirstNmKana;
        } else {
          this.resrvFamilyNmKana = _.get(
            data,
            "acpt.customer.familyNameKana",
            ""
          );
          this.resrvFirstNmKana = _.get(
            data,
            "acpt.customer.firstNameKana",
            ""
          );
          if (this.resrvFamilyNmKana && !this.resrvFirstNmKana) {
            this.fullName = this.resrvFamilyNmKana;
          }
          if (!this.resrvFamilyNmKana && this.resrvFirstNmKana) {
            this.fullName = this.resrvFirstNmKana;
          }
          if (this.resrvFamilyNmKana && this.resrvFirstNmKana) {
            this.fullName = this.resrvFamilyNmKana + this.resrvFirstNmKana;
          }
        }
        if (!this.fullName) {
          const familyName = _.get(data, "acpt.customer.familyName", "");
          const firstName = _.get(data, "acpt.customer.firstName", "");
          this.fullName = `${familyName} ${firstName}`;
        }
        this.dataMail = {
          menuNo: _.get(data, "acpt.acptDtlList[0].menuBasicInfo.menuNo", ""),
          menuNm: _.get(data, "acpt.acptDtlList[0].menuBasicInfo.menuNm", ""),
          planId: _.get(data, "acpt.acptDtlList[0].planId", ""),
          planNm: _.get(data, "acpt.acptDtlList[0].planBasicInfo.planNm", null),
          catSmlClassCd: _.get(data, "acpt.acptDtlList[0].menuBasicInfo.catSmlClassCd", null),
          catMidClassCd: _.get(data, "acpt.acptDtlList[0].menuBasicInfo.catMidClassCd", null),
          catLrgClassCd: _.get(data, "acpt.acptDtlList[0].menuBasicInfo.catLrgClassCd", null),
          catExlClassCd: _.get(data, "acpt.acptDtlList[0].menuBasicInfo.catExlClassCd", null),
          memberName: this.fullName,
          roomId: _.get(data, "acpt.acptDtlList[0].sbsidRsvList[0].roomId", ""),
          typeShare: 2
        };
        let useTimeTmp1 = "";
        let useTimeTmp2 = "";
        let useTimeTmp = _.get(data, "acpt.acptDtlList[0].useTime", null)
        if (useTimeTmp !== null) {
          if(useTimeTmp.indexOf( ':' ) === -1) {
            useTimeTmp1 = useTimeTmp.slice(0,2);
            useTimeTmp2 = useTimeTmp.slice(2);
            useTimeTmp = useTimeTmp1 + ':' + useTimeTmp2;
          }
        }
        const formattedUseDateText = moment(
          _.get(data, "acpt.acptDtlList[0].useDate", "")
        ).format("YYYY/MM/DD");
        const formattedUseDatetimeText = `${formattedUseDateText} ${useTimeTmp}`;
        this.cardObj = {
          acptNo: this.acptNo,
          acptDatetime: acptTm ? moment(acptTm).format("YYYY/MM/DD") : null,
          menuNo: _.get(data, "acpt.acptDtlList[0].menuNo", null),
          menuNm: _.get(data, "acpt.acptDtlList[0].menuBasicInfo.menuNm", null),
          menuBasicInfo: _.get(data, "acpt.acptDtlList[0].menuBasicInfo", {}),
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pointGrntNumAmt: _.get(data, "acpt.pointGrntNumAmt", null),
          // TODO resrvSts
          reserveSts: _.get(
            data,
            "acpt.acptDtlList[0].stayAcptDtl.resrvSts",
            null
          ),
          dtlSts: _.get(data, "acpt.acptDtlList[0].dtlSts", null),
          checkInDate: this.useDate,
          checkOutDate: this.endDate,
          cancelCloseUpDay: _.get(this.cancelPolicy, "cancelCloseUpDay", null),
          cancelCloseUpTime: _.get(this.cancelPolicy, "cancelCloseUpDay", null),
          webCancelAvailDiv: null,
          srvicDiv: this.srvicDiv,
          lotteryInfo: _.get(data, "acpt.acptDtlList[0].lotteryInfo", null),
          lotteryResult: _.get(
            data,
            "acpt.acptDtlList[0].acptPrticList[0].lifeBenefit.lotteryResult",
            null
          ),
          useDate: moment(
            _.get(data, "acpt.acptDtlList[0].useDate", "")
          ).format("YYYY/MM/DD"),
          useTime: useTimeTmp,
          pointGrntDate: _.get(
            data,
            "acpt.acptDtlList[0].pointGrntInfo.pointGrntDate",
            ""
          )
            ? moment(
                _.get(
                  data,
                  "acpt.acptDtlList[0].pointGrntInfo.pointGrntDate",
                  ""
                )
              ).format("YYYY/MM/DD")
            : null
        };
        this.applicationDetail = {
          acptDtlNo: _.get(data, "acpt.acptDtlList[0].acptDtlNo", null),
          menuNo: _.get(data, "acpt.acptDtlList[0].menuNo", ""),
          planId: _.get(data, "acpt.acptDtlList[0].planId", ""),
          planNm: _.get(data, "acpt.acptDtlList[0].planBasicInfo.planNm", null),
          planLeadCopy: _.get(
            data,
            "acpt.acptDtlList[0].planBasicInfo.planLeadCopy",
            null
          ),
          pointGrntNumAmt: _.get(data, "acpt.pointGrntNumAmt", null),
          useDate: _.get(data, "acpt.acptDtlList[0].useDate", null),
          endDate: this.endDate,
          fullName: this.fullName,
          nightCnt: _.get(
            data,
            "acpt.acptDtlList[0].stayAcptDtl.nightCnt",
            null
          ),
          totalPeople: _.get(data, "acpt.acptDtlList[0].useHeadCnt", null),
          acptDatetime: acptTm
            ? moment(acptTm).format("YYYY/MM/DD HH:mm")
            : null,
          useDatetime: formattedUseDatetimeText,
          totalAmt: this.totalAmt,
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pstg: this.pstg,
          cponStartDatetime: _.get(
            data,
            "acpt.acptDtlList[0].acptPrticList[0].digiTxPrtic.cponStartDatetime",
            null
          ),
          cponEndDatetime: _.get(
            data,
            "acpt.acptDtlList[0].acptPrticList[0].digiTxPrtic.cponEndDatetime",
            null
          ),
          cautContList: _.get(data, "acpt.acptDtlList[0].cautContList", null),
          usePoint: _.get(
            data,
            "acpt.acptDtlList[0].acptPrticList[0].pointExcngPrtic.usePoint",
            null
          ),
          exchangeToPoint: _.get(
            data,
            "acpt.acptDtlList[0].acptPrticList[0].pointExcngPrtic.exchangeToPoint",
            null
          ),
          acptLifeAnswerList: _.get(
            data,
            "acpt.acptDtlList[0].acptLifeAnswerList",
            null
          ),
          acptPrticList: _.get(data, "acpt.acptDtlList[0].acptPrticList", null),
          outsideSysCd: _.get(data, "acpt.acptDtlList[0].menuBasicInfo.outsideSysCd", null),
          acptDatetime2: moment(
            _.get(data, "acpt.acptDatetime", "")
          ).format("YYYY-MM-DD"),
          companyCd: _.get(
            data,
            "acpt.customer.companyCd",
            null
          ),
          pointUseCd: _.get(
            data,
            "acpt.pointUseCd",
            null
          )
        };
        this.paymentInfo = {
          totalAmt: this.totalAmt,
          sbsidTotal: this.sbsidTotal,
          cafeAmtTotal: this.cafeAmtTotal,
          boneSbsidChrgTotal: this.boneSbsidChrgTotal,
          pointUse: this.pointUse,
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pstg: this.pstg,
          endDate: this.endDate,
          pointGrntNumAmt: _.get(data, "acpt.pointGrntNumAmt", null)
        };
        this.customerInfo = {
          emailAddress: _.get(data, "acpt.customer.email", null),
          tel: _.get(data, "acpt.customer.tel", null),
          postalCode: _.get(data, "acpt.customer.postalCode", null),
          address1: _.get(data, "acpt.customer.address1", null),
          address2: _.get(data, "acpt.customer.address2", null),
          familyName: _.get(data, "acpt.customer.familyName", null),
          firstName: _.get(data, "acpt.customer.firstName", null),
          prefectureCode: _.get(data, "acpt.customer.prefectureCode", null),
          companyName: _.get(data, "acpt.customer.company", null)
        };
        if (this.isGCService(this.mypageDisplayCode)) {
          this.grmAcptDtl = _.get(data, "acpt.acptDtlList[0].grmAcptDtl", null)
          this.grmQstnReplyList = _.get(data, "acpt.acptDtlList[0].grmQstnReplyList", null);
          this.grmPlanPrtic = _.get(data,"acpt.acptDtlList[0].grmPlanPrtic",null)
          this.grmacptPrticList = _.get(data,"acpt.acptDtlList[0].acptPrticList[0]",null)
          const topPath = this.topDomain;
          this.dataMail.url = topPath 
                              + "/menus/catExl=" + this.dataMail.catExlClassCd 
                              + "/catLrg=" + this.dataMail.catLrgClassCd 
                              + "/catMid=" + this.dataMail.catMidClassCd 
                              + "/catSml=" + this.dataMail.catSmlClassCd 
                              + "/menuNo=" + this.dataMail.menuNo 
                              + "/plans/planId=" + this.dataMail.planId;
          this.getGCPlanDetail();
        } else {
          this.getLifePlanDetail();
          this.getCouponUsedDetail();
        }
      }
    },
    getLifePlanDetail() {
      const params = {
        menuNo: this.menuNo,
        planId: this.planId
      };
      this.$repositories("menus")
        .getMenuPlanDetail(params)
        .then((data) => {
          const cloneCardObj = _.cloneDeep(this.cardObj);
          cloneCardObj.location = {
            areaMidClassNm: _.get(data, "areaMidClassNm", ""),
            areaSmlClassNm: _.get(data, "areaSmlClassNm", "")
          };
          cloneCardObj.menuThumbnail = _.get(data, "imageUrl[0]", "");
          this.cardObj = cloneCardObj;
          const cloneApplicationDetail = _.cloneDeep(this.applicationDetail);
          cloneApplicationDetail.memberBenefits = _.get(
            data,
            "memberBenefits",
            null
          );

          cloneApplicationDetail.payType = _.get(data, "payeeDiv", null);
          cloneApplicationDetail.benefitImportantPoints = _.get(data, "benefitImportantPoints", null);
          cloneApplicationDetail.usageDiv = _.get(data, "usageDiv", null)
          const shoppingGuides = _.get(data, "shoppingGuides", null);
          if (shoppingGuides) {
            // 有効期限のショッピングガイドを定義
            let shoppingGuidesFilter = shoppingGuides.filter((e) => e.shoppingGuideNm === "有効期限");
            this.shoppingGuideVal = _.get(shoppingGuidesFilter[0],"shoppingGuideValue",null);
            if (!this.shoppingGuideVal) {
              this.shoppingGuideVal = _.get(shoppingGuidesFilter[0],"shoppingGuideValues[0]",null);
            }
            // キャンセル規定のショッピングガイドを定義
            let shoppingGuidesCancelRuleFilter = shoppingGuides.filter((e) => e.shoppingGuideNm === "返品・交換・キャンセル等");
            this.shoppingGuideCancelRuleVal = _.get(shoppingGuidesCancelRuleFilter[0], "shoppingGuideValue", null);
            if (!this.shoppingGuideCancelRuleVal) {
              this.shoppingGuideCancelRuleVal = _.get(shoppingGuidesCancelRuleFilter[0], "shoppingGuideValues[0]", null);
            }
            shoppingGuidesFilter = shoppingGuides.filter(
              (e) => e.shoppingGuideNm === "お申込み時の留意点"
            );
            this.noteWhenApply = _.get(
              shoppingGuidesFilter[0],
              "shoppingGuideValue",
              null
            );
            if (!this.noteWhenApply) {
              this.noteWhenApply = _.get(
                shoppingGuidesFilter[0],
                "shoppingGuideValues",
                null
              );
            }
          }
          cloneApplicationDetail.shoppingGuideVal = this.shoppingGuideVal;
          cloneApplicationDetail.shoppingGuideCancelRuleVal = this.shoppingGuideCancelRuleVal;
          cloneApplicationDetail.noteWhenApply = this.noteWhenApply;
          this.applicationDetail = cloneApplicationDetail;
        });
    },
    getGCPlanDetail() {
      const params = {
        menuNo: this.menuNo,
        planId: this.planId,
      };
      this.$repositories("menus")
        .getPlanDetailGC(params)
        .then((data) => {
          const cloneCardObj = _.cloneDeep(this.cardObj);
          cloneCardObj.location = {
            areaMidClassNm: _.get(data, "areaMidClassNm", ""),
            areaSmlClassNm: _.get(data, "areaSmlClassNm", "")
          };
          cloneCardObj.menuThumbnail = _.get(data, "imageUrl[0]", "");
          this.cardObj = cloneCardObj;
          const cloneApplicationDetail = _.cloneDeep(this.applicationDetail);
          cloneApplicationDetail.memberBenefits = _.get(
            data,
            "memberBenefits",
            null
          );
          cloneApplicationDetail.payType = _.get(data, "payeeDiv", null);
          // webキャンセル可否
          this.reserveSetting = _.get(data, "gourmetReserveSetting[0]", null);
          console.log("GC reserveSetting :",this.reserveSetting);
          // キャンセル規定
          this.cancelPolicyGC = Array.from(data.gourmetCancelPolicy);
          console.log("GC cancel policy :",this.cancelPolicy);
          const shoppingGuides = _.get(data, "shoppingGuides", null);
          if (shoppingGuides) {
            let shoppingGuidesFilter = shoppingGuides.filter(
              (e) => e.shoppingGuideNm === "有効期限"
            );
            this.shoppingGuideVal = _.get(
              shoppingGuidesFilter[0],
              "shoppingGuideValue",
              null
            );
            if (!this.shoppingGuideVal) {
              this.shoppingGuideVal = _.get(
                shoppingGuidesFilter[0],
                "shoppingGuideValues[0]",
                null
              );
            }
          }
          cloneApplicationDetail.shoppingGuideVal = this.shoppingGuideVal;
          this.applicationDetail = cloneApplicationDetail;
        });
    },
    handleResponseDataPublicStay(data) {
      if (data !== null) {
        this.menuNo = _.get(
          data,
          "orderPublicStayDetail.acptDtlList[0].acptDtl.menuNo",
          ""
        );
        this.planId = _.get(
          data,
          "orderPublicStayDetail.acptDtlList[0].acptDtl.planId",
          ""
        );
        this.roomId = _.get(
          data,
          "orderPublicStayDetail.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList[0].stayRoomDayPrtic.roomId",
          ""
        );
        this.companyCd = _.get(
          data,
          "orderPublicStayDetail.customer.companyCd",
          ""
        );
        this.sbsidRsvList = _.get(
          data,
          "orderPublicStayDetail.acptDtlList[0].sbsidRsvList",
          []
        );
        const checkInTm = _.get(
          data,
          "orderPublicStayDetail.acptDtlList[0].acptDtl.useDate",
          ""
        );
        if (checkInTm) {
          this.useDate = moment(
            _.get(
              data,
              "orderPublicStayDetail.acptDtlList[0].acptDtl.useDate",
              ""
            )
          ).format("YYYY/MM/DD");
          this.nightCnt = _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].stayAcptDtl.nightCnt",
            null
          );
          if (this.useDate && this.nightCnt) {
            const date = new Date(this.useDate);
            date.setDate(date.getDate() + this.nightCnt);
            this.endDate = moment(date).format("YYYY/MM/DD");
          }
        }
        const acptTm = _.get(
          data,
          "orderPublicStayDetail.acpt.acptDatetime",
          null
        );
        this.totalAmt = _.get(data, "orderPublicStayDetail.acpt.totalAmt", "");
        this.sbsidTotal = _.get(
          data,
          "orderPublicStayDetail.acpt.aplySbsidAmt",
          ""
        );
        this.cafeAmtTotal = _.get(
          data,
          "orderPublicStayDetail.acpt.aplyCafePointAmt",
          ""
        );
        this.pointUse = _.get(
          data,
          "orderPublicStayDetail.acpt.pointUseNumAmt",
          ""
        );
        this.boneSbsidChrgTotal = _.get(
          data,
          "orderPublicStayDetail.acptDtlList[0].dtlChrgTotal.boneSbsidChrgTotal",
          ""
        );
        this.billAmtTotal = _.get(
          data,
          "orderPublicStayDetail.acpt.billAmtTotal",
          ""
        );
        this.billAmtTotalPstgIn = _.get(
          data,
          "orderPublicStayDetail.acpt.billAmtTotalPstgIn",
          ""
        );
        this.rpsntFamilyNmKana = _.get(
          data,
          "orderPublicStayDetail.customer.familyName",
          ""
        );
        this.rpsntFirstNmKana = _.get(
          data,
          "orderPublicStayDetail.customer.firstName",
          ""
        );
        if (this.rpsntFamilyNmKana && this.rpsntFirstNmKana) {
          this.fullName = `${this.rpsntFamilyNmKana}${this.rpsntFirstNmKana}`;
        } else if (this.rpsntFamilyNmKana && !this.rpsntFirstNmKana) {
          this.fullName = this.rpsntFamilyNmKana;
        } else if (!this.rpsntFamilyNmKana && this.rpsntFirstNmKana) {
          this.fullName = this.rpsntFirstNmKana;
        } else {
          this.resrvFamilyNmKana = _.get(
            data,
            "orderPublicStayDetail.customer.familyNameKana",
            ""
          );
          this.resrvFirstNmKana = _.get(
            data,
            "orderPublicStayDetail.customer.firstNameKana",
            ""
          );
          if (this.resrvFamilyNmKana && !this.resrvFirstNmKana) {
            this.fullName = this.resrvFamilyNmKana;
          }
          if (!this.resrvFamilyNmKana && this.resrvFirstNmKana) {
            this.fullName = this.resrvFirstNmKana;
          }
          if (this.resrvFamilyNmKana && this.resrvFirstNmKana) {
            this.fullName = this.resrvFamilyNmKana + this.resrvFirstNmKana;
          }
        }
        const billAmount =
          _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].dtlChrgTotal.memberChrgTotal",
            0
          ) +
          _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].dtlChrgTotal.tieupChrgTotal",
            0
          ) -
          _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].dtlChrgTotal.boneSbsidChrgTotal",
            0
          );

        const memberChrgTotal = _.get(
          data,
          "orderPublicStayDetail.acptDtlList[0].dtlChrgTotal.memberChrgTotal",
          0
        );
        const boneSbsidChrgTotal = _.get(
          data,
          "orderPublicStayDetail.acptDtlList[0].dtlChrgTotal.boneSbsidChrgTotal",
          0
        );
        const tieupChrgTotal = _.get(
          data,
          "orderPublicStayDetail.acptDtlList[0].dtlChrgTotal.tieupChrgTotal",
          0
        );
        this.dataMail = {
          menuNo: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].acptDtl.menuNo",
            ""
          ),
          menuNm: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].menuBasicInfo.menuNm",
            null
          ),
          planNm: "",
          planId: "",
          roomId: "",
          memberName: this.fullName,
          typeShare: 1
        };
        this.cardObj = {
          acptNo: this.acptNo,
          acptDatetime: acptTm ? moment(acptTm).format("YYYY/MM/DD") : null,
          menuNo: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].menuBasicInfo.menuNo",
            null
          ),
          billAmtTotal: memberChrgTotal + tieupChrgTotal - boneSbsidChrgTotal,
          billAmtTotalPstgIn: _.get(
            data,
            "orderPublicStayDetail.acpt.billAmtTotalPstgIn",
            ""
          ),
          pointGrntNumAmt: _.get(
            data,
            "orderPublicStayDetail.acpt.pointGrntNumAmt",
            null
          ),
          reserveSts: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].stayAcptDtl.resrvSts",
            null
          ),
          dtlSts: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].acptDtl.dtlSts",
            null
          ),
          checkInDate: this.useDate,
          checkOutDate: this.endDate,
          cancelCloseUpDay: null,
          cancelCloseUpTime: null,
          webCancelAvailDiv: null,
          srvicDiv: this.srvicDiv,
          useDate: moment(
            _.get(
              data,
              "orderPublicStayDetail.acptDtlList[0].acptDtl.useDate",
              ""
            )
          ).format("YYYY/MM/DD"),
          pointGrntDate: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].pointGrntInfo.pointGrntDate",
            ""
          )
            ? moment(
                _.get(
                  data,
                  "orderPublicStayDetail.acptDtlList[0].pointGrntInfo.pointGrntDate",
                  ""
                )
              ).format("YYYY/MM/DD")
            : null,
          boneSbsidChrgTotal: boneSbsidChrgTotal
        };
        this.applicationDetail = {
          acptDtlNo: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].acptDtl.acptDtlNo",
            null
          ),
          planNm: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].planBasicInfo.planNm",
            null
          ),
          planLeadCopy: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].planBasicInfo.planLeadCopy",
            null
          ),
          pointGrntNumAmt: _.get(
            data,
            "orderPublicStayDetail.acpt.pointGrntNumAmt",
            null
          ),
          useDate: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].acptDtl.useDate",
            null
          ),
          endDate: this.endDate,
          fullName: this.fullName,
          nightCnt: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].stayAcptDtl.nightCnt",
            null
          ),
          totalPeople: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].acptDtl.useHeadCnt",
            null
          ),
          roomCnt: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].stayAcptDtl.roomCnt",
            null
          ),
          acptDatetime: acptTm
            ? moment(acptTm).format("YYYY/MM/DD HH:mm")
            : null,
          totalAmt: memberChrgTotal + tieupChrgTotal,
          billAmtTotal: memberChrgTotal + tieupChrgTotal - boneSbsidChrgTotal,
          billAmtTotalPstgIn: _.get(
            data,
            "orderPublicStayDetail.acpt.billAmtTotalPstgIn",
            ""
          ),
          pstg: _.get(data, "orderPublishStayDetail.acpt.pstg", ""),
          priceRemarks: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].stayAcptDtl.priceRemarks",
            null
          ),
          totalAdult:
            _.get(
              data,
              "orderPublicStayDetail.acptDtlList[0].acptPrticPublicStayGetList[0].stayRoomDayPrticList[0].adultTotalHeadCnt",
              0
            ) +
            _.get(
              data,
              "orderPublicStayDetail.acptDtlList[0].acptPrticPublicStayGetList[0].stayRoomDayPrticList[0].vistrAdultTotalHeadCnt",
              0
            ),
          totalChild:
            _.get(
              data,
              "orderPublicStayDetail.acptDtlList[0].acptPrticPublicStayGetList[0].stayRoomDayPrticList[0].chldHeadCnt",
              0
            ) +
            _.get(
              data,
              "orderPublicStayDetail.acptDtlList[0].acptPrticPublicStayGetList[0].stayRoomDayPrticList[0].vistrChldHeadCnt",
              0
            ),
          checkInTm: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].othInfo.ckinSchDatetime",
            null
          ),
          boneSbsidChrgTotal: boneSbsidChrgTotal,
          outsideSysCd: _.get(
            data,
            "orderPublicStayDetail.acptDtlList[0].menuBasicInfo.outsideSysCd",
            null
          )
        };
        this.paymentInfo = {
          totalAmt: memberChrgTotal + tieupChrgTotal,
          sbsidTotal: boneSbsidChrgTotal,
          cafeAmtTotal: this.cafeAmtTotal,
          boneSbsidChrgTotal: this.boneSbsidChrgTotal,
          pointUse: this.pointUse,
          billAmtTotal: memberChrgTotal + tieupChrgTotal - boneSbsidChrgTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pstg: this.pstg,
          endDate: this.endDate,
          pointGrntNumAmt: _.get(
            data,
            "orderPublicStayDetail.acpt.pointGrntNumAmt",
            null
          )
        };
        this.customerInfo = {
          emailAddress: _.get(
            data,
            "orderPublicStayDetail.customer.email",
            null
          ),
          tel: _.get(data, "orderPublicStayDetail.customer.tel", null),
          postalCode: _.get(
            data,
            "orderPublicStayDetail.customer.postalCode",
            null
          ),
          address1: _.get(
            data,
            "orderPublicStayDetail.customer.address1",
            null
          ),
          address2: _.get(
            data,
            "orderPublicStayDetail.customer.address2",
            null
          ),
          familyName: _.get(
            data,
            "orderPublicStayDetail.customer.familyName",
            null
          ),
          firstName: _.get(
            data,
            "orderPublicStayDetail.customer.firstName",
            null
          )
        };
        this.getCouponUsedDetail();
      }
    },
    async handleResponseDataDp(data, extSystemCd) {

      if (data) {
        const acptDP = extSystemCd === this.CONST.EXT_SYSTEMCD.ANA ? data?.acptDtlANA : data?.acptDtlJR;
        this.menuNo = _.get(acptDP,"acptDtl.menuNo", "");
        this.planId =   _.get(acptDP,"acptDtl.planId", "");
        // this.roomId = _.get(
        //   data,
        //   "acpt.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList[0].stayRoomDayPrtic.roomId",
        //   ""
        // );
        this.sbsidRsvList = _.get(acptDP,"sbsidRsvList", []);
        this.companyCd = _.get(data, "customer.companyCd", "");
        const checkInTm = acptDP?.acptDtl?.useDate || "";
        if (checkInTm) {
          this.useDate = moment( acptDP?.acptDtl?.useDate || "").format("YYYY/MM/DD");
          this.nightCnt = _.get(acptDP,"stayAcptDtl.nightCnt", null);
          if (this.useDate && this.nightCnt) {
            const date = new Date(this.useDate);
            date.setDate(date.getDate() + this.nightCnt);
            this.endDate = moment(date).format("YYYY/MM/DD");
          }
        }
        const acptTm = _.get(data, "acpt.acptDatetime", null);
        this.totalAmt = _.get(data, "acpt.totalAmt", "");
        this.sbsidTotal = _.get(acptDP,"dtlChrgTotal.sbsidTotal", "");
        this.cafeAmtTotal = _.get(acptDP,"dtlChrgTotal.cafePointAmtTotal", ""); 
        this.pointUse = _.get(acptDP,"dtlChrgTotal.pointUse", "");
        this.boneSbsidChrgTotal = _.get(acptDP,"dtlChrgTotal.boneSbsidChrgTotal", "");
        this.billAmtTotal = _.get(data, "acpt.billAmtTotal", "");
        this.billAmtTotalPstgIn = _.get(data, "acpt.billAmtTotalPstgIn", "");
        this.pstg = _.get(data, "acpt.pstg", "");
        this.rpsntFamilyNmKana = _.get(data, "customer.familyName", "");
        this.rpsntFirstNmKana = _.get(data, "customer.firstName", "");
        if (this.rpsntFamilyNmKana && this.rpsntFirstNmKana) {
          this.fullName = `${this.rpsntFamilyNmKana} ${this.rpsntFirstNmKana}`;
        } else if (this.rpsntFamilyNmKana && !this.rpsntFirstNmKana) {
          this.fullName = this.rpsntFamilyNmKana;
        } else if (!this.rpsntFamilyNmKana && this.rpsntFirstNmKana) {
          this.fullName = this.rpsntFirstNmKana;
        } else {
          this.resrvFamilyNmKana = _.get(
            data,
            "customer.familyNameKana",
            ""
          );
          this.resrvFirstNmKana = _.get(
            data,
            "customer.firstNameKana",
            ""
          );
          if (this.resrvFamilyNmKana && !this.resrvFirstNmKana) {
            this.fullName = this.resrvFamilyNmKana;
          }
          if (!this.resrvFamilyNmKana && this.resrvFirstNmKana) {
            this.fullName = this.resrvFirstNmKana;
          }
          if (this.resrvFamilyNmKana && this.resrvFirstNmKana) {
            this.fullName = this.resrvFamilyNmKana + this.resrvFirstNmKana;
          }
        }
        this.dataMail = {
          menuNo: acptDP?.menuBasicInfo?.menuNo || "",
          menuNm: acptDP?.menuBasicInfo?.menuNm || "",
          planId: acptDP?.planBasicInfo?.planId || "",
          planNm: acptDP?.planBasicInfo?.planNm || null,
          catSmlClassCd: acptDP?.menuBasicInfo?.catSmlClassCd || null,
          catMidClassCd: acptDP?.menuBasicInfo?.catMidClassCd || null,
          catLrgClassCd: acptDP?.menuBasicInfo?.catLrgClassCd || null,
          catExlClassCd: acptDP?.menuBasicInfo?.catExlClassCd || null,
          memberName: this.fullName,
          roomId: "",
          typeShare: 2
        };
        this.cardObj = {
          acptNo: this.acptNo,
          acptDatetime: acptTm ? moment(acptTm).format("YYYY/MM/DD") : null,
          menuNo: _.get(acptDP,"acptDtl.menuNo", null),
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pointGrntNumAmt: _.get(data, "acpt.pointGrntNumAmt", null),      
          menuThumbnail: _.get(this.menuBasicInfo, "menuImages[0].imageUrl", ""),
          // TODO resrvSts
          reserveSts:  _.get(acptDP,"stayAcptDtl.resrvSts", null),

          dtlSts: _.get(acptDP,"acptDtl.dtlSts", null),
          checkInDate: this.useDate,
          checkOutDate: this.endDate,
          cancelCloseUpDay: null,
          cancelCloseUpTime: null,
          webCancelAvailDiv: null,
          srvicDiv: this.srvicDiv,
          lotteryInfo: {},
          lotteryResult: null,
          useDate: moment( _.get(acptDP,"acptDtl.useDate", "")).format("YYYY/MM/DD"),
          pointGrntDate: acptDP?.pointGrntInfo?.pointGrntDate ? moment(acptDP?.pointGrntInfo?.pointGrntDate || "").format("YYYY/MM/DD"): null
        };
        
        this.applicationDetail = {
          acptDtlNo: _.get(acptDP,"acptDtl.acptDtlNo", null),
          travelBranchNo: _.get(acptDP,"acptDtl.travelBranchNo", null),
          menuNo: _.get(acptDP,"acptDtl.menuNo", null),
          payType: _.get(acptDP,"acptDtl.payeeDiv", null),
          planId:  _.get(acptDP,"acptDtl.planId", ""), 
          planNm:  _.get(acptDP,"planBasicInfo.planNm", null),
          planLeadCopy: _.get(acptDP,"planBasicInfo.planLeadCopy", null),
          pointGrntNumAmt: _.get(data, "acpt.pointGrntNumAmt", null),
          useDate: _.get(acptDP,"acptDtl.useDate", null),
          endDate: this.endDate,
          fullName: this.fullName,
          nightCnt: _.get(acptDP,"stayAcptDtl.nightCnt", null),
          totalPeople: _.get(acptDP,"acptDtl.useHeadCnt", null),
          acptDatetime: acptTm
            ? moment(acptTm).format("YYYY/MM/DD HH:mm")
            : null,
          totalAmt: this.totalAmt,
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pstg: this.pstg,
          cponStartDatetime: null,
          cponEndDatetime: null,
          cautContList: _.get(acptDP,"cautContList", null),
          usePoint: null,
          exchangeToPoint: null,
          acptLifeAnswerList: null,
          acptPrticList:  _.get(acptDP,"acptPrticList", null),
          outsideSysCd: _.get(acptDP,"menuBasicInfo.outsideSysCd", null)
        };
        this.paymentInfo = {
          totalAmt: this.totalAmt,
          sbsidTotal: this.sbsidTotal,
          cafeAmtTotal: this.cafeAmtTotal,
          boneSbsidChrgTotal: this.boneSbsidChrgTotal,
          pointUse: this.pointUse,
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pstg: this.pstg,
          endDate: this.endDate,
          pointGrntNumAmt: _.get(data, "acpt.pointGrntNumAmt", null)
        };
        this.customerInfo = {
          emailAddress: _.get(data, "customer.email", null),
          tel: _.get(data, "customer.tel", null),
          postalCode: _.get(data, "customer.postalCode", null),
          address1: _.get(data, "customer.address1", null),
          address2: _.get(data, "customer.address2", null),
          familyName: _.get(data, "customer.familyName", null),
          firstName: _.get(data, "customer.firstName", null)
        };
        this.getCouponUsedDetail();
      }
    },
    async getSubsidyCoupons() {
      let subsidyAvailables = await this.$repositories("orders")
        .getSubsidyCouponList({
          displayDiv: this.CONST.DISPLAY_DIV.RESERVATION
        })
        .catch((error) => {
          return error;
        });
      if (!subsidyAvailables || !Array.isArray(subsidyAvailables)) {
        subsidyAvailables = [];
      }
      return subsidyAvailables;
    },
    async getCouponUsedDetail() {
      let fullName = "";
      let gender = "";
      const dataProfile = await this.$repositories("orders").getProfileInfo();
      if (dataProfile) {
        this.dataProfile = dataProfile;
        fullName = dataProfile.familyName + dataProfile.firstName;
        gender = dataProfile.sex ? "女性" : "男";
      }
      const subsidyAvailables = await this.getSubsidyCoupons();
      const sbsidRsvList = this.sbsidRsvList;

      let subsidyAvailablesTmp = _.cloneDeep(subsidyAvailables);
      // let couponData = [];
      let priceList = [];

      const orderSbsdIds = sbsidRsvList.map((item) => item.subsidyDetailId);
      const couponData = subsidyAvailablesTmp.filter((c) =>
        orderSbsdIds.includes(c.availableData.subsidyDetailId)
      );

      /**
       * Lấy list relationship ra
       */
      let relationshipPd = couponData.length
        ? couponData[0]?.scrennDisplayItemList?.relationshipPd.valueList
        : [];

      relationshipPd = relationshipPd.map((rel) => {
        const splited = rel.split("|");
        return {
          relationshipName: splited[0],
          relationshipId: splited[1],
          relationshipLevel: splited[2]
        };
      });

      let subsidyList = [];
      couponData.forEach((item) => {
        const data = {
          subsidyDetailId: item.availableData.subsidyDetailId,
          dispSubsidyNm: item.availableData.dispSubsidyNm,
          requestType: item.availableData.requestType,
          priceList: item.availableData.priceList,
          fullName: fullName,
          gender: gender
        };
        subsidyList.push(data);
      });

      subsidyList = subsidyList.map((subsidy) => {
        const appliedPrices = [];

        sbsidRsvList.forEach((itemS) => {
          const relationship = relationshipPd.find(
            (i) => i.relationshipId === itemS.relationship
          );
          if (subsidy.subsidyDetailId === itemS.subsidyDetailId) {
            if (relationship.relationshipId === this.CONST.RELATIONSHIP_ID.SELF) {
              // CHINH CHU
              const filterPrices = subsidy.priceList.filter(
                (itemP) =>
                  itemP.ageType === itemS.ageDiv &&
                  itemP.priceType === COUPON_PRICE_TYPE.OWNER
              );
              let price = null;
              if (filterPrices.length) {
                price = filterPrices[0];
                price["relationshipName"] = relationship.relationshipName;
              } else {
                // DONG GIA
                const filterPrices = subsidy.priceList.filter(
                  (itemP) =>
                    itemP.ageType === itemS.ageDiv &&
                    itemP.priceType === COUPON_PRICE_TYPE.BOLT
                );
                if (filterPrices.length) {
                  price = filterPrices[0];
                  price["relationshipName"] = relationship.relationshipName;
                }
              }

              if (price) {
                appliedPrices.push({ ...price, ...itemS });
              }
            } else if (
              relationship.relationshipLevel >= 0 &&
              relationship.relationshipLevel < 9
            ) {
              // GIA DINH
              const filterPrices = subsidy.priceList.filter(
                (itemP) =>
                  itemP.ageType === itemS.ageDiv &&
                  itemP.priceType === COUPON_PRICE_TYPE.FAMILY
              );
              let price = null;
              if (filterPrices.length) {
                price = filterPrices[0];
                price["relationshipName"] = relationship.relationshipName;
              } else {
                // DONG GIA
                const filterPrices = subsidy.priceList.filter(
                  (itemP) =>
                    itemP.ageType === itemS.ageDiv &&
                    itemP.priceType === COUPON_PRICE_TYPE.BOLT
                );
                if (filterPrices.length) {
                  price = filterPrices[0];
                  price["relationshipName"] = relationship.relationshipName;
                }
              }
              if (price) {
                appliedPrices.push({ ...price, ...itemS });
              }
            }
          }
        });

        subsidy.priceList = appliedPrices;
        return subsidy;
      });

      this.couponUsedDetail = subsidyList;
    },
    getShippingTarget(acptNo) {
      return this.shippingInfoList?.find(item =>
        item.acptNo == acptNo
      );
    },
    async getShippingDetail(){
      await this.$repositories("orders")
            .getShippingTargetInfoList()
            .then(
              (res) => {
                this.shippingInfoList = res?.shippingTargetInfoList
              },
              (error) => {
                this.$toasted.error(error);
              }
            );

      const shippingTargetInfo = this.getShippingTarget(this.acptNo);
      if (!shippingTargetInfo) {
        return;
      }
      const arngeKey = shippingTargetInfo.arngeKey;
      await this.$repositories("orders")
            .getShippingDetail(arngeKey)
            .then(
              (res) => {
                this.shippingDetail = res.shippingDetail
              },
              (error) => {
                this.$toasted.error(error);
              }
            );
    },
    async checkShowDelivery() {
      // 宿泊の場合は配送先情報非表示
      if (this.srvicDiv.substring(0, 1) === "A") {
        this.shippingDisplayFlg = false;
        return;
      }
      if (this.srvicDiv.substring(0, 1) === "C") {
        if(this.shippingDetail && Number(this.shippingDetail.shippingFlag) === 1) {
          this.shippingDisplayFlg = true;
        } else {
          this.shippingDisplayFlg = false;
        }
        return;
      }
      const serviceParam = await this.$repositories('orders').getQstnLife(this.menuNo, this.planId, this.applicationDetail.usageDiv);
      // BFFコールでエラーになった場合は配送先情報非表示
      if (serviceParam.status && serviceParam.status == 500) {
        this.shippingDisplayFlg = false;
        return;
      }

      // デジチケ、デジポン、ポイント交換の場合は配送先情報非表示
      const shippingFlag = serviceParam?.applInfo?.shippingFlag || 0;
      const planUsageDiv = serviceParam?.planUsage?.usageDiv;
      if (
        planUsageDiv == this.CONST.USAGE_DIV.DIGITAL_COUPON ||
        planUsageDiv == this.CONST.USAGE_DIV.DIGITAL_TICKET ||
        planUsageDiv == this.CONST.USAGE_DIV.POINT_REDEMPTION ||
        shippingFlag == 0
      ) {
        this.shippingDisplayFlg = false;
        return;
      }
      this.shippingDisplayFlg = true;
    }
  },
  watch: {
    $route() {
      this.setBreadcrumb();
    }
  }
};
</script>

<style scoped lang="scss">
.p-mypage-order-detail-l-container {
  &.p-mypage-order-detail-l-container-extend {
    @apply md:px-0;
  }

  .box-right-extend {
    margin: 0.5rem;
    box-shadow: 0px 0px 8px #00000029;
    padding: 2rem 2.5rem;
    @include mq() {
      padding: 1.25rem 0.75rem;
    }
  }
}
</style>
