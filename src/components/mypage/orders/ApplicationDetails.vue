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
      <div
        class="ui mt-2"
        v-if="applicationDetail && applicationDetail.planLeadCopy"
      >
        <p
          v-html="planLeadCopy"
        ></p>
      </div>
    </div>

    <!-- ベネポ交換 -->
    <div v-if="isPointChange" class="mb-5 md:mb-3">
      <ItemTitle :text="destination" />
      <div class="item-text">
        <div v-if="pointText">{{ pointText }}</div>
        <div v-if="pointRateInfo">{{ pointRateInfo }}</div>
        <div v-if="isPointExchg">{{applicationDetail.usePoint}}ベネポを{{exchangeToPoint}}{{pointText}}に交換</div>
      </div>
    </div>

    <div class="expiryDate">
      <!-- 有効期限 -->
      <div class="expiryDate mb-5 md:mb-3" v-if="isLife">
        <ItemTitle
          :text="isSaleStockTermValid ? '利用日' : '有効期限'"
          v-if="applicationDetail.cponStartDatetime || applicationDetail.cponEndDatetime || applicationDetail.shoppingGuideVal"
        />

        <!-- 当日のみ有効 -->
        <div
          class="item-text block"
          v-if="isSaleStockTermValid"
        >
          <span class="pr-0">
            {{ applicationDetail.cponStartDatetime | formatDate('YYYY/MM/DD') }}
            ※取得したクーポンの利用日当日に限り有効
          </span>
        </div>

        <!-- 有効期限開始　〜　有効期限終了 -->
        <div
          class="item-text block"
          v-else-if="applicationDetail.cponStartDatetime"
        >
          <span class="pr-0" v-if="applicationDetail.cponStartDatetime">{{
            applicationDetail.cponStartDatetime | formatDate('YYYY/MM/DD')
          }}</span>
          <span class="pl-0" v-if="applicationDetail.cponEndDatetime"
            ><span class="px-2">~</span
            >{{ applicationDetail.cponEndDatetime | formatDate('YYYY/MM/DD') }}</span
          >
        </div>

        <!-- ショッピングガイド -->
        <div class="item-text" v-else>
          <span v-if="applicationDetail.shoppingGuideVal">
            {{ applicationDetail.shoppingGuideVal }}
          </span>
        </div>
        <div></div>
      </div>

      <!-- 予約番号〜特典備考/注意事項 -->
      <div class="detail-flex-table mb-8 md:mb-6">

        <!-- 楽天トラベル予約番号 -->
        <div v-if="applicationDetail.outsideSysCd === 'RakutenT'">
          <ItemTitle text="楽天トラベル予約番号" />
          <p class="item-text">{{ applicationDetail.outsideResrvId }}</p>
        </div>

        <!-- 宿泊代表者名 -->
        <div v-if="get(applicationDetail, 'fullName') || get(applicationDetail, 'repFullName')">
          <ItemTitle :text="isLife ? '代表者名' : '宿泊代表者名'" />
          <p class="item-text" wovn-ignore>
            {{
              get(applicationDetail, 'repFullName') ||
              get(applicationDetail, 'fullName')
            }}
          </p>
        </div>

        <!-- 受付日時 -->
        <div v-if="applicationDetail && applicationDetail.acptDatetime">
          <ItemTitle text="受付日時" />
          <p class="item-text">{{ applicationDetail.acptDatetime }}</p>
        </div>

        <!-- 利用料金 -->
        <div v-if="!isPublicStay && applicationDetail && Number.isInteger(applicationDetail.totalAmt)">
          <ItemTitle text="利用料金" />
          <p class="item-text">{{ applicationDetail.totalAmt | formatCurrency }}</p>
        </div>

        <!-- 補助金額合計 -->
        <div
          v-if="isPublicStay && applicationDetail && Number.isInteger(applicationDetail.boneSbsidChrgTotal)"
        >
          <ItemTitle text="補助合計金額" />
          <p class="item-text">{{ applicationDetail.boneSbsidChrgTotal | formatCurrency }}</p>
        </div>

        <!-- お申し込み内容 (宿泊)-->
        <div v-if="srvicDiv && srvicDiv.startsWith('A')">
          <ItemTitle text="お申込み内容" />
          <span v-if="isShowLeftContentStay">
            <div class="flex flex-col item-text">
              <p>
                宿泊期間
                <span v-if="stayDayJp">{{ stayDayJp }}</span>
                <span
                  v-show="applicationDetail && applicationDetail.nightCnt"
                >
                  {{ applicationDetail.nightCnt }}泊
                </span>
              </p>
              <p>
                <span v-show="applicationDetail && applicationDetail.roomCnt">
                  {{ applicationDetail.roomCnt }}部屋
                  （大人{{ applicationDetail.totalAdult }}名/
                  子ども{{applicationDetail.totalChild}}名）
                </span>
              </p>
            </div>
            <p v-if="applicationDetail.checkInTm">
              <span class="mx-2">チェックイン</span>{{ applicationDetail.checkInTm }}
            </p>
          </span>

          <p class="item-text" v-else>なし</p>
        </div>

        <!-- お申し込み内容 (ライフ)-->
        <div v-if="srvicDiv && srvicDiv.startsWith('B')">
          <ItemTitle text="お申込み内容" />
          <span class="item-text" v-if="isShowDetailAppLife" >
            <div
              class="mb-not-last"
              v-for="(itemA, indexA) in applicationDetail.acptPrticList"
              :key="'indexA' + indexA"
            >
              <div v-if="isShowLifeBenefit(itemA)">
                <p>{{ itemA.lifeBenefit.benefitHeadline }} {{ itemA.lifeBenefit.benefitContent }}</p>
                <p>{{ itemA.cnt }}枚</p>
              </div>
            </div>
          </span>

          <p class="item-text" v-else> なし </p>
        </div>

        <!-- 特典備考/注意事項(国内宿泊) -->
        <div v-if="srvicDiv && srvicDiv === CONST.SRVIC_DIV.DOMESTIC_STAY">
          <ItemTitle text="特典備考／注意事項" />
          <span class="item-text" v-if="applicationDetail && applicationDetail.priceRemarks">
            <div class="break-all">{{ applicationDetail.priceRemarks }}</div>
          </span>

          <p class="item-text" v-else>なし</p>
        </div>

        <!-- 特典備考/注意事項(ライフ) -->
        <div v-if="srvicDiv && srvicDiv.startsWith('B')">
          <ItemTitle text="特典備考／注意事項" />
          <div
              v-if="
                applicationDetail.benefitImportantPoints || applicationDetail.noteWhenApply
              "
            >
              <div v-if="
                 applicationDetail.benefitImportantPoints &&
                applicationDetail.benefitImportantPoints.length > 0">
                <div v-for="item in applicationDetail.benefitImportantPoints" :key="item.id">
                  <p class="note__title">
                    {{ item.title }}
                  </p>
                  <p class="item-text" v-if="item.content" v-html="$utils.htmlText(item.content)"></p>
                </div>
              </div>
              <div v-if="
                 applicationDetail.noteWhenApply &&
                applicationDetail.noteWhenApply.length > 0">
                <div v-for="(item, index) in applicationDetail.noteWhenApply" :key="'noteApply' + index">
                  <p class="item-text" v-html="formatShoppingGuideText(item)"></p>
                </div>
              </div>
          </div>
          <span
            class="item-text"
            v-else-if="
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

        <!-- 送料 -->
        <div
          v-if="applicationDetail && applicationDetail.pstg != null && isShowPstg"
        >
          <ItemTitle text="送料" />
          <p class="item-text">{{ applicationDetail.pstg | formatCurrency }}</p>
        </div>
        <div
          v-if="isDpPlan"
        >
        <ItemTitle :text="`${applicationDetail.outsideSysCd === CONST.EXT_SYSTEMCD.ANA ?'ANA 照会番号':'提携先予約番号'}`" />
          <p class="item-text">{{applicationDetail.outsideSysCd === CONST.EXT_SYSTEMCD.ANA ? getOutsideResrvId : (applicationDetail.acptDtlNo + '-' + applicationDetail.travelBranchNo)}}</p>
        </div>
      </div>

      <!-- 宿泊ご確認事項 -->
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

      <!-- ライフご確認事項 -->
      <div class="table-info mb-8 md:mb-6" v-if="applicationDetail && applicationDetail.stayPlanQstnReplyList && applicationDetail.stayPlanQstnReplyList.length > 0">
        <div class="application-details-divider"></div>
        <h2 class="font-bold mb-6 md:mb-4">ご確認事項</h2>
        <div v-for="(item, index) in applicationDetail.stayPlanQstnReplyList" :key="`question-${index}`" class="item flex flex-col">
          <ItemTitle :text="item.qstn" class="flex justify-between items-center">
            <template #text-behind>
              <button v-if="item.qstnReplyIdpsbFlag === CONST.REPLY_IDPSB_FLG.REQUIRED" class="required-icon">必須</button>
            </template>
          </ItemTitle>
          <span class="font-normal w-full break-words">{{ item.replyRem || 'なし' }}</span>
        </div>
      </div>
    </div>

    <div v-if="!isDpPlan" class="application-details-divider" />
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
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
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
    isShowDateExprie() {
      return (
        this.srvicDiv &&
        this.srvicDiv.startsWith("B") &&
        this.applicationDetail &&
        (this.applicationDetail.cponStartDatetime ||
          this.applicationDetail.shoppingGuideVal)
      )
    },
    isShowDetailAppLife() {
      return (
        this.srvicDiv?.startsWith("B") && this.applicationDetail && this.applicationDetail.memberBenefits &&
        this.applicationDetail.memberBenefits.length > 0
      )
    },
    isShowLeftContentStay() {
      return this.stayDayJp && this.applicationDetail.nightCnt && this.applicationDetail.roomCnt
    },
    pointRateInfo() {
      if(this.pointText == 'スターバックスカードチャージ'){
        return this.pointRate1 && this.pointRate2 && this.pointText 
          ? `交換レート：${this.pointRate2}ベネポ→${this.pointRate1}円分のチャージ` : null
      }
      return this.pointRate1 && this.pointRate2 && this.pointText
         ? `交換レート：${this.pointRate2}ベネポ→${this.pointRate1}${this.pointText}` : null
    },
    exchangeToPoint() {
      const exchangeToPointValue = this.applicationDetail.usePoint / this.pointRate2 * this.pointRate1;
      if(this.pointText == 'スターバックスカードチャージ'){
        return `${exchangeToPointValue}円分の`;
      }
      return exchangeToPointValue;    },
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
    /**
     * 送料表示判定。
     * 宿泊 && ベネオリ または
     * 宿泊 && ベネ楽天 または
     * 公共の宿 の場合はfalseを返す
     * それ以外はtrueを返す
     * @returns { boolean }
     * */
    isShowPstg() {
      const isStay = this.srvicDiv?.startsWith('A');
      const isBeneOriginal = this.value?.outsideSysCd == null;
      const isRakutenT = this.value?.outsideSysCd === 'RakutenT';
      const isToyokoInn = this.value?.outsideSysCd === 'ToyokoInn';
      const isPublicAccomodation = this.srvicDiv === this.CONST.SRVIC_DIV.PUBLIC_ACCOMODATION;
      const isDpPlan = this.srvicDiv === this.CONST.SRVIC_DIV.TOURS;
      return !(
        (isStay && isBeneOriginal) ||
        (isStay && isRakutenT) ||
        (isStay && isToyokoInn) ||
        isPublicAccomodation || isDpPlan
      );
    },
    isDpPlan(){
      return this.srvicDiv === this.CONST.SRVIC_DIV.TOURS;
    },
    /**
     * 販売期限有効判定
     * @returns { boolean }
     * */
    isSaleStockTermValid() {
      const { cponStartDatetime, cponEndDatetime } = this.applicationDetail

      if (!cponStartDatetime || !cponEndDatetime) { return false }

      const cponStartDay = moment(cponStartDatetime).format("YYYYMMDD")
      const cponStartTime = moment(cponStartDatetime).format("HHmmss")

      const cponEndDay = moment(cponEndDatetime).format("YYYYMMDD")
      const cponEndTime = moment(cponEndDatetime).format("HHmmss")

      // 開始日と終了日が同じかつ、開始時刻が000000、終了時刻が235959の場合、販売期限有効とする
      return (
        cponStartDay === cponEndDay &&
        cponStartTime === "000000" &&
        cponEndTime === "235959"
      )
    },
    formatShoppingGuideText() {
      return (text)=>{
        return text.replace(/\n/g, "<br>");
      }
    },
    getOutsideResrvId(){
      const { outsideResrvId } = this.$route.query;
      return outsideResrvId;
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
      const useDate = _.get(this.applicationDetail, "useDate", "");
      const isDate = moment(useDate).isValid();
      if (isDate) {
        this.formatStayDayJp(useDate);
      }
    }
  },
  watch: {
    value(val) {
      this.applicationDetail = this.value;
      const useDate = _.get(this.applicationDetail, "useDate", "");
      const isDate = moment(useDate).isValid();
      if (isDate) {
        this.formatStayDayJp(useDate);
      }
      const srvicDiv = this.$route.query.srvicDiv
      if(srvicDiv && srvicDiv.startsWith("B")) {
        this.getPointExchange(val)
        this.getQstnIdList()
      }
    }
  },
  data() {
    return {
      applicationDetail: null,
      title: "お申込み内容",
      positionExpandLabel: "Right",
      plan: "プラン内容　",
      destination: "ポイント交換先",
      acptNo: null,
      expiryDate: "有効期限",
      checkList: "確認事項",
      stayDayJp: null,
      srvicDiv: null,
      pointText: null,
      pointRate2: null,
      pointRate1: null,
      questions: null
    };
  },
  methods: {
    get,
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
    isShowLifeBenefit(item) {
      return item && item.lifeBenefit && item.lifeBenefit.benefitHeadline && item.lifeBenefit.benefitContent && item.cnt
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
                this.pointText = 'リクルートポイント'
                break;
              case this.CONST.POINT_TYPE.RAKUTEN:
                this.pointText = '楽天ポイント'
                break;
              case this.CONST.POINT_TYPE.WAON:
                this.pointText = 'WAONポイント'
                break;
              case this.CONST.POINT_TYPE.DOCOMO:
                this.pointText = 'dポイント'
                break;
              case this.CONST.POINT_TYPE.NANACO:
                this.pointText = 'nanacoポイント'
                break;
              case this.CONST.POINT_TYPE.STRBUCKS:
                this.pointText = 'スターバックスカードチャージ'
                break;
              case this.CONST.POINT_TYPE.LINE:
                this.pointText = 'LINEポイント'
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
    isShowContentLife(item) {
      const benefitHeading = _.get(item, 'benefitHeading', null)
      const price = _.get(item, 'price', null)
      if(benefitHeading && price) {
        return true;
      }
      return false;
    },
    getFeeType(coupon) {
      if (coupon.pyrlDedPayeeDiv == this.CONST.PYRL_DED_PAYEE_DIV.ONLY_KYUTOKU) {
        // 1:給トクのみ
        return "給トク価格";
      } else if (coupon.pyrlDedPayeeDiv == this.CONST.PYRL_DED_PAYEE_DIV.EXCEPT_KYUTOKU) {
        // 2:給トク以外
        return "会員価格";
      } else if (this.applicationDetail.payType == this.CONST.PAY_MTHD_DIV.KYUTOKU) {
        // 給トク選択中の場合
        return "給トク価格";
      } else {
        // 給トク以外選択中の場合
        return "会員価格";
      }
    },
    formatUseDate(date) {
      const useDate = date ? moment(date).format("YYYY/MM/DD") : "";
      return useDate;
    },
    formatStayDayJp(date) {
      this.stayDayJp = date ? moment(date).format("YYYY年MM月DD日から") : "";
    },
    formatEndDate(date, night) {
      const start = moment(date);
      const end = start.add(night ? night : 1, "days");
      const endDate = end ? moment(end).format("YYYY/MM/DD") : "";
      return endDate;
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
}
</style>
