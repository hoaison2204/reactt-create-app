<!-- ログイン 各種ログインボタン小 -->
<template>
  <a
    :href="link"
    class="crth-a-login-login-btn-small"
    :class="[{ 'crth-pc': !imgSP }, { 'crth-sp': !img }]"
  >
    <img :src="img" class="crth-pc" />
    <img :src="imgSP" class="crth-sp" />
  </a>
</template>

<script>
export default {
  name: "AtomsCrthLoginBtnSmall",
  props: {
    /**
     * ログインボタンイメージ
     */
    img: {
      type: String,
      default: ""
    },
    /**
     * ログインボタンイメージスマホ用
     */
    imgSP: {
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
@import "@/assets/css/CRM/crth/loginBtnSmall.scss";
</style>
