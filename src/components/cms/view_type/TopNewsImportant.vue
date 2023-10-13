<template>
  <div class="TopNewsImportant">
    <ul>
      <li
          v-for="(item, i) in item_list"
          :key="i"
      >
        <a
            :href="`/information/` + item.id"
        >
          {{ item.news_type_name }}{{ item.display_title }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: "TopNewsImportant",
  props: {
    item_list: {
      type: Array,
    }
  },
  components: {
  },

  data() {
    return {
    };
  },
  watch: {},
  computed: {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.TopNewsImportant {
}
</style>