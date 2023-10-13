<template>
  <section>
    <div class="success">
      <p v-html="text"></p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    text: null,
  },
};
</script>

<style lang="scss" scoped>
.success {
  background: #ffffff 0% 0% no-repeat padding-box;
  text-align: center;
  margin: 1rem 0;
  padding: 3% 0 0 0;
  > p {
    &:first-child {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
