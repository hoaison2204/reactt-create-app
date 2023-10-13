<template>
  <div class="order-payment-infor">
        <!-- お支払い情報 -->
    <div id="OrderPaymentInfor">

      <h1 class="font-bold pb-5 md:pb-4 text-xl md:text-base title-line">お支払い情報</h1>

      <!-- ご利用料金〜お支払い金額 -->
      <div class="flex flex-col mb-8 md:mb-6">
        <!-- ご利用料金 -->
        <div class="payment-item">
          <span>申込合計金額</span>
          <span v-if="paymentInfo && Number.isInteger(paymentInfo.totalAmt)" class="font-bold">
            {{ paymentInfo.totalAmt | formatInteger }} 円
          </span>
        </div>

        <!-- 送料 -->
        <!-- <div class="payment-item mb-4">
          <template v-if="isShowPstg">
            <p>送料</p>
            <span v-if="paymentInfo && Number.isInteger(paymentInfo.pstg)" class="font-bold">
              {{ paymentInfo.pstg | formatInteger }} 円</span
            >
          </template>
        </div> -->

        <!-- 補助クーポン・ベネポ利用 GC不要
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
        -->

        <div class="divider mb-5 md:mb-4" style="border-color: #1F2021;" />

        <!-- お支払い金額 -->
        <div class="flex justify-between">
          <p class="font-bold my-auto mr-3">現地支払予定額</p>
          <span
            v-if="paymentInfo && Number.isInteger(paymentInfo.billAmtTotal)"
            class="right font-bold text-2xl md:text-base"
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
        v-if="mypageDisplayCode && !fromSiteUnsupported(mypageDisplayCode, 'hitaikou') && couponUsedDetail && couponUsedDetail.length"
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

      <!-- お支払い方法〜ポイント付与について GC不要 -->
      <div class="mb-8 md:mb-6" v-if="(!isLife || get(paymentInfo, 'pointGrntNumAmt'))">
        <!-- お支払い方法 GC不要
        <template v-if="!isLife">
          <div>
            <ItemTitle class="mb-4" :text="'お支払い方法'" />
          </div>
          <div class="mb-5 ml-2">
            ご宿泊料金は現地でのお支払いとなります。
          </div>
        </template>
        -->
        <!-- 付与予定ベネポ GC不要
        <template v-if="get(paymentInfo, 'pointGrntNumAmt') && !isCanceled">
          <div class="mb-4 md:mb-2">
            <ItemTitle :text="'付与予定ベネポ'" />
          </div>
          <div ref="appDetail" class="granted-benepo">
            <div class="flex justify-center mb-6 md:mb-3">
              <p class="font-bold text-2xl">
                {{ (paymentInfo.pointGrntNumAmt | formatInteger) }}
              </p>
              <span class="ml-2 font-bold my-auto">ベネポ(円)</span>
            </div>
            <!-- <p>ベネポ付与日 2022年11月20日</p> 
            <p class="font-bold mb-4">ポイント付与について</p>
            <div class="flex gap-4 md:gap-3 mb-5 md:mb-3">
              <img src="@/assets/images/BS_MYP_05_010/recomment-logo1.png" />
              <img src="@/assets/images/BS_MYP_05_010/recomment-rakuten.png" />
            </div>
            <span class="md:text-xs">
              をご利用の場合、企業補助金およびベネポご利用分を除いた自己負担額（税込）に対して規定の付与ルールで確定したベネポ数をチェックアウト日の翌日から5日後に付与いたします。
            </span>
          </div>
        </template>-->
      </div>
    </div>

    <!-- キャンセル規定 -->
    <div id="OrderCancelInfor" class="cancel-container">
      <h2 class="font-bold pb-5 md:pb-4 text-xl md:text-base title-line">キャンセル規定</h2>
      <div v-if="cancelPolicyList() && Array.isArray(cancelPolicyList()) && cancelPolicyList().length > 0" class="cancel-content">
        <div>
          <table class="table-common">
            <tr>
              <th class="w-2/3">キャンセル日</th>
              <th class="style-t w-1/3">キャンセル料</th>
            </tr>
            <tr v-for="(val, index) in cancelPolicyList()" :key="index">
              <td>{{ val.note }}</td>
              <td class="style-t">{{ val.rate }}</td>
            </tr>
          </table>
        </div>
      
        <ul class="text-xs text-gray-500">
          <li>・店舗の営業時間を超えた後のキャンセル連絡は、翌日扱いになる場合がございますのでご注意ください。</li>
          <li>※キャンセル規定では店舗休業日は含まれません。ご利用日またはキャンセル料発生日の前日が店舗休業日の場合、休業日前にご連絡が必要です。</li>
          <li>・ご変更の際は、キャンセル手続き後の再手配となりますので、増員・減員・プラン変更が承れない場合がございます。</li>
          <li>・団体キャンセル規定については店舗独自で設定されている場合がございますので直接店舗にお問い合わせください。</li>
        </ul>
        <p class="text-primary text-xs">
          ※予約番号はお申込と同時に表示されます。
          予約番号の表示がある場合でもまだご予約が確約していない場合があります。
          ご予約可否結果につきましては、ご利用履歴画面の「手配状況」欄もしくは、ご希望回答先に送信いたしておりますメールの内容をご確認ください。
        </p>
        <ItemTitle v-if="isShowPayee" class="mb-4" :text="'キャンセル料お支払先'" />
        <table class="table-common">
          <tr v-if="gcPaymentInfo.payeeTelNum">
            <th>店舗電話番号</th>
            <td class="style-t">{{gcPaymentInfo.payeeTelNum}}</td>
          </tr>
          <tr v-if="gcPaymentInfo.emailTo">
            <th>店舗メールアドレス</th>
            <td class="style-t">{{gcPaymentInfo.emailTo}}</td>
          </tr>
          <tr v-if="gcPaymentInfo.bankNm 
                  && gcPaymentInfo.bankBranchNm
                  && gcPaymentInfo.accountType
                  && gcPaymentInfo.accountNo
                  && gcPaymentInfo.accountNmKana
          ">
            <td class="style-t" colspan="2">
            <span class="font-medium">お支払口座</span>
            <div class="text-sm flex">
              <span class="w-1/3">{{gcPaymentInfo.bankNm}}</span>
              <span class="w-1/3">{{gcPaymentInfo.bankBranchNm}}</span>
              <span class="w-1/3">{{gcPaymentInfo.accountType}}</span>
            </div>
            <div class="text-sm flex">
              <span class="w-1/3">口座番号</span>
              <span class="w-1/3">{{gcPaymentInfo.accountNo}}</span>
            </div>
            <div class="text-sm flex">
              <span class="w-1/3">口座名義</span>
              <span class="w-1/3">{{gcPaymentInfo.accountNmKana}}</span>
            </div>
            </td>
          </tr>
        </table>
      </div>
      <div v-else>
        <p>キャンセル規定なし</p>
      </div>
    </div>
  </div>
