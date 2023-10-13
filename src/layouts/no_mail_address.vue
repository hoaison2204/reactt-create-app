<template>
  <main class="l-main">
    <div class="l-error c-card">
      <div class="l-error__inner">
        <div class="l-error__message">
          <h1>
            メールアドレスのご登録をお願いします。
          </h1>
          <p>
            マイページの会員情報設定から、メールアドレスを登録してください。<br
              class="c-displayPc"
            />
            クレジットカード情報の登録には、メールアドレスの事前登録が必要です。
          </p>
        </div>

        <div class="l-error__btn">
          <div class="c-buttonWrap4">
            <ButtonLink tag="div" @click.native="prevBtn" style-type="primary" color="color2">
              戻る
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
  },
  mounted() {
    this.$meta.setDocumentTitle('メールアドレスのご登録をお願いします。');
    this.$page.isBreadcrumb = false;
    this.$page.isPageHeader = false;
  },
  methods: {
    prevBtn() {
      this.$router.go(-1);
    }
  },
  watch: {
    $route() {
      this.$meta.setDocumentTitle('メールアドレスのご登録をお願いします。');
      this.$page.isBreadcrumb = false;
      this.$page.isPageHeader = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
