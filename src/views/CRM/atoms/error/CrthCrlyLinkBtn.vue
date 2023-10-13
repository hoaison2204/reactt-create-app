<!-- リンクボタン -->
<template>
  <button
    class="crth-crly-a-error-link-btn"
    @click="goToLink"
  >
    <span>{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: "CrthCrlyAtomsErrorLinkBtn",
  props: {
    label: {
      type: String,
      default: ""
    },
    linkPath: {
      type: String,
      default: ""
    },
    boCode: {
      type: String,
      default: ""
    }
  },
  methods: {
    goToLink() {
      this.toTopTarget(this.boCode, this.linkPath);
    },
    
    /**
     * 指定サイトの TOP のターゲット画面に遷移
     * @param {string} boCode サイトコード
     * @param {string} path 遷移先のパス
     */
    toTopTarget(boCode, path){
      const mappingArr = this.getMapping(process.env.VUE_APP_TOP_DOMAIN_AND_CODE_MAPPING);
      let selected = mappingArr.find(map => map.mypageDisplayCode === boCode);

      console.log("selected.url",selected.url);
      console.log("path",path);
      window.location.href = selected.url + path;
    },
    getMapping(urlandCodeMapping) {
      if (!urlandCodeMapping) {
        throw new Error(`env variable is not setted`);
      }

      return urlandCodeMapping.split(";").map(map => {
          const arr = map.split(",");
          if (arr.length != 2) {
              return {
                  mypageDisplayCode: null,
                  url: null
              }
          }
          return {
              mypageDisplayCode: arr[1],
              url: arr[0],
          }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/error/linkBtn.scss";
</style>
