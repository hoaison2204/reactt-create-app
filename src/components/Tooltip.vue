<template>
  <div
    @mouseenter="onFocus"
    @mouseleave="onBlur"
    ref="tooltip"
    class="group flex relative"
  >
    <slot>
      <span class="bg-black text-white px-2 py-1">Here is Tooltip</span>
    </slot>
  </div>
</template>

<script>
const DIRECTION_TOP = 'top';
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const DIRECTION_BOTTOM = 'bottom';

export default {
  props: {
    text: {
      type: String,
      default: 'Tooltip',
    },
    offset: {
      type: Number,
      default: 8,
    },
    direction: {
      type: String,
      default: 'top',
      validate(value) {
        return [
          DIRECTION_TOP,
          DIRECTION_LEFT,
          DIRECTION_RIGHT,
          DIRECTION_BOTTOM
        ].includes(value)
      }
    },
    /**
     * フォントサイズ・カラー、背景色など
     */
    innerStyle: {
      type: String,
      default: "text-sm text-black bg-white"
    },
    classes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      asisX: 0,
      asisY: 0,
      contentRect: null,
      node: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.node = document.createElement('div')
      this.node.innerHTML += this.text
      document.getElementById('app').appendChild(this.node)
      this.node.className = `
          hidden absolute transform opacity-0 border border-solid
          rounded-md transition-opacity shadow-2xl py-2 px-4
          ${this.innerStyle}
        ` + this.classes.join(' ');
      this.contentRect = this.node.getBoundingClientRect();
      this.detectPosition();
      this.updateStyles();
    });
  },
  beforeDestroy() {
    document.getElementById('app').removeChild(this.node);
  },
  methods: {
    onBlur() {
      this.node.className = this.node.className.replace('opacity-100', 'opacity-0')
      this.node.className = this.node.className.replace('block', 'hidden')
    },
    onFocus() {
      this.detectPosition();
      this.node.className = this.node.className.replace('opacity-0', 'opacity-100')
      this.node.className = this.node.className.replace('hidden', 'block')
    },
    updateStyles() {
      this.node.style.cssText = `
        left: ${this.asisX}px;
        top: ${this.asisY}px
      `;
    },
    detectPosition() {
      const tooltipRect = this.$refs.tooltip.getBoundingClientRect();

      if (this.direction === DIRECTION_TOP) {
        this.handleTopPosition(tooltipRect, this.contentRect);
      }
      if (this.direction === DIRECTION_LEFT) {
        this.handleLeftPosition(tooltipRect, this.contentRect);
      }
      if (this.direction === DIRECTION_BOTTOM) {
        this.handleBottomPosition(tooltipRect, this.contentRect);
      }
      if (this.direction === DIRECTION_RIGHT) {
        this.handleRightPosition(tooltipRect, this.contentRect);
      }
      this.updateStyles();
    },
    handleTopPosition(tooltipRect, contentRect) {
      this.asisX =
        tooltipRect.left - (contentRect.width - tooltipRect.width) / 2;
      this.asisY =
        tooltipRect.top + window.pageYOffset - contentRect.height - this.offset;
    },
    handleBottomPosition(tooltipRect) {
      this.asisX = tooltipRect.left;
      this.asisY = tooltipRect.bottom + window.pageYOffset + this.offset;
    },
    handleLeftPosition(tooltipRect, contentRect) {
      this.asisX = tooltipRect.left - contentRect.width - this.offset;
      this.asisY =
        tooltipRect.top +
        window.pageYOffset +
        (tooltipRect.height + contentRect.height) / 2 -
        contentRect.height;
    },
    handleRightPosition(tooltipRect, contentRect) {
      this.asisX = tooltipRect.right + this.offset;
      this.asisY =
        tooltipRect.top +
        window.pageYOffset +
        (tooltipRect.height + contentRect.height) / 2 -
        contentRect.height;
    },
  },
};
</script>

<style lang="scss" scoped></style>
