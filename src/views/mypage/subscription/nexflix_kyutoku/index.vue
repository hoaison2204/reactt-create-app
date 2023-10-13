<template>
  <section>
    <!--エラー-->
    <SubscriptionError v-if="
      res.apiResult === 'ERROR' || 
      res.subscriptionServiceId !== 1 ||
      res.contractPlanId == 1 ||
      res.contractPlanId == 2 || 
      familySerialNumber !=='0'"

      :resContractPlanId="res.contractPlanId"      
      :contractPlanId="3"
      :apiResult="res.apiResult"
      :subscriptionServiceId="res.subscriptionServiceId"
      :errorCode="res.errorCode"
      :familySerialNumber="familySerialNumber"
    />
    <!--エラー-->

    <!--未アクティブ-->
    <NetflixKyutokuInActive v-else-if="
      this.res.subscriptionServiceId === 1 &&
      this.res.contractPlanId === 3 &&
      ( this.res.planStatus === '申込完了前'||this.res.planStatus === '解約済み') "
      :res="res"
      :auth="auth"
    />
    <!--未アクティブ-->

    <!--アクティベーション中-->
    <NetflixKyutokuActiveContinue v-else-if="
      this.res.subscriptionServiceId === 1 &&
      this.res.contractPlanId === 3 &&
      this.res.planStatus === 'アクティベーション中'"
      :res="res"
      title="Netflix 視聴開始のご案内"
      lead="以下よりNetflix視聴が可能となります。"
      buttonText="Netflix視聴開始"
    />
    <!--アクティベーション中-->

    <!--アクティブ-->
    <NetflixKyutokuActive v-else-if="
      this.res.subscriptionServiceId === 1 &&
      this.res.contractPlanId === 3 && 
      (this.res.planStatus === 'プラン変更中'|| this.res.planStatus === '有効')"
      :res="res"
    />
    <!--アクティブ-->
  </section>
</template>
<script>
export default {
  meta: {
    page: {
      name: "Netflix",
    },
  },
  data() {
    return {
      res: {
        subscriptionServiceId: 1,
        planStatus: null
      },
      auth:null,
      familySerialNumber:'0'
    };
  },
  async mounted() {
    this.$loading.startProcessing();
    this.$page.showSideMenu = false;
    this.$page.isPageHeader = false;

    //BPFお客様番号取得
    this.auth = await this.$store.getters["auth/get"];

    //userSession呼び出し
    const codes = await this.getFromSiteCode();
    this.familySerialNumber = await codes.familySerialNumber;

    //familySerialNumberが"0"であればNetflixAPI呼び出し
    if (this.familySerialNumber == "0") {

    try {
      const response = await this.$repositories("mypage").getNetflix();
      this.res = response.data;
    } catch (error) {
      console.error(error);
    }
    } else {
    }
    this.$loading.finishProcessing();
  }, 
};
</script>
