<template>
  <div>
    <MenusImageSlider
      class="slider"
      :items="items"
      :width="width"
      :height="height" />
    <router-link class="link" :to="`/menus/${menu}/photos`">
      フォトギャラリーを見る
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Number,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    width: {
      type: [Number, String],
      default: 320
    },
    height: {
      type: [Number, String],
      default: 320
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  margin-bottom: 1em;
}

.link:after {
  margin-left: 1em;
  font-family: "Font Awesome 5 Free";
  font-weight: bold;
  content: "\f105";
}
</style>
