<template>
  <section class="p-mypage-family">
    <div class="right-content" >
      <div class="p-mypage__title">
        <h2>家族アカウント管理</h2>
      </div>
      <div class="block-one">
        <div class="block-one-title">
          <div class="title-box">
            <h2>家族アカウントの追加・編集</h2>
          </div>
        </div>
        <div class="block-one-content">
          <p>家族アカウントを追加・編集したい場合は、下のボタンから、招待メールを送信してください。</p>
        </div>
        <div class="p-mypage-family__button c-button">
          <a
              class="c-button__primary c-button__primary--color2"
              :href="this.authUrl"
              target="_blank"
          >
            家族アカウントを追加する<Icon name="action_link" color="#fff"/>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["mypageDisplayCode"],
  data() {
    return {
      authUrl: ''
    }
  },
  created() {
  },
  computed: {
    appUrlSsoFamily() {
      return this.getAppUrlSsoFamily(this.mypageDisplayCode);
    },
    mapBoCode() {
      return this.getMapBoCode(this.mypageDisplayCode);
    },
  },
  methods: {
    linkMake () {
      const userData = this.$auth.user;
      const url = new URL (this.appUrlSsoFamily);
      url.searchParams.set('return_url', location.origin + this.$route.path);
      url.searchParams.set('subscription_id', userData.ssoSubscriptionId);
      url.searchParams.set('bo_service_code', this.mapBoCode);
      url.searchParams.set('host_flg', userData.ssoPrincipalFlg ? true : false);

      this.authUrl = url;
    },
    setBreadcrumb() {
      this.$page.setBreadcrumb(
          this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("家族アカウントの追加・編集"));
    },
  },
  async mounted() {
    this.$page.showSideMenu = true;
    this.$page.isTitle = false;
    this.setBreadcrumb();
    this.linkMake();
    this.$meta.setDocumentTitle("家族アカウントの追加・編集");
  },
  watch: {
    $route() {
      this.setBreadcrumb();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
