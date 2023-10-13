<template>
  <div class="p-mypage-receipt-l-container children-font-size-15px">
    <!-- Main-content -->
    <div class="main-container">
      <div class="right-container">
        <div class="flex md:hidden">
          <p @click="handleBackToApplyShow()" class="back-link">
            <Icon name="arrow_left" class="mr-1" color="#E60021" />
            お申し込み内容詳細に戻る
          </p>
        </div>

        <!-- コンテンツボックス。印刷時はこのタグ内のみ表示される -->
        <div
          class="box-right"
          v-if="acpt && acpt.billAmtTotal != 0"
          id="printContainer"
        >
          <div class="flex justify-between">
            <div class="mb-2 sm:w-11/12">
              <span class="border-b border-black pb-1">
                <span class="text-xl md:text-sm" wovn-ignore>
                  {{ 
                    receipt && receipt.rciptAddrNm
                  }}&nbsp;様</span>
                <div v-show="receipt && receipt.reissueFlag === CONST.REISSUE_FLAG.REISSUE">
                  <div 
                      class="w-20 py-1 px-2 mt-4 ml-1 text-xs text-center font-normal mb-3"
                      style="color: #da291c; border: 1px solid #da291c;">
                      <span>再発行</span>
                  </div>
                </div>
              </span>
            </div>
            <div class="py-1 px-2 mt-3 md:mt-1 text-xs">
              領収書番号：{{ receipt && receipt.rciptNo }}
              <img
                class="ml-auto mt-3 md:mt-1 md:w-24 md:h-5 mb-3"
                width="123"
                height="26"
                src="@/assets/images/benefitone-logo.png"
              />
            </div>
          </div>

          <div class="flex justify-end md:mt-3 relative">
            <p class="benefit-address-text">
              株式会社ベネフィットワン<br />〒163-1037<br />東京都新宿区西新宿三丁目7番1号<br />新宿パークタワー37階
            </p>
            <img
              class="z-0 transform -translate-x-12 md:-translate-x-10 md:h-12 md:w-12"
              width="65"
              height="66"
              src="@/assets/images/company-seal.png"
            />
          </div>

          <div class="mx-12 md:mx-0">
            <h1 class="tracking-widest">領収書</h1>
            <div>
              <p class="text-start md:text-left md:text-xs">
                このたびはご利用いただき、誠にありがとうございました。
              </p>
              <div
                class="h-14 md:h-12 font-bold text-center my-3"
                style="background: #e7e7e7"
              >
                <span class="text-2xl md:text-lg leading-loose md:leading-10">
                  {{
                    Intl.NumberFormat("ja-JP", {
                      style: "currency",
                      currency: "JPY",
                    }).format(acpt && acpt.billAmtTotal)
                  }}
                </span>
                <span class="md:text-sm">(税込)</span>
              </div>
              <span>
                <p class="md:text-xs">上記金額を正に領収いたしました。</p>
                <p class="md:text-xs">
                  但し：商品代金として(クレジットカードご利用分)。
                </p>
              </span>
            </div>

            <!-- Table-detail -->
            <table class="shop-receipt-table-spacing">
              <colgroup>
                <col style="width: 15%" />
                <col style="width: 20%" />
                <col style="width: 40%" />
                <col style="width: 15%" />
              </colgroup>

              <tr>
                <td class="text-center">申込日</td>
                <td class="text-center">受付番号</td>
                <td class="text-center">商品名</td>
                <td class="text-center">金額</td>
              </tr>
              <tbody>
                <tr class="text-center">
                  <td>{{ formattedAcptDate }}</td>
                  <td>{{ acpt.acptNo }}</td>
                  <td>
                    {{ acpt.acptDtlList[0].menuBasicInfo.menuNm }}
                    <span v-if="isDisplayEightPercentTax">※</span>
                  </td>
                  <td class="text-right pr-2">
                    {{
                      Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      }).format(acpt.acptDtlList[0].dtlChrgTotal.memberChrgTotal + acpt.acptDtlList[0].dtlChrgTotal.taxAmtTotal)
                    }}
                  </td>
                </tr>

                <tr class="text-center">
                  <td>{{ formattedAcptDate }}</td>
                  <td>{{ acpt.acptNo }}</td>
                  <td>送料</td>
                  <td class="text-right pr-2">
                    {{
                      Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      }).format(acpt.pstg)
                    }}
                  </td>
                </tr>

                <tr class="text-center">
                  <td>{{ formattedAcptDate }}</td>
                  <td>{{ acpt.acptNo }}</td>
                  <td>のし／ラッピング</td>
                  <td class="text-right pr-2">
                    {{
                      Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      }).format(0)
                    }}
                  </td>
                </tr>

                <tr class="text-center">
                  <td>{{ formattedAcptDate }}</td>
                  <td>{{ acpt.acptNo }}</td>
                  <td>ベネポ利用</td>
                  <td class="text-right pr-2">
                    {{
                      Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      }).format(acpt.pointUseNumAmt)
                    }}
                  </td>
                </tr>

                <tr class="text-center">
                  <td>{{ formattedAcptDate }}</td>
                  <td>{{ acpt.acptNo }}</td>
                  <td>補助クーポン</td>
                  <td class="text-right pr-2">
                    {{
                      Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      }).format(acpt.aplySbsidAmt)
                    }}
                  </td>
                </tr>

                <tr class="text-center">
                  <td>{{ formattedAcptDate }}</td>
                  <td>{{ acpt.acptNo }}</td>
                  <td>カフェ</td>
                  <td class="text-right pr-2">
                    {{
                      Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      }).format(acpt.aplyCafePointAmt)
                    }}
                  </td>
                </tr>

                <tr>
                  <td colspan="3" class="text-center">合計（税込）</td>
                  <td class="text-right pr-2">
                    {{
                      Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      }).format(acpt && acpt.billAmtTotal)
                    }}
                  </td>
                </tr>

                <tr>
                  <td colspan="2" class="text-center">10%対象</td>
                  <td colspan="2" class="text-center">
                    {{
                      `${formattedTotalAmountTenPercentTax} ${formattedTenPercentTax}`
                    }}
                  </td>
                </tr>

                <tr v-if="isDisplayEightPercentTax">
                  <td colspan="2" class="text-center">8%対象</td>
                  <td colspan="2" class="text-center">
                    {{
                      `${formattedTotalAmountEightPercentTax} ${formattedEightPercentTax}`
                    }}
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="row">
              <div class="flex justify-between">
                <div class="mt-3">※ 軽減税率対象</div>
                <div class="mt-3">登録番号　T8011001045281</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Button-confirmation -->
        <div>
          <div class="button md:mb-0">
            <button class="button-item" @click="handlePrint">印刷する</button>
          </div>
          <div class="flex">
            <span class="back-link" @click="handleBackToApplyShow()">
              <Icon name="arrow_left" class="mr-1" color="#E60021" />
              お申し込み内容詳細に戻る
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      acpt: null,
      receipt: null,
      orderList: [
        {
          time: "2020年04月30日",
          description:
            "732679コンビニで使えるクーポン【コードタイプ】【先着順】【ローソン】MACHI cafe ドリンク（S)（税込100円）※お持ち帰り限定",
          phone: "0099710066",
        },
      ],
    };
  },
  computed: {
    formattedAcptDate() {
      const formattedDate = this.acpt.acptDatetime ? moment(this.acpt.acptDatetime).format("YYYY-MM-DD") : "";
      return formattedDate;
    },
    formattedTotalAmountTenPercentTax() {
      let totalAmountTenPercentTax = 0;
      let taxDiv = this.acpt.acptDtlList[0].prodSlsPlanPrtic.taxDiv;
      let pstgTaxDiv = this.acpt.acptDtlList[0].prodSlsPlanPrtic.pstgTaxDiv;
      let totalAmt = this.acpt.acptDtlList[0].dtlChrgTotal.memberChrgTotal + this.acpt.acptDtlList[0].dtlChrgTotal.taxAmtTotal;
      let sbsidAmt = this.acpt.aplySbsidAmt;
      let cafePointAmt = this.acpt.aplyCafePointAmt;
      let pointUseNumAm = this.acpt.pointUseNumAmt;

      if (taxDiv === this.CONST.TAX.TEN_PERCENT) {
        totalAmountTenPercentTax += (totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm)) + this.acpt.pstg;
      }

      if (taxDiv === this.CONST.TAX.EIGHT_PERCENT) {
        if ((totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm)) < 0) {
          totalAmountTenPercentTax += this.acpt.pstg + (totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm));
        } else {
          totalAmountTenPercentTax += this.acpt.pstg;
        }
      }

      const priceTotalText = Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(totalAmountTenPercentTax);
      return priceTotalText;
    },

    formattedTotalAmountEightPercentTax() {
      let totalAmountEightPercentTax = 0;
      let taxDiv = this.acpt.acptDtlList[0].prodSlsPlanPrtic.taxDiv;
      let totalAmt = this.acpt.acptDtlList[0].dtlChrgTotal.memberChrgTotal + this.acpt.acptDtlList[0].dtlChrgTotal.taxAmtTotal;
      let sbsidAmt = this.acpt.aplySbsidAmt;
      let cafePointAmt = this.acpt.aplyCafePointAmt;
      let pointUseNumAm = this.acpt.pointUseNumAmt;

      if (taxDiv === this.CONST.TAX.EIGHT_PERCENT && (totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm)) > 0) {
        totalAmountEightPercentTax += ((totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm)));
      }

      const priceTotalText = Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(totalAmountEightPercentTax);
      return priceTotalText;
    },

    isDisplayEightPercentTax() {
      let taxDiv = this.acpt.acptDtlList[0].prodSlsPlanPrtic.taxDiv;

      return taxDiv === this.CONST.TAX.EIGHT_PERCENT;
    },

    formattedTenPercentTax() {
      let taxTotal = 0;
      let taxDiv = this.acpt.acptDtlList[0].prodSlsPlanPrtic.taxDiv;
      let pstgTaxDiv = this.acpt.acptDtlList[0].prodSlsPlanPrtic.pstgTaxDiv;
      let totalAmt = this.acpt.acptDtlList[0].dtlChrgTotal.memberChrgTotal + this.acpt.acptDtlList[0].dtlChrgTotal.taxAmtTotal;
      let sbsidAmt = this.acpt.aplySbsidAmt;
      let cafePointAmt = this.acpt.aplyCafePointAmt;
      let pointUseNumAm = this.acpt.pointUseNumAmt;

      if (taxDiv === this.CONST.TAX.TEN_PERCENT) {
        taxTotal += (totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm) + this.acpt.pstg) - Math.round((totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm) + this.acpt.pstg) / 1.1);
      } else if(((totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm))) < 0) {
        taxTotal += (this.acpt.pstg + (totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm))) - Math.round((this.acpt.pstg + (totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm))) / 1.1);
      } else {
        taxTotal += this.acpt.pstg - Math.round(this.acpt.pstg / 1.1);
      }
      taxTotal = Math.abs(taxTotal)
      const formattedTaxTotal = Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(taxTotal);
      return `(消費税 ${formattedTaxTotal})`; 
    },

    formattedEightPercentTax() {
      let taxTotal = 0;
      let taxDiv = this.acpt.acptDtlList[0].prodSlsPlanPrtic.taxDiv;
      let totalAmt = this.acpt.acptDtlList[0].dtlChrgTotal.memberChrgTotal + this.acpt.acptDtlList[0].dtlChrgTotal.taxAmtTotal;
      let sbsidAmt = this.acpt.aplySbsidAmt;
      let cafePointAmt = this.acpt.aplyCafePointAmt;
      let pointUseNumAm = this.acpt.pointUseNumAmt;

      if (taxDiv === this.CONST.TAX.EIGHT_PERCENT && (totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm)) > 0) {
        taxTotal += (totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm)) - Math.round(((totalAmt - (sbsidAmt + cafePointAmt + pointUseNumAm))) / 1.08);
      }
      taxTotal = Math.abs(taxTotal)

      const formattedTaxTotal = Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(taxTotal);
      return `(消費税 ${formattedTaxTotal})`; 
    },
  },

  mounted() {
    this.$page.showSideMenu = true;
    this.setBreadcrumb();
    this.init();
  },
  methods: {
    async init() {
      const { acptNo } = this.$route.query;
      this.$repositories("orders").getOrderDetailShop(
        acptNo
      ).then(orderDetailShop => {
        console.log("orderDetailShop");
        console.log(orderDetailShop);
        if (orderDetailShop.status && orderDetailShop.status !== 200) {
          console.error("Call getOrderDetailShop error: " + orderDetailShop.data.error.message);
          return;
        }

        this.acpt = orderDetailShop.acpt;
      });
      
      this.$repositories("orders").getOrderReceipt(
        acptNo
      ).then((orderReceipt) => {
        console.log("orderReceipt");
        console.log(orderReceipt);
        if (orderReceipt.status !== 200) {
          console.error("Call getOrderReceipt error: " + orderReceipt.data.error.message);
          return;
        }
        
        this.receipt = orderReceipt.data;
      });
    },
    setBreadcrumb() {
      const { menuNo, acptNo, isPublicStay, srvicDiv } = this.$route.query;
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ ", "/mypage")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("申込履歴", "/mypage/orders")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb(
          "申込内容詳細",
          `/mypage/orders/${menuNo}?acptNo=${acptNo}&srvicDiv=${srvicDiv}&isPublicStay=${isPublicStay}`
        )
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("領収書"));
    },
    /** 印刷実行メソッド。印刷の直前に領収書以外を非表示にするスタイルタグを追加し、メソッド終了時に削除する */
    handlePrint() {
      const styleTag = document.createElement("style");
      styleTag.media = "print";
      // Safariの場合、bodyや#appなど優先度が高いものに visibility: hidden を付与すると表示が崩れたため、
      // .l-defaltを指定している
      styleTag.appendChild(
        document.createTextNode(`
        .l-default {
          visibility: hidden;
        }
        #printContainer {
          visibility: visible;
          box-shadow: none;
        }
      `)
      );
      document.head.appendChild(styleTag);
      window.print();
      styleTag.remove();
    },
    handleBackToApplyShow() {
      const { menuNo, acptNo, isPublicStay, srvicDiv } = this.$route.query;
      this.$router.push(
        `/mypage/orders/${menuNo}?acptNo=${acptNo}&srvicDiv=${srvicDiv}&isPublicStay=${isPublicStay}`
      );
    },
  },
  watch: {
    $route() {
      this.setBreadcrumb();
    },
  },
};
</script>

<style scoped lang="scss">
.children-font-size-15px * {
  font-size: 15px;
  @media screen and (max-width: 625px) {
    font-size: 12px;
  }
}
.shop-receipt-table-spacing {
  @media screen and (max-width: 625px) {
    table-layout: auto !important;
  }
}

.benefit-address-text {
  color: #1f2021;
  z-index: 1;
  font-size: 12px;
  line-height: 1rem;

  @include mq() {
    font-size: 10px;
    line-height: 0.9rem;
  }
}

table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid rgb(198, 195, 196);
}
</style>
