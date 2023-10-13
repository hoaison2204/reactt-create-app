<!-- エラーメッセージ画面　認証エラー(混線）-->
<template>
  <div v-if="boCode =='LY'">
    <CrthCrlyAtomsErrorTitleBar :title="crlyMessageItem.title" />
    <section class="crth-crly-o-error-common">
      <p class="crth-crly-line-feed crth-crly-o-error-common__message2">
        {{ crlyMessageItem.text }}
      </p>
      <CrthCrlyAtomsErrorLinkBtn
        :label="crlyMessageItem.label"
        :linkPath="crlyMessageItem.linkPath"
        :boCode="boCode"
        class = "--border --btn-l --btn-outline"
      />
    </section>
  </div>
  <!-- TODOとく放題分追加 -->
</template>

<script>
import CrthCrlyAtomsErrorTitleBar from "@/views/CRM/atoms/error/CrthCrlyTitleBar.vue";
import CrthCrlyAtomsErrorLinkBtn from "@/views/CRM/atoms/error/CrthCrlyLinkBtn.vue";

export default {
  name: "CrthCrlyOrganismsErrorLineBusy",
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
        type: "crlyLineBusy",
        title:  "認証エラー",
        text: "ただいま大変混み合っております。\nしばらくたってから再度お試しください。",
        label: "ライフエールTOPへ",
        linkPath: "/"
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/error/common.scss";
</style>
