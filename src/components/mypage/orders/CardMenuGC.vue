<template>
  <article class="order-card-menu">
    <!-- キャンセル規定 -->
    <div v-if="cancelMessage && getStatusOrders !== 'キャンセル' && getStatusOrders !== '手配不可'" class="mb-5 font-color">
      <p>{{cancelMessage}}</p>
      <p>※キャンセル規定は下記をご確認ください。</p>
    </div>

    <!-- 共有ボタン/共有ダイアログ -->
    <div class="relative">
      <div class="absolute right-0">
        <!-- 共有ボタン -->
        <button
          v-if="!fromSiteUnsupported(mypageDisplayCode, 'cardMenuShareBtn')"
          class="text-xs py-1 px-2 rounded"
          style="border: 1px solid #CACCCF;"
          @click="() => { $refs['orderCardMenuShareDialog'].showModal() }"
        >
          共有
          <Icon name="action_share" />
        </button>

        <!-- 共有ダイアログ -->
        <ShareDialog
          ref="orderCardMenuShareDialog"
          :mypageDisplayCode="mypageDisplayCode"
          :dataMail="dataMail"
          :menuNo="menuNo"
          :applicationDetail="value"
          :cardObj="cardObj"
        />
      </div>
    </div>

    <!-- サムネイル、カテゴリ、手配状況カード -->
    <ItemOrder
      :imageUrl="get(cardObj, 'menuThumbnail')"
      :menuNo="get(cardObj, 'menuNo')"
      :reserveSts="getStatusOrders"
      :orderSts="reserveSts === '3' ? '' : statusOrder"
      :categoryInfomation="{
        catLrgClassNm,
        catMidClassNm,
        catSmlClassNm
      }"
      class="mb-4 md:mb-3"
    >
      <template #item-order-hotel-data-bottom>
        <!-- PC時メニュータイトル -->
        <h2 v-if="menuNm" class="mt-4 font-bold text-xl md:hidden">
          {{ menuNm }}
        </h2>
      </template>
    </ItemOrder>

    <!-- SP時メニュータイトル -->
    <h2 v-if="menuNm" class="hidden md:block font-bold text-base mb-2">
      {{ menuNm }}
    </h2>

    <!-- プラン情報テーブル -->
    <div class="information-grid-table">
      <!-- 合計 -->
      <template v-if="cardObj && Number.isInteger(cardObj.billAmtTotal)">
        <span>合計</span>
        <span>
          ：{{ cardObj.billAmtTotal | formatCurrency }}
        </span>
      </template>
      
      <!-- 申込日 -->
      <template v-if="cardObj && cardObj.acptDatetime">
        <span>申込日</span>
        <span>：{{ cardObj.acptDatetime | formatDate("YYYY/MM/DD") }}</span>
      </template>
      
      <!-- 予約番号表示 | 受付番号表示 -->
      <template v-if="cardObj && cardObj.acptNo">
      <span>{{ getAcptNoLabel }}</span>
        <span>：{{ cardObj.acptNo }}</span>
      </template>
    </div>

    <!-- メニューボタン集 -->
    <div class="menu-btn-list">
      <button
        v-if="isCancelBtnDisp === true && isShowBtnCancel === true"
        @click="gotoPath(0);showPopupAttach()"
        class="menu-btn"
        :disabled="isCancelBtnDisable"
      >
        <span>
          お申込みをキャンセルする
        </span>
        <Icon name="arrow_right" color="#E60021" />
      </button>

    </div>

    <div class="divider -mx-10 lg:-mx-3 mb-8 md:mb-5" />

    <footer class="flex justify-center gap-14 md:gap-5 mb-8 md:mb-5">
      <div
        @click="goLine(1)"
        tabindex="0"
        @keydown.enter="goLine(1)"
        class="flex md:flex-col items-center cursor-pointer"
      >
        <span>お申込み情報</span>
        <Icon name="arrow_down" />
      </div>

      <div
        @click="goLine(2)"
        tabindex="0"
        @keydown.enter="goLine(2)"
        class="flex md:flex-col items-center cursor-pointer"
      >
        <span>お支払い情報</span>
        <Icon name="arrow_down" />
      </div>

      <div
        @click="goLine(3)"
        v-if="checkShowCancelInfor"
        tabindex="0"
        @keydown.enter="goLine(3)"
        class="flex md:flex-col items-center cursor-pointer"
      >
        <span>キャンセル規定</span>
        <Icon name="arrow_down" />
      </div>
    </footer>
  </article>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import downLoadMixin from "../../../mixins/download";
