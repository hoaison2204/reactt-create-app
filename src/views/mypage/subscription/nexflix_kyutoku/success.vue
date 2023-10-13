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

    <Success v-else
     :text="text" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      res: {
        subscriptionServiceId: 1,
      },
      familySerialNumber:'0',
      successFlag: Number,
      text: null,
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
          this.$router.push("/mypage/payroll/netflix");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
    }
     this.$loading.finishProcessing();

    this.successFlag = await this.$route.query.val;
    switch (this.successFlag) {
      case "1":
        this.text =
          "ご案内<br><br><br>Netflix解約のお手続きが完了しました。<br>ご利用ありがとうございました。<br><br>こちらの画面を閉じて終了して下さい。";
        break;
      case "2":
        this.text = "ご案内<br><br><br>メールアドレス変更のお手続きが完了しました。<br>こちらの画面を閉じて終了して下さい。";
        break;
      case "3":
        this.text = "ご案内<br><br><br>メール配信希望変更のお手続きが完了しました。<br>こちらの画面を閉じて終了して下さい。";
        break;
      default:
        this.text = "予期せぬエラー";
    }
  },
};
</script>
