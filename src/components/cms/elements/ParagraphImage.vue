<template>
  <div class="paragraphImage" :class="this.field_image_margin">
    <template v-if="view_type === 'paragraphImage_carousel'">
      <div class="fieldImage__slider">
        <div class="fieldImage__sliderBody">
          <Carousel2
            :mergeOptions='({
              initialSlide: 2,
              slidesPerView: 1.3,
              spaceBetween: 12,
              loop: true,
              centeredSlides: true,
              autoplay: {
                delay: 6000,
              },
              pagination: {
                el: ".c-carousel__pagination",
                clickable: true
              },
              navigation: {
                nextEl: ".c-carousel__next",
                prevEl: ".c-carousel__prev"
              },
              breakpoints: {
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24
                }
              }
            })'
          >
            <swiper-slide
              v-for="item in images"
              :key="item.id"
            >
              <a :href="item.link">
                <img :src="item.src" :alt="item.alt">
              </a>
            </swiper-slide>
          </Carousel2>
        </div>
      </div>
    </template>

    <template v-else>
      <template v-if="images.length === 1">
        <div class="fieldImage">
          <a
            v-for="item in images"
            :key="item.id"
            :href="item.link"
          >
            <img :src="item.src" :alt="item.alt">
            <p v-if="item.text">{{ item.text }}</p>
          </a>
        </div>
      </template>

      <template v-else-if="images.length > 1">
        <div
          :class="imageColumn"
        >
          <a
            v-for="item in images"
            :key="item.id"
            :href="item.link"
            class="fieldImages_item"
          >
            <img :src="item.src" :alt="item.alt" />
            <span v-if="item.text">{{ item.text }}</span>
          </a>
        </div>
      </template>
    </template>
  </div>
</template>

<script>

export default {
  name: 'ParagraphImage',
  props: {
    view_type: {
      type: String,
      default: "",
    },
    cms_response: {
      type: Object,
      default: null
    },
  },

  data() {
    return {
      data : null,
      images: [],
      field_image_margin: ""
    }
  },
  watch:{},
  computed: {
    imageColumn() {
      return this.images.length <= 3 ? 'fieldImages fieldImages_three-col': 'fieldImages fieldImages_four-col';
    }
  },
  methods: {
    makeImages(obj) {
      this.images = [];
      const imagePaths = obj.data[0].attributes.nested_paragraph_data;
      this.field_image_margin = 'cms__blockContents-u_margin--' + obj.included[0].attributes.field_image_margin;
      imagePaths.forEach( (imagePath) => {
        imagePath.forEach( (item) => {
          this.images.push({
            "alt": item.field_image.alt,
            "src": process.env.VUE_APP_CMS_ASSET_DOMAIN + item.field_image.url,
            "link": item.field_image_link,
            "text": item.field_image_thumbnail_text
          })
        })
      });
    },
  },

  created() {
  },
  mounted() {
    this.data = this.$props.cms_response;
    this.makeImages(this.data);
  },
  updated() {
  },
  destroyed() {
  },

}
</script>

<style lang="scss" scoped>
.paragraphImage {
  .fieldImage {
    a {
      display: inline-block;
      margin: 5px;
    }
    p {
      text-align: left;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    @include mq() {
      img {
        max-width: 100%;
      }
    }
  }
  .fieldImages {
    display: grid;
    gap: 10px;
    place-items: start center;
    align-items: stretch;
    @include mq() {
      grid-template-columns: repeat(2, 1fr);
    }
    &.fieldImages_three-col {
      grid-template-columns: repeat( 3, 1fr);
      @include mq() {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    &.fieldImages_four-col {
      grid-template-columns: repeat( 4, 1fr);
      @include mq() {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .fieldImages_item {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      img {
        margin: 0 auto;
        max-width: 100%;
      }
      span {
        margin: 0.5rem 0;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
  .fieldImage__slider {
    .c-carousel {
      img {
        width: fit-content;
        max-width: 100%;
      }
    }
  }
}
</style>