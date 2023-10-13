<!-- ログイン ツールチップ -->
<template>
  <div class="crth-a-login-tooltip">
    <div class="crth-a-login-tooltip__header">
      {{ guide.title }}
      <div class="crth-a-login-tooltip__header__close" @click="clickCloseBtn">
        <img src="@/assets/images/CRM/tokuhodai/help_close.png" />
      </div>
    </div>
    <p>
      {{ guide.detail }}
    </p>
  </div>
</template>

<script>
export default {
  name: "AtomsCrthTooltip",
  props: {
    /**
     * ガイドの情報
     */
    guide: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    /**
     * クローズアイコンクリックイベント
     */
    clickCloseBtn() {
      this.$emit("closeTooltip");
    }
  },
  beforeDestroy() {
    window.removeEventListener("click", this.clickCloseBtn);
  },
  mounted() {
    // 表示のクリックイベントが発火してしまうためタイマーを挟む
    setTimeout(() => {
      window.addEventListener("click", this.clickCloseBtn);
    }, 1);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/tooltip.scss";
</style>
