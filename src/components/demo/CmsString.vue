<template>
  <div>
    <h3 class="title">{{ optionKey }}={{ optionValues }}</h3>

    <div class="p-demo-cards">
      <div
        class="p-demo-card"
        v-for="item in values"
        :key="item.index">
        <MenusPhotoSlider
          :menu="Number(item)"
          :items="[
            'https://via.placeholder.com/400x300'
          ]"
        />
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    optionKey: {
      type: String,
      default: ''
    },
    optionValues: {
      type: String,
      default: ''
    }
  },

  computed: {
    values() {
      return this.optionValues.split(',') || [];
    }
  }
};
</script>



<style lang="scss">
.p-demo-cards {
  display: flex;
  flex-wrap: nowrap;
}

.p-demo-card {
  img {
    width: 100%;
    height: auto;
  }
}
</style>