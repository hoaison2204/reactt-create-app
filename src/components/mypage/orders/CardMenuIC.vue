<template>
  <article class="order-card-menu">
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
            <template v-if="cardObj && cardObj.srvicDiv === CONST.SRVIC_DIV.MAIL_ORDER">
              {{ menuNm }} {{ planNm }}
            </template>
            <template v-else>
              {{ menuNm }}
            </template>
        </h2>
      </template>
    </ItemOrder>

    <!-- SP時メニュータイトル -->
    <h2 v-if="menuNm" class="hidden md:block font-bold text-base mb-2">
      {{ menuNm }}
    </h2>

    <!-- GoogleMapsリンク -->
    <div
      v-if="getAreaName"
      class="text-xs flex items-center md:justify-between mb-4 md:mb-3"
    >
      <span class="text-gray-500 mr-4 md:mr-0">
        <Icon class="icon" name="status_map" />
        {{ getAreaName }}
      </span>
      <button style="border: solid #CACCCF 1px;" class="rounded px-2 py-1" @click="gotoMap">
        地図
      </button>
    </div>

    <!-- 提供期間終了テキスト -->
    <div class="text-sm md:text-xs mx-auto text-gray-500 mb-5 md:mb-3" v-if="type === 2">
      お申込みいただいたプランは
      <br class="hidden md:block" />
      提供期間が終了しています。
    </div>

    <!-- 当選結果 -->
    <LotteryResult
      class="mb-4 md:mb-3"
      :acptNo="$route.query.acptNo"
      :lotteryObj="lotteryObj"
    ></LotteryResult>

    <!-- プラン情報テーブル -->
    <div class="information-grid-table">
      <!-- 合計 -->
      <template class="pb-3" v-if="!isPublicStay && cardObj && Number.isInteger(redemption.usePoint)">
        <span>合計</span>
        <span>
          ：{{ redemption.usePoint }} {{ redemption.pointName }}
        </span>
      </template>
      <!-- 予約番号表示 | 受付番号表示 -->
      <template v-if="cardObj && cardObj.acptNo">
        <span>{{ getAcptNoLabel }}</span>
        <span>：{{ cardObj.acptNo }}</span>
      </template>
      <!-- 申込日 -->
      <template v-if="cardObj && cardObj.acptDatetime">
        <span>申込日</span>
        <span>：{{ cardObj.acptDatetime | formatDate("YYYY/MM/DD") }}</span>
      </template>
    </div>
    <!-- メニューボタン集 -->
    <!-- <div class="menu-btn-list"> -->
      <!--
        領収書を発行する
        (表示対象者ではない場合表示せず、支払い済みではない場合グレーアウト)
      -->
      <!-- <button
        v-if="
          cardObj &&
          mypageDisplayCode &&
          !isShowIssueReceipt &&
          cardObj.srvicDiv !== 'C10'
        "
        @click.stop="$router.push(receiptUrl)"
        class="menu-btn"
        :disabled="inactiveButtonReceipt()"
      >
        <span>
          領収書を発行する
        </span>
        <Icon name="arrow_right" color="#E60021" />
      </button>
    </div> -->

    <!-- プラン一覧ボタン | もう一度申し込むボタン | 提供期間終了ボタン -->
    <div class="flex justify-center mb-8 md:mb-5">
      <button
        v-if="type === 2"
        class="card-menu-btn-base"
        @click="gotoURL"
      >
        <p>このメニューのプラン一覧を見る</p>
      </button>

      <button
        v-else-if="type === 1"
        class="card-menu-btn-base"
        :class="{ 'bg-gray-500 pointer-events-none' : disableApplyAgain }"
        @click="gotoURL"
      >
        <span>もう一度申し込む</span>
      </button>

      <button
        v-else
        class="card-menu-btn-base bg-gray-500"
      >
        <p>提供期間が終了しました</p>
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
        v-if="!isPublicStay"
        tabindex="0"
        @keydown.enter="goLine(2)"
        class="flex md:flex-col items-center cursor-pointer"
      >
        <span>お支払い情報</span>
        <Icon name="arrow_down" />
      </div>

      <div
        @click="goLine(3)"
        v-if="!isPublicStay"
        tabindex="0"
        @keydown.enter="goLine(3)"
        class="flex md:flex-col items-center cursor-pointer"
      >
        <span>キャンセル規定</span>
        <Icon name="arrow_down" />
      </div>
    </footer>

    <!-- Acommondation Person -->
    <CompanionModal ref="showPopupEmailNoti" class="modalClass">
      <div class="px-6">
        <div v-for="(item, index) in formAttach" :key="`form-attach-${index}`">
          <div class="mt-3 pb-5 border-b border-gray-300">
            <p class="input-title font-bold text-gray-800">同行者{{ index + 1 }}</p>
            <form class="form-input mt-3" @submit.prevent="checkForm">
              <label class="input-title1 font-bold text-gray-800 text-xs mr-1">氏名</label>
              <span class="required-span">必須</span>
              <div class="flex flex-row mt-1">
                <div class="w-1/2 mr-1">
                  <input
                    type="text"
                    placeholder="姓"
                    class="companion-name-form"
                    :class="{ 'validation-form-border': item.errorFirstName }"
                    :maxLength="100"
                    v-model.trim="item.firstName"
                    @change="replaceSpecialInputFirstname(item)"
                    @blur="validateFirstName(item)"
                    @input="validateFirstName(item)"
                    @keypress="validateSpecialChar($event)"
                  />
                  <p v-if="item.errorFirstName" class="validation-form-message">{{ item.errorFirstName }}</p>
                </div>
                <div class="w-1/2">
                  <input
                    type="text"
                    placeholder="名"
                    class="companion-name-form pa-5"
                    :class="{ 'validation-form-border': item.errorFamilyName }"
                    :maxLength="100"
                    v-model.trim="item.familyName"
                    @change="replaceSpecialInputFamilyname(item)"
                    @input="validateFamilyName(item)"
                    @blur="validateFamilyName(item)"
                    @keypress="validateSpecialChar($event)"
                  />
                  <p v-if="item.errorFamilyName" class="validation-form-message">{{ item.errorFamilyName }}</p>
                </div>
              </div>
              <div class="flex flex-col mt-5">
                <div>
                  <label class="input-title2 font-bold text-gray-800 text-xs">メールアドレス</label>
                  <span class="required-span ml-1">必須</span>
                </div>
                <input
                  type="text"
                  placeholder="one@benefit-one.co.jp"
                  class="companion-email-form mt-1"
                  :class="{ 'validation-form-border': item.errorEmail }"
                  :maxLength="255"
                  v-model.trim="item.email"
                  @input="validateEmail(item)"
                  @blur="validateEmail(item)"
                >
                <p v-if="item.errorEmail" class="validation-form-message">{{ item.errorEmail }}</p>
              </div>
            </form>
          </div>
        </div>
        <div class="text-center">
          <p class="text-center my-5" @click="addPerson">
            <Icon name="action_circle_plus_fill" width="30" height="30" class="add-companion-icon-plus" />
            宿泊同行者を追加する
          </p>
        </div>
        <div>
          <button @click="sendEmail" class="bg-red-600 text-white rounded w-full py-3 text-xs">
            招待メールを送信する
          </button>
        </div>
      </div>
    </CompanionModal>
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
    acpt: {
      type:Object
    },
    isShowBtnPublicStay: {
      type: Boolean,
      default: false
    },
    dataMail: {
      type: Object
    },
    value: {
      type: Object
    }
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
      menuDetail: null,
      menuBasicInfor: null,
      menuThumbnail: null,
      menuNo: null,
      catInfo: null,
      menuIcon: null,
      catLrgClassNm: null,
      catMidClassNm: null,
      catSmlClassNm: null,
      latitude: null,
      longitude: null,
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
      planId: null,
      planNm: null,
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
      isPublicStay: false,
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
      redemption: {}
    };
  },
  created() {
    if (this.$route.query.srvicDiv == 'C10') {
      this.getInfoOrderDeailShop();
    } else {
      this.getInfoOrderDeail();
      this.getShippingInfoList();
    }
  },
  mounted() {
    const { isPublicStay } = this.$route.query;
    this.isPublicStay = JSON.parse(isPublicStay);
    this.srvicDiv = this.$route.query.srvicDiv;
    this.gotoReRegister(this.srvicDiv);
    if (this.isIcService(this.mypageDisplayCode)) {
      this.getRedemption()
    }
  },
  watch: {
    cardObj: {
      deep: true,
      handler(val) {
        if (val) {
          this.getMenuDetail();
        }
        const srvicDiv = this.$route.query.srvicDiv;

        if (this.cardObj.srvicDiv == 'C10') {
          this.getInfoOrderDeailShop();
        }
        if (srvicDiv.startsWith("B")) {
          const lottery = {
            lotteryInfo: _.get(val, "lotteryInfo", null),
            lotteryResult: _.get(val, "lotteryResult", null)
          };
          if (lottery) {
            this.lotteryObj = lottery;
          }
        }
        if (this.isIcService(this.mypageDisplayCode)) {
          this.getRedemption();
        }
      }
    },
    dataMail: {
      deep: true,
      handler() {
        const srvicDiv = this.$route.query.srvicDiv;
        if (srvicDiv.startsWith("C")) {
          this.gotoReRegister(srvicDiv)
        }
      }
    }
  },
  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    shopDomain() {
      return this.getShopReorderDomain(this.mypageDisplayCode);
    },
    receiptUrl() {
      const srvicDiv = this.$route.query.srvicDiv;
      let baseReceiptUrl;
      if (srvicDiv.startsWith("C")) {
        baseReceiptUrl = "/mypage/receipt/shop"; 
      } else {
        baseReceiptUrl = "/mypage/receipt"; 
      }
      return `${baseReceiptUrl}?acptNo=${this.$route.query.acptNo}&srvicDiv=${this.$route.query.srvicDiv}&isPublicStay=${this.$route.query.isPublicStay}&menuNo=${this.$route.params.id}`;
    },
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    overUseDate() {
      const today = moment()
      const useDate = _.get(this.cardObj, "useDate", "")
      return moment(useDate).isBefore(today, 'date')
    },
    /**
     * 領収書を発行するボタン表示判定。
     * 支払い方法が加盟店へお支払い (パートナー企業(現地))またはプランが宿泊の場合、表示しない（true）。
     * 上記以外は表示する(false)。
     * @returns { boolean }
     */
    isShowIssueReceipt(){
      return this.payeeDiv && this.payeeDiv === this.CONST.PAYEE_DIV.MEMBER_STORE || this.cardObj?.srvicDiv?.startsWith("A")
    },
    getStatusOrders(){
      const { arngeStatus, lotteryInfo, judgeResult, dtlSts, romSts} = this
      if (this.$route.query.srvicDiv == 'C10') { 
        if(+romSts === 1) return 'ご入金待ち'
        else if (+romSts === 9) return 'キャンセル済み（ご入金待ち）'
        else if (+arngeStatus === 1) return '手配待'
        else if (+arngeStatus === 3) return '手配中'
        else if (+arngeStatus === 8) return '手配完了'
        else if (+arngeStatus === 9) return 'キャンセル済み'
        else if (+dtlSts === 8) return "手配完了"
      } else {
        if([5,8].includes(+dtlSts)){
          if(+romSts === 1) return 'ご入金待ち'
          else if(+dtlSts === 8){
            if(+arngeStatus === 3){
              return '手配中'
            }
            return '手配完了'
          }
          return '受付済み'
        }
        else if(+dtlSts === 9){
          if(+romSts === 1) return 'キャンセル済み（ご入金待ち）'
          return 'キャンセル済み'
        }
        else if(!+judgeResult && lotteryInfo === '落選'){
          return '手配不可 ( ポイント交換失敗 )'
        }
      }
      return ''
    },
    getThumbnail() {
      return _.get(this.cardObj, "menuThumbnail", "");
    },
    getAreaName() {
      if (this.cardObj.srvicDiv) {
        if (!this.cardObj.srvicDiv.startsWith("A")) {
          // const { areaMidClassNm, areaSmlClassNm } = this.cardObj.location;
          const areaMidClassNm = _.get(
            this.cardObj,
            "location.areaMidClassNm",
            ""
          );
          const areaSmlClassNm = _.get(
            this.cardObj,
            "location.areaSmlClassNm",
            ""
          );
          return [areaMidClassNm, areaSmlClassNm]
            .filter((val) => val)
            .join("・");
        }
        if (this.menuDetail && this.menuDetail.areaInfomation) {
          const areaMidClassNm = _.get(
            this.menuDetail,
            "areaInfomation.areaMidClassNm",
            null
          );
          const areaSmlClassNm = _.get(
            this.menuDetail,
            "areaInfomation.areaSmlClassNm",
            null
          );
          const areaDtlClassNm = _.get(
            this.menuDetail,
            "areaInfomation.areaDtlClassNm", // areaLrgClassNm
            null
          );

          return [areaMidClassNm, areaSmlClassNm, areaDtlClassNm]
            .filter((val) => val)
            .join("・");
        }
      }
      return "";
    },
    isShowLowPrice() {
      return (
        !this.isPublicStay &&
        this.cardObj.srvicDiv &&
        this.cardObj.srvicDiv.startsWith("A")
      );
    },
    isShowCancelNo() {
      return (
        this.cardObj &&
        this.cardObj.srvicDiv &&
        this.cardObj.srvicDiv === this.CONST.SRVIC_DIV.DOMESTIC_STAY &&
        this.cardObj.cancelNo
      );
    },
    /**
     * "2022/10/13〜2022/10/14" のような宿泊日の文字列を返す
     * @returns { string | false }
     * */
    getCheckInCheckOutDate() {
      if (!this.srvicDiv?.startsWith("A")) return false;
      const checkInDate = _.get(this.cardObj, "checkInDate", null);
      const checkOutDate = _.get(this.cardObj, "checkOutDate", null);
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
    isCanceled() {
      if (this.dtlSts == 9) {
        return true;
      }
      return false;
    },
    getLotteryResult() {
      
      if (this.lotteryObj.lotteryResult === '1') {
        return '当選';
      } else if(this.lotteryObj.lotteryResult === '2') {
        return '落選';
      }
      return '抽選前';
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
        this.getStatusOrder(this.checkInDate, this.checkOutDate);
        const { menuNo } = {
          menuNo: this.cardObj.menuNo
        };
        if (!this.menuDetail && this.cardObj.srvicDiv !== this.CONST.SRVIC_DIV.MAIL_ORDER) {
          this.$repositories("orders")
            .getMenuBasicInfo(menuNo)
            .then(
              (data) => {
                this.menuDetail = data;
                this.menuIcon = _.get(data, "menuIcons[0]");
                this.menuNm = _.get(data, "menuNm", "");
                this.menuNo = _.get(data, "menuNo", "");
                this.getCatNm(_.get(data, "categoryInfomation", ""));
                this.longitude = _.get(data, "areaInfomation.longitude", "");
                this.latitude = _.get(data, "areaInfomation.latitude", "");
              },
              (error) => {
                console.log("error ", error);
              }
            );
        } else if (this.cardObj.srvicDiv === this.CONST.SRVIC_DIV.MAIL_ORDER) {
          this.menuNm = _.get(this.dataMail, "menuNm", "");
          this.menuNo = _.get(this.dataMail, "menuNo", "");
          this.planNm = _.get(this.dataMail, "planNm", "");
          this.planId = _.get(this.dataMail, "planId", "");
          this.catLrgClassNm = _.get(this.dataMail, "catLrgClassCd", null);
          this.catMidClassNm = _.get(this.dataMail, "catMidClassCd", null);
          this.catSmlClassNm = _.get(this.dataMail, "catSmlClassCd", null);
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
      this.showButtonCancel();
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
              path: "/mypage/cancel-confirmation",
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
    gotoReRegister(srvicDiv) {
      console.log('🚀 ~ file: CardMenu.vue:933 ~ gotoReRegister ~ srvicDiv', srvicDiv)
      const today = moment();
      const { acptNo } = this.$route.query;
      const menuNo = this.$route.params.id;
      if (this.dataMail && srvicDiv.substring(0, 1) === "C") {
        if (moment(this.dataMail.menuStartDatetime).isSameOrBefore(today) && moment(this.dataMail.menuEndDatetime).isSameOrAfter(today)){
          const prefixPath = this.isIcService(this.mypageDisplayCode) ? 'product/detail-goods' : 'menus';
          this.url = `${this.shopDomain}/${prefixPath}/menuNo=${menuNo}`;
          this.type = 1
          this.disableApplyAgain = false;
        } else {
          this.type = 0
          this.disableApplyAgain = true;
        }
        return
      }
      this.$repositories("orders")
        .getMenuBasicInfo(menuNo)
        .then(
          (response) => {
            if (srvicDiv.substring(0, 1) === "B") {
              this.$repositories("orders")
                .getOrderDetailLife(acptNo)
                .then((data) => {
                  if (data) {
                    const planId = _.get(
                      data,
                      "acpt.acptDtlList[0].planId",
                      ""
                    );
                    const catExlClassCd = _.get(
                      data,
                      "acpt.acptDtlList[0].menuBasicInfo.catExlClassCd",
                      null
                    );
                    const catLrgClassCd = _.get(
                      data,
                      "acpt.acptDtlList[0].menuBasicInfo.catLrgClassCd",
                      null
                    );
                    const catMidClassCd = _.get(
                      data,
                      "acpt.acptDtlList[0].menuBasicInfo.catMidClassCd",
                      null
                    );
                    const catSmlClassCd = _.get(
                      data,
                      "acpt.acptDtlList[0].menuBasicInfo.catSmlClassCd",
                      null
                    );

                    const params = {
                      menuNo: menuNo,
                      planId: planId
                    };
                    this.$repositories("menus")
                      .getMenuPlanDetail(params)
                      .then((life) => {
                        this.setDisableApplyAgain(life);
                        const planRcSttDt = life.planRcSttDt || null;
                        const planRcEndDt = life.planRcEndDt || null;
                        const menuRcSttDt = response.menuRcSttDt || null;
                        const menuRcEndDt = response.menuRcEndDt || null;
                        const lifeDomain = this.getLifeDomain(this.mypageDisplayCode);
                        const prefixPath = this.isIcService(this.mypageDisplayCode) ? 'product/detail-life' : 'menus';
                        if (
                          (moment(planRcSttDt).isSameOrBefore(today) &&
                            moment(planRcEndDt).isSameOrAfter(today)) ||
                          !planRcSttDt ||
                          !planRcSttDt
                        ) {
                          this.url = `${lifeDomain}/${prefixPath}/catExl=${catExlClassCd}/catLrg=${catLrgClassCd}/catMid=${catMidClassCd}/catSml=${catSmlClassCd}/menuNo=${menuNo}/plans/planId=${planId}`;
                          this.type = 1;
                        } else if (
                          (moment(menuRcSttDt).isSameOrBefore(today) &&
                            moment(menuRcEndDt).isSameOrAfter(today)) ||
                          !menuRcSttDt ||
                          !menuRcEndDt
                        ) {
                          this.url = `${lifeDomain}/${prefixPath}/catExl=${catExlClassCd}/catLrg=${catLrgClassCd}/catMid=${catMidClassCd}/catSml=${catSmlClassCd}/menuNo=${menuNo}/plans`;
                          this.type = 2;
                        } else {
                          this.type = 0;
                        }
                      });
                  }
                });
            }
          },
          (error) => {
            this.type = 0;
          }
        );
    },
    gotoURL() {
      if(this.type !== 1 || !this.disableApplyAgain) location.href = this.url;
    },
    gotoMap() {
      let q;

      if (this.latitude && this.longitude) {
        // 軽度、緯度が存在する場合はその値を使用する
        q = `${this.latitude},${this.longitude}`
      } else {
        // 存在しない場合は県名等で検索する
        q = this.getAreaName.replaceAll('・', '+')
      }

      window.open(`https://maps.google.com/?q=${q}`)
    },
    getCatNm(catInfo) {
      this.catLrgClassNm = _.get(catInfo, "catLrgClassNm", null);
      this.catMidClassNm = _.get(catInfo, "catMidClassNm", null);
      this.catSmlClassNm = _.get(catInfo, "catSmlClassNm", null);
    },
    getInfoOrderDeailShop() {
      const { acptNo } = this.$route.query;

      this.$repositories("orders")
        .getOrderDetailShop(acptNo)
        .then(
          (response) => {
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
            const lottery = {
              lotteryInfo: null,
              lotteryResult: _.get(response, "acpt.acptDtlList[0].acptPrticList[0].prodSlsBenefit.lotteryResult", null)
            };
            if (lottery) {
              this.lotteryObj = lottery;
            }
          },
          (error) => {}
        );
    },
    getInfoOrderDeail() {
      const { acptNo } = this.$route.query;
      this.$repositories("orders")
        .getOrderDetailLife(acptNo)
        .then(
          (response) => {
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
            const { lotteryInfo, judgeResult,payeeDiv} = _.get(
              response,
              "acpt.acptDtlList[0]",
              null
            );
            this.lotteryInfo = lotteryInfo
            this.judgeResult = judgeResult
            this.payeeDiv = payeeDiv
          },
          (error) => {}
        );
    },
    inactiveButtonReceipt() {
      const { romSts,dtlSts } = this
      if(+romSts != 5 || +dtlSts == 9) return true
      return false
    },
    async getShippingInfoList(){
      const { acptNo } = this.$route.query;
      await this.$repositories("orders")
        .getShippingTargetInfoList()
        .then(
          (res) => {
            const shippingDetail = res.shippingTargetInfoList?.find(item =>
              item.acptNo == acptNo
            );
            this.arngeStatus = shippingDetail?.arngeStatus
          },
          (error) => {
            this.$toasted.error(error);
          }
        );
    },
    getOrderStatus() {
      if(this.dtlSts == 5 || this.dtlSts == 8) {
        if(this.romSts == 1)  return "ご入金待ち"
        if(this.dtlSts == 5) return "受付済み"
        else if(this.dtlSts == 8) {
          if(this.arngeStatus == 3) return "手配中"
          return "手配完了"
        }
      }
      if(this.dtlSts == 9) {
        if(this.romSts == 1) return "キャンセル済み（ご入金待ち）"
        return "キャンセル済み"
      }
    },
    setDisableApplyAgain(val){
      if (!val || val?.error?.message?.includes('404 Not Found')) {
        this.disableApplyAgain = true;
        return;
      };
      if(!val?.planRcSttDt || !val?.planRcEndDt) {
        this.disableApplyAgain = false;
        return;
      }
      let planRcSttDt = new Date(val.planRcSttDt).getTime();
      let planRcEndDt = new Date(val.planRcEndDt).getTime();
      let toDate = new Date().getTime();
      if( toDate<planRcSttDt || toDate >planRcEndDt ) {
        this.disableApplyAgain = true;
        return;
      }
      this.disableApplyAgain = false;
    },
    getRedemption() {
      if (this.cardObj.acptNo === null) return
      this.$repositories('orders')
      .getRedemptionInfo(this.cardObj.acptNo, this.value.acptDatetime2, this.value.companyCd, this.value.pointUseCd)
      .then(
        (response) => {
          this.redemption = response.data
        },
        (error) => {}
      )
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

  .item-order-label {
  @apply p-1 text-xs rounded;
  background-color: #E7E7E7;

  @include mq() {
    font-size: 10px;
  }
}

.item-order-main-top-right {
  @apply flex mt-4 md:mt-1;

  .item-order-label:not(:last-of-type) {
    @apply mr-2;
  }
}

}
</style>
