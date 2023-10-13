<template>
  <div
    id="OrderApplicationDetails"
    class="apply-container order-application-details-font-size-over-ride mt-0"
  >
    <h1 class="pb-5 md:pb-4 text-xl md:text-base title-line">お申込み情報</h1>
    <!-- プラン内容 -->
    <ItemTitle :text="plan" v-if="isShowPlan" />
    <div class="content pl-3" v-if="isShowPlan">
      <span class="text-left m-0 p-0">■プラン名:</span>
      <span
        class="px-0"
        v-if="applicationDetail && applicationDetail.planNm"
        >{{ applicationDetail.planNm }}</span
      >

    </div>

    <div class="expiryDate">
      <!-- 予約番号〜特典備考/注意事項 -->
      <div class="detail-flex-table mb-8 md:mb-6">
        <div v-if="applicationDetail && applicationDetail.useDatetime">
          <ItemTitle :text="'利用日時'" />
          <p class="item-text" wovn-ignore>{{ applicationDetail.useDatetime }}</p>
        </div>
        <div v-if="benefitText">
          <ItemTitle :text="'特典'" />
          <p class="item-text" wovn-ignore>
            {{benefitText}}
          </p>
        </div>
        <div v-if="grmacptPrticList">
          <ItemTitle :text="'人数'" />
          <p class="item-text" wovn-ignore>{{grmacptPrticList.cnt}}名</p>
        </div>
        <div v-if="grmAcptDtl">
          <ItemTitle :text="'席タイプ'" />
          <p class="item-text" wovn-ignore>{{grmAcptDtl.seatKindNm}}</p>
        </div>
        <div v-if="customerInfo">
          <ItemTitle :text="'申込者'" />
          <p class="item-text" wovn-ignore>
            {{customerInfo.familyName}}
            {{customerInfo.firstName}}
          </p>
        </div>
        <div v-if="grmAcptDtl">
          <ItemTitle :text="'利用者'" />
          <p class="item-text" wovn-ignore>
            {{grmAcptDtl.userFamilyNm}}
            {{grmAcptDtl.userFirstNm}}
          </p>
        </div>
      </div>
      <ItemTitle text="プランの説明" v-if="isShowPlan" />
      <div class="content pl-3" v-if="isShowPlan">
        <p
          v-html="planLeadCopy"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
import get from "lodash/get"

export default {
  props: ["value", "mypageDisplayCode", "customerInfo", "grmAcptDtl", "grmacptPrticList"],
  computed: {
    isPublicStay() {
      const { isPublicStay } = this.$route.query;
      return isPublicStay === "true";
    },
    isShowPlan() {
      return (
        !this.isPublicStay &&
        this.applicationDetail &&
        (this.applicationDetail.planNm || this.applicationDetail.planLeadCopy)
      );
    },
    planLeadCopy() {
      return this.applicationDetail.planLeadCopy.replaceAll('\n', '<br>').replace(/^\"|\"\,$/g, '')
    },
    benefitText() {
      if (!this.grmacptPrticList || !this.grmacptPrticList?.grmBenefit?.benefitHeadline)
        return null;

      return this.grmacptPrticList.grmBenefit.benefitHeadline;
    },
  },
  mounted() {
    const { acptNo } = this.$route.query;
    this.acptNo = acptNo;
    this.srvicDiv = this.$route.query.srvicDiv;
  },
  created() {
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
      positionExpandLabel: "Right",
      plan: "プラン内容　",
      acptNo: null,
      srvicDiv: null,
    };
  },
  methods: {
    get,
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
}
</style>
