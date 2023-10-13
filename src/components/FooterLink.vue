<template>
  <div
    v-if="isFooterText"
    class="c-footer-link"
    :class="{ 'c-footer-link-bottom': addConfirmationScreenBottomClass }"
    :inert="$modal.inert"
  >
    <ul class="c-footer-link__items">
      <li class="c-footer-link__link-text">
        <TextButton
          :href="$postingLink('order/privacy').url"
          target="_blank"
          position="right"
        >
          プライバシーポリシー
          <Icon name="arrow_right" :color="$colors.brand.red" />
        </TextButton>
      </li>
      <li class="c-footer-link__link-text">
        <TextButton
          :href="$postingLink('order/tokutei').url"
          target="_blank"
          position="right"
        >
          特定商取引法に基づく表示について
          <Icon name="arrow_right" :color="$colors.brand.red" />
        </TextButton>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFooterText: false
    };
  },
  computed: {
    addConfirmationScreenBottomClass() {
      return this.$route.path === "/orders/confirm";
    }
  },
  methods: {
    getFooterTextFlg() {
      this.isFooterText = this.$page.isFooterText;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getFooterTextFlg();
    });
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.getFooterTextFlg();
      });
    }
  }
};
</script>
