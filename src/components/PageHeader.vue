<template>
  <div class="c-page-header" v-if="isPageHeader">
    <!-- 申込みのみ表示する -->
    <OrderStep v-if="isOrderStep" />

    <!-- パンくずリスト -->
    <Breadcrumb :isShow="isBreadcrumb" />
    <h1 v-if="isTitle" class="c-page-header__title">
      {{ pageTitle }}
    </h1>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb.vue";

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      isPageHeader: true,
      isBreadcrumb: true,
      isTitle: true
    };
  },
  computed: {
    breadcrumbs() {
      return this.$page.routes.filter((x) => x.name);
    },
    pageTitle() {
      if (
        !this.$route.meta ||
        !this.$route.meta.page ||
        !this.$route.meta.page.title
      )
        return "";
      return this.$route.meta.page.title || "";
    },
    isOrderStep() {
      if (typeof this.$route.meta.isOrderStep !== "boolean") return false;
      return this.$route.meta.isOrderStep;
    }
  },
  methods: {
    getPageHeaderFlg() {
      this.isPageHeader = this.$page.isPageHeader;
    },
    getBreadcrumbFlg() {
      this.isBreadcrumb = this.$page.isBreadcrumb;
    },
    getTitleFlg() {
      this.isTitle = this.$page.isTitle;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getPageHeaderFlg();
      this.getBreadcrumbFlg();
      this.getTitleFlg();
    });
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.getPageHeaderFlg();
        this.getBreadcrumbFlg();
        this.getTitleFlg();
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