import func_utils from '@/mixins/func_utils'
import CompanionModal from '@/components/companion/CompanionModal.vue'


export default {
  components: { CompanionModal },
  props: {
    cardObj: {
      type: Object
    },
    isShowBtnCancel: {
      type: Boolean,
      default: false
    },
    dataMail: {
      type: Object
    },
    value: {
      type: Object
    },
    extSystemCd: {
      type: String,
      default: ''
    },
    // webキャンセル可否
    reserveSetting: {
      type: Object,
      default: () => {}
    },
    cancelPolicy: {
      type: Array,
      default: () => []
    },
  },
  mixins: [func_utils],
  data() {
    return {
      companionInfomations: [{
        id: 1,
        lastName: "",
        firstName: "",
        email: "",
        valid: {
          lastName: false,
          firstName: false,
          email: false
        },
      }],
      visible: {
        type: Boolean,
        default: true
      },
      arngeStatus: null,
      lotteryInfo: null,
      judgeResult: null,
      orderDetail: null,
      menuThumbnail: null,
      menuNo: null,
      catInfo: null,
      menuIcon: null,
      catLrgClassNm: null,
      catMidClassNm: null,
      catSmlClassNm: null,
      checkInDate: null,
      checkOutDate: null,
      statusOrder: null,
      reserveSts: null,
      dtlSts: null,
      showButton: true,
      cancelCloseUpDay: null,
      cancelCloseUpTime: null,
      webCancelAvailDiv: null,
      menuNm: null,
      lotteryObj: {
        lotteryInfo: null,
        lotteryResult: null
      },
      srvicDiv: null,
      rating: {
        stars: 4.5
      },
      dateText: "申込日：",
      date: "0000/00/00",
      receptionNum: "受付番号：",
      phoneNumberRecept: "0000000000000",
      buttonStatus: "手配状況：成立 手配完了",
      status: "利用前",
      menuCard: {
        imgSrc: require("@/assets/images/BS_SPE_01/list.png"),
        titleTag: "カテゴリアイコン",
        menuNum: "[メニューNo.000000]",
        menuName:
          "メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー",
        total: "合計：0,000円",
        benepoGranted: "付与予定ベネポ：000ポイント",
        address: "東京都23区 > 品川・浜松町・お台場"
      },
      applyOptions: [{ text: "お申込みをキャンセルする" }],
      registerLowPrice: false,
      location: {
        areaLrgClassNm: "",
        areaMidClassNm: "",
        areaSmlClassNm: ""
      },
      isAllowCancel: true,
      visiblePopupAttachPerson: false,
      formAttach: [
        {
          firstName: "",
          familyName: "",
          email: "",
          errorFirstName: "",
          errorFamilyName: "",
          errorEmail: "",
          acptDtlNo: ""
        }
      ],
      hasError: false,
      type: 0,
      url: null,
      romSts: null,
      dtlSts: null,
      arngeStatus: null,
      ckinSchDatetime: null,
      disableApplyAgain: true,
      payeeDiv: null,
      payMethod: null,
      cancelMessage: "",
      isCancelBtnDisp: false,
      isCancelBtnDisable: false,
    };
  },
  async created() {
    const { acptNo } = this.$route.query;
    this.orderDetail = await this.$repositories("orders").getOrderDetailGC(acptNo);
  },
  mounted() {
    const { isPublicStay } = this.$route.query;
    this.isPublicStay = JSON.parse(isPublicStay);
  },
  watch: {
    cardObj: {
      deep: true,
      handler(val) {
        if (val) {
          this.getMenuDetail();
        }
        const srvicDiv = this.$route.query.srvicDiv;
        if (srvicDiv === this.CONST.SRVIC_DIV.DOMESTIC_STAY) {
          this.getAcptDatetime(val);
        }
        if (srvicDiv.startsWith("B")) {
          
          const lottery = {
            lotteryInfo: !_.isEmpty(val?.lotteryInfo)?_.get(val, "lotteryInfo", null):null,
            lotteryResult: _.get(val, "lotteryResult", null)
          };
          if (lottery) {
            this.lotteryObj = lottery;
          }
        }
      }
    },
    dataMail: {
      deep: true,
      handler(val) {
        
      }
    },
    reserveSetting: {
      deep: true,
      handler(val) {
        this.updateCancelMessage();
        this.updateCancelBtnDisable();
      }
    },
    cancelPolicy: {
      deep: true,
      handler(val) {
        this.updateCancelMessage();
        this.updateCancelBtnDisable();
      }
    }
  },
  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
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
    getStatusOrders(){
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
    /**
     * 受付番号表示テキスト。
     * 宿泊 && ベネオリ または
     * 宿泊 && ベネ楽天 または
     * 公共の宿 または
     * 宿泊以外 は '受付番号' を返す。
     * 宿泊は'予約番号' を返す。
     * @returns { string }
     * */
    getAcptNoLabel() {
      const isStay = this.srvicDiv?.startsWith('A');
      const isBeneOriginal = this.value?.outsideSysCd == null;
      const isRakutenT = this.value?.outsideSysCd === 'RakutenT';
      const isPublicAccomodation = this.srvicDiv === this.CONST.SRVIC_DIV.PUBLIC_ACCOMODATION;

      if (
        (isStay && isBeneOriginal) ||
        (isStay && isRakutenT) ||
        isPublicAccomodation ||
        !isStay
      ) {
        return '受付番号'
      } else if (isStay) {
        return '予約番号'
      }
    },
    checkShowCancelInfor(){
      return this.cardObj?.srvicDiv !== this.CONST.SRVIC_DIV.TOURS;
    }
  },
  methods: {
    // Accommondation Person
    replaceSpecialInputFirstname(item) {
      item.firstName = this.onReplaceSpecialCharNumber(item.firstName);
    },
    replaceSpecialInputFamilyname(item) {
      item.familyName = this.onReplaceSpecialCharNumber(item.familyName);
    },
    validateFirstName(item) {
      if (!item.firstName) {
        item.errorFirstName = "姓を入力してください";
        this.hasError = true;
      } else {
        item.errorFirstName = "";
      }
    },
    validateFamilyName(item) {
      if (!item.familyName) {
        item.errorFamilyName = "名を入力してください";
        this.hasError = true;
      } else {
        item.errorFamilyName = "";
      }
    },
    validateEmail(item) {
      if (!item.email) {
        item.errorEmail = "メールアドレスを入力してください";
        this.hasError = true;
      } else if (!this.validEmail(item.email)) {
        item.errorEmail = "メールアドレスの形式が不正です";
        this.hasError = true;
      } else {
        item.errorEmail = "";
      }
    },
    addPerson() {
      this.formAttach.push({
        firstName: "",
        familyName: "",
        email: "",
        errorFirstName: "",
        errorFamilyName: "",
        errorEmail: "",
        acptDtlNo: ""
      });
    },
    async sendEmail() {
      this.validateForm();
      if (!this.hasError) {
        this.acptNo = _.get(this.cardObj, "acptNo", "");
        this.acptDtlNo = _.get(this.cardObj, "acptDtlNo", "");
        await this.handleSendMail(this.acptNo, this.buildSendData());
        this.closeModal();
        this.hideModal("showPopupEmailNoti");
      }
    },
    buildSendData() {
      let sendData = [...this.formAttach];
      sendData.forEach((item) => {
        delete item.errorFirstName;
        delete item.errorFamilyName;
        delete item.errorEmail;
        item.acptDtlNo = this.acptDtlNo;
        return item;
      });
      sendData = { companionInfoList: sendData.filter((item) => item.email) };
      return sendData;
    },
    async handleSendMail(acptNo, sendData) {
      const messageSuccess = "へ招待メールを送信しました。";
      let numberAttach = "";
      for (let i = 0; i < sendData.companionInfoList.length; i++) {
        numberAttach += `同行者${i + 1}`;
        if (i < sendData.companionInfoList.length - 1) {
          numberAttach += "・";
        }
      }
      this.$loading.startProcessing();
      await this.$repositories("orders")
        .sendAddingUserEmail(acptNo, sendData)
        .then(
          (response) => {
            if (response.status == 200) {
              this.$toasted.success(numberAttach + messageSuccess);
            } else {
              this.$toasted.error("コンパニオン登録に失敗しました");
            }
            this.$loading.finishProcessing();
          },
          () => {
            this.$toasted.error("コンパニオン登録に失敗しました");
            this.$loading.finishProcessing();
          }
        )
        .catch((err) => {
          this.$loading.finishProcessing();
        });
    },
    chooseEmailNoti() {
      const anounceEmails = this.anounce_email.filter((item) => item.status);
      this.anounceEmails = anounceEmails;
      this.hideModal("showPopupEmailNoti");
    },
    editNotification() {
      this.showModal("showPopupEmailNoti");
    },
    showModal(name) {
      this.$refs[name].showModalCompanion();
    },
    hideModal(name) {
      this.$refs[name].hideModal();
    },
    closeModal() {
      this.formAttach = [];
      this.formAttach = [
        {
          firstName: "",
          familyName: "",
          email: "",
          acptDtlNo: ""
        }
      ];
    },
    validateForm() {
      this.hasError = false;
      this.formAttach.forEach((item) => {
        this.validateFirstName(item);
        this.validateFamilyName(item);
        this.validateEmail(item);
      });
    },
    showPopupAttach() {
      this.visiblePopupAttachPerson = true;
    },
    async getPublicStayGuide() {
      const acptNo = this.cardObj.acptNo;
      const data = {
        // staffNm: "string"
      };
      this.$repositories("orders")
        .getPublicStayGuide(acptNo, data)
        .then(
          (response) => {
            const pdfFilePath = _.get(response, "pdfFilePath", "");
            downLoadMixin.$_downloadPdfUrlMixin(pdfFilePath);
          },
          (error) => {
            this.$toasted.error(error?.message);
          }
        );
    },
    getMenuDetail() {
      if (this.cardObj) {
        const stayPlanCancelPrticList = _.get(
          this.cardObj,
          "cancelPolicy.cancelPolicies[0].cancelPolicyTable",
          null
        );
        let dateDiff = moment(_.get(this.cardObj, "useDate", "")).diff(
          moment(),
          "days"
        );
        if (
          !moment(_.get(this.cardObj, "useDate", "")).isSame(new Date(), "day")
        ) {
          dateDiff = dateDiff + 1;
        }
        if (stayPlanCancelPrticList) {
          for (let index = 0; index < stayPlanCancelPrticList.length; index++) {
            const element = stayPlanCancelPrticList[index];
            const dayEnd = _.get(element, "cancelPolicyEndDay", 0);
            const dayBegin = _.get(element, "cancelPolicySttDay", 0);
            const noneContactFlag = parseInt(
              _.get(element, "noneContactFlag", null)
            );
            const cancelChargeDiv = _.get(element, "cancelChargeDiv", null);
            // if (
            //   parseInt(dateDiff) >= parseInt(dayEnd) &&
            //   parseInt(dateDiff) <= parseInt(dayBegin) &&
            //   noneContactFlag === 0
            // ) {
            if (parseInt(cancelChargeDiv) === 2) {
              this.isAllowCancel = false;
              break;
            }
            // }
          }
        }
        const checkInTm = _.get(this.cardObj, "checkInDate", null);
        const checkOutTm = _.get(this.cardObj, "checkOutDate", null);
        if (checkInTm && checkOutTm) {
          this.checkInDate = moment(checkInTm).format("YYYY/MM/DD");
          this.checkOutDate = moment(checkOutTm).format("YYYY/MM/DD");
        }
        this.reserveSts = _.get(this.cardObj, "reserveSts", "");
        this.dtlSts = _.get(this.cardObj, "dtlSts", "");
        this.cancelCloseUpDay = _.get(this.cardObj, "cancelCloseUpDay", null);
        this.cancelCloseUpTime = _.get(this.cardObj, "cancelCloseUpTime", null);
        this.webCancelAvailDiv = _.get(this.cardObj, "webCancelAvailDiv", null);
        console.log("getStatusOrderの関数実行")
        this.getStatusOrder(this.checkInDate, this.checkOutDate);
        const { menuNo } = {
          menuNo: this.cardObj.menuNo
        };
        if (this.cardObj.menuBasicInfo) {
          this.menuNm = _.get(this.cardObj.menuBasicInfo, "menuNm", "");
          this.menuNo = _.get(this.cardObj.menuBasicInfo, "menuNo", "");
          this.catLrgClassNm = _.get(this.cardObj.menuBasicInfo, "catLrgClassNm", null);
          this.catMidClassNm = _.get(this.cardObj.menuBasicInfo, "catMidClassNm", null);
          this.catSmlClassNm = _.get(this.cardObj.menuBasicInfo, "catSmlClassNm", null);
        }
      }
    },
    getStatusOrder(checkInDate, checkOutDate) {
      const today = moment().format("YYYY/MM/DD");
      if (today < checkInDate) {
        this.statusOrder = "利用前";
      }
      if (today > checkOutDate) {
        this.statusOrder = "利用済み";
      }
      if (today >= checkInDate && today <= checkOutDate) {
        this.statusOrder = "利用中";
      }
      console.log(this.statusOrder)
      // this.showButtonCancel();
    },
    showButtonCancel() {
      const today = moment();
      let timeFeature = null;
      let hourTm = null;
      let minuteTm = null;
      if (this.cancelCloseUpTime) {
        hourTm = this.cancelCloseUpTime.substring(0, 2);
        minuteTm = this.cancelCloseUpTime.substring(2, 4);
      }
      if (this.cancelCloseUpDay >= 0) {
        timeFeature = moment().add(this.cancelCloseUpDay, "days");
        timeFeature.set({
          hour: hourTm,
          minute: minuteTm
        });
      }

      // convert string to time
      const currentTime = moment().unix()
      const ckinSchDatetime = moment(this.ckinSchDatetime,'H:mm').unix()
      if(this.reserveSts !== this.CONST.RESERVE_STS.CANCELED) {

        if (this.value?.outsideSysCd === 'RakutenT') {
          // 楽天の場合
          let cancelCloseUpDay = moment(this.checkInDate);
          // キャンセル手仕舞い日を加算する
          if (this.cancelCloseUpDay > 0) {
            cancelCloseUpDay.subtract(this.cancelCloseUpDay, "days");
          }
          if(this.cancelCloseUpTime) {
            cancelCloseUpDay.hour(this.cancelCloseUpTime.slice(0, 2)).minute(this.cancelCloseUpTime.slice(2));
          }
          if(moment().isBefore(cancelCloseUpDay)) {
            this.showButton = true;
          } else {
            this.showButton = false;
          }

        } else {

          if (today > timeFeature) {
            this.showButton = false;
          } else {
            this.showButton = true;
          }

          const useDate = _.get(this.cardObj, "useDate", null);
          if (moment(useDate).isSame(moment(), "day")) {
            this.showButton = true;
          }
          if (today > moment(this.checkOutDate)) {
            this.showButton = false;
          }

          if (
            today >= moment(this.checkInDate) &&
            currentTime > ckinSchDatetime &&
            today <= moment(this.checkOutDate)
          ) {
            this.showButton = false;
          }
        }
      }
      if (
        this.reserveSts === this.CONST.RESERVE_STS.CANCELED ||
        (!this.checkInDate && !this.checkOutDate)
      ) {
        this.showButton = false;
      }

    },
    shareUrl() {
      return `${location.protocol}//${location.host}/bs-02-001?menuNo=${this.menuNo}`;
    },
    goLine(index) {
      this.$emit("gotoMap", index);
    },
    gotoPath(index) {
      const query = this.$route.query;
      switch (index) {
        case 1:
          this.$router.push({ path: "/", query });
          return;
        case 0:
          if (this.webCancelAvailDiv==='2' || !this.isAllowCancel) {
            this.$toasted.error(
              "WEBからのキャンセルはできません。カスタマーセンターへお問い合わせください。"
            );
          } else {
            this.$router.push({
              path: "/mypage/cancel-confirmation-gourmet",
              query: {
                ...query,
                menuNo: this.$route.params.id
              }
            });
          }
          return;
        case 2:
          const acptNo = this.$route.query.acptNo;
          window.open(
            `https://stay.bs.st.benefit-one.inc/low-price?acptNo=${acptNo}`
          );
          return;
        case 3:
          this.$router.push({ path: "/register-rooms", query });
      }
    },
    getAcptDatetime(cardObj) {
      const acptDatetime = _.get(cardObj, "acptDatetime", "");
      const secondOfHour = 1000 * 60 * 60;
      const timeDiff = moment(acptDatetime).diff(moment()) / secondOfHour;
      if (timeDiff <= 24 && timeDiff >= -24) {
        this.registerLowPrice = true;
      }
    },
    // お申込みキャンセルボタン
    updateCancelMessage(){
      this.cancelMessage = "";
      if(this.reserveSetting?.webReserveAvailFlag === "1"){
        const today = moment(); 
        const useDate = new Date(this.formattedUseDateTime);
        const useDate2 = new Date(this.formattedUseDateTime);

        if(useDate > today){
          // キャンセル料が発生するかどうか
          if(this.cancelPolicy) {
            // 特別プラン有無チェック
            let cancelPolicyList = this.cancelPolicy.filter((item) => 
              item.planId === this.dataMail?.planId
            )
            if(cancelPolicyList.length == 0){
              cancelPolicyList = Array.from(this.cancelPolicy);
            }
            console.log("isCancelButton cancelPolicyList", cancelPolicyList);
            let sttDayMax = 0;
            for(let i=0; i < cancelPolicyList.length; i++){
              if(sttDayMax < cancelPolicyList[i].cancelPolicySttDay){
                sttDayMax = cancelPolicyList[i].cancelPolicySttDay
              }
            }
            const webCancelSttDate = useDate.setDate(useDate.getDate() - sttDayMax);
            if(webCancelSttDate < today){
              // キャンセル料が発生している場合
              this.cancelMessage = "ご指定のプランはキャンセル料が発生する為、WEBサイトからのキャンセルは受け付けておりません。店舗に直接ご連絡ください。"
            }
          }
          // WEBキャンセル手仕舞日より前か
          const webCancelSunDate = useDate2.setDate(useDate2.getDate() - this.reserveSetting.webCancelSun);
          if(webCancelSunDate < today){
            // WEBキャンセル手仕舞日を過ぎている場合
            this.cancelMessage = "WEBキャンセル受付期間を過ぎているため、店舗に直接ご連絡ください。"
          }
        }
      } else {
        // WEBキャンセル不可のプランの場合
        this.cancelMessage = "ご指定プランはWEBサイトからのキャンセルは受け付けておりません。店舗に直接ご連絡ください。"
      }
      if(this.cancelMessage){
        this.isCancelBtnDisp = false;
      } else {
        this.isCancelBtnDisp = true;
      }
    },
    updateCancelBtnDisable () {
      let tmp = this.getStatusOrders;
      if(tmp === "手配不可" || tmp === "キャンセル" || tmp === "手配完了") {
        this.isCancelBtnDisable = true;
      } else {
        this.isCancelBtnDisable = false;
      }
    },
    get: _.get
  },
};
</script>

