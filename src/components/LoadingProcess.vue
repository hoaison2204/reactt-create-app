<template>
  <div class="c-loading-page c-loading-page--process" v-if="isProcess">
    <div class="c-loading-page__overlay c-loading-page__overlay--process"></div>
    <Loading />
  </div>
</template>

<script>
export default {
  computed: {
    isProcess() {
      if (!this.$loading && !this.$loading.isProcessing) return false;
      return this.$loading.isProcessing.length == 0 ? false : true;
    }
  }
};
</script>
