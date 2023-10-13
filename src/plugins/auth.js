import { createSetCookie, parseCookie } from "@/utils/cookie";
import { findMypageBoCode } from "@/utils/mypageUtils";
import * as Cookies from 'js-cookie';

export default (context, inject) => {
  const auth = {
    async init(user, subscriptions) {
      if (user) {
        auth.user = user;
      }
      if (subscriptions) {
        context.store.commit("auth/set", { subscriptions: subscriptions });
      }
    },
    get user() {
      if (!context.store.state.auth.user) return {};
      const clone = JSON.parse(JSON.stringify(context.store.state.auth.user));
      return clone;
    },
    set user(value) {
      context.store.commit("auth/set", { user: value });
    },
    get loggedIn() {
      return context.store.getters["auth/isLoggedIn"];
    },
    get authLevelTimer() {
      return context.store.state.auth.authLevelTimer;
    },
    get subscriptions() {
      return context.store.state.auth.subscriptions;
    },
    removeUser() {
      context.store.commit("auth/removeUser");
      context.store.commit["subsidy/remove"];
    },
    // ライフエール、とく放題 Mログアウト
    async SBLogout(){
      await context.$repositories("login")
        .getSBLogout()
        .then((res) => {})
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          context.$loading.finishProcessing()
        });
      context.$store.commit("loginInfo/removeAll");
      context.$store.commit("userInfo/removeAll");
      window.location.href = redirectAfterLogout + "/system-error";
    },
    async remove(redirectAfterLogout) {
      await this.removeLoginInfo();
      // TOP ページへ戻る
      const boCode = findMypageBoCode(location.origin);

      if (boCode === 'LY') {
        context.$loading.startProcessing();
        this.SBLogout();
      } else if (boCode === 'TH') {
        context.$loading.startProcessing();
        if (cookie.THRtAuthenticatedCookie) {
          // とく放題 M
          this.SBLogout();
        } else {
          // とく放題 B
          context.$store.commit("loginInfo/removeAll");
          context.$store.commit("userInfo/removeAll");
          const redirect = { redirect_uri: redirectAfterLogout + "/system-error" };
          await context.$repositories("login")
            .getISPLogout(redirect)
            .then((res) => { })
            .catch((e) => {
              console.log(e);
            })
            .finally(() => {
              context.$loading.finishProcessing()
            });
        }
      } else {
        // ログアウト
        await context.$repositories("login").getLogout()
          .catch((e) => {
            console.log(e);
          });
        // TOP ページへ戻る
        if (boCode === 'CR') {
          location.href = redirectAfterLogout + "/logout";
        } else {
          location.href = redirectAfterLogout;
        }
      }
    },
    async removeLoginInfo() {
      context.store.commit("auth/remove");
      document.cookie = createSetCookie("refresh_token", "", new Date(0));
      context.store.commit["subsidy/remove"];

      try {
          // ThemiStruct ログアウト
          const sdk = new IPSDK("https", process.env.VUE_APP_LOGIN_API_FQDN, "443");
          sdk.signout("POST");
      } catch (e) {
          console.log(e);
      }

      Cookies.remove(process.env.VUE_APP_COOKIE_NAME);
    },
    setLastUserOperationDate() {
      const date = new Date();
      let now = date.getTime();
      context.store.commit("auth/setLastUserOperationDate", now);
    },
    checkLastOperation() {
      const lastTime = context.store.state.auth.lastUserOperationDate;
      if (!lastTime) return false;
      let date = new Date();
      const nowTime = date.getTime();
      const diff = nowTime - lastTime;
      const debug1 = new Date(lastTime);
      const debug2 = new Date(lastTime + 60 * 60 * 1000);
      return diff >= 60 * 60 * 1000;
    },
    get points() {
      return _.get(context.store.getters["auth/get"].user, "totalPoint", "0");
    },
    set points(value) {
      const userInfo = _.cloneDeep(context.store.getters["auth/get"].user);
      userInfo.totalPoint = value;
      return context.store.commit("auth/set", { user: userInfo });
    }
  };

  inject("auth", auth);
};
