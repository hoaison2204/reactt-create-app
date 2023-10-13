<template>
  <div
    :class="[
      'box-viewmore',
      {
        open,
      },
    ]"
  >
    <div v-if="title" class="title-box v-line">
      <h2>{{title}}</h2>
    </div>
    <div class="" ref="box" :class="!isHidden ? 'box-content-hidden' : 'box-content'" >
      <slot id="content"/>
    </div>
    <div class="flex justify-center">
      <button class="btn-viewmore mr-0" @click="open = !open" v-if="isHidden">
        <span class="pr-0">{{getExpandLabel}}</span>
        <i  class="icon icon-bor-triangle-down text-primary" :class="{rotate: this.open}" />
        <!-- <Icon class="icon" name="arrow_down" /> -->
      </button>
      <div class="pt-5" v-if="isHidden">
        <Icon class="icon" name="arrow_down" :class="{rotate: this.open}"  />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['title'],
  data() {
    return {
      open: false,
      isHidden: true
    }
  },
  mounted() {
    this.getHeight()
  },
  computed: {
    getExpandLabel() {
      return this.open ? ' 閉じる' : '詳細を見る'
    }
  },
  methods: {
    getHeight() {
      const heightOfBox = this.$refs.box.clientHeight
      if(heightOfBox < 120) {
        this.isHidden = false
      } else {
        this.isHidden = true
      }
    }
  },
  updated() {
    this.getHeight()
  }
}
</script>
