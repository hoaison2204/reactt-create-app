<template>
  <div class="order-payment-infor">

    <!-- お支払い情報 -->
    <div v-if="!isPublicStay" id="OrderPaymentInfor">

      <h1 class="font-bold pb-5 md:pb-4 text-xl md:text-base title-line">お支払い情報</h1>

      <!-- ご利用料金〜お支払い金額 -->
      <div class="flex flex-col mb-8 md:mb-6">
        <!-- ご利用料金 -->
        <div class="payment-item">
          <p>ご利用料金</p>
          <span v-if="paymentInfo && Number.isInteger(paymentInfo.totalAmt)" class="font-bold">
            {{ paymentInfo.totalAmt | formatInteger }} 円
          </span>
        </div>

        <!-- 送料 -->
        <div class="payment-item mb-4">
          <template v-if="isShowPstg">
            <p>送料</p>
            <span v-if="paymentInfo && Number.isInteger(paymentInfo.pstg)" class="font-bold">
              {{ paymentInfo.pstg | formatInteger }} 円</span
            >
          </template>
        </div>

        <!-- 補助クーポン・ベネポ利用 -->
        <div>
          <h3 class="text-gray-500 mb-2">＜{{ showSbsidTotal ? "補助クーポン・" : "" }}{{ showCafeTotal ? "カフェテリアポイント・" : "" }}ベネポ利用＞</h3>
          <div v-if="showSbsidTotal" class="payment-item">
            <p>補助クーポン利用額</p>
            <span
              v-if="paymentInfo && Number.isInteger(paymentInfo.sbsidTotal)"
              class="font-bold text-red-500"
            >
              {{ paymentInfo.sbsidTotal | formatCurrency }}
            </span>
          </div>

          <div v-if="showCafeTotal" class="payment-item">
            <p>カフェテリアポイント利用額</p>
            <span
              v-if="paymentInfo && Number.isInteger(paymentInfo.cafeAmtTotal)"
              class="font-bold text-red-500"
            >
              {{ paymentInfo.cafeAmtTotal | formatCurrency }}
            </span>
          </div>

          <div class="payment-item mb-3 ">
            <p>ベネポ利用額</p>
            <span
              v-if="paymentInfo && Number.isInteger(paymentInfo.pointUse)"
              class="font-bold text-red-500"
            >
              {{ paymentInfo.pointUse | formatInteger }} ベネポ（円）
            </span>
          </div>
        </div>

        <div class="divider mb-5 md:mb-4" style="border-color: #1F2021;" />

        <!-- お支払い金額 -->
        <div class="flex justify-end md:justify-between">
          <p class="font-bold my-auto mr-3">お支払い金額</p>
          <span
            v-if="paymentInfo && Number.isInteger(paymentInfo.billAmtTotal)"
            class="font-bold text-2xl md:text-base"
          >
            {{ paymentInfo.billAmtTotal | formatInteger }} 円
          </span>
        </div>
        <div class="flex flex-col items-center gap-4 mt-5 mb-5" v-if="isCanceled && isRakuten">
          <div class="text-red-500 font-bold border-solid border-2 border-red-400 py-2.5 px-3.5 rounded">
            キャンセル料金は、宿泊施設にお問い合わせください。
          </div>
          <div class="text-gray-500">
            下記のキャンセル規定に基づき、キャンセル料が発生する場合があります。詳しくは施設へ直接ご連絡ください。
            当プランはキャンセル料金が発生した場合、施設へ直接キャンセル料をお支払いいただきます。
          </div>
        </div>
      </div>

      <!-- お支払い情報div内でこれ移行他の要素が存在しない場合、下線を表示しない（last-child-none） -->
      <div class="divider lg:-mx-3 mb-8 md:mb-6 last-child-none" />

      <!-- 補助クーポン利用申請の内容対応ICサイトからマイページに遷移した場合は、文言を表示 -->
      <div
        v-if="mypageDisplayCode && !fromSiteUnsupported(mypageDisplayCode, 'hitaikou') && !isIcService(mypageDisplayCode) && couponUsedDetail && couponUsedDetail.length"
        class="payment-container"
      >
        <h1 class="font-bold mb-2">補助クーポン利用申請の内容</h1>
        <div v-for="(item, index) in couponUsedDetail"
            :key="`coupon-detail-${index}`">
          <h1 class="title-payment ml-2">{{item.dispSubsidyNm}}</h1>
          <h1 v-if="orderDetailType !== 'life'" class="ml-2 text-gray-500">
            クーポン適用対象者の情報
          </h1>
          <div
            class="table-fees p-4 md:p-2"
            v-for="(itemDetail, index) in item.priceList"
            :key="`coupon-detail-priceList-${index}`"
          >
            <div v-if="orderDetailType !== 'life'">
              <div class="flex" v-if="itemDetail.relationshipName === '本人'">
                <div class="w-1/4 md:w-2/4">氏名</div>
                <div class="w-2/4" wovn-ignore>{{ item.fullName }}</div>
              </div>
              <div class="flex mt-2 md:mt-1" v-if="itemDetail.relationshipName === '本人'">
                <div class="w-1/4 md:w-2/4">性別</div>
                <div class="w-2/4">{{ item.gender }}</div>
              </div>
              <div class="flex mt-2 md:mt-1" v-if="itemDetail.priceType">
                <div class="w-1/4 md:w-2/4">単価種別</div>
                <div class="w-2/4">{{ itemDetail.priceType }}</div>
              </div>
              <div class="flex mt-2 md:mt-1" v-if="itemDetail.relationshipName">
                <div class="w-1/4 md:w-2/4">会員との続柄</div>
                <div class="w-2/4">{{ itemDetail.relationshipName }}</div>
              </div>
              <div class="flex mt-2 md:mt-1" v-if="itemDetail.ageType">
                <div class="w-1/4 md:w-2/4">年齢種別</div>
                <div class="w-2/4">{{ itemDetail.ageType }}</div>
              </div>
            </div>
            <div class="flex mt-2 md:mt-1" v-if="itemDetail.amount">
              <div class="w-1/4">利用枚数</div>
              <div class="w-2/4">{{ itemDetail.amount | formatCurrency }} × 1枚</div>
              <div class="w-1/4 font-bold" style="text-align:end">
                {{ itemDetail.amount | formatCurrency }}分
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- お支払い方法〜ポイント付与について -->
      <div class="mb-8 md:mb-6" v-if="!isPublicStay && (!isLife || get(paymentInfo, 'pointGrntNumAmt'))">
        <!-- お支払い方法 -->
        <template v-if="!isLife">
          <div>
            <ItemTitle class="mb-4" v-text="'お支払い方法'" />
          </div>
          <div class="mb-5 ml-2">
            ご宿泊料金は現地でのお支払いとなります。
          </div>
        </template>

        <!-- 付与予定ベネポ -->
        <template v-if="get(paymentInfo, 'pointGrntNumAmt') && !isCanceled">
          <div class="mb-4 md:mb-2">
            <ItemTitle v-text="'付与予定ベネポ'" />
          </div>
          <div ref="appDetail" class="granted-benepo">
            <div class="flex justify-center mb-6 md:mb-3">
              <p class="font-bold text-2xl">
                {{ (paymentInfo.pointGrntNumAmt | formatInteger) }}
              </p>
              <span class="ml-2 font-bold my-auto">ベネポ(円)</span>
            </div>
            <!-- <p>ベネポ付与日 2022年11月20日</p> -->
            <p class="font-bold mb-4">ポイント付与について</p>
            <div class="flex gap-4 md:gap-3 mb-5 md:mb-3">
              <img src="@/assets/images/BS_MYP_05_010/recomment-logo1.png" />
              <img v-if="!fromSiteUnsupported(displayCodeMypage, 'rakutenLogo')" src="@/assets/images/BS_MYP_05_010/recomment-rakuten.png" />
            </div>
            <span class="md:text-xs">
              をご利用の場合、企業補助金およびベネポご利用分を除いた自己負担額（税込）に対して規定の付与ルールで確定したベネポ数をチェックアウト日の翌日から5日後に付与いたします。
            </span>
          </div>
        </template>
      </div>
    </div>

    <div class="divider -mx-10 lg:-mx-3 mb-8 md:mb-6" />

    <!-- キャンセル規定 -->
    <div id="OrderCancelInfor" class="cancel-container" v-if="checkShowCancelInfor">
      <h1 class="font-bold pb-5 md:pb-4 text-xl md:text-base title-line">キャンセル規定</h1>
        <div class="cancel-content">
          <div v-for="(item, index) in cancelPolicies" :key="index">
            <ItemTitle v-if="item.cancelTitle" v-text="item.cancelTitle" />
            <div class="pb-2 pl-2" :class="item.cancelTitle ? 'pt-4 md:pt-2' : 'pt-0'">
              <div v-if="item.cancelNote1">{{ item.cancelNote1 }}</div>
              <div v-if="item.cancelNote2">{{ item.cancelNote2 }}</div>
              <div v-show="checkCancelFlag">
                ※キャンセル料金は利用料金の税抜金額に対して発生します
              </div>
            </div>
            <table
              class="table-common"
              v-if="checkDataTable(item.cancelPolicyTable)"
            >
              <tr v-if="item.cancelPolicyTable.length">
                <th class="w-1/2">キャンセル日</th>
                <th class="style-t w-1/2">規定率</th>
              </tr>
              <tr v-for="(val, index) in item.cancelPolicyTable" :key="index">
                <td>{{ val.cancelRule }}</td>
                <td class="style-t">{{ val.cancelCond }}</td>
              </tr>
            </table>
          </div>

          <!-- ライフのキャンセル規約 -->
          <div v-if="applicationDetail.shoppingGuideCancelRuleVal">
            <h2 class="font-bold mb-5">返品・交換・キャンセル等</h2>
            <p class="c-lists__list__text" >
              {{ applicationDetail.shoppingGuideCancelRuleVal }}
            </p>
          </div>

          <!-- 宿泊のキャンセル規約 -->
          <div v-else>
            <h2 class="font-bold mb-5">キャンセルについての補足</h2>
            <div class="text-xs text-gray-500 list-none">
              <li>
                ・カスタマーセンター及び予約先の営業時間が終了している場合は、翌営業日の扱いとなり規定の料金が発生いたします。（キャンセル規定に時間が表示されている場合は、表示されている時間に準じます。）
              </li>
              <li>
                ・カフェテリアポイント、その他補助金・割引制度をキャンセル料金に適用することはできません。
              </li>
              <li>
                ・会員専用サイト上よりキャンセル手続きが行えない場合は、施設へ直接お問い合わせください。
            </li>
            <li>
                ・ご変更の際は、キャンセル手続き後の再手配となりますので、増員・減員・プラン変更が承れない場合がございます。
              </li>
              <li>
                ・また、ご連絡日に関わらず1名様あたりの宿泊料金が変更となる可能性がございます。
              </li>
              <li>
                ・団体キャンセル規定が本ページに表示されていない場合でも、10名様以上でのご利用は、団体キャンセル規定が適用となる場合がございます。詳細は施設にお問合せ下さい。
                カスタマーセンター営業期間終了後の当日宿泊のキャンセルならびに問い合わせの連絡につきましては、03-6892-5216までご連絡ください。この場合、キャンセル料金の計算基準は翌日受付扱いとなります。
              </li>
              <li>・受付時間/平日21：00～24：00、土日祝18：00～24：00</li>
            <li hidden="hidden">mino</li>
            </div>
            <p class="text-primary text-xs">
              ※予約番号はお申込と同時に表示されます。
              予約番号の表示がある場合でもまだご予約が確約していない場合があります。
              ご予約可否結果につきましては、ご利用履歴画面の「手配状況」欄もしくは、ご希望回答先に送信いたしておりますメールの内容をご確認ください。
            </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import get from "lodash/get"

