<template>
  <main class="l-main l-error">
    <div class="l-error__inner">
      <div class="l-error__message l-error__message--mb">
        <span><img src="/contents/img/station_logo.gif"/></span>
        <h1>
          ただいまメンテナンス中です。
        </h1>
        <p>
          ご迷惑をおかけいたしますが、
          <br />
          メンテナンス終了までしばらくお待ち下さい。
        </p>
      </div>
    </div>

  </main>
</template>

<script>
export default {
  props: ["error"],
  computed: {
  },
  mounted() {
    this.$meta.setDocumentTitle('メンテナンス中です。');
    this.$page.isHeader = false;
    this.$page.isBreadcrumb = false;
    this.$page.isPageHeader = false;
    this.$page.isPageTop = false;
    this.$page.isMaintenance = true;
    this.$page.showFooterMenu = false;
  },
  watch: {
    $route() {
      this.$meta.setDocumentTitle('メンテナンス中です。');
      this.$page.isHeader = false;
      this.$page.isBreadcrumb = false;
      this.$page.isPageHeader = false;
      this.$page.isPageTop = false;
      this.$page.isMaintenance = true;
      this.$page.showFooterMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
