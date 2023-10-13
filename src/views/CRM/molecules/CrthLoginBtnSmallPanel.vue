<!-- ログイン ログインボタンパネル -->
<template>
  <div class="crth-m-login-btn-small-panel">
    <div class="crth-m-login-btn-small-panel__inner">
      <AtomsCrthLoginBtnSmall
        :img="item.img"
        :imgSP="item.imgSP"
        :link="link"
      />
    </div>
  </div>
</template>

<script>
import AtomsCrthLoginBtnSmall from "@/views/CRM/atoms/CrthLoginBtnSmall.vue";

export default {
  name: "MoleculesCrthLoginBtnSmallPanel",
  components: {
    AtomsCrthLoginBtnSmall
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
      const sso = this.$route.query.ssoState;
      if (sso) {
        if (this.item.link == "enjoy") {
          return (
            domain +
            "/v1/mypage/isp-ebb-login" +
            `?ssoState=${sso}`
          );
        } else {
          return "https://bbss.softbankbb.co.jp/AUT/ftth?mem=memCertAFeb&.func=bbTokuHodaiCert&.isp=nexyz&ras=%2fsmp%2fscsbb%2fm%2fc%2flogin.faces%3frsrurl%3d%252Fsmp%252Fscsbb%252Fpages%252Fbo%252Ftemplate.faces%253Fih%253D%25252fsupport%25252fterms.html";
        }
      } else {
        if (this.item.link == "enjoy") {
          return domain + "/v1/mypage/isp-ebb-login";
        } else {
          return "https://bbss.softbankbb.co.jp/AUT/ftth?mem=memCertAFeb&.func=bbTokuHodaiCert&.isp=nexyz&ras=%2fsmp%2fscsbb%2fm%2fc%2flogin.faces%3frsrurl%3d%252Fsmp%252Fscsbb%252Fpages%252Fbo%252Ftemplate.faces%253Fih%253D%25252fsupport%25252fterms.html";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/btnSmallPanel.scss";
</style>
