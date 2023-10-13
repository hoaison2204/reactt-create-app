<!-- タイトルバー -->
<template>
  <div class="crth-crly-a-error-title-bar">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: "CrthCrlyAtomsErrorTitleBar",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/error/titleBar.scss";
</style>