</template>

<script>
import get from "lodash/get"

export default {
  props: 
    [
    "paymentInfo",
    "couponUsedDetail",
    "mypageDisplayCode",
    "applicationDetail",
    "cardObj",
    "menuNo",
    "planId",
    "cancelPolicy"
    ],
  data() {
    return {
      gcPaymentInfo: {}
    };
  },
  computed: {
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
      return srvicDiv !== this.CONST.SRVIC_DIV.TOURS;
    },
    isShowPayee() {
      if ( typeof this.gcPaymentInfo.payeeTelNum === 'undefined' &&
      typeof this.gcPaymentInfo.emailTo === 'undefined' &&
      typeof this.gcPaymentInfo.bankNm === 'undefined' &&
      typeof this.gcPaymentInfo.bankBranchNm === 'undefined' &&
      typeof this.gcPaymentInfo.accountType  === 'undefined' &&
      typeof this.gcPaymentInfo.accountNo === 'undefined' &&
      typeof this.gcPaymentInfo.accountNmKana === 'undefined' ) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    menuNo(value) {
      this.getGCPaymentInfo();
    },
  },
  methods: {
    /*checkDataTable(dataTable) {
      if(dataTable && Array.isArray(dataTable)){
        return true;
      }
      return false;
    },*/
    // キャンセル規定の組み合わせで文字列を生成
    cancelPolicyList() {
      const len = this.cancelPolicy?.length || 0;
      const groups = {};

      for (let i = 0; i < len; i++) {
        const item = this.cancelPolicy[i],
        itemPlanId = item.planId === null ? 0 : item.planId;
        if (!groups[itemPlanId]) {
          groups[itemPlanId] = [];
        }

        groups[itemPlanId].push({
          note: `利用予定日の${item.cancelPolicyDate}`,
          rate: item.cancelChargeRate + "%"
        });
      }
      if (groups[this.planId]) {
        return groups[this.planId];
      } else if (groups[0]) {
        return groups[0];
      }
      return [];
    },
    // キャンセル料お支払先情報を取得
    async getGCPaymentInfo(){
      if (!this.menuNo) { return; }
      this.$repositories("menus")
        .getPaymentInfoGC(this.menuNo)
        .then((data) => {
          this.gcPaymentInfo = data;
        });
    },
    get
  }
};
</script>

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
    text-align: right;  
  }
}
</style>
