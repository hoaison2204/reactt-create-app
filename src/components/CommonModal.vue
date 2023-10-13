<template>
  <div>
    <component
      v-for="(item, i) in modals"
      :key="i"
      :is="item.component"
      :params="item"
      @hide="hide"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    /**
     * ストアに保持されている全てのモーダルを取得して返却する
     * @return {array} - ストアに保持されている全てのモーダル情報の配列
     */
    modals() {
      return this.$modal.modals;
    }
  },
  methods: {
    /**
     * ストアに保持されている全てのモーダルの中から一つを削除する
     */
    hide() {
      this.$modal.close();
    }
  }
};
</script>

<style lang="scss" scoped></style>
