<template>
  <div
    id="OrderApplicationDetails"
    class="apply-container order-application-details-font-size-over-ride mt-0"
  >
    <h1 class="pb-5 md:pb-4 text-xl md:text-base title-line">お申込み情報</h1>

    <!-- プラン内容 -->
    <template v-if="srvicDiv && srvicDiv.startsWith('C')">
      <ItemTitle :text="planShop" />
    </template>
    <template v-else>
      <ItemTitle :text="plan" />
    </template>
    <div class="content pl-3">
      <template v-if="srvicDiv && srvicDiv.startsWith('C')">
        <span class="text-left m-0 p-0">■商品説明:</span>
      </template>
      <template v-else>
        <span class="text-left m-0 p-0">■プラン名:</span>
      </template>
      <span
        class="px-0"
        v-if="applicationDetail && applicationDetail.planNm"
        >{{ applicationDetail.planNm   }}</span
      >
      <div
        class="ui mt-2"
        v-if="applicationDetail && applicationDetail.planLeadCopy"
      >
        <p
          v-html="nL2Br(applicationDetail.planLeadCopy)"
        ></p>
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
        <!-- 申込者名 -->
        <div>
          <ItemTitle text="申込者名" />
          <p class="item-text">{{ customerInfo.familyName + ' ' + customerInfo.firstName }}</p>
        </div>
        <!-- 受付日時 -->
        <div v-if="applicationDetail && applicationDetail.acptDatetime">
          <ItemTitle text="受付日時" />
          <p class="item-text">{{ applicationDetail.acptDatetime }}</p>
        </div>

        <!-- 受付方法 -->
        <div>
          <ItemTitle text="受付方法" />
          <template v-if="redemption.creditPrice !== 0">
            <p class="item-text">ICポイント＋クレジットカードで商品交換</p>
          </template>
          <template v-else>
            <p class="item-text">ICポイントのみで商品交換</p>
          </template>
        </div>

        <!-- 利用料金 -->
        <div v-if="applicationDetail && Number.isInteger(redemption.usePoint)">
          <ItemTitle text="合計" />
          <p class="item-text">{{ redemption.usePoint }} {{ redemption.pointName }}</p>
        </div>
        <!-- お申し込み内容 (ライフ)-->
        <div v-if="srvicDiv && srvicDiv.startsWith('B')">
          <ItemTitle text="お申込み内容" />
          <span class="item-text" v-if="isShowDetailAppLife">
            <div
              class="mb-not-last"
              v-for="(itemA, indexA) in applicationDetail.acptPrticList"
              :key="'indexA' + indexA"
            >
              <div v-if="isShowLifeBenefit(itemA)">
                <p>{{ itemA.lifeBenefit.benefitHeadline }}</p>
                <p>{{ itemA.cnt }}枚</p>
              </div>
            </div>
          </span>

          <p class="item-text" v-else>なし</p>
        </div>

        <!-- 特典備考/注意事項(物販) -->
        <div v-if="srvicDiv && srvicDiv === CONST.SRVIC_DIV.DOMESTIC_SHOP">
          <ItemTitle text="特典備考／注意事項" />
          <span class="item-text" v-if="applicationDetail && applicationDetail.priceRemarks">
            <div class="break-all">{{ applicationDetail.priceRemarks }}</div>
          </span>
          <p class="item-text" v-else>なし</p>
        </div>
        <!-- 特典備考/注意事項(ライフ) -->
        <div v-if="srvicDiv && srvicDiv.startsWith('B')">
          <ItemTitle text="特典備考／注意事項" />
          <span
            class="item-text"
            v-if="
              applicationDetail &&
                applicationDetail.cautContList &&
                applicationDetail.cautContList.length > 0
            "
          >
            <div
              class="break-all"
              v-for="(item, index) in applicationDetail.cautContList"
              :key="'note' + index"
            >
              {{ item.title }} {{ item.cont }}
            </div>
          </span>

          <p class="item-text" v-else>なし</p>
        </div>
      </div>
      <!-- ご確認事項 -->
      <div class="table-info mb-8 md:mb-6" v-if="srvicDiv && srvicDiv.startsWith('C') && applicationDetail && (applicationDetail.qstn || applicationDetail.replyRem)">
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

      <!-- ライフご確認事項 -->
      <div class="table-info mb-8 md:mb-6" v-if="applicationDetail && applicationDetail.acptLifeAnswerList && applicationDetail.acptLifeAnswerList.length > 0">
        <div class="application-details-divider"></div>
        <h2 class="font-bold mb-6 md:mb-4">ご確認事項</h2>
        <div v-for="(item, index) in applicationDetail.acptLifeAnswerList" :key="`question-${index}`" class="item flex flex-col">
          <ItemTitle :text="item.acptCnfrmCnsdRem" class="flex justify-between items-center">
            <template #text-behind>
              <div v-if="isShowBtnQstn(item)" class="required-icon">必須</div>
            </template>
          </ItemTitle>
          <span class="font-normal w-full break-words">{{ item.acptCnfrmCnsdrReply || 'なし' }}</span>
        </div>
      </div>
    </div>

    <div class="application-details-divider" />
  </div>
