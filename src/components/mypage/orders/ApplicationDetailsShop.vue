<template>
  <div
    id="OrderApplicationDetails"
    class="apply-container order-application-details-font-size-over-ride mt-0"
  >
    <h1 class="pb-5 md:pb-4 text-xl md:text-base title-line">お申込み情報</h1>

    <!-- プラン内容 -->
    <ItemTitle :text="plan" />
    <div class="content pl-3">
      <span class="text-left m-0 p-0">■商品説明:</span>
      <span
        class="px-0"
        v-if="applicationDetail && applicationDetail.planNm"
        v-html="nL2Br(applicationDetail.planNm)"
        ></span>
      <div
        class="ui mt-2"
        v-if="applicationDetail && applicationDetail.planLeadCopy"
      >
        <span
        v-html="nL2Br(applicationDetail.planLeadCopy)"
        ></span>
      </div>
    </div>

    <!-- ベネポ交換 -->
    <div v-if="isPointChange" class="mb-5 md:mb-3">
      <ItemTitle :text="destination" />
      <div class="item-text">
          <div v-if="pointText">{{ pointText }}ポイント</div>
          <div v-if="pointRateInfo">{{ pointRateInfo }}</div>
          <div v-if="isPointExchg">{{applicationDetail.usePoint}}ベネポを{{exchangeToPoint}}{{pointText}}ポイントに交換</div>
      </div>
    </div>

    <div class="expiryDate">
      <!-- 有効期限 -->
      <div class="expiryDate mb-5 md:mb-3" v-if="isLife">
        <ItemTitle text="有効期限" v-if="applicationDetail.cponStartDatetime || applicationDetail.cponEndDatetime || applicationDetail.shoppingGuideVal" />
        <div
          class="item-text block"
          v-if="applicationDetail.cponStartDatetime"
        >
          <span class="pr-0" v-if="applicationDetail.cponStartDatetime">{{
            applicationDetail.cponStartDatetime | formatDate('YYYY/MM/DD')
          }}</span>
          <span class="pl-0" v-if="applicationDetail.cponEndDatetime"
            ><span class="px-2">~</span
            >{{ applicationDetail.cponEndDatetime | formatDate('YYYY/MM/DD') }}</span
          >
        </div>
        <div class="item-text" v-else>
          <span v-if="applicationDetail.shoppingGuideVal">
            {{ applicationDetail.shoppingGuideVal }}
          </span>
        </div>
        <div></div>
      </div>

      <!-- 予約番号〜特典備考/注意事項 -->
      <div class="detail-flex-table mb-8 md:mb-6">

        <!-- 受付日時 -->
        <div v-if="applicationDetail && applicationDetail.acptDatetime">
          <ItemTitle text="受付日時" />
          <p class="item-text">{{ applicationDetail.acptDatetime }}</p>
        </div>
        <!-- 特典備考/注意事項(国内宿泊) -->
        <div>
          <ItemTitle text="特典備考／注意事項" />
          <span class="item-text" v-if="applicationDetail && applicationDetail.priceRemarks">
            <div class="break-all">{{ applicationDetail.priceRemarks }}</div>
          </span>

          <p class="item-text" v-else>なし</p>
        </div>
      </div>

      <!-- ご確認事項 -->
      <div class="table-info mb-8 md:mb-6" v-if="applicationDetail && (applicationDetail.qstn || applicationDetail.replyRem)">
        <div class="application-details-divider"></div>
        <h2 class="font-bold mb-2 md:mb-4">ご確認事項</h2>
        <span class="item-text" v-if="applicationDetail && applicationDetail.qstn">
          <!-- <div class="break-all">{{ applicationDetail.qstn }}</div> -->
          <div class="break-all px-2 py-2 Confirmation-details"><p style="white-space: pre-wrap;">{{ applicationDetail.qstn }}</p></div>
        </span>
        <span class="item-text" v-if="applicationDetail">
          <div class="break-all px-2"><p style="white-space: pre-wrap;">{{ applicationDetail.replyRem || 'なし' }}</p></div>
        </span>
      </div>
    </div>

    <div class="application-details-divider" />
  </div>
</template>

<script>
import moment from "moment";
import get from "lodash/get"

export default {
  props: ["value", "mypageDisplayCode"],
  data() {
    return {
      isLoadPointExchg: false
    }
  },
  computed: {
    pointRateInfo() {
      return this.pointRate1 && this.pointRate2 && this.pointText ? `交換レート：${this.pointRate2}ベネポ→${this.pointRate1}${this.pointText}ポイント` : null
    },
    exchangeToPoint() {
      return this.applicationDetail.usePoint / this.pointRate2 * this.pointRate1;
    },
    isPointExchg() {
      return this.applicationDetail.usePoint && this.applicationDetail.exchangeToPoint && this.pointText
    },
    isPointChange() {
      return this.srvicDiv && this.srvicDiv.startsWith('B') && this.pointText
    },
    isLife(){
      const { srvicDiv } = this.$route.query;
      return srvicDiv && srvicDiv.startsWith('B')
    },
    planLeadCopy() {
      return this.applicationDetail.planLeadCopy.replaceAll('\n', '<br>').replace(/^\"|\"\,$/g, '')
    }
  },
  mounted() {
    const { acptNo } = this.$route.query;
    this.acptNo = acptNo;
    this.srvicDiv = this.$route.query.srvicDiv;
  },
  created() {
    if (this.value) {
      this.applicationDetail = this.value;
    }
  },
  watch: {
    value(val) {
      this.applicationDetail = this.value;
    }
  },
  data() {
    return {
      applicationDetail: null,
      title: "お申込み内容",
      plan: "商品説明　",
      destination: "ポイント交換先",
      acptNo: null,
      expiryDate: "有効期限",
      srvicDiv: null,
      pointText: null,
      pointRate2: null,
      pointRate1: null
    };
  },
  methods: {
    nL2Br(content) {
      return content.replace(/\\n/g, "<br />").replace(/\n/g, "<br />");
      // return this.$utils.htmlText(content);
    },
  }
};
</script>

<style lang="scss">
font-14 {
  font-size: 14px !important;
}
.text-epip {
  line-height: 21px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content-life a:hover {
  color: black;
  text-decoration: none;
}
.button-quest {
  width: 50px;
  background: #63666A;
  color: white;
  font-weight: 100;
  font-size: 12px;
}
.button-cont {
  padding: 0px 2px;
  height: 23px;
  border-radius: 0px;
  width: 46px;
}
.count {
  width: 50px;
}
.left-count {
  width: 90%;
}
</style>

<style lang="scss" scoped>
.order-application-details-font-size-over-ride * {
  font-size: 15px;
  @include mq() {
    font-size: 13px;
  }
}

#OrderApplicationDetails {
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

  .item-text {
    @apply mt-2 ml-2 inline-block;
  }

  .detail-flex-table {
    @apply flex flex-wrap md:flex-col justify-between gap-y-5 md:gap-y-3 w-full;

    > div {
      width: 48%;
      @apply md:w-full;
    }

    .mb-not-last {
      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }

      &:empty:after {
        content: "なし";
      }
    }
  }

  .application-details-divider {
    @apply border-t mb-8 md:mb-6 md:-mx-3;
    border-color: #CACCCF;
  }

  .required-icon {
    @apply text-xs w-auto px-1 py-1 ml-1 bg-gray-500 text-white font-bold;
    word-break: keep-all;

    @include mq() {
      @apply py-0;
      font-size: 10px;
    }
  }
  .Confirmation-details {
    background-color: #E7E7E7;
  }
}
</style>
