<template>
  <div class="c-input c-input--group">
    <input
      type="text"
      name="input_text"
      :value="value"
      :placeholder="placeholder"
      :class="{
        'c-input__background': background,
        'c-input__background--error': error
      }"
      class="c-input__text"
      @input="input"
      @keypress.enter="onSearch"
      autocomplete="on"
    />
    <button type="submit" class="c-input__button" @click="onSearch">
      <icon name="action_search" />
      <span class="c-input__searchlabel">検索</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "キーワード検索"
    },
    background: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    input(e) {
      this.$emit("input", e.target.value);
    },
    onSearch() {
      this.$emit("onSearch");
    }
  }
};
</script>

<style lang="scss" scoped></style>
