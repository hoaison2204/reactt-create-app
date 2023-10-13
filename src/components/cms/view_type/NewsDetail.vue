<template>
  <div class="NewsDetail" v-model="readcms">
    <template v-if="newsItem">
      <header class="newsDetail__head">
        <div class="tags">
          <div class="tags__left">
            <span
                v-if="newsItem.pub_date"
                class="date"
            >
              {{ $moment(newsItem.pub_date).format("YYYY年MM月DD日") }}
            </span>
            <span
                v-if="newsItem.name"
                class="tag"
            >
              {{ newsItem.name }}
            </span>
          </div>
          <p
              v-if="newsItem.release_company"
              class="company"
          >
            {{ newsItem.release_company }}
          </p>
        </div>

        <h2
            v-if="newsItem.display_title"
            class="title"
        >
          {{ newsItem.display_title }}
        </h2>
      </header>

      <article>
        <div
            v-for="(item, i) in newsItem.bodyText"
            :key="i"
        >
          <div v-html="item" />
        </div>
      </article>
    </template>
    <template v-else-if="!newsItem">
      <p>お知らせを読み込めませんでした。</p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NewsDetail',
  props: {
    cms_response: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      error: null,
      newsItem: {},
      title: "",
    }
  },
  watch:{},
  computed: {
    async readcms(){
      const APIres = await this.$repositories("cms").getNewsId(
        this.$route.params.id
      );
      if (APIres.isError) {
        this.error = 'コンテンツの読み込みに失敗しました';
      }
      else  {
        return this.setData(APIres);
      }
    }
  },
  methods: {
    setData(obj) {
      const response = obj.data.detail.body;
      let object = {};
      if (response.data !=null) {
        response.data.forEach((item) => {
          object.pub_date = item.attributes.pub_date;
          object.release_company = item.attributes.release_company;
          object.display_title = item.attributes.display_title;
        });
      }
      if (response.included != null) {
        const newsType = response.included.filter(
            (x) => x.type === "taxonomy_term--news_type"
        );
        const textData = response.included.filter(
            (x) =>
                x.type === "paragraph--text" || x.type === "paragraph--full_html"
        );
        object.name = newsType[0].attributes.name;
        textData.map((x) => {
          let text = ``;
          if (x.type === "paragraph--text") {
            text = textData[0].attributes.field_text_data.value;
          } else if (x.type === "paragraph--full_html") {
            text = textData[0].attributes.field_fullhtml_text.processed;
          }
          object.bodyText = [text];
        });
      }
      else {
        this.$loading.finishProcessing();
        return this.newsItem = false;
      }
      this.newsItem = object;

      // 取得したデータの中身が空配列の場合
      if (Object.keys(this.newsItem).length === 0) {
        this.newsItem({});
        this.$loading.finishProcessing();
        return;
      }
      this.$emit('catchTitle',this.newsItem.display_title);
      this.$loading.finishProcessing();
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
$CoolBlack: #1f2021;
$CoolGray4: #dcdee0;
.NewsDetail {
  .newsDetail__head {
    border-bottom: 1px solid $CoolGray4;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    .tags {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 1rem;
      @include mq() {
        display: block;
        margin-bottom: 0.625rem;
      }
      .tags__left {
        display: flex;
        flex-wrap: wrap;
        @include mq() {
          margin-bottom: 0.5rem;
        }
        .date {
          font-size: 0.75rem;
          margin-right: 0.5rem;
          height: 1.3rem;
          text-align: center;
          word-break: keep-all;
          line-height: 150%;
          padding: 0.125rem 0;
        }
        .tag {
          color: $CoolBlack;
          font-size: 0.625rem;
          line-height: 1.2;
          background-color: #eaeaea;
          margin-right: 0.5rem;
          padding: 0.38rem 0.5rem;
          border-radius: 2px;
          height: 1.5rem;
          text-align: center;
        }
      }
      .company {
        font-size: 0.75rem;
        line-height: 1.5;
      }
    }
    .title {
      font-size: 1.124rem;
      line-height: 1.3;
      font-weight: 700;
      @include mq() {
        font-size: 1.125rem;
      }
    }
  }
}
</style>