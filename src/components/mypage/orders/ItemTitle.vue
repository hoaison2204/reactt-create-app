<template>
  <div class="pl-4 md:pl-2 md:leading-tight pt-2 pb-2 w-full item-title-extend">
    {{ text }}

    <slot name="text-behind" />
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style scoped lang="scss">
.item-title-extend {
  font-size: 15px;
  background-color: #E7E7E7;
  @media (max-width:768px) {
    font-size: 13px;
  }
}
</style>
