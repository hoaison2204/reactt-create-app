<template>
  <section>
    <div class="subscription-error">
      <p v-html="errorText"></p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      familySerialNumberError: `会員様ご本人のベネアカウントのみが対象となります。`,
      subscriptionServiceIdError: `現在の契約ではご利用いただけません。
     ※ご所属企業・団体においてNetflixプラン・Netflix得々プラン​または給トク払いのご加入が必要となります。<br><br>
     ＜企業・団体の福利厚生ご担当者様へ＞<br>Netflixプラン・Netflix得々プラン導入のご検討に際しては、こちらの詳細ページをご覧ください。<br>
     <a href="https://pr.benefit-one.co.jp/bs/netflix/">https://pr.benefit-one.co.jp/bs/netflix/</a><br>
     「給トク払い」導入のご検討に際してはこちらの詳細ページをご覧ください。<br>
     <a href="https://corp.benefit-one.co.jp/service/kyuutoku/">https://corp.benefit-one.co.jp/service/kyuutoku/</a>`,
      sspfError: `エラーコード：${this.errorCode}<br>
      以下よりお問い合わせください。
      お問合せ内容には本画面で表示されているエラーコードもご記入ください。
      <a href="https://bs.benefit-one.co.jp/contents/cgi/memberfaq/">https://bs.benefit-one.co.jp/contents/cgi/memberfaq/</a>`,
      contractAddressError: `Netflix視聴に必要な事前登録が完了していません。
      お勤め先の福利厚生ご担当者様へお問い合せください。`,
      ContractPlanIdErrorKyutoku: `お客様のお勤め先のご契約は「給トク払いご契約」となっておりますので
      こちらのNetflixプランは対象外となります。<br><br>
      以下、「Netflix給トク払い」のご利用が可能となりますので<br>詳細はこちらからご確認ください。<br><br>
      <a href="https://bs.benefit-one.inc/otherPage?other_id=netflix_payroll_deduction">https://bs.benefit-one.inc/otherPage?other_id=netflix_payroll_deduction</a>`,
      activationError: `現在の契約ではご利用いただけません。
      ※ご所属企業・団体においてNetflixプラン・Netflix得々プランのご加入が必要となります。<br>
      ＜企業・団体の福利厚生ご担当者様へ＞
      Netflixプラン・Netflix得々プラン導入のご検討に際しては、こちらの詳細ページをご覧ください。
      <a href="https://pr.benefit-one.co.jp/bs/netflix/">https://pr.benefit-one.co.jp/bs/netflix/</a><br>
      給トク払い導入のご検討に際しては<br>こちらの詳細ページをご覧ください。
      <a href="https://corp.benefit-one.co.jp/service/kyuutoku/">https://corp.benefit-one.co.jp/service/kyuutoku/</a>`,
      cancelError: `初回お申込から1か月間は途中解約ができません。`,
      ContractPlanIdErrorBandle: `お客様は、お勤め先の福利厚生による「Netflix福利厚生セットプラン」にご加入されているため、よりお得なご利用が可能となります。
      以下、リンク先よりお申込いただけますのでご確認下さい。<br>
      <button onclick="location.href='/mypage/netflix'" type="button">Netflixプラン
      アカウント管理ページ</button><br>
      ▼Netflix福利厚生セットプランとは・・・
      お勤め先の福利厚生により、Netflixベーシックプラン(990円/月)が追加料金なしでついてくる特別な福利厚生パッケージとなります。<br>
      また、上位プランである「スタンダードプラン」「プレミアムプラン」は差分をお支払いいただく事でアップグレードが可能となっております。詳しくはこちらよりご確認下さい。<br>
      <a href="https://bs.benefit-one.inc/otherPage?other_id=netflixplan">https://bs.benefit-one.inc/otherPage?other_id=netflixplan</a>`,
      subscriptionServiceIdErrorKyutoku: `大変申し訳ございません。こちらはお勤め先の福利厚生のご契約内容に
      「給トク払い」が含まれていない為、ご利用いただくことができません。<br><br>
      お勤め先の福利厚生ご担当者様へぜひ以下のURLをお知らせください。<br><br>
      「サービス紹介ページはこちら」
      <a href="https://corp.benefit-one.co.jp/service/kyuutoku/">https://corp.benefit-one.co.jp/service/kyuutoku/</a><br><br>
      <a class='subscription-error_link' href="https://bs.benefit-one.inc/">TOPページへ戻る</a>`,
    };
  },
  props: {
    resContractPlanId: null,
    contractPlanId: null,
    apiResult: null,
    subscriptionServiceId: null,
    errorCode: null,
    familySerialNumber: null,
    planStatus: null,
    contractAddressFlag: null,
    isLinkEnabled: null,
  },
  computed: {
    errorText() {
      // 本人アカウントでは無い場合
      if (this.familySerialNumber !== "0") {
        return this.familySerialNumberError;;
      }
      // ERRORレスポンス時
      else if (this.apiResult === "ERROR") {
        if (this.errorCode === "E1000004") {
          return this.subscriptionServiceIdError;
        } else {
          return this.sspfError;;
        }
      }

      //Netflix
      else if (this.subscriptionServiceId == 1) {

        // バンドル
        if (this.contractPlanId === 1 || this.contractPlanId === 2) {
          if (
            this.contractAddressFlag === false &&
            this.subscriptionServiceId === 1
          ) {
            return this.contractAddressError;
          }
          if (this.resContractPlanId === 3) {
            return this.ContractPlanIdErrorKyutoku;
          }
          if (
            this.planStatus === "解約済み" ||
            this.planStatus === "申込完了前" ||
            this.subscriptionServiceId !== 1
          ) {
            return this.activationError;
          }
        }

        //給トク
        else if (this.contractPlanId === 3) {
          if (this.isLinkEnabled == false) {
            return this.cancelError; ;
          }
          if (this.resContractPlanId === 1 || this.resContractPlanId === 2)  {
            return this.ContractPlanIdErrorBandle;
          }
        }
        
      // その他のサブスク  
      } else if (this.contractPlanId === 1 || this.contractPlanId === 2) {
        return this.subscriptionServiceIdError;

      } else if (this.contractPlanId === 3) {
        return this.subscriptionServiceIdErrorKyutoku;
      }
    },
  },
};
</script>

<style lang="scss">
// グローバルCSSである事に注意
.subscription-error {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 6px #00000029;
  border-radius: 8px;
  padding: 3rem 9rem;
  text-align: center;
  margin: 5rem;
  white-space: pre-wrap;
  &_link{
    text-decoration: underline;
    font-size: 15px;
    color: #007aff;
    padding: 0.8rem 0 0 0;
  }

  button{
  color: #ffffff;
  background-color: #e60021;
  border-radius: 15px;
  margin: 9%;
  font-size: 21px;
  width: 47%;
  padding: 2%;
  line-height: 1.3;
  font-weight: bold;
  }
}


@media only screen and (max-width: 1024px) {
  .active-error {
    padding: 3rem 6rem;
  }
}

@media only screen and (max-width: 639px) {
  .active-error {
    padding: 3rem 1rem;
    margin: 1rem 1rem;
    font-size: 13px;
  }
}
</style>
