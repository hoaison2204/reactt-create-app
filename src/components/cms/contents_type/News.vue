<template>
  <div class="News">
    <template v-if="view_type === 'newsMenu'">
      <div v-model="readNewsMenu" />
      <NewsMenu :cms_response="this.CMS_response" />
    </template>

    <template v-if="view_type === 'detail'">
      <NewsDetail
          @catchTitle="setTitle"
      />
    </template>
  </div>
</template>
<script>
import NewsMenu from "@/components/cms/view_type/NewsMenu.vue";
import NewsDetail from "@/components/cms/view_type/NewsDetail.vue";

export default {
  name: "News",
  props: {
    view_type: {
      type: String,
      default: "",
    },
  },
  components: {
    NewsMenu,
    NewsDetail,
  },

  data() {
    return {
      error: null,
      CMS_response: null,
    };
  },
  watch: {},
  computed: {
    async readNewsMenu() {
      const APIres = await this.$repositories("cms").getNewsMenu();
      if (APIres.isError) {
        this.error = '一覧の取得に失敗しました'
      }
      else {
        return this.setResponse(APIres);
      }
    }
  },
  methods: {
    setResponse(obj) {
      if (
          !obj ||
          !obj.data ||
          !obj.data.objects ||
          !obj.data.objects[0]
      ) {
        return
      }
      this.CMS_response = obj.data;
    },
    setTitle(title){
      this.$emit('catchTitle',title);
    },
  },
}
</script>