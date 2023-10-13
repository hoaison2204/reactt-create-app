<!-- ログイン プラン名 -->
<template>
  <div class="crth-m-login-plan-name" :class="type">
    <AtomsCrthCustomer :type="type" />
    <span v-if="type == 'M'">ソフトバンク携帯電話のオプションサービスとしてお申し込みの「とく放題」</span>
    <span v-else>固定インターネット回線のオプションサービスとしてお申し込みの「とく放題」</span>
  </div>
</template>

<script>
import AtomsCrthCustomer from "@/views/CRM/atoms/CrthCustomer.vue";

export default {
  name: "MoleculesCrthPlanName",
  components: {
    AtomsCrthCustomer
  },
  props: {
    type: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/planName.scss";
</style>
