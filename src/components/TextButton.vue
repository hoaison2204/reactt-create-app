<template>
  <component
    v-if="wrapper === 'router-link'"
    :is="wrapper"
    :to="to"
    :replace="replace"
    :append="append"
    :exact="exact"
    :target="target"
    :class="classObject"
  >
    <slot />
  </component>
  <component
    v-else
    :is="wrapper"
    :to="to"
    :replace="replace"
    :append="append"
    :exact="exact"
    :href="href"
    :target="target"
    :class="classObject"
  >
    <slot />
  </component>
</template>

<script>
export default {
  data: () => ({
    blockName: "c-text-button"
  }),

  props: {
    tag: {
      props: String,
      default: "router-link"
    },
    to: {
      type: [String, Object],
      default: ""
    },
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: ""
    },
    target: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    }
  },

  computed: {
    wrapper() {
      return this.tag || "router-link";
    },
    colorClass() {
      if (!this.color) return;
      return this.blockName + "--" + this.color || "";
    },
    positionClass() {
      if (!this.position) return;
      return this.blockName + "--" + this.position || "";
    },
    sizeClass() {
      if (!this.size) return;
      return this.blockName + "--" + this.size || "";
    },
    classObject() {
      return [
        this.blockName,
        this.colorClass,
        this.positionClass,
        this.sizeClass
      ];
    }
  },
  methods: {
    // clickEvent() {
    //   this.$emit("click-text-button");
    // },
  }
};
</script>
