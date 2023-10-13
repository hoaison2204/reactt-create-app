<template>
  <svg
    class="c-icon"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-label="icon.name"
    @click="$emit('click')"
    role="img"
  >
    <!-- <g v-html="icon.path"></g> -->
    <g :fill="fill" :stroke="stroke" v-html="icon.path"></g>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "box",
      required: true
    },
    width: {
      type: [Number, String],
      default: 16
    },
    height: {
      type: [Number, String],
      default: 16
    },
    color: {
      type: String
    },
    opt: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    icon() {
      if (!this.$icon || !this.$icon[this.name]) return {};
      return this.$icon[this.name];
    },
    option() {
      if (!this.opt) return {};
      return this.opt;
    },
    fill() {
      if (!this.icon || !this.icon.fill) return undefined;
      if (this.icon.fill == "#FFF") return this.icon.fill;
      if (!this.color) return this.icon.fill;
      return this.color;
    },
    stroke() {
      if (!this.icon || !this.icon.stroke) return undefined;
      if (this.icon.stroke == "#FFF") return this.icon.stroke;
      if (!this.color) return this.icon.stroke;
      return this.color;
    },
    viewBox() {
      if (!this.icon.viewBox) return "0 0 24 24";
      return this.icon.viewBox;
    }
  }
};
</script>

<style scoped></style>
