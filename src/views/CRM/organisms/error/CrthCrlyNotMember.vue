<!-- エラーメッセージ画面　未加入-->
<template>
  <div v-if="boCode =='LY'"> 
    <CrthCrlyAtomsErrorTitleBar :boCode="boCode" :title="crlyMessageItem.title" />
    <section class="crth-crly-o-error-common">
      <p class="crth-crly-line-feed crth-crly-o-error-common__message">
        {{ crlyMessageItem.text }}
      </p>
      <CrthCrlyAtomsErrorLinkBtn
        :label="crlyMessageItem.label"
        :linkPath="crlyMessageItem.linkPath"
        :boCode="boCode"
        class = "--border --btn-l"
      />
    </section>
  </div>
  <!-- TODOとく放題分追加 -->
</template>

<script>
import CrthCrlyAtomsErrorTitleBar from "@/views/CRM/atoms/error/CrthCrlyTitleBar.vue";
import CrthCrlyAtomsErrorLinkBtn from "@/views/CRM/atoms/error/CrthCrlyLinkBtn.vue";

export default {
  name: "CrthCrlyOrganismsErrorNotMember",
  components: {
    CrthCrlyAtomsErrorTitleBar,
    CrthCrlyAtomsErrorLinkBtn
  },
  props: {
    boCode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      crlyMessageItem: {
        title:  "お知らせ",
        text: "お客さまは「ライフエール」に\n加入されておりません。",
        label: "ライフエールに申し込む",
        linkPath: "/entryConfirm",
      }      
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/error/common.scss";
</style>