export default {
  props: [
    "paymentInfo",
    "cancelPolicy",
    "couponUsedDetail",
    "mypageDisplayCode",
    "applicationDetail",
    "cardObj"
  ],
  data() {
    return {};
  },
  computed: {
    displayCodeMypage() {
      return this.getMypageDisplayCode(location.origin);
    },
    orderDetailType() {
      const { srvicDiv } = this.$route.query;
      if (srvicDiv.startsWith("A")) {
        return "stay";
      } else {
        return "life";
      }
    },
    isLife(){
      const { srvicDiv } = this.$route.query;
      return srvicDiv && srvicDiv.startsWith('B')
    },
    checkCancelFlag(){
      if(this.cancelPolicy?.canclTaxExcChrgFlag == 1) return true;
      return false;
    },
    showSbsidTotal() {
      return this.couponUsedDetail?.length || this.paymentInfo?.sbsidTotal
    },
    showCafeTotal() {
      return this.paymentInfo.cafeAmtTotal
    },
    /**
     * 送料表示判定。
     * 宿泊 && ベネオリ または
     * 宿泊 && ベネ楽天 または
     * 公共の宿 の場合はfalseを返す
     * それ以外はtrueを返す
     * @returns { boolean }
     * */
    isShowPstg() {
      const { srvicDiv } = this.$route.query
      const isStay = srvicDiv?.startsWith('A');
      const isBeneOriginal = this.applicationDetail?.outsideSysCd == null;
      const isRakutenT = this.applicationDetail?.outsideSysCd === 'RakutenT';
      const isToyokoInn = this.applicationDetail?.outsideSysCd === 'ToyokoInn';
      const isPublicAccomodation = srvicDiv === this.CONST.SRVIC_DIV.PUBLIC_ACCOMODATION;

      return !(
        (isStay && isBeneOriginal) ||
        (isStay && isRakutenT) ||
        (isStay && isToyokoInn) ||
        isPublicAccomodation
      );
    },
    isCanceled() {
      if (this.cardObj && this.cardObj.dtlSts == 9) {
        return true;
      }
      return false;
    },
    isRakuten() {
      if (this.applicationDetail?.outsideSysCd === 'RakutenT') {
        return true;
      }
      return false;
    },
    checkShowCancelInfor(){
      const { srvicDiv } = this.$route.query;
      return srvicDiv !== this.CONST.SRVIC_DIV.TOURS && !this.isPublicStay;
    }
  },
  mounted() {
    const { isPublicStay } = this.$route.query;
    this.isPublicStay = JSON.parse(isPublicStay);
    this.getCancelPolicies();
  },
  watch: {
    cancelPolicy(val) {
      this.cancelPolicies = val.cancelPolicies;
    }
  },
  data() {
    return {
      cancelPolicies: [],
      isPublicStay: false
    };
  },
  methods: {
    getCancelPolicies() {
      if (this.cancelPolicy) {
        this.cancelPolicies = this.cancelPolicy.cancelPolicies;
      }
    },
    checkDataTable(dataTable) {
      let dataTableStr = "";
      if(dataTable && Array.isArray(dataTable)){
        dataTable.forEach((element) => {
          dataTableStr = element.cancelCond + element.cancelRule;
        });
      }
      if (dataTableStr) {
        return true;
      }
      return false;
    },
    get
  }
};
</script>

<style lang="scss">
.title-payment {
  font-weight: 700;
  font-size: 18px;
  padding-bottom: 5px;
}
</style>

<style lang="scss" scoped>
.order-payment-infor {
  font-size: 15px;
  @include mq() {
    font-size: 13px;
  }

  .title-line {
    &:before {
      display: inline-block;
      content: "";
      width: 12px;
      height: 6px;
      @apply bg-primary;
      margin-right: 11px;
      transform: translateY(-50%)
    }
  }

  .payment-item {
    @apply flex justify-between mb-1;
  }

  .last-child-none:last-child {
    display: none;
  }
}
</style>
