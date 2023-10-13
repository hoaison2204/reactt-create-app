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


    <div v-else-if="
      this.res.subscriptionServiceId === 1 &&
      this.res.contractPlanId === 3 && 
      (this.res.planStatus === 'プラン変更中' || this.res.planStatus === '有効')"
    >
      <SubscriptionRecovery
        :recoveryUrl="res.recoveryUrl"
        title="Netflixアカウント確認"
        text="Netflixのアカウントを忘れた方はこちらから確認をお願いします。"
        buttonText="アカウント確認"
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
        recoveryUrl: null,
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
        this.$router.push('/mypage/kyutoku');
      }
      // 未アクティベート状態であればTOPにリダイレクト
      if (
        this.res.subscriptionServiceId === 1 &&
        this.res.planStatus === "アクティベーション中"
      ) {
        this.$router.push('/mypage/payroll/netflix');
      }
      // バンドル契約であれば、バンドル管理画面にリダイレクト
      if (this.res.contractPlanId === 1 || this.res.contractPlanId === 2 ) {
        this.$router.push('/mypage/netflix');
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