<style lang="scss" scoped>
.modalClass {
  align-items: flex-start;
  background: #ffff
}
.font-color {
  color: red;
}

.add-companion-icon-plus {
  display: inline;
}

.header-card .right-item .c-btn.btn-sm {
  font-size: 12px;
  padding: 6px 6px;
}
.menu .right-main .btn-disable {
  background-color: #cdcdcd !important;
  color: white;
  cursor: not-allowed;
}
.menu .right-main .button-apply {
  margin-bottom: 24px;
}
.h-card-1 {
  height: 190px !important;
}
.h-card-2 {
  height: 225px !important;
}
:deep() .n-card__content {
  @apply sm:px-2;
}
.form-attach {
  border: rgb(134, 132, 132) 1px solid;
  padding: 10px;
  @apply mb-3;

  .validation-error {
    border: 1px solid red;
  }
}
.title {
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  color: #1f2021;
  @apply text-center mb-4;
}
.form-input1,
.form-input2 {
  @apply grid grid-cols-3 gap-x-2 gap-y-3 mb-8 sm:gap-x-1;
}
.input-title1,
.input-title2 {
  font-style: normal;
  font-weight: bold;
  font-size: 1.125rem;
  color: #1f2021;
  @apply col-span-3;
}
.input-name-title,
.input-email-title {
  margin: auto 0;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  color: #63666a;
}
.input-email {
  @apply col-span-2;
}
.add-introduce {
  font-style: normal;
  font-weight: normal;
  font-size: 0.875rem;
  color: #1f2021;
  width: 100%;
  @apply sm:w-full text-right;
}
.btn-cms {
  @apply my-4;
  text-align: center;
}
.icon-bor-circle-plus {
}
@media (max-width: 720px) and (min-width: 320px) {
  .n-modal {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 90vh;
  }
  .submit-btn {
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
  }

    // 宿泊同行者を申請する START
    .companion-name-form {
      top: 129px;
      left: 22px;
      width: 100%;
      height: 37px;
      padding-left: 10px;
      border: 1px solid #CACCCF;
      border-radius: 3px;
    }
    .companion-email-form {
      top: 203px;
      left: 22px;
      width: 100%;
      height: 37px;
      padding-left: 10px;
      border: 1px solid #CACCCF;
      border-radius: 3px;
    }
    input::placeholder {
      font-size: 13px;
      color: #1F2021;
      opacity: 0.4;
    }
    .required-span {
      width: 20px;
      height: 15px;
      font-size: 10px;
      color: #E60021;
      border: 0.5mm solid #E60021;
      border-radius: 15%;
    }
    .validation-form-border {
      border: 2px solid #E60021;
    }
    .validation-form-message {
      font-weight: bold;
      color: #E60021;
      font-size: 10px;
    }
  }
  // 宿泊同行者を申請する END

