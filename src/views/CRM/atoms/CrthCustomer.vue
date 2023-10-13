<template>
  <div class="crth-a-login-customer">
    <template v-if="type == 'M'">
      とく放題(M)をご利用のお客様
    </template>
    <template v-else>
      とく放題(B)をご利用のお客様
    </template>
  </div>
</template>

<script>
export default {
  name: "AtomsCrthCustomer",
  props: {
    /**
     * とく放題のプラン
     */
    type: {
      type: String,
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/customer.scss";
</style>
