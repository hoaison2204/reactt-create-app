<template>
  <main class="l-main l-main--has-side">
    <router-view class="l-main__content" />
    <InformationSideMenu v-if="showMenu()" class="l-side" />
  </main>
</template>

<script>
export default {
  meta: {
    page: {
      name: "お知らせ",
    },
  },
  data() {
    return {
      pageName: "",
      EXCLUDE_LIST: [""],
    };
  },
  methods: {
    showMenu() {
      return (
        this.$route.name !== "" && !this.EXCLUDE_LIST.includes(this.pageName)
      );
    },
  },
  mounted() {
    this.pageName = this.$route.name;
  },
  watch: {
    $route() {
      this.pageName = this.$route.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.l-main {
  margin-top: 24px;
}
</style>
