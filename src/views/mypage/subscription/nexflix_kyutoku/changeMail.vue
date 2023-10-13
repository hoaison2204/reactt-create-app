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


    <div class="main" v-else-if="
      this.res.subscriptionServiceId === 1 &&
      this.res.contractPlanId === 3 && 
      (this.res.planStatus === 'プラン変更中'|| this.res.planStatus === '有効')">

      <ChangeMail 
        :subscriptionServiceId="res.subscriptionServiceId"
        :registaddress="res.personalMailAddress"
        title="登録メールアドレス変更画面"
      />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      res: {
        subscriptionServiceId: 1,
        email: null
      },
      familySerialNumber:'0'
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
      // 未アクティベート状態であればTOPにリダイレクト      
      if(this.res.subscriptionServiceId === 1 && 
        (this.res.planStatus === 'アクティベーション中' ||
         this.res.planStatus === '申込完了前'  ||
         this.res.planStatus === '解約済み'  
        )
        ){
        this.$router.push('/mypage/payroll/netflix');
      }
    } catch (error) {
      console.error(error);
    }
    } else {
    }
    this.$loading.finishProcessing();
  },
};
</script>


