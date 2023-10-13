<!-- ログイン ログインボタンパネル -->
<template>
  <div class="crth-m-login-btn-panel">
    <div class="crth-m-login-btn-panel__inner">
      <AtomsCrthLoginBtn :img="item.img" :link="link" />
      <AtomsCrthNote v-if="item.note" :note="item.note" />
    </div>
    <MoleculesCrthGuide v-if="item.guide" :guide="item.guide" />
  </div>
</template>

<script>
import AtomsCrthLoginBtn from "@/views/CRM/atoms/CrthLoginBtn.vue";
import MoleculesCrthGuide from "@/views/CRM/molecules/CrthGuide.vue";
import AtomsCrthNote from "@/views/CRM/atoms/CrthNote.vue";
import { parseCookie } from "@/utils/cookie";

export default {
  name: "MoleculesCrthLoginBtnPanel",
  components: {
    MoleculesCrthGuide,
    AtomsCrthLoginBtn,
    AtomsCrthNote
  },
  props: {
    /**
     * ログインボタンの情報
     */
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    link() {
      // とく放題のbffパス取得
      const domain = this.getAppApiDomain(this.getMypageDisplayCode(location.origin));

      // クッキー情報取得
      const cookie = parseCookie(document.cookie);
      const sso = this.$route.query.ssoState;
      if (sso) {
        if (this.item.link == "sid") {
          return (
            domain +
            "/v1/mypage/isp-sid-login" +
            `?ssoState=${sso}`
          );
        } else if (this.item.link == "softbank") {
          return (
            domain +
            "/v1/mypage/sb-th-login" +
            `?ssoState=${sso}&acr_value=2&back_uri=` + cookie.back_uri
          );
        } else {
          // yahoo
          return (
            domain +
            "/v1/mypage/isp-ybb-login" +
            `?ssoState=${sso}`
          );
        }
      } else {
        if (this.item.link == "sid") {
          return domain + "/v1/mypage/isp-sid-login";
        } else if (this.item.link == "softbank") {
          return domain + "/v1/mypage/sb-th-login?acr_value=2&back_uri=" + cookie.back_uri;
        } else {
          return domain + "/v1/mypage/isp-ybb-login";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/btnPanel.scss";
</style>
