<template>
  <div class="c-order-step">
    <ul class="c-order-step__list">
      <li
        v-for="(item, i) in stepList" :key="i"
        class="c-order-step__item"
        :class="[
          {'c-order-step__item--current': isCurrent(item.path)},
          {'c-order-step__item--checked': isChecked(item.no)}
        ]">
        <div class="c-order-step__item__circle-wrap">
          <div
            class="c-order-step__item__circle">
            <span v-if="isChecked(item.no)" class="c-order-step__item__circle--idx"><Icon name="menu_check"/></span>
            <span v-else class="c-order-step__item__circle--idx">{{item.no}}</span>
          </div>
        </div>
        <p class="c-order-step__item__status c-lead3">{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
  },
  data(){return {
    stepList: [
      {no: 1, path:'applicantInformation', name: '申込内容入力'},
      {no: 2, path:'confirm', name: '確認'},
      {no: 3, path:'', name: 'お支払い方法'},
      {no: 4, path:'complete', name: '完了'},
    ]
  }},
  methods: {
    isChecked(no) {
      return this.$page.orderStepChecked.includes(no);
    },
    isCurrent(path) {
      if (this.$route.name === 'changePointRequest') {
        return path === this.stepList[0].path;
      }
      return this.$route.name === path;
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
