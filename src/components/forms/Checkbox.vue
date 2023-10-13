<template>
  <div class="c-checkbox">
    <label class="c-checkbox__inner">
      <input
        ref="checkbox"
        type="checkbox"
        :value="value"
        :checked="checked"
        :disabled="isDisabled"
        @input="input"
        @change="change"
      />
      <div class="c-checkbox__box" />
      <div class="c-checkbox__label" v-if="label">{{ label }}</div>
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    value: {
      type: [Boolean, Number, Array],
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: [Boolean, Number],
      default: false,
    },
  },
  computed: {
    checked() {
      if (this.value === 1 || this.value === true) return true;
      return false;
    },
    isDisabled() {
      return this.disabled === true || this.disabled === 0 ? true : false;
    },
  },
  methods: {
    input() {
      this.$emit("input", this.val());
    },
    change() {
      this.$emit("change", this.val());
    },
    // 渡された引数により[true/false]か[1/0] を返す
    val() {
      let checkd = this.$refs.checkbox.checked;
      if (this.value === 0 || this.value === "1") {
        if (checkd) return 1;
        return 0;
      }
      return checkd;
    },
  },
};
</script>