</template>

<script>
import moment from "moment";
import get from "lodash/get"

export default {
  props: ["value", "mypageDisplayCode", "customerInfo"],
  data() {
    return {
      isLoadPointExchg: false,
      redemption: {}
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
    },
    isShowDetailAppLife() {
      return (
        this.srvicDiv &&
        this.srvicDiv.startsWith("B") && this.applicationDetail && this.applicationDetail.memberBenefits &&
        this.applicationDetail.memberBenefits.length > 0
      )
    }
  },
  mounted() {
    const { acptNo } = this.$route.query;
    this.acptNo = acptNo;
    this.srvicDiv = this.$route.query.srvicDiv;
    if (this.isIcService(this.mypageDisplayCode)) {
      this.getRedemption()
    }
  },
  created() {
    if (this.value) {
      this.applicationDetail = this.value;
    }
  },
  watch: {
    value(val) {
      this.applicationDetail = this.value;
      this.$set(this.applicationDetail,'acptDtlNo',this.value.acptDtlNo)
      const srvicDiv = this.$route.query.srvicDiv
      if(srvicDiv && srvicDiv.startsWith("B")) {
        this.getPointExchange(val)
        this.getQstnIdList()
      }
      if (this.isIcService(this.mypageDisplayCode)) {
        this.getRedemption()
      }
    }
  },
  data() {
    return {
      applicationDetail: null,
      title: "お申込み内容",
      planShop: "商品説明　",
      plan: "プラン内容　",
      destination: "ポイント交換先",
      acptNo: null,
      expiryDate: "有効期限",
      srvicDiv: null,
      pointText: null,
      pointRate2: null,
      pointRate1: null,
      questions: null,
      redemption: {}
    };
  },
  methods: {
    isShowLifeBenefit(item) {
      return item && item.lifeBenefit && item.lifeBenefit.benefitHeadline && item.lifeBenefit.benefitContent && item.cnt
    },
    isShowBtnQstn(item) {
      if(this.questions && item) {
        const questionIdList = this.questions.map((el) => {
          return {
            qstnId: el.qstnId,
            replyIdpsbFlag: el.replyIdpsbFlag
          }
        })
        const flag = this.questions.filter((el) => {
          return el.qstnId === item.acptCnfrmCnsdId && el.replyIdpsbFlag === '1'
        })
        return flag.length > 0
      }
    },
    getQstnIdList() {
      if(!this.questions) {
        const menuNo = _.get(this.applicationDetail, 'menuNo', null)
        const planId = _.get(this.applicationDetail, 'planId', null)
        const usageDiv = _.get(this.applicationDetail, 'usageDiv', null)
        if(menuNo && planId) {
          this.$repositories('orders').getQstnLife(menuNo, planId, usageDiv).then(
            (response) => {
              this.questions = _.get(response, 'questions', null)
            },
            (error) => {}
          )
        }
      }
    },
    getPointExchange(val) {
      const menuNo = _.get(val, "menuNo", null)
      const planId = _.get(val, "planId", null)
      if(!this.isLoadPointExchg && menuNo && planId) {
        this.$repositories("orders").getPointExchange(menuNo, planId).then(
          (res) => {
            this.isLoadPointExchg = true
            const pointType = _.get(res, 'pointExchg.pointType', null)
            switch (pointType) {
              case this.CONST.POINT_TYPE.RECRUIT:
                this.pointText = 'リクルート'
                break;
              case this.CONST.POINT_TYPE.RAKUTEN:
                this.pointText = '楽天'
                break;
              case this.CONST.POINT_TYPE.WAON:
                this.pointText = 'WAON'
                break;
              case this.CONST.POINT_TYPE.DOCOMO:
                this.pointText = 'docomo'
                break;
              case this.CONST.POINT_TYPE.NANACO:
                this.pointText = 'nanaco'
                break;
              case this.CONST.POINT_TYPE.STRBUCKS:
                this.pointText = 'スターバックス'
                break;
              case this.CONST.POINT_TYPE.LINE:
                this.pointText = 'LINE'
                break;
            }
            this.pointRate2 = _.get(res, 'pointExchg.pointRate2', null)
            this.pointRate1 = _.get(res, 'pointExchg.pointRate1', null)

          },
          (err) => {

          }
        )
      }
    },
    getRedemption() {
      if (this.acptNo === null) return
      this.$repositories('orders')
      .getRedemptionInfo(this.acptNo, this.applicationDetail.acptDatetime2, this.applicationDetail.companyCd, this.applicationDetail.pointUseCd)
      .then(
        (response) => {
          this.redemption = response.data
        },
        (error) => {}
      )
    },
    nL2Br(content) {
      return content.replace(/\\n/g, "<br />").replace(/\n/g, "<br />");
    }
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
