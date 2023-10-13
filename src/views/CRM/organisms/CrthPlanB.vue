<!-- ログイン プランB -->
<template>
  <section class="crth-o-login-plan-b">
    <MoleculesCrthPlanName :type="planType" />
    <div class="crth-o-login-plan-b__btn-large">
      <MoleculesCrthLoginBtnPanel
        v-for="(item, index) in loginBtnList"
        :key="index"
        :item="item"
      />
    </div>
    <div class="crth-o-login-plan-b__btn-small">
      <MoleculesCrthLoginBtnSmallPanel
        v-for="(item, index) in loginBtnSmallList"
        :key="index"
        :item="item"
      />
    </div>
  </section>
</template>

<script>
import ImgSID from "@/assets/images/CRM/tokuhodai/autbtn-sid-lm.png";
import ImgYahoo from "@/assets/images/CRM/tokuhodai/btnMYid.gif";

import ImgEnjoy from "@/assets/images/CRM/tokuhodai/btn_enjoy_293.png";
import ImgEnjoySP from "@/assets/images/CRM/tokuhodai/sp/btn_enjoy.png";
import ImgNexyzSP from "@/assets/images/CRM/tokuhodai/sp/btn_nexyz.png";

import MoleculesCrthPlanName from "@/views/CRM/molecules/CrthPlanName.vue";
import MoleculesCrthLoginBtnPanel from "@/views/CRM/molecules/CrthLoginBtnPanel.vue";
import MoleculesCrthLoginBtnSmallPanel from "@/views/CRM/molecules/CrthLoginBtnSmallPanel.vue";

export default {
  name: "OrganismsCrthPlanB",
  components: {
    MoleculesCrthPlanName,
    MoleculesCrthLoginBtnPanel,
    MoleculesCrthLoginBtnSmallPanel
  },
  props: {
    ssoB: {
      String: ""
    }
  },
  computed: {
    /**
     * プラン種別
     */
    planType() {
      return "B";
    },
    loginBtnList() {
      /**
       * img: ログインボタン画像
       * guide: ツールチップの表示内容
       *   title: ツールチップのタイトル
       *   detail: ツールチップの説明
       * link: 遷移先
       * note: 注釈
       */
      return [
        {
          img: ImgSID,
          guide: {
            title: "S-IDとは",
            detail: "SoftBank 光/SoftBank Airのサービスにご加入されているお客さまがご利用いただけます"
          },
          link: "sid"
        },
        {
          img: ImgYahoo,
          guide: {
            title: "Yahoo! JAPAN IDとは",
            detail: "Yahoo! BBサービス、Yahoo! BB基本サービス（オプション）にご加入されているお客さまがご利用いただけます。"
          },
          link: "https://bbss.softbankbb.co.jp/AUT/ftth?mem=memCertAFmb&.func=bbTokuHodaiCert&ras=%2Fbs%2Fscsbb%2Fpages%2Fbo%2Ftemplate.faces%3Fih%3D%252fcontents%252fpromotion%252fpromotion_sbm.html",
          note: {
            text: "ログイン画面が表示されない場合は",
            linkText: "こちら",
            link: "yahoo"
          }
        }
      ];
    },
    /**
     * ログインボタン小の一覧
     */
    loginBtnSmallList() {
      /**
       * img: ログインボタン画像
       * imgSP: ログインボタン画像スマホ用
       * guide: ツールチップの表示内容
       *   title: ツールチップのタイトル
       *   detail: ツールチップの説明
       * link: 遷移先
       * note: 注釈
       */
      return [
        {
          img: ImgEnjoy,
          imgSP: ImgEnjoySP,
          link: "enjoy"
        },
        {
          img: null,
          imgSP: ImgNexyzSP,
          link: "nexyz"
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/planB.scss";
</style>
