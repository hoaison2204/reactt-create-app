<template>
  <div class="specialPageDetail" v-model="readcms">
    <template v-if="this.error != null ">
      <div class="error">
        <strong>{{ this.error }}</strong>
      </div>
    </template>
    <template v-else>
      <template v-if="this.js_code != null">
        <div v-html="this.fullHtml" />
        <div v-model="jsGen" />
      </template>
      <template v-else>
        <div v-html="this.fullHtml" />
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SpecialPageDetail',
  props: {
    cms_response: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      error: null,
      sp_id: "",
      title: "",
      fullHtml: "",
      js_code: "",
    }
  },
  watch:{},
  computed: {
    async readcms(){
      this.sp_id = this.$route.query.spid
      const APIres = await this.$repositories("cms").getSpecialPageDetail({
        sp_id: this.sp_id
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
        return this.error = 'ご選択いただいたページは現在存在しないか、ご利用いただけません。'
      }
      this.title = obj.data.data[0].attributes.display_title;
      this.$emit('catchTitle',this.title);
      this.js_code = obj.data.data[0].attributes.js_code;
      const dataId = obj.data.data[0].relationships.paragraphs.data[0].id;
      const includeData = obj.data.included.filter(
          (x) => x.id === dataId
      )

      const itemValue = includeData.find(el => el.type === 'paragraph--full_html');

      if(!itemValue) {
        return this.error = 'ご選択いただいたページは現在存在しないか、ご利用いただけません。'
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
.error {
  margin: 200px auto;
  text-align: center;
}
</style>