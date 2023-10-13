<template>
  <div class="paragraphList" :class="this.field_list_margin">
    <template v-if="field_list_type === 'bullet_list'">
      <ul class="bullet__list">
        <li
            v-for="item in lists"
            :key="item.id"
        >
          <div v-html="item.value" />
        </li>
      </ul>
    </template>

    <template v-if="field_list_type === 'number_list'">
      <ol class="number__list">
        <li
            v-for="item in lists"
            :key="item.id"
        >
          <div v-html="item.value" />
        </li>
      </ol>
    </template>

    <template v-if="field_list_type === 'check_list'">
      <ul class="check__list">
        <li
            v-for="item in lists"
            :key="item.id"
        >
          <div v-html="item.value" />
        </li>
      </ul>
    </template>

    <template v-if="field_list_type === 'annotation_list'">
      <ul class="annotation__list">
        <li
            v-for="item in lists"
            :key="item.id"
        >
          <i>※</i><div v-html="item.value" />
        </li>
      </ul>
    </template>

    <template v-if="field_list_type === 'no_annotation_list'">
      <ol class="no_annotation__list">
        <li
            v-for="item in lists"
            :key="item.id"
        >
          <div class="list__body">
            <i>※</i><div v-html="item.value" />
          </div>
        </li>
      </ol>
    </template>
  </div>
</template>
<script>

export default {
  name: 'ParagraphList',
  props: {
    cms_response: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      data : null,
      lists: [],
      field_list_margin: "",
      field_list_type: "",

    }
  },
  watch:{},
  computed: {
  },
  methods: {
    makeList(obj) {
      this.lists = [];
      this.field_list_margin = 'cms__blockContents-u_margin--' + obj.included[0].attributes.field_list_margin;
      this.field_list_type = obj.included[0].attributes.field_list_type;
      const listItem = obj.included[0].attributes.field_list_text;
      this.lists = listItem;
    }
  },

  created() {
  },
  mounted() {
    this.data = this.$props.cms_response;
    this.makeList(this.data);
  },
  updated() {
  },
  destroyed() {
  },

}
</script>

<style lang="scss" scoped>
.paragraphList {
  .bullet__list {
    li {
      text-align: left;
    }
  }
  .number__list {
    li {
      text-align: left;
    }
  }
  .check__list {
    li {
      text-align: left;
      display: grid;
      grid-template-columns: auto 1fr;
      &:before {
        content: '✓';
        margin-right: 1rem;
      }
    }
  }
  .annotation__list {
    list-style-type: none;
    padding-left: 20px;
    li {
      text-align: left;
      display: grid;
      grid-template-columns: auto 1fr;
      i {
        margin-right: 0.5rem;
        font-style: normal;
      }
    }
  }
  .no_annotation__list {
    li {
      text-align: left;
      .list__body {
        display: grid;
        grid-template-columns: auto 1fr;
        i {
          margin-right: 0.5rem;
          font-style: normal;
        }
      }
    }
  }
}
</style>