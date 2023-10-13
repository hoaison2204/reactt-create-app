<template>
  <div class="specialPageColumn" v-model="dataMaker">
    <template v-if="data">
      <ul>
        <li
            v-for="item in column_data"
            :key="item.id"
        >
          <a
              :href="'/specialPage/detail?spid=' + item.alias"
          >
            <img
                :src="item.url"
                :alt="item.alt"
            />
            <p>{{ item.title }}</p>
          </a>
        </li>
      </ul>
    </template>
    <template v-else>
      <p>表示するデータがありません</p>
    </template>
  </div>
</template>

<script>

export default {
  name: 'SpecialPageColumn',
  props: {
    cms_response: {
      type: Object,
      default: null
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

  data() {
    return {
      data : null,
      column_data : [],
    }
  },
  watch:{},
  computed: {
    async dataMaker(){
      this.data = await this.$props.cms_response;
      this.makeColumnData(this.data);
    }
  },
  methods: {
    makeColumnData(obj) {
      if (
          !obj ||
          !obj.included
      ) {
        return;
      }
      this.column_data =[];

      const included = obj.included;
      const itemType = included.filter(el => el.type === "file--file");
      const special_categories = included.filter(el => el.type === "taxonomy_term--special_category");

      let catList = [];
      special_categories.forEach((category) => {
        catList.push({
          category_id: category.id,
          category_code: category.attributes.field_tag_code,
        });
      });

      if(itemType !== null) {
        const data = obj.data;
        let dataList = [];


        data.forEach((item) => {
          const imageSrc = included.find(el => el.id === item.relationships.field_banner.data.id)
          const category_data = item.relationships.special_category.data;

          let category_data_ids = [];
          category_data.forEach((category_data_id) => {
            const findName = catList.find(el => el.category_id === category_data_id.id);
            category_data_ids.push({
              data_category_id : category_data_id.id,
              data_category_code : findName.category_code,
            })
          });

          dataList.push({
            "title": item.attributes.display_title,
            "alias": item.attributes.alias,
            "alt": item.relationships.field_banner.data.meta.alt,
            "id": item.relationships.field_banner.data.id,
            "url": process.env.VUE_APP_CMS_ASSET_DOMAIN + imageSrc.attributes.uri.url,
            "filename": imageSrc.attributes.filename,
            "publish_location": item.attributes.publish_location,
            "special_category": category_data_ids,
          })
        });
        this.toMatchSpecial_category(dataList);
      }
    },
    toMatchSpecial_category(data) {
      const dataList = [];

      if(this.$props.special_category === "point") {
        data.forEach((catItem) => {
          catItem.special_category.forEach((item) => {
            if(item.data_category_code === "point"){
              dataList.push(catItem);
            }
          });
        });
        this.toMatchViewAreaData(dataList);
      }
      else if(this.$props.special_category === "relax_and_beauty"){
        data.forEach((catItem) => {
          catItem.special_category.forEach((item) => {
            if(item.data_category_code === "relax_and_beauty"){
              dataList.push(catItem);
            }
          });
        });
        this.toMatchViewAreaData(dataList);
      }
      else if(this.$props.special_category === null) {
        data.forEach((catItem) => {
          dataList.push(catItem);
        });
        this.toMatchViewAreaData(dataList);
      }
    },
    toMatchViewAreaData(data){
      if(this.$props.view_area === "top"){
        data.forEach((listItem) => {
          listItem.publish_location.forEach((item)=> {
            if(item === "Home"){
              this.column_data.push(listItem);
            }
          });
        });
      }
      else if(this.$props.view_area === "list"){
        data.forEach((listItem) => {
          listItem.publish_location.forEach((item)=> {
            if(item === "Listing"){
              this.column_data.push(listItem);
            }
          });
        });
      }
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
.specialPageColumn {
  ul {
    li {
      a {
        display: inline-block;
        text-decoration: none;
        color: #1f2021;
        &:hover{
          text-decoration: underline;
          img {
            opacity: 0.8;
          }
        }
      }
      img {
        width: 100%;
        height: auto;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>