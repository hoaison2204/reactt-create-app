<template>
  <div class="paragraghFullhtml" >
    <template v-if="this.fullHtml.js_code != null">
      <div v-html="this.fullHtml.value" />
      <div v-model="jsGen" />
    </template>
    <template v-else>
      <div v-html="this.fullHtml.value" />
    </template>
  </div>
</template>

<script>
export default {
  name: "ParagraphFullhtml",
  props: {
    cms_response: {
      type: Object,
      default: null,
    }
  },

  data() {
    return {
      data : null,
      fullHtml: {},
    }
  },
  watch: {},
  computed: {
    jsGen() {
      let str = this.fullHtml.js_code;
      let jqueryCode = new Function(str);
      setTimeout(function(){
        jqueryCode();
      },10);
    }
  },
  methods: {
    makeFullhtml(obj) {
      const dataId = obj.data[0].relationships.paragraphs.data[0].id;
      const includeData = obj.included.filter(
          (x) => x.id === dataId
      )
      const itemValue = includeData.find(el => el.type === 'paragraph--full_html');

      this.fullHtml = {
        "title": obj.data[0].attributes.title,
        "value": itemValue.attributes.field_fullhtml_text.value,
        "js_code": obj.data[0].attributes.js_code,
      };
    },
  },

  created() {
  },
  mounted() {
    this.data = this.$props.cms_response;
    this.makeFullhtml(this.data);
  },
  updated() {
  },
  destroyed() {
  },

}
</script>

<style lang="scss" scoped>
.paragraghFullhtml {
}
</style>