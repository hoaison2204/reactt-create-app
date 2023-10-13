<!-- ログイン 各種ログインボタン -->
<template>
  <a :href="link" class="crth-a-login-login-btn">
    <img :src="img" />
  </a>
</template>

<script>
export default {
  name: "AtomsCrthLoginBtn",
  props: {
    /**
     * ログインボタンイメージ
     */
    img: {
      type: String,
      required: true
    },
    /**
     * 遷移先URL
     */
    link: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/loginBtn.scss";
</style>
