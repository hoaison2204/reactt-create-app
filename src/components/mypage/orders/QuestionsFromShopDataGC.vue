<template>
  <div class="questions-from-shop-data-gc">
    <!-- 店舗からのご連絡事項 -->
    <h2 class="font-bold pb-5 md:pb-4 text-xl md:text-base title-line">店舗からのご連絡事項</h2>
    <div 
      v-for="(question, index) in grmQstnReplyList" 
      :key="'question-' + index" 
      class="mb-5"
    >
      <div class="mb-2">
        <!-- 質問のテキスト -->
        <span class="font-bold mr-2">{{question.qstn}}</span>
        <!-- 必須/任意マーク -->
        <div
          class="text-xs px-1.5 py-0.5 align-middle required-optional-mark"
          :class="
            checkRequired(question.qstnReplyIdpsbFlag)
              ? 'is-required'
              : 'is-optional'
          "
        >
          {{ getRequiredOptionalText(question.qstnReplyIdpsbFlag) }}
        </div>
      </div>  
      {{question.replyRem}}
    </div>
    <!-- 回答 -->
    <!-- 注意事項 -->
    <div v-if="grmPlanPrtic" class="cancel-container">
      <div class="cancel-content">
        <table class="table-common">
          <tr>
            <th class="w-1/4">注意事項</th>
            <td class="style-t">{{grmPlanPrtic.cautionCont}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    grmQstnReplyList: {
      type:Array,
      default: () => []
    },
    grmPlanPrtic:{
      type:Object,
      default: () => {}
    }
  },
  methods: {
      /**
       * 必須項目かチェック
       */
      checkRequired: function (replyIdpsbFlag) {
        return replyIdpsbFlag == this.CONST.REPLY_IDPSB_FLG.REQUIRED;
      },
            /**
       * 必須/任意のテキストを取得
       */
      getRequiredOptionalText: function (replyIdpsbFlag) {
        if (this.checkRequired(replyIdpsbFlag)) {
          return '必須';
        }
        return '任意';
      },
  }
};
</script>

<style lang="scss" scoped>
.questions-from-shop-data-gc {
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
  .required-optional-mark{
      display: inline-block;
      &.is-required {
        background-color: #73767a;
        color: #FFF;
      }
      &.is-optional {
        background-color: #cacccf;
        color: #73767a;
      }
  }
}
</style>
