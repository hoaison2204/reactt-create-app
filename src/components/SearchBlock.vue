<template>
  <div v-if="isShow" class="c-search-block">
    <div class="c-search-block__overlay" @click.stop="$emit('hide')"></div>
    <div
      class="c-search-block__inner"
      :class="'c-search-block__inner--' + viewMode"
    >
      <FormsKeywordSearch
        :placeholder="
          !$utils.isSmartPhone()
            ? '施設名、メニューNo、地名などを入力（例：東京　温泉）'
            : 'キーワード、店名、地名など'
        "
        @input="input"
        @onSearch="onSearch(form.keyword)"
        :background="$utils.isSmartPhone()"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    viewMode: {
      type: String,
      default: "PC"
    }
  },
  data() {
    return {
      form: {
        keyword: ""
      }
    };
  },
  computed: {},
  methods: {
    input(args) {
      this.form.keyword = args;
    },
    getQueryString(keyword = "") {
      if (this.form.keyword) {
        var keyword = {
          keyword: this.form.keyword
        };
      }
      return {
        ...keyword
      };
    },
    onSearch(keyword = "") {
      if (!keyword) return;
      this.$router.push({
        path: "/menus",
        query: this.getQueryString(keyword)
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
