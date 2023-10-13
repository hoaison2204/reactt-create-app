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

    <div v-else-if="
      this.res.subscriptionServiceId === 1 &&
      (this.res.planStatus === 'プラン変更中' || this.res.planStatus === '有効')
    ">
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
        recoveryUrl: null,
        subscriptionServiceId: 1,
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
        // 未アクティベート状態であればTOPにリダイレクト
        if (
          this.res.subscriptionServiceId === 1 &&
          this.res.planStatus === "アクティベーション中"
        ) {
          this.$router.push("/mypage/netflix");
        }
        this.$loading.finishProcessing();
      } catch (error) {
      }
    } else {
    }
    this.$loading.finishProcessing();
  },
  computed: {},
  methods: {
    recovery() {
      const Url = this.res.recoveryUrl;
      window.open(Url, "_blank");
    },
  },
};
</script>
