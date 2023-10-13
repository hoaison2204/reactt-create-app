<template>
  <div class="SpecialPage">
    <template v-if="view_type === 'detail'">
      <SpecialPageDetail
          @catchTitle="setTitle"
      />
    </template>

    <div v-else v-model="readcms">
      <template v-if="!this.CMS_response">
        <template v-if="error">
          <p class="cms__error">{{ error }}</p>
        </template>
      </template>

      <template v-if="this.CMS_response">
        <template v-if="view_type === 'carousel'">
          <SpecialPageCarousel
              :cms_response="this.CMS_response"
              :view_area="view_area"
              :special_category="special_category"
          />
        </template>

        <template v-else-if="view_type === 'column'">
          <SpecialPageColumn
              :cms_response="this.CMS_response"
              :view_area="view_area"
              :special_category="special_category"
          />
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import SpecialPageCarousel from "@/components/cms/view_type/SpecialPageCarousel";
import SpecialPageColumn from "@/components/cms/view_type/SpecialPageColumn";
import SpecialPageDetail from "@/components/cms/view_type/SpecialPageDetail.vue";

export default {
  name: "SpecialPage",
  props: {
    view_type: {
      type: String,
      default: "",
    },
    page_limit : {
      type: String,
      default: "",
    },
    view_area: {
      type: String,
      default: "",
    },
    special_category: {
      type: String,
      default: null,
    },
  },
  components: {
    SpecialPageColumn,
    SpecialPageCarousel,
    SpecialPageDetail,
  },

  data() {
    return {
      error: null,
      CMS_response: null,
    };
  },
  watch: {},
  computed: {
    async readcms() {
      const APIres = await this.$repositories("cms").getSpecialPage({
        pageLimit: this.$props.page_limit,
      });
      if (APIres.isError) {
        this.error = 'コンテンツの読み込みに失敗しました';
      }
      else {
        return this.setResponse(APIres);
      }
    },
  },
  methods: {
    setResponse(obj) {
      if (
          !obj ||
          !obj.data ||
          !obj.data.data ||
          !obj.data.data[0] ||
          !obj.data.included ||
          !obj.data.included[0]
      ) {
        return;
      }
      this.CMS_response = obj.data;
    },
    setTitle(title){
      this.$emit('catchTitle',title);
    },
  },
}
</script>