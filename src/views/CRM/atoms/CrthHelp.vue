<!-- ヘルプ -->
<template>
  <div class="crth-a-login-help" @click="clickHelp">
    <span>?</span>
  </div>
</template>

<script>
export default {
  name: "AtomsCrthHelp",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  methods: {
    clickHelp() {
      this.$emit("clickHelp");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/help.scss";
</style>
