<template>
  <main class="l-main">
    <div class="l-error c-card">
      <div class="l-error__inner-red">
        <div class="l-error__message l-error__message--red">
          <span
            ><Icon name="alert" color="#CC0621" width="31" height="28"
          /></span>
          <p>
            セッションタイムアウトになりました。
            <br />
            お手数ですが、再度ログインしてください。
          </p>
        </div>

        <div class="l-error__btn">
          <div class="c-buttonWrap4">
            <ButtonLink tag="a" :href="redirectUrl" style-type="primary" color="color2">
              ログイン
            </ButtonLink>
            <br />
            <Button @click.native="logout" style-type="primary" color="color2">
            ログアウト
            </Button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  props: ["error"],
  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    authFacade() {
      const authFacadeCode = this.mypageDisplayCode; 
      return `${this.getAuthFacade(this.mypageDisplayCode)}/${authFacadeCode.toLowerCase()}`;
    },
    topDomain() {
      return this.getTopDomain(this.mypageDisplayCode);
    },
    bffTopDomain() {
      return this.getBffTopDomain(this.mypageDisplayCode);
    },
    appApiDomain() {
      return this.getAppApiDomain(this.mypageDisplayCode);
    },
    callback_authorization_start_uri() {
      if (this.isIcService(this.mypageDisplayCode)) {
        return `${this.bffTopDomain}/v1/top/auth-start`;
      }
      return `${this.appApiDomain}/v1/mypage/auth-start`;
    },
    redirectUrl() {
      // 戻り先 url の設定が必要
      // 直URL入力と同じで判断不可ですので、エラー画面に遷移するようにする
      if (this.isCrm(this.mypageDisplayCode)) {
        return '/error';
      }
      
      return `${this.authFacade}?force_re_authentication=TRUE&callback_authorization_start_uri=${this.callback_authorization_start_uri}`;
    },
  },
  methods: {
    // ログアウト処理実行
    async logout() {
      const redirectAfterLogout = this.isIcService(this.mypageDisplayCode) ? this.redirectUrl : this.topDomain;

      this.$auth.remove(redirectAfterLogout);
      // ip-sdk.min.jsログアウト処理 ※userInfoが存在するときのみ実行
      if(Cookies.get('userInfo')) {
        try{
          await window.sdk.signout("POST");
          document.getElementById('login-script').remove();
          Cookies.remove('userInfo');

        }catch(e){
          console.log(e);
        }
      }
    }
  },
  mounted() {
    this.$meta.setDocumentTitle("セッションタイムアウトになりました。");
    this.$page.isBreadcrumb = false;
    this.$page.isPageHeader = false;
    this.$page.isPageTop = false;
    this.$page.isSubHeader = true;
    this.$page.showFooterMenu = false;
    // Remove logic authenticationLevel
    // if(this.$route.query.authenticationLevel != 1){
    //   this.logout();
    // }
  },
  watch: {
    $route() {
      this.$meta.setDocumentTitle("セッションタイムアウトになりました。");
      this.$page.isBreadcrumb = false;
      this.$page.isPageHeader = false;
      this.$page.isPageTop = false;
      this.$page.isSubHeader = true;
      this.$page.showFooterMenu = false;
      // Remove logic authenticationLevel
      //   if(this.$route.query.authenticationLevel != 1){
      //     this.logout();
      //   }
    },
  },
};
</script>

<style lang="scss" scoped></style>
