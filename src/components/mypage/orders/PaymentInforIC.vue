<template>
  <div class="order-payment-infor">

    <!-- お支払い情報 -->
    <div id="OrderPaymentInfor">

      <h1 class="font-bold pb-5 md:pb-4 text-xl md:text-base title-line">お申込み内容</h1>

      <!-- プラン見出し〜決済金額 -->
      <div class="flex flex-col mb-8 md:mb-6">
        <!-- プラン見出し～数量 -->
        <div class="payment-item">
          <p>{{ redemption.planName || cardObj.menuNm }}</p>
          <span v-if="paymentInfo && Number.isInteger(redemption.quantity)" class="font-bold">
            {{ redemption.quantity }}
          </span>
        </div>
        <!-- 交換ポイント数 -->
        <div class="payment-item">
          <p>交換{{ redemption.pointName }}数合計</p>
          <span v-if="paymentInfo && Number.isInteger(redemption.usePoint)" class="font-bold">
            {{ redemption.usePoint }} {{ redemption.pointName }}
          </span>
        </div>

        <!-- クレジットカード決済額 -->
        <div class="payment-item" v-if="redemption.creditPrice !== 0">
          <p>クレジットカード決済額</p>
          <span v-if="paymentInfo && Number.isInteger(redemption.creditPrice)" class="font-bold">
            {{ redemption.creditPrice | formatCurrency }}
          </span>
        </div>
      </div>
    </div>
    <div class="divider -mx-10 lg:-mx-3 mb-8 md:mb-6" />

    <!-- キャンセル規定 -->
    <div id="OrderCancelInfor" class="cancel-container">
      <h1 class="font-bold pb-5 md:pb-4 text-xl md:text-base title-line">キャンセル規定</h1>
      <div>
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

          <h2 class="font-bold mb-5">キャンセルについての補足</h2>
          <div class="text-xs text-gray-500 list-none">
            <li>
              ポイントプログラムサイトにて交換された商品の変更・キャンセルは、承っておりません。
            </li>
          </div>
          <p class="text-xs text-gray-500">
            ※商品の初期不良や注文した商品との相違等がございましたら、誠に恐れ入りますが、<a :href="getUrlNotification" style="color:#0d76bf">お問合わせフォーム</a>にてご連絡くださいますよう、お願いいたします。
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
    return {
      redemption: {}
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
    getUrlNotification() {
      switch (process.env.VUE_APP_DEV_MODE) {
        case this.CONST.ENV.PRODUCTION:
          return 'https://bs.benefit-one.co.jp/bs/pages/bo/enqTemplate.faces?ih=/contents/cgi/incentive/form3';
        case this.CONST.ENV.STAGING:
          return 'https://bs.benefit-one.co.jp/bs/pages/bo/enqTemplate.faces?ih=/contents/cgi/incentive/form3';
        case this.CONST.ENV.DEVELOPMENT:
          return 'https://test.bene-st.jp/bs/pages/bo/enqTemplate.faces?ih=/contents/cgi/incentive/form3';
        default:
          return 'https://bs.benefit-one.co.jp/bs/pages/bo/enqTemplate.faces?ih=/contents/cgi/incentive/form3';
      }
    }
  },
  mounted() {
    const { isPublicStay } = this.$route.query;
    this.isPublicStay = JSON.parse(isPublicStay);
    this.getCancelPolicies();
    this.getRedemption()
  },
  watch: {
    cancelPolicy(val) {
      this.cancelPolicies = val.cancelPolicies;
    },
    cardObj: {
      deep: true,
      immediate: true,
      handler() {
        this.getRedemption()
      }
    }
  },
  data() {
    return {
      cancelPolicies: [],
      isPublicStay: false,
      redemption: {}
    };
  },
  methods: {
    getRedemption() {
      if (this.cardObj.acptNo === null) return
      this.$repositories('orders')
      .getRedemptionInfo(this.cardObj.acptNo, this.applicationDetail.acptDatetime2, this.applicationDetail.companyCd, this.applicationDetail.pointUseCd)
      .then(
        (response) => {
          this.redemption = response.data
        },
        (error) => {}
      )
    },
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
