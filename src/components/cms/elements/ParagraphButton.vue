<template>
  <div>
    <template v-if="button !== null ">
      <div class="paragraghButton" :class="[this.class.align , this.class.margin]">
        <template v-if="button.field_button_type === 'link'">
          <a :href="this.button.field_button_link.uri" class="paragraghButton__link" :class="'button_margin--'+this.button.field_button_margin">
            {{ this.button.field_button_link.title }}
          </a>
        </template>

        <template v-else-if="button.field_button_type === 'button'">
          <a :href="this.button.field_button_link.uri" class="paragraghButton__btn">
              <span>
                {{ this.button.field_button_link.title }}
              </span>
          </a>
        </template>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'ParagraphButton',
  props: {
    cms_response: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      data : null,
      button: {},
      class: {
        align: "",
        margin: "",
      },
    }
  },
  watch:{},
  computed: {
  },
  methods: {
    makeButton(obj) {
      this.button = obj.included[0].attributes;
    },
    objectClass() {
      this.class = {
        align: 'cms__blockContents-u_align--' + this.button.field_button_alignment,
        margin: 'cms__blockContents-u_margin--' + this.button.field_button_margin
      }
    }
  },

  created() {
  },
  mounted() {
    this.data = this.$props.cms_response;
    this.makeButton(this.data);
    this.objectClass();
  },
  updated() {
  },
  destroyed() {
  },

}
</script>

<style lang="scss" scoped>
.paragraghButton {
}
a.paragraghButton__btn {
  // 必要に応じてボタンデザイン
  //padding: 4px 8px;
  //background-color: #2c3e50;
  //border-radius: 6px;
  //text-decoration: none;
  //display: inline-block;
}
a.paragraghButton__link {
  // 必要に応じてリンクデザイン
  //padding: 4px 8px;
  //background-color: #2c3e50;
  //border-radius: 6px;
  //text-decoration: none;
  //display: inline-block;
}
</style>