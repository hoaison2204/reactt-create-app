<template>
  <div class="p-mypage-order-detail-l-container p-mypage-order-detail-l-container-extend">
    <div class="p-mypage-order-detail">
      <div class="right-container">
        <div class="box-right box-right-extend">
          <CardMenuGC
            :mypageBoCode="mypageBoCode"
            @gotoMap="scrollToMap($event)"
            class="card-menu"
            :cardObj="cardObj"
            :dataMail="dataMail"
            :extSystemCd="menuBasicInfo&&menuBasicInfo.extSystemCd"
            v-model="applicationDetail"
            :reserveSetting="reserveSetting"
            :cancelPolicy="cancelPolicy"
            :isShowBtnCancel="isShowBtnCancel"
          />

          <!-- お申し込み情報 -->
          <ApplicationDetailsGC
            v-model="applicationDetail"
            :mypageDisplayCode="mypageDisplayCode"
            :customerInfo="customerInfo"
            :grmAcptDtl="grmAcptDtl"
            :grmacptPrticList="grmacptPrticList" />
          <QuestionsFromShopDataGC :grmQstnReplyList="grmQstnReplyList" :grmPlanPrtic="grmPlanPrtic" />

          <!-- 配送先情報 -->
          <div v-if="shippingDisplayFlg">
            <ShippingInfomation :shippingInfo="shippingDetail" />
          </div>

          <!-- 支払情報及びキャンセル規約。国内宿泊以外の宿泊は表示しない -->
          <template v-if="!isPublicStay">

            <div class="divider -mx-10 lg:-mx-3 mb-8 md:mb-6" />

            <PaymentInforGC
              :cancelPolicy="cancelPolicy"
              :paymentInfo="paymentInfo"
              :menuNo="menuNo"
              :planId="planId"
            />
          </template>

          <div class="pt-8 md:pt-5 mb-3 md:mb-0 w-full text-center" v-if="isCancelable()">
            <div class="bottom-content cancel-policy-check">
              <div>
                <label class="c-checkbox__inner">
                  <input
                    type="checkbox"
                    value="hasTransfer"
                    v-model="conditionNext"
                  />
                  <span class="c-checkbox__box" />
                  <span class="c-checkbox__label"
                    >キャンセル規定を確認しました。</span
                  >
                </label>
              </div>
            </div>
            <button
              class="card-menu-btn-base"
              :class="conditionNext && !cancelBtnDisable() ? '' : 'bg-gray-500 pointer-events-none' "
              @click="handleNext()"
            >
              <span>申込みをキャンセルする</span>
            </button>
          </div>
        </div>

        <div
          class="meta-item-back ml-2 mt-4 text-sm cursor-pointer"
          @click="handleBack()"
        >
          <Icon name="arrow_left" color="red" />
          <a class="back-link">お申込み内容詳細に戻る</a>
        </div>
      </div>
    </div>

    <!-- 確認モーダル -->
    <Modal ref="popUPCancelConfirm" @close="hideCancelConfirmModal()">
      <div class="cancel-confirm-modal-contents">
        <div class="title ">キャンセル確認</div>
        <div class="msg">
          予約をキャンセルします。<br>
          よろしいですか？
        </div>
        <div class="btn-wrapper">
          <button @click="hideCancelConfirmModal('popUPCancelConfirm')" class="c-btn cancel-btn">
            <span class="">閉じる</span>
          </button>
          <button @click="clickCancelConfirmSendBtn()" class="c-btn send-btn">
            <span class="mr-0">キャンセルを確定する</span>
          </button>
        </div>
      </div>
    </Modal>
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
      pstg: null,
      cancelPolicy: null,
      isShowBtnCancel: false,
      pointGrntNumAmt: null,
      isPublicStay: false,
      applicationDetail: {
        acptDtlNo: null,
        planNm: null,
        planLeadCopy: null,
        pointGrntNumAmt: null,
        useDate: null,
        endDate: null,
        fullName: null,
        acptDatetime: null,
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
        usePoint: null,
        exchangeToPoint: null,
        acptLifeAnswerList: [],
        stayPlanQstnReplyList: []
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
        url: null
      },
      cardObj: {
        acptNo: null,
        acptDtlNo: null,
        acptDatetime: null,
        menuNo: null,
        billAmtTotal: null,
        billAmtTotalPstgIn: null,
        pointGrntNumAmt: null,
        reserveSts: null,
        dtlSts: null,
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
        stayPlanCancelPrticList: null,
        pointGrntDate: null
      },
      paymentInfo: {
        totalAmt: null,
        sbsidTotal: null,
        cafeAmtTotal: null,
        boneSbsidChrgTotal: null,
        pointUse: null,
        billAmtTotal: null,
        billAmtTotalPstgIn: null,
        pstg: null,
        endDate: null,
        pointGrntNumAmt: null
      },
      customerInfo: {
        emailAddress: null,
        postalCode: null,
        address1: null,
        address2: null,
        tel: null,
        familyName: null,
        firstName: null
      },
      couponUsedDetail: null,
      sbsidRsvList: [],
      dataProfile: null,
      repFullName: null,
      shippingInfoList: [],
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
          sendWayNm: undefined
        }
      },
      shippingDisplayFlg: false,
      menuBasicInfo: null,
      conditionNext: false,
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
    },
    formattedUseTime() {
      if (!this.cardObj.useTime) return "";
      if (this.cardObj.useTime.includes(":")) return this.cardObj.useTime;
      const useTime = this.cardObj.useTime;
      return `${useTime.substr(0, 2)}:${useTime.substr(2, 2)}`;
    },
    formattedUseDateTime() {
      return `${this.cardObj.useDate} ${this.formattedUseTime}`;
    },
    orderStatus(){
      const data = _.get(this.orderDetail, "acpt.acptDtlList[0]", {});
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
  },
  mounted() {
    this.setBreadcrumb();
    const { isPublicStay } = this.$route.query;
    this.isPublicStay = JSON.parse(isPublicStay);
    this.srvicDiv = this.$route.query.srvicDiv;
    this.menuNo = this.$route?.params?.id || '';

    this.getOrderInfo();
    this.$page.isTitle = true;
  },
  destroyed() {
    const fromListOrder = false;
  },
  methods: {
    cancelBtnDisable () {
      const disabledCancelButtonStatuses = ["手配不可", "キャンセル"];
      return disabledCancelButtonStatuses.includes(this.orderStatus);
    },
    isCancelable() {
      if (this.reserveSetting?.webReserveAvailFlag === "1") {
        const today = moment();
        const useDate = new Date(this.formattedUseDateTime);
        const useDate2 = new Date(this.formattedUseDateTime);

        if (useDate > today) {
          // キャンセル料が発生するかどうか
          if (this.cancelPolicy) {
            // 特別プラン有無チェック
            let cancelPolicyList = this.cancelPolicy.filter((item) => 
              item.planId === this.dataMail?.planId
            )
            if(cancelPolicyList.length == 0){
              cancelPolicyList = Array.from(this.cancelPolicy);
            }
            let sttDayMax = 0;
            for (let i = 0; i < cancelPolicyList.length; i++) {
              if (sttDayMax < cancelPolicyList[i].cancelPolicySttDay) {
                sttDayMax = cancelPolicyList[i].cancelPolicySttDay
              }
            }
            const webCancelSttDate = useDate.setDate(useDate.getDate() - sttDayMax);
            if (webCancelSttDate < today) {
              // キャンセル料が発生している場合
              return false;
            }
          }
          // WEBキャンセル手仕舞日より前か
          const webCancelSunDate = useDate2.setDate(useDate2.getDate() - this.reserveSetting.webCancelSun);
          if (webCancelSunDate < today) {
            // WEBキャンセル手仕舞日を過ぎている場合
            return false;
          }
        }
        return true;
      } else {
        // WEBキャンセル不可のプランの場合
        return false;
      }
    },
    setBreadcrumb() {
      const { menuNo, acptNo, srvicDiv, isPublicStay, boCode } = this.$route.query;
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("申込履歴", "/mypage/orders")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("申込内容詳細", `/mypage/orders/${menuNo}?acptNo=${acptNo}&srvicDiv=${srvicDiv}&isPublicStay=${isPublicStay}&boCode=${boCode}`)
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("キャンセル内容確認")
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
    getOrderInfo() {
      const { acptNo, outsideResrvId } = this.$route.query;
      this.acptNo = acptNo;
      this.srvicDiv = this.$route.query.srvicDiv;

      if (this.isGCService(this.mypageDisplayCode)) {
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
    handleBack() {
      const { menuNo, ...rest } = this.$route.query;
      this.$router.push({ path: `/mypage/orders/${menuNo}`, query: rest });
    },
    async handleResponseData(data) {
      if (data) {
        this.orderDetail = data;
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
          this.useTime = _.get(data, "acpt.acptDtlList[0].useTime", "");
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
        const topPath = this.topDomain;
        this.dataMail.url = topPath 
                            + "/menus/catExl=" + this.dataMail.catExlClassCd 
                            + "/catLrg=" + this.dataMail.catLrgClassCd 
                            + "/catMid=" + this.dataMail.catMidClassCd 
                            + "/catSml=" + this.dataMail.catSmlClassCd 
                            + "/menuNo=" + this.dataMail.menuNo 
                            + "/plans/planId=" + this.dataMail.planId;
        this.cardObj = {
          acptNo: this.acptNo,
          acptDatetime: acptTm ? moment(acptTm).format("YYYY/MM/DD") : null,
          menuNo: _.get(data, "acpt.acptDtlList[0].menuNo", null),
          billAmtTotal: this.billAmtTotal,
          billAmtTotalPstgIn: this.billAmtTotalPstgIn,
          pointGrntNumAmt: _.get(data, "acpt.pointGrntNumAmt", null),
          menuBasicInfo: _.get(data, "acpt.acptDtlList[0].menuBasicInfo", null),
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
          useTime:  _.get(data, "acpt.acptDtlList[0].useTime", ""),
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
          useTime: _.get(data, "acpt.acptDtlList[0].useTime", null),
          useDatetime: this.formattedUseDateTime,
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
          outsideSysCd: _.get(data, "acpt.acptDtlList[0].menuBasicInfo.outsideSysCd", null)
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
          firstName: _.get(data, "acpt.customer.firstName", null)
        };

        if (this.isGCService(this.mypageDisplayCode)) {
          this.grmAcptDtl = _.get(data, "acpt.acptDtlList[0].grmAcptDtl", null)
          this.grmQstnReplyList = _.get(data, "acpt.acptDtlList[0].grmQstnReplyList", null);
          this.grmPlanPrtic = _.get(data,"acpt.acptDtlList[0].grmPlanPrtic",null)
          this.grmacptPrticList = _.get(data,"acpt.acptDtlList[0].acptPrticList[0]",null)
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
          // キャンセル規定
          this.cancelPolicy = Array.from(data.gourmetCancelPolicy);
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

      const serviceParam = await this.$repositories('orders').getQstnLife(this.menuNo, this.planId);
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
    },
    /**
     * 申込をキャンセルするボタン押下時の処理
     */
    handleNext() {
      if (!this.conditionNext) {
        return;
      }
      this.shoCancelConfirmwModal('popUPCancelConfirm');
    },
    /**
     * キャンセル確認モーダルを表示する
     */
    shoCancelConfirmwModal(name) {
      this.$refs[name].show();
    },
    /**
     * キャンセル確認モーダルを閉じる
     */
    hideCancelConfirmModal(name) {
      this.$refs[name].hideModal();
    },
    /**
     * キャンセル確認モーダル「送信する」ボタン押下時の処理
     */
    clickCancelConfirmSendBtn() {
      this.cancelOrderGC();
    },
    /**
     * グルメクーポンのキャンセル処理
     */
    cancelOrderGC() {
      this.$loading.startProcessing();
      this.$repositories("orders")
        .cancelOrderGC(this.acptNo)
        .then(
          (response) => {
            if (response) {
              this.$loading.finishProcessing();
              if(response?.isError){
                // 失敗の場合(宿泊の処理を流用)
                const error = response?.data 
                try { 
                  const messageError = JSON.parse(_.get(error, 'error.message', null)) || null    
                  if(typeof error === 'object' && error.statusCode === 400 && error.message){
                    this.$toasted.error(error?.message)

                  } else if(messageError && Array.isArray(messageError) ){
                    let errorText =  ''
                    messageError.forEach((error)=>{
                    errorText += `${error?.errorMsg} <br> `
                    })
                    this.$toasted.error(errorText);                             
                  } else if (typeof error === 'object' && error.errorDetail){
                    this.$toasted.error(error?.errorDetail)
                  } else {
                    this.$toasted.error('キャンセルに失敗しました')
                  }
                } catch (error) {
                  this.$toasted.error('キャンセルに失敗しました')
                }                
            } else {
              // 成功の場合
                this.successCancelOrderGC(response);               
              }
            }
          },
          // eslint-disable-next-line no-unused-vars
          (error) => {
            // 失敗の場合(宿泊の処理を流用)
            this.$loading.finishProcessing();
            try { 
              const messageError = JSON.parse(_.get(error, 'error.message', null))                            
              if(messageError && Array.isArray(messageError) ){
                let errorText =  ''
                messageError.forEach((error)=>{
                  errorText += `${error?.errorMsg} <br> `
               })
                this.$toasted.error(errorText);
              } else if (typeof error === 'object' && error.errorDetail){
                this.$toasted.error(error?.errorDetail)
              } else {
              this.$toasted.error('キャンセルに失敗しました')
              }
            } catch (error) {
              this.$toasted.error('キャンセルに失敗しました')
            }
          }
        );
    },
    /**
     * グルメクーポンのキャンセル処理が成功した場合
     */
    successCancelOrderGC(response) {
      const cancelNo = _.get(response, "data.cancelNo","") || "";
      this.$store.commit("orders/cancelNo", cancelNo);
      const query = this.$route.query;
      const menuNo = this.menuNo;
      query.menuNo = menuNo;
      this.$router.push({ path: "/mypage/cancel-complete-gourmet", query }); 
    },
  },
  watch: {
    $route() {
      this.setBreadcrumb();
    }
  }
};
</script>

<style scoped lang="scss">
@import "./styles.scss";

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

.cancel-policy-check {
  margin: 2rem 0;
}

.card-menu-btn-base {
  @apply h-12 md:h-9 w-96 md:w-80 font-bold text-white rounded;
  background-color: #E60021;
}

::v-deep .c-modal__inner {
  height: auto;
  width: 50%;
  position: absolute;
  top: 7%;
}
.cancel-confirm-modal-contents {
  .msg {
    width: 100%;
    font-size: 1rem;
    color: #1f2021;
    text-align: center;
    padding-bottom: 2rem;
  }

  .btn-wrapper {
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .c-btn {
    width: auto;
    &.cancel-btn {
    background-color: #fff;
    color: #63666a;
    margin-right: 1rem;
    }
  }
}
@media (max-width: 735px) {
  ::v-deep .c-modal__inner {
    width: 90%;
  }
}
</style>
