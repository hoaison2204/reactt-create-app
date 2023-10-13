<template>
  <div class="paragraphImageText" :class="this.field_imagetext_margin">
    <div
        v-if="field_imagetext_format === 'vertical'"
        class="imageText__wrap--vertical"
    >
      <div
          v-for="item in field_imagetexts"
          :key="item.id"
          :class=
              "
              item.imagetext_type === 'simage_left_text_right'
              || item.imagetext_type === 'text_left_simage_right'
              ? 'imageText--s'
              : 'imageText'"
      >
        <template v-if="item.imagetext_type === 'image_left_text_right'">
          <a
              :href="item.link"
              target="_blank"
              class="imageText__link--image-text"
          >
            <div class="fieldImageTexts__image">
              <img :src="item.src" :alt="item.alt">
            </div>
            <div class="fieldImageTexts__title">{{ item.imagetext_title }}</div>
            <div class="fieldImageTexts__body" v-html="item.imagetext_html"/>
          </a>
        </template>

        <template v-else-if="item.imagetext_type === 'text_left_image_right'">
          <a
              :href="item.link"
              target="_blank"
              class="imageText__link--text-image"
          >
            <div class="fieldImageTexts__title">{{ item.imagetext_title }}</div>
            <div class="fieldImageTexts__body" v-html="item.imagetext_html"/>
            <div class="fieldImageTexts__image">
              <img :src="item.src" :alt="item.alt">
            </div>
          </a>
        </template>

        <template v-else-if="item.imagetext_type === 'simage_left_text_right'">
          <a
              :href="item.link"
              target="_blank"
              class="imageText__link--imageS-text"
          >
            <div class="fieldImageTexts__image--s">
              <img :src="item.src" :alt="item.alt">
            </div>
            <div class="fieldImageTexts__title">{{ item.imagetext_title }}</div>
            <div class="fieldImageTexts__body" v-html="item.imagetext_html"/>
          </a>
        </template>

        <template v-else-if="item.imagetext_type === 'text_left_simage_right'">
          <a
              :href="item.link"
              target="_blank"
              class="imageText__link--text-imageS"
          >
            <div class="fieldImageTexts__title">{{ item.imagetext_title }}</div>
            <div class="fieldImageTexts__body" v-html="item.imagetext_html"/>
            <div class="fieldImageTexts__image--s">
              <img :src="item.src" :alt="item.alt">
            </div>
          </a>
        </template>
      </div>
    </div>

    <div
        v-else-if="field_imagetext_format === 'horizontal'"
        class="imageText__wrap--horizontal"
    >
      <div
          v-for="item in field_imagetexts"
          :key="item.id"
          :class=
              "
              item.imagetext_type === 'simage_left_text_right'
              || item.imagetext_type === 'text_left_simage_right'
              ? 'imageText--s'
              : 'imageText'"
      >
        <template v-if="item.imagetext_type === 'image_left_text_right'">
          <a
              :href="item.link"
              target="_blank"
              class="imageText__link--image-text"
          >
            <div class="fieldImageTexts__image">
              <img :src="item.src" :alt="item.alt">
            </div>
            <div>
              <div class="fieldImageTexts__title">{{ item.imagetext_title }}</div>
              <div class="fieldImageTexts__body" v-html="item.imagetext_html"/>
            </div>
          </a>
        </template>

        <template v-else-if="item.imagetext_type === 'text_left_image_right'">
          <a
              :href="item.link"
              target="_blank"
              class="imageText__link--text-image"
          >
            <div>
              <div class="fieldImageTexts__title">{{ item.imagetext_title }}</div>
              <div class="fieldImageTexts__body" v-html="item.imagetext_html"/>
            </div>
            <div class="fieldImageTexts__image">
              <img :src="item.src" :alt="item.alt">
            </div>
          </a>
        </template>

        <template v-else-if="item.imagetext_type === 'simage_left_text_right'">
          <a
              :href="item.link"
              target="_blank"
              class="imageText__link--imageS-text"
          >
            <div class="fieldImageTexts__image">
              <img :src="item.src" :alt="item.alt">
            </div>
            <div>
              <div class="fieldImageTexts__title">{{ item.imagetext_title }}</div>
              <div class="fieldImageTexts__body" v-html="item.imagetext_html"/>
            </div>
          </a>
        </template>

        <template v-else-if="item.imagetext_type === 'text_left_simage_right'">
          <a
              :href="item.link"
              target="_blank"
              class="imageText__link--text-imageS"
          >
            <div>
              <div class="fieldImageTexts__title">{{ item.imagetext_title }}</div>
              <div class="fieldImageTexts__body" v-html="item.imagetext_html"/>
            </div>
            <div class="fieldImageTexts__image">
              <img :src="item.src" :alt="item.alt">
            </div>
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ParagraphImageText',
  props: {
    cms_response: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      data : null,
      field_imagetext_margin: "",
      field_imagetext_format: "",
      field_imagetexts: [],
    }
  },
  watch:{},
  computed: {
  },
  methods: {
    makeImageText(obj) {
      this.field_imagetext_format = obj.included[0].attributes.field_imagetext_format;
      this.field_imagetext_margin = 'blockContents-u_margin--' + obj.included[0].attributes.field_imagetext_margin;
      this.field_imagetexts = [];
      const imagePaths = obj.data[0].attributes.nested_paragraph_data;
      imagePaths.forEach( (imagePath) => {
        imagePath.forEach( (item) => {
          this.field_imagetexts.push({
            "alt": item.field_imagetext_image.alt,
            "src": process.env.VUE_APP_CMS_ASSET_DOMAIN + item.field_imagetext_image.url,
            "link": item.field_imagetext_link,
            "imagetext_type": item.field_imagetext_type,
            "imagetext_title": item.field_imagetext_text,
            "imagetext_html": item.field_imagetext_textarea,
          })
        })
      })
    }
  },

  created() {
  },
  mounted() {
    this.data = this.$props.cms_response;
    this.makeImageText(this.data);
  },
  updated() {
  },
  destroyed() {
  },

}
</script>

<style lang="scss" scoped>
.paragraphImageText {
  a {
    text-decoration: none;
    color: #2c3e50;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .imageText__wrap--vertical {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .imageText {
      width: 48%;
      margin: 1%;
    }
    .imageText--s {
      width: 23%;
      margin: 1%;
    }
    .imageText__link--image-text,
    .imageText__link--image-textS {
      display: grid;
      grid-template-rows: 1fr auto auto;
    }
    .imageText__link--text-image,
    .imageText__link--text-imageS {
      display: grid;
      grid-template-rows: auto auto 1fr;
    }
    .fieldImageTexts__image {
      height: 40vw;
    }
    .fieldImageTexts__image--s {
      height: 30vw;
    }
  }

  .imageText__wrap--horizontal {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    .imageText__link--image-text {
      display: grid;
      gap: 10px;
      grid-template-columns: 1fr 3fr;
    }
    .imageText__link--text-image {
      display: grid;
      gap: 10px;
      grid-template-columns: 3fr 1fr;
    }
    .imageText__link--imageS-text {
      display: grid;
      gap: 10px;
      grid-template-columns: 1fr 4.5fr;
    }
    .imageText__link--text-imageS {
      display: grid;
      gap: 10px;
      grid-template-columns: 4.5fr 1fr;
    }
  }
  .fieldImageTexts__title {
    text-align: left;
  }
  .fieldImageTexts__body {
    text-align: left;
  }
  @include mq() {
  }
}
</style>