.input-accom {
  border: 1px solid #a8aaad;
  height: 32px;
  border-radius: 3px;
  width: 100%;
  padding: 5px;
}
::v-deep .c-modal__inner {
  width: 530px;
}
.c-btn-modal {
  min-width: 200px;
  height: 46px;
  border-radius: 8px;
}
.black-hole {
  background-color: black;
  color: white;
}
.text-primary {
  font-size: 14px;
}
::v-deep .c-modal__head {
  padding-top: 1rem;
}
.text-btn {
  font-weight: 700;
}

.order-card-menu {
  * {
    font-size: 15px;
    @include mq() {
      font-size: 13px;
    }
  }

  .information-grid-table {
    @apply grid mb-5 md:mb-3;
    grid-template-columns: auto 1fr auto 1fr;
    @include mq() {
      grid-template-columns: auto 1fr;
    }
  }

  .menu-btn-list {
    @apply flex flex-col mb-5 md:mb-3;
    border-top: 1px solid #CACCCF;

    &:empty {
      display: none;
    }

    > .menu-btn {
      @apply flex justify-between cursor-pointer hover:bg-gray-100;
      border-bottom: 1px solid #CACCCF;
      padding: 0.625rem 0;

      &[disabled] {
        @apply cursor-not-allowed hover:bg-white;
        color: #c5bebe;

        ::v-deep > svg > g {
          fill: #c5bebe;
        }
      }
    }
  }

  .card-menu-btn-base {
    @apply h-12 md:h-9 w-96 md:w-80 font-bold text-white rounded;
    background-color: #E60021;
  }
}
</style>
