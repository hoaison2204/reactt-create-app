<template>
  <main class="l-main">
    <div class="l-error c-card">
      <div class="l-error__inner">
        <div class="l-error__message">
          <h1>
            404 Not Found<br />
            お探しのページが見つかりません。
          </h1>
          <p>
            お探しのページは一時的にアクセスができない状況にあるか、<br
              class="c-displayPc"
            />
            移動もしくは削除された可能性があります。
          </p>
        </div>

        <div class="l-error__btn">
          <div class="c-buttonWrap4">
            <ButtonLink tag="a" :href="domainTop" style-type="primary" color="color2">
              トップページへ
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
export default {
  props: ["error"],
  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    domainTop() {
      let topDomain = this.getTopDomain(this.mypageDisplayCode);
      if (this.isIcService(this.mypageDisplayCode)) topDomain = topDomain + "/home/";
      return topDomain;
    },
  },
  mounted() {
    this.$meta.setDocumentTitle('お探しのページが見つかりません。');
    this.$page.isBreadcrumb = false;
    this.$page.isPageHeader = false;
  },
  watch: {
    $route() {
      this.$meta.setDocumentTitle('お探しのページが見つかりません。');
      this.$page.isBreadcrumb = false;
      this.$page.isPageHeader = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
