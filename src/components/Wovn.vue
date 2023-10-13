<template>
  <!-- wovn 最小構成 -->
  <div v-if="isShowWovn" class="c-wovn wovn-languages">
    <ul class="wovn-lang-list">
      <li
        class="wovn-switch selected"
        data-value="ja"
        @click="switchLang('ja')"
      >
        日本語
      </li>
      <span class="c-wovn__spacer">|</span>
      <li class="wovn-switch" data-value="en" @click="switchLang('en')">
        English
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isShowWovn() {
      if (!process.env || !process.env.VUE_APP_WOVN_MODE) return false;
      return process.env.VUE_APP_WOVN_MODE == "custom";
    }
  },
  methods: {
    switchLang(lang) {
      WOVN.io.changeLang(lang);
      this.$wovn.setLang = lang; 
      this.saveLang();
    },
    saveLang() {
      const currentLang = WOVN.io.getCurrentLang().code;
      // this.$wovn.setLang = currentLang; 
    }
  },
  mounted() {
    window.addEventListener("wovnApiReady", () => {
      this.saveLang();
    });
  },
  beforeDestroy() {
    window.removeEventListener("wovnApiReady", () => {
      this.saveLang();
    });
  }
};
</script>

<style lang="scss" scoped></style>
