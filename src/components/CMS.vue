<template>
  <div class="cms">
    <template v-if="contents_type === 'block_contents'">
      <BlockContents
          :location_code="location_code"
          :view_type="view_type"
      />
    </template>

    <template v-if="contents_type === 'special_page'">
      <SpecialPage
          :view_type="view_type"
          :page_limit="page_limit"
          :view_area="view_area"
          :special_category="special_category"
          @catchTitle="setTitle"
      />
    </template>

    <template v-if="contents_type === 'other_page'">
      <OtherPage
        :view_type="view_type"
        @catchTitle="setTitle"
      />
    </template>

    <template v-if="contents_type === 'header_footer'">
      <HeaderFooter
          :view_area="view_area"
      />
    </template>

    <template v-if="contents_type === 'news'">
      <template v-if="view_type === 'TopNewsImportant'">
        <TopNewsImportant
            :item_list="item_list"
        />
      </template>
      <template v-if="view_type === 'TopNewsNormal'">
        <TopNewsNormal
            :item_list="item_list"
        />
      </template>
      <template v-if="view_type === 'NewsList'">
        <NewsList
          :item_list="item_list"
        />
      </template>
      <template v-else>
        <News
          :view_type="view_type"
          @catchTitle="setTitle"
        />
      </template>
    </template>

  </div>
</template>

<script>
import "@/components/cms/css/cms-utility.scss";
import BlockContents from "@/components/cms/contents_type/BlockContents";
import HeaderFooter from "@/components/cms/contents_type/HeaderFooter";
import SpecialPage from "@/components/cms/contents_type/SpecialPage";
import OtherPage from "@/components/cms/contents_type/OtherPage.vue";
import TopNewsImportant from "@/components/cms/view_type/TopNewsImportant.vue";
import TopNewsNormal from "@/components/cms/view_type/TopNewsNormal.vue";
import NewsList from "@/components/cms/view_type/NewsList.vue";
import News from "@/components/cms/contents_type/News.vue";

export default {
  name: 'CMS',
  props: {
    contents_type: {
      type: String,
      default: "",
    },
    location_code: {
      type: String,
      default: null,
    },
    view_type: {
      type: String,
      default: null,
    },
    view_area: {
      type: String,
      default: null,
    },
    page_limit: {
      type: String,
      default: "",
    },
    item_list: {
      type: Array,
    },
    special_category: {
      type: String,
      default: null,
    }
  },
  components: {
    BlockContents,
    HeaderFooter,
    SpecialPage,
    OtherPage,
    TopNewsImportant,
    TopNewsNormal,
    NewsList,
    News,
  },

  data() {
    return {
    }
  },
  watch:{},
  computed: {},
  methods: {
    setTitle(title){
      this.$emit('catchTitle',title);
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

<style lang="scss">
</style>