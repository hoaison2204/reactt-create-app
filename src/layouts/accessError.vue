<template>
  <main class="accessError">
    <h3>Access Error</h3>
    <p>ログイン画面からのアクセスをお願いします。</p>
    <p>ブラウザの「×」(閉じる)ボタンで閉じてください。</p>
  </main>
</template>

<script>
export default {
  components: {},
  props: {},
  mounted() {
    this.$auth.remove;
    this.$page.isBreadcrumb = false;
    this.$page.isPageHeader = false;
    this.$page.isPageTop = false;
    this.$page.isSubHeader = false;
    this.$page.showFooterMenu = false;
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.accessError {
  height: 300px;
  text-align: center;
}
h3 {
  color: white;
  background-color: #da291c;
  padding: 10px;
  margin: 30px 0;
}
p {
  padding: 10px;
  font-size: 15px;
}
</style>