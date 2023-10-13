<template>
  <main class="l-main l-main--has-side">
    <router-view class="l-main" />
  </main>
</template>

<script>
export default {
  meta: {
    page: {
      name: "特集一覧",
    },
  },
  data() {
    return {
      pageName: "",
    };
  },
  methods: {
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
</style>
