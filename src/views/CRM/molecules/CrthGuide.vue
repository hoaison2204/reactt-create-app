<!-- ヘルプ ガイド -->
<template>
  <div class="crth-m-login-guide crth-pc">
    <AtomsCrthHelp class="clickHelp" @clickHelp="clickHelp" />
    <AtomsCrthTooltip
      v-if="showTooltip"
      :guide="guide"
      @closeTooltip="closeTooltip"
    />
  </div>
</template>

<script>
import AtomsCrthHelp from "@/views/CRM/atoms/CrthHelp.vue";
import AtomsCrthTooltip from "@/views/CRM/atoms/CrthTooltip.vue";

export default {
  name: "MoleculesCrthGuide",
  components: {
    AtomsCrthHelp,
    AtomsCrthTooltip
  },
  props: {
    /**
     * ガイドの情報
     */
    guide: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showTooltip: false
    };
  },
  methods: {
    /**
     * ヘルプアイコンクリックイベント
     */
    clickHelp() {
      this.showTooltip = true;
    },
    /**
     * ツールチップを閉じる
     */
    closeTooltip() {
      this.showTooltip = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/guide.scss";
</style>
