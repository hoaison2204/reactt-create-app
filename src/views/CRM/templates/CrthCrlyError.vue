<!-- とく放題／ライフエール　エラーメッセージ画面 -->
<template>
  <div>
    <div v-if="errorType=='notMember'">
      <CrthCrlyOrganismsErrorNotMember :boCode="boCode" />
    </div>
    <div v-else>
      <CrthCrlyOrganismsErrorLineBusy :boCode="boCode" />
    </div>
  </div>
</template>

<script>
import CrthCrlyOrganismsErrorNotMember from "@/views/CRM/organisms/error/CrthCrlyNotMember.vue";
import CrthCrlyOrganismsErrorLineBusy from "@/views/CRM/organisms/error/CrthCrlyLineBusy.vue";

export default {
  name: "CrthCrlyError",
  components: {
    CrthCrlyOrganismsErrorNotMember,
    CrthCrlyOrganismsErrorLineBusy
  },
  props: {
    errorType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      boCode: ""
    }
  },
  mounted() {
    this.$auth.remove;
    this.$page.isBreadcrumb = false;
    this.$page.isPageHeader = false;
    this.$page.isPageTop = false;
    this.$page.isSubHeader = false;
    this.$page.showFooterMenu = true;

    this.getBoCode();

  },
  methods: {
    getBoCode() {
      this.boCode = this.getMypageDisplayCode(location.origin);
    }
  },
};
</script>
