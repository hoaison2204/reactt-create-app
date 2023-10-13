<template>
  <main class="l-main">
    <div class="l-error c-card">
      <div class="l-error__inner-red">
        <div class="l-error__message l-error__message--red">
          <span
            ><Icon name="alert" color="#CC0621" width="31" height="28"
          /></span>
          <p>
            お使いのアカウントはご利用いただけません。
          </p>
        </div>

        <div class="l-error__btn">
          <div class="c-buttonWrap4">
            <ButtonLink
              tag="a"
              :href="redirectUrl"
              style-type="primary"
              color="color2"
            >
              ログイン
            </ButtonLink>
            <br />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ["error"],
  computed: {
    redirectUrl() {
      // 戻り先 url の設定が必要
      return this.appApiDomain + "/v1/mypage/login";

    },
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    appApiDomain() {
      return this.getAppApiDomain(this.mypageDisplayCode);
    },
  },
  methods: {},
  async created() {
    this.$page.isHeader = false;
  },
  mounted() {
    this.$meta.setDocumentTitle("お使いのアカウントはご利用いただけません。");
    this.$page.isHeader = false;
    this.$page.isBreadcrumb = false;
    this.$page.isPageHeader = false;
    this.$page.isPageTop = false;
    this.$page.isSubHeader = false;
    this.$page.showFooterMenu = false;
    // Remove logic authenticationLevel
    // if(this.$route.query.authenticationLevel != 1){
    //   this.logout();
    // }
  },
  watch: {
    $route() {
      this.$meta.setDocumentTitle("お使いのアカウントはご利用いただけません。");
      this.$page.isHeader = false;
      this.$page.isBreadcrumb = false;
      this.$page.isPageHeader = false;
      this.$page.isPageTop = false;
      this.$page.isSubHeader = false;
      this.$page.showFooterMenu = false;
      // Remove logic authenticationLevel
      //   if(this.$route.query.authenticationLevel != 1){
      //     this.logout();
      //   }
    }
  }
};
</script>

<style lang="scss" scoped></style>
