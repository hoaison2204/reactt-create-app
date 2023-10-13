<template>
  <notifications
    :group="options.group"
    :type="options.type"
    width="35rem"
    position="top center"
  >
    <template slot="body" slot-scope="props">
      <div class="c-notify" :class="props.item.type">
        <div class="c-notify__icon">
          <Icon name="alert" />
        </div>
        <div class="c-notify__content">
          <p class="c-notify__title">
            {{ props.item.title }}
          </p>
          <p v-html="props.item.text" class="c-notify__text" />
        </div>
        <button class="c-notify__close" @click="props.close">
          <Icon name="action_close" />
        </button>
      </div>
    </template>
  </notifications>
</template>

<script>
export default {
  data: () => ({
    options: {}
  }),

  computed: {
    item() {
      return {
        group: this.options.group ? this.options.group : "",
        type: this.options.type ? this.options.type : "",
        title: this.options.title ? this.options.title : "",
        text: this.options.text ? this.options.text : "",
        duration: this.options.duration ? this.options.duration : 30000
      };
    },
    notifyList() {
      if (!this.$notifyToast && !this.$notifyToast.notify) return [];
      return this.$notifyToast.notify;
    }
  },

  methods: {
    async show(options) {
      await this.fetch(options);
      this.$notify(this.item);
    },
    fetch(options) {
      if (!options) return;
      this.options = options;
    }
  },
  watch: {
    notifyList() {
      for (let item of this.notifyList) {
        const notifyData = JSON.parse(JSON.stringify(item));
        this.show(notifyData);
        this.$notifyToast.hide();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.vue-notification-group {
  left: 50%;
  margin-left: -17.5rem;
  padding: 0.5rem;
  max-width: 100%;
  width: 35rem;
  @include mq() {
    right: 0 !important;
    left: 0 !important;
    margin-left: unset;
    width: 100% !important;
  }
}
</style>
