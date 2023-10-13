<template>
  <div class="specialPageCarousel" v-model="dataMaker">
    <template v-if="carousel_data.length < 4">
      <div class="specialPageCarousel__flexImg">
        <ul class="specialPageCarousel__flexImg__list">
          <li class="specialPageCarousel__flexImg__list__item"
              v-for="item in carousel_data"
              :key="item.id"
          >
            <a :href="'/specialPage/detail?spid=' + item.alias" >
              <img
                  :src="item.url"
                  :alt="item.alt"
              />
            </a>
          </li>
        </ul>
      </div>
    </template>

    <template v-else-if="carousel_data.length > 3">
      <div class="specialPageCarousel__slider">
        <div class="specialPageCarousel__sliderBody">
          <Carousel2>
            <swiper-slide
                v-for="item in carousel_data"
                :key="item.id"
            >
              <a
                  :href="'/specialPage/detail?spid=' + item.alias"
              >
                <img
                    :src="item.url"
                    :alt="item.alt"
                />
              </a>
            </swiper-slide>
          </Carousel2>
        </div>
      </div>

      <div class="specialPageCarousel__more">
        <TextButton
            to="/specialPage"
            position="right"
        >
          もっと見る<Icon
            name="arrow_right"
            :color="$colors.brand.red" />
        </TextButton>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'SpecialPageCarousel',
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
      carousel_data : [],
    }
  },
  watch:{},
  computed: {
    async dataMaker(){
      this.data = await this.$props.cms_response;
      this.makeCarouselData(this.data);
    }
  },
  methods: {
    makeCarouselData(obj) {
      if (
          !obj ||
          !obj.included
      ) {
        return;
      }
      this.carousel_data =[];

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
          const imageSrc = included.find(el => el.id === item.relationships.field_banner.data.id);
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
            "title": item.attributes.title,
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
              this.carousel_data.push(listItem);
            }
          });
        });
      }
      else if(this.$props.view_area === "list"){
        data.forEach((listItem) => {
          listItem.publish_location.forEach((item)=> {
            if(item === "Listing"){
              this.carousel_data.push(listItem);
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
.specialPageCarousel {
  margin-bottom: 3rem;
}
.specialPageCarousel__flexImg {
  text-align: center;
  .specialPageCarousel__flexImg__list {
    display: flex;
    flex-flow: nowrap;
    gap: 10px;
  }
  .specialPageCarousel__flexImg__list__item {
    width: calc(100% / 3 - 10px);
    a {
      display: block;
    }
    img {
      object-fit: contain;
      width: 100%;
      max-width: max-content;
      height: auto;
    }
  }
  @include mq() {
    max-width: max-content;
    width: 100%;
  }
}

.specialPageCarousel__sliderBody {
  position: relative;
  margin-bottom: 1rem;
  @include mq() {
    width: calc(100% + 2rem);
    margin-left: -1rem;
  }
  .swiper-container {
    width: 100% !important;
  }
}
.specialPageCarousel__sliderInner {
  width: 100%;
  padding-bottom: 2rem;
  img {
    width: 100%;
    height: auto;
  }
  a {
    &:hover {
      img {
        opacity: 0.8;
      }
    }
  }
}
.specialPageCarousel__more {
  text-align: right;
  font-size: 0.875rem;
}
</style>