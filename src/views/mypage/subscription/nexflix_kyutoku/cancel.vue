<template>
  <section>
    <!--エラー-->
    <SubscriptionError v-if="
      res.apiResult === 'ERROR' || 
      res.subscriptionServiceId !== 1 ||
      res.contractPlanId == 1 ||
      res.contractPlanId == 2 || 
      familySerialNumber !=='0' ||
      isLinkEnabled == false"

      :resContractPlanId="res.contractPlanId"      
      :contractPlanId="3"
      :apiResult="res.apiResult"
      :subscriptionServiceId="res.subscriptionServiceId"
      :errorCode="res.errorCode"
      :familySerialNumber="familySerialNumber"
      :isLinkEnabled="isLinkEnabled"
    />
    <!--エラー--> 



    <div class="main" v-else-if="
      this.res.subscriptionServiceId === 1 &&
      this.res.contractPlanId === 3 && 
      (this.res.planStatus === 'プラン変更中'|| this.res.planStatus === '有効')">

      <SubscriptionCancel 
        :subscriptionServiceId="res.subscriptionServiceId"
        title="Netflixアカウント確認"
        text="こちらのボタンでお手続きが完了いたします。<br />
        改めてご確認の上、解約のお申込をお願いいたします。<br />
        <br />
        最終のお支払いは、解約前日までの日割り計算を行い給与控除いたします。"
        buttonText="Netflix給トク払いを解約する"
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
      },
      isLinkEnabled:true,
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

      // 契約開始から1ヶ月間はエラーに遷移させる
      const now = this.$moment();
      // 契約開始日時
      const contractStart = this.$moment(this.res.activationDate, "YYYY/MM/DD HH:mm:ss.SSS");
      // 契約開始から1ヶ月後の日時を取得
      const oneMonthLater = contractStart.clone().add(1, "month");
      // 契約開始から1ヶ月
      if (now.isAfter(oneMonthLater)) {
        this.isLinkEnabled = true;
      } else {
        this.isLinkEnabled = false;
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


