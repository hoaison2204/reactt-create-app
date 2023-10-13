<template>
  <div class="paragraghHeading" :class="this.heading.heading_margin">
<!--    <div v-html="this.heading.heading_text" />-->
    <template v-if="this.heading.heading_type === 'h2'">
      <h2 v-text="this.heading.heading_text" />
    </template>
    <template v-else-if="this.heading.heading_type === 'h3'">
      <h3 v-text="this.heading.heading_text" />
    </template>
    <template v-else-if="this.heading.heading_type === 'h4'">
      <h4 v-text="this.heading.heading_text" />
    </template>
    <template v-else-if="this.heading.heading_type === 'h5'">
      <h5 v-text="this.heading.heading_text" />
    </template>
  </div>
</template>

<script>

export default {
  name: 'ParagraphHeading',
  props: {
    cms_response: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      data : null,
      heading: {},
    }
  },
  watch:{},
  computed: {
  },
  methods: {
    makeHeading(obj) {
      this.heading = {
        "heading_text": obj.included[0].attributes.field_heading_text,
        "heading_type": obj.included[0].attributes.field_heading_type,
        "heading_margin": 'cms__blockContents-u_margin--' + obj.included[0].attributes.field_heading_margin,
      }
    }
  },

  created() {
  },
  mounted() {
    this.data = this.$props.cms_response;
    this.makeHeading(this.data);
  },
  updated() {
  },
  destroyed() {
  },

}
</script>

<style lang="scss" scoped>
.paragraghHeading {
  h2 {
    margin: 64px 0 24px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2021;
    line-height: 1.5;
    position: relative;
    padding-left: 14px;
    &:before {
      content: "";
      border-left: 4px solid #da291c;
      border-radius: 4px;
      margin-right: 1.5rem;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      display: inline-block;
    }
    @include mq() {
      font-size: 1.25rem;
      &:before {
        margin-right: 1rem;
      }
    }
  }
  h3 {
    margin: 32px 0 16px;
    font-size: 1.25rem;
    font-weight: bold;
    color: #1F2021;
    line-height: 1.5;
    position: relative;
    padding-left: 24px;
    &:before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      content: "";
      display: inline-block;
      margin: auto;
      background-color: #DA291C;
      border-radius: 4px;
      width: 12px;
      height: 4px;
    }
    @include mq() {
      font-size: 1.125rem;
    }
  }
  h4 {
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.5;
    margin-bottom: 16px;
  }
  h5 {
    font-size: 0.88rem;
    font-weight: bold;
    line-height: 1.5;
    margin-bottom: 16px;
  }
}
</style>