<template>
  <div class="p-login-guidance-modal">
    <Modal ref="login-guidance-modal" width-size="M" @hide="hideModal">
      <div class="c-modal__sp-contain">
        <h2 class="c-title4 p-login-guidance-modal__title">
          ログインして<br />サービスをご利用ください。
        </h2>

        <div class="c-buttons2 p-login-guidance-modal__button">
          <div class="c-buttons2__inner">
            <div class="c-buttonWrap4" @click="hideModal()">
              <a
                :href="redirectUrl"
                class="c-button c-button__primary c-button__primary--color2"
              >
                ログイン
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  props: ["params"],
  methods: {
    hideModal() {
      this.$store.commit("auth/set", { authenticate: false });
      this.$refs["login-guidance-modal"].hide();
      this.deleteQuery("back_uri");
      this.$emit("hide");
    },
    deleteQuery(key) {
      const query = Object.assign({}, this.$route.query);
      delete query[key];
      this.$router.push({ query: query });
    }
  },
  computed: {
    redirectUrl() {
      let backUri = this.$route.query.back_uri;
      if (this.$route.hash) {
        backUri = backUri + this.$route.hash;
      }
      return (
        process.env.VUE_APP_AUTHORIZATION + "/v1/mypage/login?" +
        encodeURI(backUri)
      );
    }
  },
  mounted() {
    this.$refs["login-guidance-modal"].show();
  }
};
</script>
<style lang="scss" scoped></style>
