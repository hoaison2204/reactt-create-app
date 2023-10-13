<template>
  <div class="paragraghHierarchical_block" :class="'blockContents-u_margin--' + this.hblock.field_hblock_margin">
    <template v-if="this.hblock.field_hblock_columns === '1col'">
      <template v-if="this.hblock.field_hblock_type === 'list'">
        <ul v-if="this.hierarchicalBlock.length > 0">
          <li v-for="item in this.hierarchicalBlock[0]"
              :key="item.id"
          >
            <p>{{ item.title }}</p>
          </li>
        </ul>
      </template>
    </template>
  </div>
</template>

<script>

export default {
  name: 'ParagraphHierarchicalBlock',
  props: {
    cms_response: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      data : null,
      hblock: {},
      hierarchicalBlock: [],
    }
  },
  watch:{},
  computed: {
  },
  methods: {
    makeHierarchicalBlock(obj) {
      this.hblock = obj.included[0].attributes
      const hblockPath = obj.data[0].attributes.nested_paragraph_data;
      hblockPath.forEach( (item) => {
        this.hierarchicalBlock.push(item);
      })
    }
  },

  created() {
  },
  mounted() {
    this.data = this.$props.cms_response;
    this.makeHierarchicalBlock(this.data);
  },
  updated() {
  },
  destroyed() {
  },

}
</script>

<style lang="scss" scoped>
.paragraghHierarchical_block {
  ul {
    list-style-type: none;
    padding-left: 0;
  }
}
</style>