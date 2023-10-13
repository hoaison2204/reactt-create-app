<!-- ログインタイトル -->
<template>
  <div class="crth-a-login-title">
    <label>{{ title }}</label>
  </div>
</template>

<script>
export default {
  name: "AtomsCrthTitle",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/title.scss";
</style>
