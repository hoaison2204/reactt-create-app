<!-- ログイン プランM -->
<template>
  <section class="crth-o-login-plan-b">
    <MoleculesCrthPlanName :type="planType" />
    <MoleculesCrthBtnPanel
      :type="planType"
      v-for="(item, index) in loginBtnList"
      :key="index"
      :item="item"
    />
  </section>
</template>

<script>
import Img from "@/assets/images/CRM/tokuhodai/autbtn-phone-lm.png";

import MoleculesCrthPlanName from "@/views/CRM/molecules/CrthPlanName.vue";
import MoleculesCrthBtnPanel from "@/views/CRM/molecules/CrthLoginBtnPanel.vue";

export default {
  name: "OrganismsCrthPlanM",
  components: {
    MoleculesCrthPlanName,
    MoleculesCrthBtnPanel
  },
  computed: {
    /**
     * プラン種別
     */
    planType() {
      return "M";
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
          img: Img,
          guide: {
            title: "携帯電話とは",
            detail: "スマートフォン・携帯電話、その他モバイル製品ご利用のお客さまは、ご利用の携帯電話番号でログインしてください。"
          },
          link: "softbank",
          note: {
            text: "\nSoftBank 4G対応端末をご利用の方は、Wi-FiをOFFにすることで、ログイン時にID・パスワードの入力を省略できます。",
            title: "ログインボタンを押す前に",
            spOnly: true
          }
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/planM.scss";
</style>
