<template>
  <div>
    <MenusSlider>
      <img
        v-for="image in items"
        :key="image"
        :src="image"
        :width="width"
        :height="height"
      />
    </MenusSlider>
  </div>
</template>

<script>
export default {
  props: {
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
