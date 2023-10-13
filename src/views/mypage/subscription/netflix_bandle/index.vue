<template>
  <section>
    <!--エラー-->
    <SubscriptionError v-if="
      res.apiResult === 'ERROR' ||
      res.subscriptionServiceId !== 1 ||
      res.planStatus == '申込完了前' ||
      res.planStatus == '解約済み' ||
      res.contractPlanId == 3 ||
      familySerialNumber !=='0' ||
      res.contractAddressFlag == false"

      :resContractPlanId="res.contractPlanId"      
      :contractPlanId="1"
      :apiResult="res.apiResult"
      :subscriptionServiceId="res.subscriptionServiceId"
      :planStatus="res.planStatus"
      :errorCode="res.errorCode"
      :familySerialNumber="familySerialNumber"
      :contractAddressFlag="res.contractAddressFlag"
    />
    <!--エラー-->
    
    <!--未アクティブ-->
    <NetflixInActive v-else-if="
     this.res.subscriptionServiceId === 1 && 
     this.res.planStatus === 'アクティベーション中' "
     :res="res"
    />
    <!--未アクティブ-->

    <!--アクティブ-->
    <NetflixActive v-else-if="
     this.res.subscriptionServiceId === 1 &&
     (this.res.planStatus === 'プラン変更中' || this.res.planStatus === '有効')"
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
        planStatus: null,
        contractPlanId: null
      },
      familySerialNumber: "0",
      errorText: "",
    };
  },
  async mounted() {
    this.$loading.startProcessing();
    this.$page.showSideMenu = false;
    this.$page.isPageHeader = false;

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