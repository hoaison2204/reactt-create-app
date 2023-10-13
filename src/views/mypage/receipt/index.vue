<template>
  <div class="p-mypage-receipt-l-container children-font-size-15px">
    <!-- Main-content -->
    <div class="main-container">
      <div class="right-container">
        <div class="flex md:hidden">
          <p
            @click="handleBackToApplyShow()"
            class="back-link"
          >
            <Icon name="arrow_left" class="mr-1" color="#E60021" />
            お申し込み内容詳細に戻る
          </p>
        </div>

        <!-- コンテンツボックス。印刷時はこのタグ内のみ表示される -->
        <div class="box-right" v-if="receipt" id="printContainer">
          <div class="flex justify-between">
            <div class="mb-2">
              <span class="border-b border-black pb-1">
                <span class="text-xl md:text-sm" wovn-ignore
                  >{{ receipt.rciptAddrNm }}&nbsp;様</span
                >
              </span>
            </div>
            <div class="py-1 px-2 mt-3 md:mt-1 text-xs">
              領収書番号：{{ receipt.rciptNo }}
              <img
                class="ml-auto mt-3 md:mt-1 md:w-24 md:h-5"
                width="123"
                height="26"
                src="@/assets/images/benefitone-logo.png"
              />
            </div>
          </div>
          <div v-show="receipt.reissueFlag === CONST.REISSUE_FLAG.REISSUE">
            <div
              class="w-20 py-1 px-2 mt-4 ml-1 text-xs text-center font-normal mb-3"
              style="
              color: #da291c;
              border: 1px solid #da291c;
            "
            >
              <span>再発行</span>
            </div>
          </div>
          <div class="flex justify-start md:mt-3 relative">
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
            <h1 class="tracking-widest">
              領収書
            </h1>
            <div>
              <p class="text-center md:text-left md:text-xs">
                このたびはご利用いただき、誠にありがとうございました。
              </p>
              <div
                class="h-14 md:h-12 font-bold text-center my-3"
                style="background: #E7E7E7;"
              >
                <span class="text-2xl md:text-lg leading-loose md:leading-10">
                  {{
                    Intl.NumberFormat("ja-JP", {
                      style: "currency",
                      currency: "JPY"
                    }).format(receipt.romAmt)
                  }}
                </span>
                <span class="md:text-sm">(税込)-</span>
              </div>
              <span>
                <p class="md:text-xs">上記金額を正に領収いたしました。</p>
                <p class="md:text-xs">但し：{{ receipt.proviso }}</p>
              </span>
            </div>

            <!-- Table-detail -->
            <table class="bs-receipt-table-spacing">
              <tbody>
                <tr>
                  <th>
                    入金日
                  </th>
                  <td>
                    {{ formattedRomDate }}
                  </td>
                </tr>
                <tr>
                  <th>
                    品名
                  </th>
                  <td>
                    {{ receipt.itemNm }}
                  </td>
                </tr>
                <tr>
                  <th>
                    受付番号
                  </th>
                  <td>
                    {{ receipt.acptNo }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Button-confirmation -->
        <div>
          <div class="button md:mb-0">
            <button class="button-item" @click="handlePrint">
              印刷する
            </button>
          </div>
          <div class="flex">
            <span
              class="back-link"
              @click="handleBackToApplyShow()"
            >
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
export default {
  data() {
    return {
      receipt: null,
      orderList: [
        {
          time: "2020年04月30日",
          description:
            "732679コンビニで使えるクーポン【コードタイプ】【先着順】【ローソン】MACHI cafe ドリンク（S)（税込100円）※お持ち帰り限定",
          phone: "0099710066"
        }
      ]
    };
  },
  computed: {
    /**
     * receipt.romDateの値を"yyyy年mm月dd日"の形式から"yyyy/mm/dd"に変換して返す
     * @returns { string }
     */
    formattedRomDate() {
      // "2021年08月22日"
      let romDate =  this.receipt.romDate;
      // "2021/08/22/"
      romDate = romDate.replace(/年|月|日/g, "/");
      // "2021/08/22"
      return romDate.slice(0, -1);
    }
  },
  mounted() {
    this.$page.showSideMenu = true;
    this.setBreadcrumb();
    this.init();
  },
  methods: {
    async init() {
      const { acptNo } = this.$route.query;
      const res = await this.$repositories("orders").getOrderReceipt(acptNo);
      this.receipt = res.data;
      // DPの場合は、但し書きをカスタマイズしてほしい旨の要望があったため、
      // メニュー名と領収書作成APIから取得した但し書きのカッコ文言を結合
      if (this.$route.query.srvicDiv == this.CONST.SRVIC_DIV.TOURS) {
        const menuNm = this.$route.query.menuNm;
        const provisoDp = this.receipt.proviso.split('（').[1];
        this.receipt.proviso = menuNm + 'ご利用代として' + '（' + provisoDp;
      }
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
      styleTag.appendChild(document.createTextNode(`
        .l-default {
          visibility: hidden;
        }
        #printContainer {
          visibility: visible;
          box-shadow: none;
        }
      `));
      document.head.appendChild(styleTag);
      window.print();
      styleTag.remove()
    },
    handleBackToApplyShow() {
      const { menuNo, acptNo, isPublicStay, srvicDiv, outsideResrvId } = this.$route.query;
      this.$router.push(
        `/mypage/orders/${menuNo}?acptNo=${acptNo}&srvicDiv=${srvicDiv}&isPublicStay=${isPublicStay}${srvicDiv === this.CONST.SRVIC_DIV.TOURS ? '&outsideResrvId=' + outsideResrvId : ''}`
      );
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
.children-font-size-15px * {
  font-size: 15px;
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
</style>
