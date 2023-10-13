<!-- ログイン コンテンツ -->
<template>
  <section class="crth-o-login-contents">
    <div class="crth-o-login-contents__message">
      <label>とく放題をお申し込みされたサービスでのログイン方法をお選びください。</label>
    </div>
    <div class="crth-o-login-contents__plan">
      <!-- プランM -->
      <OrganismsCrthPlanM class="rightSp" />
      <!-- プランB -->
      <OrganismsCrthPlanB class="leftSp" />
    </div>
    <div class="crth-o-login-contents__link">
      <div class="text">
        <p>
          <span class="sp">■</span>ログイン方法でお困りの方は
          <a :href="changeURL('/howTo')">
            こちら
          </a>
        </p>
        <p>
          <span class="sp">■</span>新規登録をご希望の方は
          <router-link :to="changeURL('/newRegistration')">
            こちら
          </router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import OrganismsCrthPlanM from "@/views/CRM/organisms/CrthPlanM.vue";
import OrganismsCrthPlanB from "@/views/CRM/organisms/CrthPlanB.vue";

export default {
  name: "OrganismsCrthContents",
  components: {
    OrganismsCrthPlanM,
    OrganismsCrthPlanB
  },
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    changeURL(url) {
      const mappingArr = this.getMapping(process.env.VUE_APP_TOP_DOMAIN_AND_CODE_MAPPING);
      let domain = mappingArr.find(map => map.mypageDisplayCode === 'TH');
      return domain.url + url;
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
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/contents.scss";
</style>
