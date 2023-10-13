<template>
  <div class="otherPageDetail" v-model="readcms">
    <template v-if="this.js_code != null">
      <div v-html="this.fullHtml" />
      <div v-model="jsGen" />
    </template>
    <template v-else>
      <div v-html="this.fullHtml" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'OtherPageDetail',
  props: {
    cms_response: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      error: null,
      other_id: "",
      title: "",
      fullHtml: "",
      js_code: "",
    }
  },
  watch:{},
  computed: {
    async readcms(){
      this.other_id = this.$route.query.other_id
      const APIres = await this.$repositories("cms").getOtherPage({
        other_id: this.other_id
      });
      if (APIres.isError) {
        this.error = 'コンテンツの読み込みに失敗しました';
      }
      else  {
        return this.setData(APIres);
      }
    },
    jsGen() {
      let str = this.js_code;
      let jqueryCode = new Function(str);
      setTimeout(function (){
        jqueryCode();
      },10);
    }
  },
  methods: {
    setData(obj) {
      if (
          !obj ||
          !obj.data ||
          !obj.data.data ||
          !obj.data.data[0] ||
          !obj.data.included ||
          !obj.data.included[0] ||
          obj.data.data.length >= 2
      ) {
        return
      }
      this.title = obj.data.data[0].attributes.display_title;
      this.$emit('catchTitle',this.title);
      this.js_code = obj.data.data[0].attributes.js_code;

      const itemValue = obj.data.included.find(el => el.type === 'paragraph--full_html');
      if(!itemValue) {
        return this.error = 'コンテンツの読み込みに失敗しました'
      }
      this.fullHtml = itemValue.attributes.field_fullhtml_text.value;
    },
  },
  created() {
  },
  mounted() {
  },
  updated() {
  },
  destroyed() {
  },
}
</script>

<style lang="scss" scoped>
</style>