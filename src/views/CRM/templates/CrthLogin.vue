<!-- ログイン -->
<template>
  <div class="crth-main crth-main__contents">
    <AtomsCrthTitle :title="'ログイン'" />
    <!-- コンテンツ -->
    <OrganismsCrthContents />
  </div>
</template>

<script>
import AtomsCrthTitle from "@/views/CRM/atoms/CrthTitle.vue";
import OrganismsCrthContents from "@/views/CRM/organisms/CrthContents.vue";
export default {
  name: "Tokuhodai",
  components: {
    AtomsCrthTitle,
    OrganismsCrthContents
  },
  props: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/login.scss";
</style>
