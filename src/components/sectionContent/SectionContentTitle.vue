<template>
  <div class="title-box" :class="lineType">
    <h2>{{ titleContent }}</h2>
  </div>
</template>

<script>

export default {
  name: 'section-content-title',
  props: ['titleContent', 'lineType'],
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.title-box{
  h2{
    font-size: 22px;
    // @media only screen and (max-width: 768px){
    //   @apply -mt-4;
    // }
  }
  // @media only screen and (max-width: 768px){
  //   @apply flex items-start;
  // }
}
</style>
