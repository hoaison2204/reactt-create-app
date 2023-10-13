<template>
  <div class="order-payment-infor">

    <!-- お支払い情報 -->
    <div id="OrderPaymentInfor">

      <h1 class="font-bold pb-5 md:pb-4 text-xl md:text-base title-line">お支払い情報</h1>

      <!-- ご利用料金〜お支払い金額 -->
      <div class="flex flex-col mb-8 md:mb-6">
        <!-- ご利用料金 -->
        <div class="payment-item mb-4">
          <p>ご利用料金</p>
          <span v-if="paymentInfo && Number.isInteger(usageFeeIncludingTax)" class="font-bold">
            {{ usageFeeIncludingTax | formatInteger }} 円 (税込)
          </span>
        </div>

        <!-- のし・ラッピング -->
        <div class="payment-item mb-4">
          <p>のし/ラッピング</p>
          <span class="font-bold">
            0 円 (税込)</span
          >
        </div>

        <!-- 送料 -->
        <div class="payment-item mb-4">
          <p>送料</p>
          <span v-if="paymentInfo && Number.isInteger(shippingFeeSaleTotalIncludingTax)" class="font-bold">
            {{ shippingFeeSaleTotalIncludingTax | formatInteger }} 円 (税込)</span
          >
        </div>

        <!-- 補助クーポン・ベネポ利用 -->
        <div>
          <h3 class="text-gray-500 mb-2">{{ titleUseCoupon }}</h3>
          <div v-if="showSbsidTotal" class="payment-item mb-4">
            <p>補助クーポン利用額</p>
            <span
              v-if="paymentInfo && Number.isInteger(paymentInfo.sbsidTotal)"
              class="font-bold text-red-500"
            >
              - {{ paymentInfo.sbsidTotal | formatInteger }} (円)
            </span>
          </div>

          <div v-if="showCafeTotal" class="payment-item mb-4">
            <p>カフェテリアポイント利用額</p>
            <span
              v-if="paymentInfo && Number.isInteger(paymentInfo.cafeAmtTotal)"
              class="font-bold text-red-500"
            >
              - {{ paymentInfo.cafeAmtTotal | formatInteger }} 円
            </span>
          </div>

          <div class="payment-item mb-4">
            <p>ベネポ利用額</p>
            <span
              v-if="paymentInfo && Number.isInteger(paymentInfo.pointUse)"
              class="font-bold text-red-500"
            >
              <template v-if="paymentInfo.pointUse !== 0">
                - {{ paymentInfo.pointUse | formatInteger }} ポイント(円)
              </template>
              <template v-else>
                {{ paymentInfo.pointUse | formatInteger }} ポイント(円)
              </template>
            </span>
          </div>
        </div>

        <div class="divider mb-5 md:mb-4" style="border-color: #1F2021;" />

        <!-- お支払い金額 -->
        <div class="flex flex-col mb-4 md:mb-1">
          <div class="payment-item mb-1">
            <p class="font-bold mt-2">お支払い金額</p>
            <span
              v-if="paymentInfo && Number.isInteger(billAmtTotal)"
              class="font-bold text-2xl"
            >
              {{ billAmtTotal | formatCurrency }} (税込)
            </span>
          </div>
        </div>
        <!-- 10%対象 -->
        <div class="flex flex-col mb-4 md:mb-1">
          <div class="payment-item mb-1">
            <p>10%対象</p>
            <span>
              {{ totalIncludingNormalTax | formatCurrency }} (消費税 {{ normalTax | formatCurrency }})
            </span>
          </div>
        </div>
        <!-- 8%対象 -->
        <div class="flex flex-col mb-4 md:mb-1">
          <div class="payment-item mb-1">
            <p>8%対象</p>
            <span>
              {{ totalIncludingReducedTax | formatCurrency }} (消費税 {{ reducedTax | formatCurrency }})
            </span>
          </div>
        </div>
        <!-- ※軽減税率対象 -->
        <div class="flex flex-col mb-4 md:mb-1">
          <p>※軽減税率対象</p>
        </div>
      </div>
    </div>

    <div class="divider -mx-10 lg:-mx-3 mb-8 md:mb-6" />

    <!-- キャンセル規定 -->
    <div id="OrderCancelInfor" class="cancel-container">
      <h1 class="font-bold pb-5 md:pb-4 text-xl md:text-base title-line">キャンセル規定</h1>
      <div>
        <div class="cancel-content">
          <div v-if="applicationDetail.shoppingGuideCancelRuleVal">
            <h2 class="font-bold mb-5">返品・交換・キャンセル等</h2>
            <p class="c-lists__list__text" >
              {{ applicationDetail.shoppingGuideCancelRuleVal }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
      tax: {
        NORMAL: "1",
        REDUCED: "2"
      }
    };
  },
  computed: {
    showSbsidTotal() {
      return this.couponUsedDetail?.length || this.paymentInfo?.sbsidTotal
    },
    showCafeTotal() {
      return this.paymentInfo.cafeAmtTotal
    },
    titleUseCoupon() {
      // #56007 
      // ・ベネポの利用有無にかかわらずベネポ利用額は表示される
      // ・カフェは1円以上の利用で表示される
      // ・＜補助クーポン・カフェテリアポイント・ベネポ利用＞の部分は、利用しているものが表示される。
      //   ※ただし、どれの利用もない場合はベネポ利用が表示される
      let title = [];
      if (this.showSbsidTotal) {
        // 補助クーポン利用時
        title.push("補助クーポン");
      }
      if (this.showCafeTotal) {
        // カフェ利用時
        title.push("カフェテリアポイント");
      }
      if (this.paymentInfo.pointUse > 0 || title.length === 0) {
        // 全額カフェ以外
        title.push("ベネポ");
      }
      return `＜${title.join("・")}利用＞`
    },
    /**
     * 商品税率区分
     */
    taxDiv() {
      return this.paymentInfo.taxDiv;
    },
    /**
     * ご利用料金(税込み)
     */
    usageFeeIncludingTax() {
      return this.paymentInfo.totalAmt;
    },
    /**
     * お支払い金額
     */
    billAmtTotal() {
      return Number(this.paymentInfo.billAmtTotal);
    },
    /**
     * 割引額(割引額設定画面で上書きしてください)
     *  補助クーポン利用額 + Cafe利用額 + ベネポ利用額
     */
    discountAmount() {
      return Number(this.paymentInfo.sbsidTotal) + Number(this.paymentInfo.cafeAmtTotal) + Number(this.paymentInfo.pointUse);
    },
    /**
     * 商品利用額(税込み)
     *  ご利用料金 - 割引額
     */
    productUsageAmount() {
      return this.usageFeeIncludingTax - this.discountAmount;
    },
    /**
     * 送料合計(税込み)
     */
    shippingFeeSaleTotalIncludingTax() {
      return this.paymentInfo.pstg;
    },
    /**
     * 送料税率区分
     */
    shippingFeeSaleTaxDiv() {
      return this.paymentInfo.shippingFeeTaxDiv;
    },
    /**
     * 消費税10%対象(税込み)
     */
    totalIncludingNormalTax() {
      if (this.billAmtTotal <= 0) {
        // 送料込みで0円以下
        return 0;
      }

      let total = 0;
      if (this.taxDiv == this.tax.NORMAL) {
        if (this.productUsageAmount > 0) {
          total += this.productUsageAmount;
        }
      }
      if (this.shippingFeeSaleTaxDiv == this.tax.NORMAL) {
        if (this.billAmtTotal <= this.shippingFeeSaleTotalIncludingTax) {
          // 支払額が送料以下
          total += this.billAmtTotal;
        } else {
          total += this.shippingFeeSaleTotalIncludingTax;
        }
      }

      return Math.round(total);
    },
    /**
     * 消費税10%
     */
    normalTax() {
      if (this.billAmtTotal <= 0) {
        // 送料込みで0円以下
        return 0;
      }

      return Math.round((this.totalIncludingNormalTax / 1.1) * 0.1);
    },
    /**
     * 消費税8%対象(税込み)
     */
    totalIncludingReducedTax() {
      if (this.billAmtTotal <= 0) {
        // 送料込みで0円以下
        return 0;
      }
      let total = 0;

      if (this.taxDiv == this.tax.REDUCED) {
        if (this.productUsageAmount > 0) {
          total += this.productUsageAmount;
        }
      }
      if (this.shippingFeeSaleTaxDiv == this.tax.REDUCED) {
        if (this.payment <= this.shippingFeeSaleTotalIncludingTax) {
          // 支払額が送料以下
          total += this.billAmtTotal;
        } else {
          total += this.shippingFeeSaleTotalIncludingTax;
        }
      }

      return Math.round(total);
    },
    /**
     * 消費税8%
     */
    reducedTax() {
      if (this.billAmtTotal <= 0) {
        // 送料込みで0円以下
        return 0;
      }
      return Math.round((this.totalIncludingReducedTax / 1.08) * 0.08);
    },
  },
  watch: {
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