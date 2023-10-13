<template>
  <div
    class="text-pc-base text-sp-base px-3 py-2 rounded-lg sm:px-2.5"
    :style="`background-color:${bgColor}`"
    :class="innerStyle"
  >
    <div class="font-light" :style="`color:${textColor}`" :class="textStyle" v-html="text"></div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * バルーンの背景色
     */
    text: {
      type: String,
      default: 'Tooltip'
    },
    /**
     * バルーンの背景色
     */
    bgColor: {
      type: String,
      default: '#73767A'
    },
    /**
     * テキストカラー
     */
    textColor: {
      type: String,
      default: '#FFF'
    },
    /**
     * バルーン自体のスタイル
     * 追加CSS(tailwind)
     */
    innerStyle: {
      type: String,
      default: ''
    },
    /**
     * テキストのスタイル
     * 追加CSS(tailwind)
     */
    textStyle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.text-pc-base {
  font-size: 12px;
}
@media only screen and (max-width: 639px) {
  .text-sp-base {
    font-size: 10px;
  }
}
</style>
