<template>
  <div class="l-container h-full confirm-info mx-auto">
    <div class="main-content flex">
      <div class="left-content ml-0"></div>
      <div class="right-content">
        <div class="meta-item-back mb-4 hidden md:block" @click="handleBack()">
          <Icon name="arrow_left" color="red" />
          <a class="back-link">お申込み履歴一覧に戻る</a>
        </div>
        <div
          class="py-8 md:py-5 px-10 md:px-3 rounded-lg"
          style="box-shadow: 0px 0px 8px #00000029;"
        >
          <div class="mb-8 md:mb-6">
            <div class="main-top flex flex-wrap relative">
              <ItemOrder
                :imageUrl="
                  $get(planDetail, 'planBasicInfo.planImages[0].imageUrl')
                "
                :menuNo="menuNo"
                :orderSts="getStatusOrder"
                :categoryInfomation="
                  $get(planDetail, 'menuInformation.categoryInfomation')
                "
                :reserveSts="reserveSts == CONST.RESERVE_STS.CANCELED ? 'キャンセル済み' : '手配完了'"
                class="mb-6 md:mb-3"
              />
            </div>

            <h3 class="font-bold text-xl md:text-base">
              {{ menuNm }}
            </h3>

            <div
              class="grid grid-rows-2 mt-3"
              style="grid-template-columns: 80px 1fr;"
            >
              <template v-if="acptDatetime">
                <span class="date-time">申込日</span>
                <span>：{{ acptDatetime }}</span>
              </template>
              <span class="date-time">受付番号</span>
              <span>：{{ acptNo }}</span>
            </div>

            <div
              class="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-3 md:gap-y-2 mt-7 md:mt-5"
            >
              <div>
                <div class="title-board">{{ titleContent[0] }}</div>
                <p v-if="planNm" v-html="planNm.replaceAll('\n', '<br>')"></p>
              </div>
              <div>
                <div class="title-board">お申込み詳細</div>
                <p>
                  {{ useDate }}
                  <span class="ml-0" v-if="useDate && endDate">〜 </span>
                  {{ endDate }}
                </p>
              </div>
              <div>
                <div class="title-board">申込者名</div>
                <p>{{ registerNm }}</p>
              </div>
              <div>
                <div class="title-board">宿泊代表者名</div>
                <p>{{  fullName }}</p>
              </div>
              <div>
                <div class="title-board">部屋数</div>
                <p>{{ roomCnt }}</p>
              </div>
            </div>
          </div>

          <section
            class="-mx-10 md:-mx-3 py-8 md:py-6 px-10 md:px-3 border-t border-b border-gray-300"
          >
            <SectionContentTitle
              lineType="v-line"
              :titleContent="titleContent[2]"
            />

            <div class="price-row">
              <div>ご利用料金</div>
              <div class="font-bold" v-if="totalAmt">
                {{ totalAmt | formatCurrency(" 円") }}
              </div>
              <div class="font-bold" v-if="totalAmt === 0">0 円</div>
            </div>

            <div class="price-row pt-0">
              <p class="text-tax">（ うち消費税合計（10%）</p>
              <span v-if="totalAmt" class="text-tax"
                >{{
                  Math.ceil(totalAmt * (1 / 11)) | formatCurrency
                }} ）</span
              >
              <span v-if="totalAmt === 0" class="text-tax"
                >0 円 ）</span
              >
            </div>

            <div class="text-gray-500 text-sm md:text-xs mt-3 md:mt-2">
              ＜{{ showSbsidTotal ? "補助クーポン・" : "" }}{{ showCafeTotal ? "カフェテリアポイント・" : "" }}ベネポ利用＞
            </div>
            <div class="price-row mt-1" v-if="showSbsidTotal">
              <div>補助クーポン利用額</div>
              <div class="font-bold text-red-500" v-if="sbsidTotal">
                - {{ sbsidTotal | formatCurrency(" 円") }}
              </div>
            </div>

            <div class="price-row mt-1" v-if="showCafeTotal">
              <div>カフェテリアポイント利用額</div>
              <div class="font-bold text-red-500" v-if="cafeAmtTotal">
                - {{ cafeAmtTotal | formatCurrency(" 円") }}
              </div>
            </div>

            <div class="price-row mt-2">
              <div>ベネポ利用額</div>
              <div class="font-bold" v-if="pointUse">
                -{{ pointUse | formatInteger }} ポイント（円）
              </div>
              <div class="font-bold" v-else>0 ポイント（円）</div>
            </div>
            <hr class="my-2 border-black" />
            <div
              class="flex py-1 items-baseline justify-end md:justify-between font-bold text-2xl md:text-lg"
              v-if="billAmtTotal"
            >
              <span class="text-base mr-2">お支払い金額</span>
              {{ billAmtTotal | formatCurrency(" 円") }}
            </div>
            <div class="flex flex-col items-center gap-4 mt-5 mb-5" v-if="isRakuten">
              <div class="text-red-500 font-bold border-solid border-2 border-red-400 py-2.5 px-3.5 rounded">
                キャンセル料金は、宿泊施設にお問い合わせください。
              </div>
              <div class="text-gray-500">
                下記のキャンセル規定に基づき、キャンセル料が発生する場合があります。詳しくは施設へ直接ご連絡ください。
                当プランはキャンセル料金が発生した場合、施設へ直接キャンセル料をお支払いいただきます。
              </div>
            </div>
            <div class="mt-3 text-center" v-else>
              <div class="font-bold mb-3" v-if="checkFee">
                こちらのお申し込みはキャンセル料が発生します。
              </div>
              <p
                class="inline-block border border-red-600 rounded-md h-10 md:h-8 px-4 leading-9 md:leading-7 font-bold text-red-600"
              >
                キャンセル料金 ¥{{ checkFee | formatInteger }}
              </p>
            </div>
          </section>

          <div class="mt-8 md:mt-6">
            <div v-for="(item, index) in cancelPolicies" :key="index">
              <SectionContentTitle
                v-if="
                  item.cancelPolicyTable && item.cancelPolicyTable.length > 0
                "
                :titleContent="item.cancelTitle"
                lineType="v-line"
              />
              <div class="box-content">
                <table class="table-common">
                  <tr
                    v-if="
                      item.cancelPolicyTable &&
                        item.cancelPolicyTable.length > 0
                    "
                  >
                    <th class="t-left font-normal">キャンセル日</th>
                    <th class="style-t t-right font-normal">規定率</th>
                  </tr>
                  <tr
                    v-for="(val, index) in item.cancelPolicyTable"
                    :key="index"
                  >
                    <td>{{ val.cancelRule }}</td>
                    <td class="style-t">{{ val.cancelCond }}</td>
                  </tr>
                </table>
              </div>
            </div>

            <h3 class="font-bold my-8 mb-5">キャンセルについての補足</h3>
            <div>
              <ul class="text-gray-500 pl-3 md:pl-0 leading-normal">
                <li class="pl-1 text-xs">
                  ・カスタマーセンター及び予約先の営業時間が終了している場合は、翌営業日の扱いとなり規定の料金が発生いたします。（キャンセル規定に時間が表示されている場合は、表示されている時間に準じます。）
                </li>
                <li class="pl-1 text-xs">
                  ・カフェテリアポイント、その他補助金・割引制度をキャンセル料金に適用することはできません。
                </li>
                <li class="pl-1 text-xs">
                    ・会員専用サイト上よりキャンセル手続きが行えない場合は、施設へ直接お問い合わせください。
                </li>
                <li class="pl-1 text-xs">
                  ・ご変更の際は、キャンセル手続き後の再手配となりますので、増員・減員・プラン変更が承れない場合がございます。
                </li>
                <li class="pl-1 text-xs">
                  ・また、ご連絡日に関わらず1名様あたりの宿泊料金が変更となる可能性がございます。
                </li>
                <li class="pl-1 text-xs" v-if="!isRakuten">
                  ・団体キャンセル規定が本ページに表示されていない場合でも、10名様以上でのご利用は、団体キャンセル規定が適用となる場合がございます。詳細は施設にお問合せ下さい。
                  カスタマーセンター営業期間終了後の当日宿泊のキャンセルならびに問い合わせの連絡につきましては、03-6892-5216までご連絡ください。この場合、キャンセル料金の計算基準は翌日受付扱いとなります。
                </li>
                <li class="pl-1 text-xs" v-if="!isRakuten">・受付時間/平日21：00～24：00、土日祝18：00～24：00</li>
                <li class="pl-1 text-xs"  hidden="hidden">mino</li>
              </ul>
            </div>
          </div>
          <div class="divider"></div>
          <div class="pt-8 md:pt-5 mb-3 md:mb-0 w-full text-center">
            <div class="bottom-content">
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
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
              </div>
            </div>
            <button class="c-btn">
              <span
                class="pr-16 pl-16 text-base"
                v-if="checkFee"
                @click="handleNext()"
                >支払方法を選択する</span
              >
              <span class="pr-16 pl-16 text-base" v-else @click="handleNext()"
                >申込みをキャンセルする</span
              >
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
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import CONST_DATA from "@/mixins/const/constData";
import { createSetCookie } from "@/utils/cookie";

