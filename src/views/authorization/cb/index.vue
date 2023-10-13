<template>
  <div>
    <LoadingPage />
    <AccountModal
      ref="accountModal"
      :accountList="accountList"
      @userSelect="userSelect"
      @hide="hide"
    />
    <FirstLoginModal ref="firstLoginModal" @submit="submit" @hide="hide" />
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
import func_utils from "@/mixins/func_utils";
import { createSetCookie, parseCookie } from "@/utils/cookie";

export default {
  mixins: [func_utils],
  data() {
    return {
      verifier: undefined,
      challenge: undefined,
      backUri: undefined,
      accountList: [],
      idToken: undefined,
      subscriptions: [],
    };
  },
  async created() {
    const cookie = parseCookie(document.cookie);

    if (this.mypageDisplayCode != `TH` || this.mypageDisplayCode != `LY`) {
      // 有効期限の違いがあるため別途記述
      if (!cookie["back_uri"]) {
        document.cookie = createSetCookie(
          "back_uri",
          this.$route.query.authorization_back_uri
        );
      } else {
        this.backUri = cookie["back_uri"].replace(/^.*back_uri=/, "");
      }
    } else {
      this.backUri = cookie.back_uri;
    }
  },
  async mounted() {
    // 不要なものは非表示に
    this.$page.isHeader = false;
    this.$page.isPageTop = false;
    this.$page.isBreadcrumb = false;
    this.$page.isPageHeader = false;
    this.$page.showFooterMenu = false;

    console.log("bo-code: ", this.mypageDisplayCode);

    this.$repositories("user")
      .contractInfo(this.mypageDisplayCode)
      .then((resLogin) => {
        const contractInfo = resLogin.data.contractInfo;
        const contractInfoLen = contractInfo.length;
        // customerNoの数で処理を変更
        if (contractInfoLen > 1) {
          for (let i = 0; i < contractInfoLen; i++) {
            this.accountList.push({
              id: contractInfo[i].customerNo,
              name: contractInfo[i].companyName
            });
          }
          this.$refs.accountModal.show();
        } else {
          this.userConfirm(contractInfo[0].customerNo);
          this.subscriptions = contractInfo[0].subscriptions;
          this.boSrvCd = contractInfo[0].subscriptions[0].boServiceCode;
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("BFF:loginエラー");
        this.erroLogin();
      });
  },
  beforeDestroy() {
    // 不要としたものを表示状態にする
    this.$page.isHeader = true;
    this.$page.isPageTop = true;
    this.$page.isBreadcrumb = true;
    this.$page.isPageHeader = true;
    this.$page.showFooterMenu = true;
  },
  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    appDomain() {
      return this.getMypageDomain(this.mypageDisplayCode);
    }
    

  },
  methods: {

    async userConfirm(customerNo) {
      this.$loading.startProcessing();
      const params = new URLSearchParams();
      params.append('customerNo', customerNo);
      /*
      const params = {
        customerNo: customerNo
      };
      */

      const updateUserResult = await this.$repositories("user").updateUser(
        params,
        this.mypageDisplayCode
      );
      // IC向けの認可チェック NGの場合はログイン不可画面に遷移
      if (this.mypageDisplayCode === "IC") {
        try {
          // 認可対応 認可のプロパティが返ってきて、認可がfalseの場合はNG.リダイレクトする
          console.log(updateUserResult);
          console.log(updateUserResult.data);
          if (
            updateUserResult.data != null &&
            updateUserResult.data.isAuthorized !== undefined &&
            updateUserResult.data.isAuthorized === false
          ) {
            console.log("認可NG->ログイン不可画面に遷移します");
            this.logoutIc();
            return;
          }
        } catch (e) {
          // nothing to do
          console.log(e);
        }
      }
      if (updateUserResult.isError) {
        console.log("BFF:ユーザー情報更新エラー", updateUserResult);
        if (this.mypageDisplayCode === "IC") {
          this.logoutIc();
          return;
        } else {
          this.erroLogin();
          return;
        }
      }

      if (updateUserResult.data.isCompleteFirstLogin) {
        // ユーザー情報取得
        const postUserResult = await this.$repositories("user").postUser(this.mypageDisplayCode);
        if (postUserResult.isError) {
          console.log("/v1/users/my: エラー", postUserResult);
          if (this.mypageDisplayCode === "IC") {
            this.logoutIc();
            return;
          } else {
            this.erroLogin();
            return;
          }
        }

        this.finishLogin(postUserResult.data);
      } else {
        // 初回モーダル表示
        this.$refs.firstLoginModal.show();
        this.$loading.finishProcessing();
      }
    },
    async userSelect(customerNo) {
      await this.userConfirm(customerNo);
    },
    async submit(e) {
      this.$loading.startProcessing();
      const params = {
        isSubscribe: e.isSubscribe
      };

      // 初回ログイン完了API実行
      const putCompleteResult = await this.$repositories("login").putComplete(
        params
      );
      if (putCompleteResult.isError) {
        console.log("初回ログイン完了エラー", putCompleteResult);
        this.erroLogin();
        return;
      }

      // ユーザー情報取得
      const postUserResult = await this.$repositories("user").postUser(this.mypageDisplayCode);
      if (postUserResult.isError) {
        console.log(err);
        console.log("/v1/users/my：エラー");
        this.erroLogin();
        return;
      }
      this.finishLogin(postUserResult.data);
    },
    // ログイン関係でエラーが発生した場合の共通処理
    erroLogin() {
      if (this.mypageDisplayCode == `LY`) {
        this.logout();
      }
      this.deleteUserCookie();
      // 戻り先用のクッキー削除
      document.cookie = createSetCookie("back_uri", "", new Date(0));
      this.$loading.finishProcessing();
      // エラー画面へ遷移
      this.$router.push("error");
    },
    // ログインが完了した場合の共通処理
    async finishLogin(data) {
      // 戻り先用のクッキー削除
      document.cookie = createSetCookie('back_uri', '', new Date(0))

      this.$auth.init(data, this.subscriptions)

      // 利用可能補助金の取得
      // const params = {}
      // const subsidy = await this.$repositories(
      //   'subsidy'
      // ).getSubsidyAvailableLogin(params)
      // this.$store.commit('subsidy/setSubsidy', subsidy.data)
      // this.$store.commit('subsidy/remove')
      // this.$store.dispatch('subsidy/getSubsidy')
      this.$loading.finishProcessing()
      // const backUri = this.backUri ? this.backUri : '/'
      /**
       * CRM のみ redirectURI がクエリで返される可能性があるので、その場合は redirectURI のアドレスに飛ばす
       */
      const backUri = this.getCurrentHref();
      console.log("finishLogin: backUri - ", backUri);
      console.log("finishLogin: this.backUri - ", this.backUri);
      if (this.$route.query.redirectURI && (this.mypageDisplayCode == `CR` || this.mypageDisplayCode == `PG` || this.mypageDisplayCode == `TH` || this.mypageDisplayCode == `LY`)) {
        location.href = this.$route.query.redirectURI;
      } else if (this.mypageDisplayCode == `TH` || this.mypageDisplayCode == `LY`) {
        location.href = this.backUri;
      } else if (this.mypageDisplayCode == `IC` && (backUri.endsWith("/not-available") || backUri.endsWith("/session-time-out"))) {
        let backUriIc = this.appDomain + "/mypage";
        this.gotoBackURI(backUriIc)
      } else if (this.mypageDisplayCode == `GC`) {
        const backUri = this.getCurrentHref();
        if (backUri.endsWith("/session-time-out")) {
          this.gotoBackURI(this.appDomain + "/mypage")
        } else {
          this.gotoBackURI(backUri)
        }
      } else {
        this.gotoBackURI(backUri);
      }
      // location.href = backUri
      // this.$router.push({
      //   path: backUri
      // })
    },
    hide() {
      // 戻り先用のクッキー削除
      document.cookie = createSetCookie("back_uri", "", new Date(0));
      this.deleteUserCookie();
      this.$auth.remove(this.getTopDomain(this.mypageDisplayCode));
      this.$loading.finishProcessing()
      // this.$loading.finishProcessing();
      // const backUri = this.backUri ? this.backUri : "/";
      /**
       * CRM のみ redirectURI がクエリで返される可能性があるので、その場合は redirectURI のアドレスに飛ばす
       */
      if (this.$route.query.redirectURI && (this.mypageDisplayCode == `CR` || this.mypageDisplayCode == `PG` || this.mypageDisplayCode == `TH` || this.mypageDisplayCode == `LY`)) {
        location.href = this.$route.query.redirectURI;
      } else if (this.mypageDisplayCode == `TH` || this.mypageDisplayCode == `LY`) {
        location.href = this.backUri;
      } else {
        const backUri = this.getCurrentHref();
        this.gotoBackURI(backUri);
      }
      // location.href = backUri;
      // this.$router.push({
      //   path: backUri
      // });
      console.log("hide: backUri >>> ", backUri);
    },
    // ライフエール・とく放題のログアウト処理
    logout() {
      this.$auth.remove(this.getTopDomain(this.mypageDisplayCode));
      // this.$router.push({ name: "CrlyTop" }).catch(() => {});
    },
    // ログイン関連のcookieを全部消す。失敗した時用。
    /**
     * 通常のaxiosアクセスをラップ
     * ※非同期をpromise型で返却するよう処理
     */
    async axiosPostWrap(url, params, credentials) {
      return await (() =>
        new Promise((resolve) => {
          this.$axios
            .post(url, params, {
              headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then((res) => {
              // this.$axios.get(url).then((res) => {
              resolve(res);
            })
            .catch((error) => {
              resolve({
                ...error,
                isError: true
              });
            });
        }))();
    },
    deleteUserCookie(){
      document.cookie = createSetCookie('userInfo', '', new Date(0))
      document.cookie = createSetCookie("bsBenefitOneInc", "", new Date(0));
      document.cookie = createSetCookie("BSJSESSIONID", "", new Date(0));
    },
    async logoutIc(){
      this.$loading.finishProcessing();
      this.$auth.removeLoginInfo();
      // ログアウト
      await this.$repositories("login").getLogout()
        .catch((e) => {
          console.log(e);
        });
      window.location.href = this.appDomain + "/not-available";
      return;
    }
  }
};
</script>