const TOAST_OPTION = {
  duration: 30000
}

export default {
  name: "BS_MYP_05_040",
  components: {},
  data() {
    return {
      acptNo: null,
      acptDtlNo: "",
      acptDatetime: null,
      planNm: null,
      roomCount: null,
      roomCnt: null,  // For room count information in Application Details
      totalAmt: null,
      sbsidTotal: null,
      cafeAmtTotal: null,
      boneSbsidChrgTotal: null,
      pointUse: null,
      pointUseCd: null,
      pointGrntInfo: null,
      billAmtTotal: null,
      cancelPolicies: {},
      confirmCheckbox: false,
      errorMessageNext:
        "キャンセル規定確認のチェックボックスを選択してください",
      facilityTelNo: null,
      pointGrntNumAmt: null,
      planDetail: null,
      cancelPolicy: null,
      menuNo: null,
      planId: null,
      roomId: null,
      useDate: "",
      endDate: "",
      nightCnt: "",
      rpsntFamilyNmKana: "",
      rpsntFirstNmKana: "",
      resrvFamilyNmKana: "",
      resrvFirstNmKana: "",
      fullName: "",
      dataOrderInfo: {},
      dataOrderDetail: {},
      planBasicInfo: {},
      roomBasicInfo: {},
      reserveSts: "",
      statusOrder: "",
      orderDetail: {},
      menuNm: "",
      cancelChrgRate: 0,
      cancelCharge: null,
      cancelTaxExcChargeFlag: null,
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
      ],
      titleContent: [
        "プラン名",
        "ご宿泊期間",
        "お支払い情報",
        "キャンセル規定"
      ],
      lineType: { horizontal: "h-line", vertical: "v-line" },
      feeCancel: 10,
      cancelChrDiv: null,
      memberChrgTotalAll: 0,
      memberChrgTotal: 0,
      tieupChrgTotalAll: 0,
      boneSbsidChrgTotalAll: 0,
      payMethod: "10",
      useHeadCnt: 1,
      cancelChrgUnit: 0,
      stayPlanCancelPrticKey: null,
      stayCancelAcptPrticList: [],
      dataOrder: null,
      conditionNext: false,
      registerNm: null,
      isRakuten: false
    };
  },
  watch: {
    conditionNext(val) {}
  },
  mounted() {
    this.getOrderInfo();
    this.getPlanBasicInfo();
    this.setBreadcrumb();
    const { matches: isPC } = window.matchMedia("(min-width: 768px)");
    this.$page.showSideMenu = isPC;
    // if (this.loggedIn) {
    //   this.getOrderInfo()
    //   this.getPlanBasicInfo()
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
    getPlanInfo() {
      return _.cloneDeep(_.get(this.$store.state, "plan.planDetail", null));
    },
    getOrder() {
      return this.$store.getters.getOrder;
    },
    getOrderInfo2() {
      return _.cloneDeep(
        _.get(this.$store.state, "order_old.bs_myp_05_040", null)
      );
    },
    checkFee(){
      const feeToCalculate = this.checkCancelFlag ? this.totalAmt-(this.totalAmt / 11) : this.totalAmt;
      const percent = feeToCalculate || 0;
      const result = Math.floor((percent * this.cancelChrgRate) / 100);
      return result || this.cancelCharge || 0;
    },
    checkSbsidTax () {
      // キャンセル料金が税抜きの場合、補助金も税抜きにする
      const sbsidToCalculate = (this.checkCancelFlag && this.boneSbsidChrgTotal) ? this.boneSbsidChrgTotal - (this.boneSbsidChrgTotal / 11) : this.boneSbsidChrgTotal;
      const percent = sbsidToCalculate || 0;
      const result = Math.floor(percent * this.cancelChrgRate / 100);
      return result || '0'
    },
    checkCancelFlag() {
      if (this.cancelTaxExcChargeFlag == 1) return true;
      return false;
    },
    /** @returns {import('lodash').LoDashStatic['get']} */
    $get() {
      return _.get;
    },
    getStatusOrder() {
      const today = moment().format("YYYY/MM/DD");
      if (today < this.useDate) {
        return "利用前";
      }
      if (today > this.endDate) {
        return "利用済み";
      }
      if (today >= this.useDate && today <= this.endDate) {
        return "利用中";
      }
    },
    showSbsidTotal() {
      return this.sbsidTotal
    },
    showCafeTotal() {
      return this.cafeAmtTotal
    },
  },
  methods: {
    getDetailApp() {
      return [
        {
          title: "申込者名",
          content: this.registerNm
        },
        {
          title: "宿泊代表者名",
          content: this.fullName ? this.fullName : this.registerNm
        },
        {
          title: '部屋数',
          content: this.roomCnt
        }
      ];
    },
    onChange($event) {
      this.confirmCheckbox = $event.target.checked;
    },
    getOrderInfo() {
      const { acptNo } = this.$route.query;
      this.acptNo = acptNo;
      this.$repositories("orders")
        .getOrderDetail(acptNo)
        .then(
          (response) => {
            if (response) {
              this.orderDetail = response;
              this.menuNo = _.get(
                response,
                "orderStayDetail.acptDtlList[0].acptDtl.menuNo",
                ""
              );
              if (!this.menuNm) {
                this.menuNm = _.get(
                  response,
                  "orderStayDetail.acptDtlList[0].menuBasicInfo.menuNm",
                  ""
                );
              }
              this.planId = _.get(
                response,
                "orderStayDetail.acptDtlList[0].acptDtl.planId",
                ""
              );
              this.roomId = _.get(
                response,
                "orderStayDetail.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList[0].stayRoomDayPrtic.roomId",
                ""
              );
              this.useDate = moment(
                _.get(
                  response,
                  "orderStayDetail.acptDtlList[0].acptDtl.useDate",
                  ""
                )
              ).format("YYYY/MM/DD");
              const date = new Date(this.useDate);
              this.nightCnt = _.get(
                response,
                "orderStayDetail.acptDtlList[0].stayAcptDtl.nightCnt",
                0
              );
              date.setDate(date.getDate() + this.nightCnt);
              this.endDate = moment(date).format("YYYY/MM/DD");
              this.reserveSts = _.get(
                response,
                "orderStayDetail.acptDtlList[0].stayAcptDtl.resrvSts",
                null
              );
              const resrvFamilyNmKana = _.get(
                response,
                "orderStayDetail.acptDtlList[0].stayResrvRpsntInfo.rpsntFamilyNm",
                ""
              );
              const resrvFirstNmKana = _.get(
                response,
                "orderStayDetail.acptDtlList[0].stayResrvRpsntInfo.rpsntFirstNm",
                ""
              );
              if (resrvFamilyNmKana && resrvFirstNmKana) {
                this.fullName = resrvFamilyNmKana + resrvFirstNmKana;
              }
              this.registerNm =
                _.get(response, "orderStayDetail.customer.familyName", "") +
                _.get(response, "orderStayDetail.customer.firstName", "");
              this.roomCount = _.get(
                response,
                "orderStayDetail.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList.length",
                ""
              );
              this.totalAmt = Math.round(
                _.get(response, "orderStayDetail.acpt.totalAmt", "")
              );
              this.sbsidTotal = _.get(
                response,
                "orderStayDetail.acpt.aplySbsidAmt",
                ""
              );
              this.cafeAmtTotal = _.get(
                response,
                "orderStayDetail.acpt.aplyCafePointAmt",
                ""
              );
              this.boneSbsidChrgTotal = _.get(
                response,
                "orderStayDetail.acptDtlList[0].dtlChrgTotal.boneSbsidChrgTotal",
                ""
              );
              this.pointUse = _.get(
                response,
                "orderStayDetail.acpt.pointUseNumAmt",
                ""
              );
              this.pointUseCd = _.get(
                response,
                "orderStayDetail.acpt.pointUseCd",
                ""
              );
              this.billAmtTotal = Math.round(
                _.get(response, "orderStayDetail.acpt.billAmtTotal", "")
              );
              this.dataOrderDetail = response;
              this.acptDtlNo = _.get(
                response,
                "orderStayDetail.acptDtlList[0].acptDtl.acptDtlNo"
              );
              const acptTm = _.get(
                response,
                "orderStayDetail.acpt.acptDatetime",
                null
              );
              if (acptTm !== null && acptTm !== "") {
                this.acptDatetime = moment(acptTm).format("YYYY/MM/DD");
              }
              this.pointGrntNumAmt = _.get(
                response,
                "orderStayDetail.acpt.pointGrntNumAmt",
                null
              );
              this.planNm = _.get(
                response,
                "orderStayDetail.acptDtlList[0].planBasicInfo.planNm",
                ""
              );
              const params = {
                menuNo: this.menuNo,
                companyCd: this.$route.query.companyCd
              };
              this.$repositories("menus")
                .getInfoMenuDetail(params)
                .then(
                  (res) => {
                    if (res) {
                      this.menuInfo = res;
                      this.facilityTelNo = _.get(
                        this.menuInfo,
                        "facilities.facilities[0].facilityTelNo",
                        ""
                      );
                    }
                  },
                  // eslint-disable-next-line no-unused-vars
                  (error) => {}
                );
              this.checkRakuten();
              this.getPlanDetail();
            }
            this.planId = _.get(
              response,
              "orderStayDetail.acptDtlList[0].acptDtl.planId",
              ""
            );
            this.roomId = _.get(
              response,
              "orderStayDetail.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList[0].stayRoomDayPrtic.roomId",
              ""
            );
            this.useDate = moment(
              _.get(
                response,
                "orderStayDetail.acptDtlList[0].acptDtl.useDate",
                ""
              )
            ).format("YYYY/MM/DD");
            const date = new Date(this.useDate);
            this.nightCnt = _.get(
              response,
              "orderStayDetail.acptDtlList[0].stayAcptDtl.nightCnt",
              0
            );
            date.setDate(date.getDate() + this.nightCnt);
            this.endDate = moment(date).format("YYYY/MM/DD");
            this.roomCnt = _.get(
              response,
              "orderStayDetail.acptDtlList[0].stayAcptDtl.roomCnt",
              0
            );
            this.reserveSts = _.get(
              response,
              "orderStayDetail.acptDtlList[0].stayAcptDtl.resrvSts",
              null
            );
            const resrvFamilyNmKana = _.get(
              response,
              "orderStayDetail.acptDtlList[0].stayResrvRpsntInfo.rpsntFamilyNm",
              ""
            );
            const resrvFirstNmKana = _.get(
              response,
              "orderStayDetail.acptDtlList[0].stayResrvRpsntInfo.rpsntFirstNm",
              ""
            );
            if (resrvFamilyNmKana && resrvFirstNmKana) {
              this.fullName = resrvFamilyNmKana + resrvFirstNmKana;
            }
            this.registerNm =
              _.get(response, "orderStayDetail.customer.familyName", "") +
              _.get(response, "orderStayDetail.customer.firstName", "");
            this.roomCount = _.get(
              response,
              "orderStayDetail.acptDtlList[0].acptPrticList[0].stayRoomDayPrticList.length",
              ""
            );
            this.totalAmt = _.get(
              response,
              "orderStayDetail.acpt.totalAmt",
              ""
            );
            this.sbsidTotal = _.get(
              response,
              "orderStayDetail.acpt.aplySbsidAmt",
              ""
            );
            this.cafeAmtTotal = _.get(
              response,
              "orderStayDetail.acpt.aplyCafePointAmt",
              ""
            );
            this.boneSbsidChrgTotal = _.get(
              response,
              "orderStayDetail.acptDtlList[0].dtlChrgTotal.boneSbsidChrgTotal",
              ""
            );
            this.pointUse = _.get(
              response,
              "orderStayDetail.acpt.pointUseNumAmt",
              ""
            );
            this.billAmtTotal = _.get(
              response,
              "orderStayDetail.acpt.billAmtTotal",
              ""
            );
            this.dataOrderDetail = response;
            this.acptDtlNo = _.get(
              response,
              "orderStayDetail.acptDtlList[0].acptDtl.acptDtlNo"
            );
            const acptTm = _.get(
              response,
              "orderStayDetail.acpt.acptDatetime",
              null
            );
            if (acptTm !== null && acptTm !== "") {
              this.acptDatetime = moment(acptTm).format("YYYY/MM/DD");
            }
            this.pointGrntNumAmt = _.get(
              response,
              "orderStayDetail.acpt.pointGrntNumAmt",
              null
            );
            this.planNm = _.get(
              response,
              "orderStayDetail.acptDtlList[0].planBasicInfo.planNm",
              ""
            );
            const params = {
              menuNo: this.menuNo,
              companyCd: this.$route.query.companyCd
            };
            this.$repositories("menus")
              .getInfoMenuDetail(params)
              .then(
                (res) => {
                  if (res) {
                    this.menuInfo = res;
                    this.facilityTelNo = _.get(
                      this.menuInfo,
                      "facilities.facilities[0].facilityTelNo",
                      ""
                    );
                  }
                },
                // eslint-disable-next-line no-unused-vars
                (error) => {}
              );
            this.checkRakuten();
            this.getPlanDetail();
            this.getOrderBasicInfo();
          },
          //

          // eslint-disable-next-line no-unused-vars
          (error) => {}
        );
    },
    getPlanDetail() {
      this.$repositories("menus")
        .getPlanDetail(this.menuNo, this.planId, this.roomId, {})
        .then((data) => {
          this.planDetail = data;
          this.cancelPolicy = this.planDetail.cancelPolicy;
          if (!this.menuNm) {
            this.menuNm = _.get(data, "menuInformation.menuNm", "");
          }
          this.cancelPolicies = this.cancelPolicy.cancelPolicies;
        });
    },
    getPlanBasicInfo() {
      this.planBasicInfo = this.getPlanInfo
        ? this.getPlanInfo.planBasicInfo
        : null;
      this.roomBasicInfo = this.getPlanInfo
        ? this.getPlanInfo.roomBasicInfo
        : null;
    },
    handleNext() {
      if (!this.conditionNext) {
        this.$toasted.error(this.errorMessageNext);
        return;
      }
      if (
        this.cancelPolicy?.webCancelAvailDiv ===
        CONST_DATA.CANCEL_AVAIL_DIV.IMPOSSIBLE
      ) {
        this.errorMessageNext =
          "WEBからのキャンセルはできません。カスタマーセンターへお問い合わせください。";
        this.$toasted.error(this.errorMessageNext);
        this.errorMessageNext =
          "キャンセル規定確認のチェックボックスを選択してください";
        return;
      }
      this.checkFeeCancel();
    },
    handleBack() {
      const { menuNo, ...rest } = this.$route.query;
      this.$router.push({ path: `/mypage/orders/${menuNo}`, query: rest });
    },
    getOrderInfoData() {
      const orderInfo = this.orderDetail;
      const dataOrder = {
        acptNo: this.acptNo,
        acptDtlNo: this.acptDtlNo,
        acptDatetime: this.acptDatetime,
        planNm: this.planNm,
        roomCount: this.roomCount,
        // totalAmt: this.totalAmt,
        sbsidTotal: this.sbsidTotal,
        cafeAmtTotal: this.cafeAmtTotal,
        boneSbsidChrgTotal: this.boneSbsidChrgTotal,
        pointUse: this.pointUse,
        pointUseCd: this.pointUseCd,
        pointGrntInfo: this.pointGrntInfo,
        useDate: this.useDate,
        endDate: this.endDate,
        fullName: this.fullName,
        reserveSts: this.reserveSts,
        statusOrder: this.statusOrder,
        menuNm: this.menuNm,
        cancelPolicy: this.cancelPolicy,
        totalAmt: Math.round(
          _.get(orderInfo, "orderStayDetail.acpt.totalAmt", null)
        ),
        billAmtTotal: Math.round(
          _.get(orderInfo, "orderStayDetail.acpt.billAmtTotal", null)
        ),
        boneBillAmtTotal: _.get(
          orderInfo,
          "orderStayDetail.acpt.boneBillAmtTotal",
          null
        ),
        setlSts: _.get(orderInfo, "orderStayDetail.acpt.setlSts", null),
        acptPrticNo: _.get(orderInfo, ""),
        orderDetail: this.orderDetail
      };
      return dataOrder;
    },
    getOrderBasicInfo() {
      const data = this.getOrderInfoData();
      if (data !== null) {
        this.acptDatetime = _.get(data, "acptDatetime", "");
        this.acptNo = _.get(data, "acptNo", "");
        this.acptDtlNo = _.get(data, "acptDtlNo", "");
        this.planNm = _.get(data, "planNm", "");
        this.roomCount = _.get(data, "roomCount", "");
        this.useDate = _.get(data, "useDate", "");
        this.endDate = _.get(data, "endDate", "");
        this.fullName = _.get(data, "fullName", "");
        this.reserveSts = _.get(data, "reserveSts", "");
        this.statusOrder = _.get(data, "statusOrder", "");
        this.menuNm = _.get(data, "menuNm", "");
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
        this.billAmtTotal = Math.round(_.get(data, "billAmtTotal", ""));
        this.$repositories("orders")
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
                const useDate = this.orderDetail?.orderStayDetail
                  ?.acptDtlList[0]?.acptDtl?.useDate;
                let dateDiff = moment(useDate).diff(moment(), "days");
                const isSameDay = moment(useDate).isSame(moment(), "day");
                if (dateDiff >= 0 && !isSameDay) {
                  dateDiff += 1;
                }
                this.cancelTaxExcChargeFlag = _.get(
                  response,
                  "stayPlanCancelList[0].cancelTaxExcChargeFlag",
                  null
                );
                const stayPlanCancelPrticList = _.get(
                  response,
                  "stayPlanCancelList[0].stayPlanCancelPrticList",
                  null
                );
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
                    if (dateDiff >= +dayEnd && dateDiff <= dayBegin) {
                      const noneContactFlag = _.get(
                        element,
                        "noneContactFlag",
                        null
                      );
                      const {
                        cancelChargeRate,
                        cancelCharge,
                        cancelChargeDiv,
                        stayPlanCancelPrticKey
                      } = element;
                      if (!+noneContactFlag) {
                        flag++;
                        this.cancelChrgRate = +cancelChargeRate || 0;
                        this.cancelCharge = cancelCharge || 0;
                        this.cancelChrDiv = +cancelChargeDiv || 0;
                        this.stayPlanCancelPrticKey = stayPlanCancelPrticKey;
                      } else if (+noneContactFlag && cancelChargeRate === 100) {
                        this.cancelChrgRate = +cancelChargeRate;
                      }
                    }
                    if (flag > 0) {
                      break;
                    }
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
            },
            this.getInfoChrgRoom(_.get(data, "orderDetail", "")),
            (error) => {
              this.$toasted.error(error?.message);
            }
          );
      }
    },

    async checkFeeCancel() {
      const extSystem = _.get(
          this.orderDetail,
          "orderStayDetail.acptDtlList[0].menuBasicInfo.outsideSysCd",
          ""
      );
      const orderInfo = await this.getOrderInfoData();
      const orderDetail = this.orderDetail;
      const cancelPolicy = this.cancelPolicy;
      const useDate = _.get(
        this.orderDetail,
        "orderStayDetail.acptDtlList[0].acptDtl.useDate",
        ""
      );
      let dateDiff = moment(useDate).diff(moment(), "days");
      const isSameDay = moment(useDate).isSame(moment(), "day");
      if (dateDiff >= 0 && !isSameDay) {
        dateDiff += 1;
      }
      const data = {
        totalAmt: Math.round(_.get(orderInfo, "totalAmt", null)),
        billAmtTotal: Math.round(_.get(orderInfo, "billAmtTotal", null)),
        boneBillAmtTotal: _.get(orderInfo, "boneBillAmtTotal", null),
        setlSts: _.get(orderInfo, "setlSts", null),
        rciptReqrdFlag: null,
        rciptAddrNm: null,
        pointUse: _.get(orderInfo, "pointUse", null),
        pointUseCd: _.get(orderInfo, "pointUseCd", null),
        pointGrntInfo: null, // TODO 暫定的にnullを代入。使用するかは要調査
        acptRomDtl: {
          romSchAmt: this.checkFee,
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
              cancelAmt: this.checkFee,
              tieupCancelAmt:
                (this.tieupChrgTotal * this.cancelChrgRate) / 100
                  ? (this.tieupChrgTotal * this.cancelChrgRate) / 100
                  : this.cancelCharge
                  ? this.cancelCharge
                  : 0,
              cancelSbsidTotal: this.checkSbsidTax
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
      localStorage.setItem('orderCancelInfo', JSON.stringify(data));

      if (this.checkFee > 0 && extSystem !== "RakutenT") {
        this.handlePayment();
      } else if (extSystem !== "RakutenT") {
        this.handleCancelOrder1(data);
      } else {
        await this.checkRakuten();
        this.handleCancelOrder1(data);
      }

    },
    handlePayment() {
      if (!this.menuNm) {
        this.menuNm = "ロープライス";
      }
      this.$repositories("orders")
        .putPay({
          menuNm: this.menuNm,
          billingAmount: this.checkFee
        })
        .then(
          (response) => {
            if (response) {
              if (process.env.VUE_APP_DEV_MODE !== "local") {
                console.log("ORDERREQUESTTRANSACTIONID:" + response.orderRequestTransactionId);
                document.cookie = createSetCookie('orderRequestTransactionId', response.orderRequestTransactionId)
                location.href = `${process.env.VUE_APP_URL_PAYMENT_GATEWAY}${response.orderRequestEncryptedTransactionId}`;
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
            // this.$toasted.error('エラーが発生しました')
          }
        );
    },
    async handleCancelOrder1(data) {
      this.$loading.startProcessing();
      this.$repositories("orders")
        .cancelOrder(data)
        .then(
          (response) => {
            this.$loading.finishProcessing();

            // bff が落ちていた場合、responce に値は存在せず
            if(!response){
              this.$toasted.error('キャンセルを失敗しました')
              return
            }

            if(response.isError){
              const error = response.data
              try { 
                let messageError = null
                try {
                  messageError = _.get(error, 'error.message', null)
                  messageError = JSON.parse(messageError) || null
                } catch (error) {
                  // JSON.parse に失敗している可能性あり。握り潰し。
                }
             
                if(typeof error === 'object' && error.statusCode === 400 && error.message){
                  this.$toasted.error(error?.message, TOAST_OPTION)

                } else if (messageError && Array.isArray(messageError) ){
                  let errorText =  ''
                  messageError.forEach((error)=>{
                    errorText += `${error?.errorMsg} <br> `
                  })
                  this.$toasted.error(errorText, TOAST_OPTION);

                } else if (typeof error === 'object' && error.errorDetail){
                  this.$toasted.error(error?.errorDetail, TOAST_OPTION)
                } else {
                  this.$toasted.error('キャンセルが失敗しました')
                }

              } catch (error) {
                this.$toasted.error('キャンセルに失敗しました')
              }                

            } else {
              const cancelNo = _.get(response, "data.cancelNo[0]","") || ""
              // const cancelNo = response.cancelNo?.[0] || "";
              // this.$store.dispatch(SAVE_CANCEL_NO, cancelNo)
              this.$store.commit("orders/cancelNo", cancelNo);
              const query = this.$route.query;
              const menuNo = this.menuNo;
              query.menuNo = menuNo;
              query.cancelNo = cancelNo; // キャンセル完了画面のリロードで キャンセル番号を表示する為に、パラメータ付与
              this.$router.push({ path: "/mypage/cancel-complete", query });                
            }
          },
          // eslint-disable-next-line no-unused-vars
          (error) => {
            this.$loading.finishProcessing();
            try { 
              const messageError = JSON.parse(_.get(error, 'error.message', null))                            
              if(messageError && Array.isArray(messageError) ){
                let errorText =  ''
                messageError.forEach((error)=>{
                  errorText += `${error?.errorMsg} <br> `
               })
                this.$toasted.error(errorText, TOAST_OPTION);
              } else if (typeof error === 'object' && error.errorDetail){
                this.$toasted.error(error?.errorDetail, TOAST_OPTION)
              } else {
              this.$toasted.error('キャンセルに失敗しました')
              }
            } catch (error) {
              this.$toasted.error('キャンセルに失敗しました')
            }
          }
        );
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
    loginRakuten() {
      const urlPage = window.location.href;
      location.href = `https://app.rakuten.co.jp/engine/authorize?response_type=code&client_id=rakutentravel_beneone&redirect_uri=${this.mypageApiUrl}/v1/mypage/rakuten/callback?url=${urlPage}&scope=travel_booking_book,travel_booking_cancel,travel_booking_refer,1Hour@Access&service_id=t22`;
    },
    checkRakuten() {
      const extSystem = _.get(
        this.orderDetail,
        "orderStayDetail.acptDtlList[0].menuBasicInfo.outsideSysCd",
        ""
      );

      if (extSystem === "RakutenT") {
        this.isRakuten = true
        this.$repositories("login")
          .checkLoginRakuten()
          .then((response) => {
            if (!Boolean(response.data.login)) {
              this.loginRakuten();
            }
          });
      }
    },

    setBreadcrumb() {
      const { menuNo, acptNo, srvicDiv, isPublicStay } = this.$route.query;

      const breadcrumbs = [
        { text: "マイページ", to: "/mypage" },
        { text: "申込履歴", to: "/mypage/orders" },
        {
          text: "申込内容詳細",
          to: `/mypage/orders/${menuNo}?acptNo=${acptNo}&srvicDiv=${srvicDiv}&isPublicStay=${isPublicStay}`
        },
        { text: "キャンセル内容確認", to: "" }
      ];

      breadcrumbs.forEach(({ text, to }) => {
        this.$page.setBreadcrumb(this.$page.formatBreadcrumb(text, to));
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles.scss";

table,
th,
td {
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}

.nav {
  width: 100%;
}

.text-tax {
  @apply text-gray-500 text-sm;
  @include mq() {
    font-size: 10px;
  }
}
</style>
