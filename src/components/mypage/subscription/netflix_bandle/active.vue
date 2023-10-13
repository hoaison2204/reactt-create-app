<template>
  <section>
    <div class="active">
      <h2 class="title">
        Netflix アカウント管理
      </h2>
      <div class="plan">
        <div class="plan-list">
          <p class="plan-list__package">
            お勤め先の企業様が導入している福利厚生パッケージ名
          </p>
          <p class="plan-list__netflix">{{ res.contractPlanName }}</p>
          <p class="plan-list__text">(Netflixベーシックを含む)</p>
        </div>
        <div class="plan-list">
          <p class="plan-list__package">現在ご利用中のNetflixプラン</p>
          <p class="plan-list__netflix">{{ res.subscriptionPlanName }}</p>
          <router-link to="/mypage/netflix/changeplan"
            >プラン変更はこちら</router-link
          >
          <a href="https://bs.benefit-one.inc/otherPage?other_id=netflixplan">Netflix各料金プランの特徴はこちら</a>
        </div>
      </div>
      <div class="pay">
        <div class="pay-list mb">
          <p>毎月のご利用料金</p>
          <div class="pay-flex">
            <p v-if="res && res.subscriptionPlanName" class="pay-claim">
              {{ res.subscriptionPlanName === 'スタンダードコース' ? res.subscriptionPlanName : 'アップグレード分（' + res.subscriptionPlanName + '）' }}
            </p>
            <p v-else class="pay-claim">スタンダードコース.</p>
            <p class="pay-price">
              <span class="pay-flex__price">{{ res.usageFee }}</span
              ><span class="pay-flex__currency">円</span>
            </p>
            <p class="pay-text">/ 月</p>
          </div>
        </div>
        <div class="pay-list">
          <p v-if="res.paymentOfTwoMonthsAgo">直近3ヶ月のご請求金額</p>
          <p v-else-if="res.paymentOfLastMonth">直近2ヶ月のご請求金額</p>
          <div>
            <div class="pay-flex" v-if="res.paymentOfTwoMonthsAgo">
              <p class="pay-claim dot">前々月ご請求員額</p>
              <p class="pay-price">
                <span class="pay-flex__price">{{
                  res.paymentOfTwoMonthsAgo
                }}</span
                ><span class="pay-flex__currency">円</span>
              </p>
              <p class="pay-text" v-if="res.refundAmountOfTwoMonthsAgo">
                {{ formattedRefundAmount(res.refundAmountOfTwoMonthsAgo) }}
              </p>
              <p class="pay-text" v-else></p>
            </div>
            <div class="pay-flex" v-if="res.paymentOfLastMonth">
              <p class="pay-claim dot">前月ご請求金額</p>
              <p class="pay-price">
                <span class="pay-flex__price">{{
                  res.paymentOfLastMonth
                }}</span>
                <span class="pay-flex__currency">円</span>
              </p>
              <p class="pay-text" v-if="res.refundAmountOfLastMonth">
                {{ formattedRefundAmount(res.refundAmountOfLastMonth) }}
              </p>
              <p class="pay-text" v-else></p>
            </div>
            <div class="pay-flex">
              <p class="pay-claim dot">今月ご請求予定金額</p>
              <p class="pay-price">
                <span class="pay-flex__price">{{ res.paymentOfThisMonth === null ? 0 : res.paymentOfThisMonth }}</span>
                <span class="pay-flex__currency">円</span>
              </p>
              <p class="pay-text"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="info">
        <!-- 劣後開発(5月) -->
        <!-- <div v-if="res.subscriptionPlanName !== 'ベーシックコース'">
          <p class="info-error">
            {{ getPaymentErrorMessage }}
          </p>
          <p class="info-change__payment">お支払い方法の変更</p>
        </div> -->
        <div class="info-text">
          <p>表示されている情報は当月1日の情報を表示しています。</p>
          <p>毎月26日に翌月分のご利用料金をお支払いいただきます。</p>
          <p>
            ベネフィット・ステーションの退会・プラン変更により差額が発生した場合のご返金方法につきましては、カスタマーセンターよりご連絡をさせていただきます。
          </p>
        </div>
        <p>
          Netflixログインの為の<router-link to="/mypage/netflix/recovery"
            >IDが不明な方はこちら</router-link
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    res: {
      type: Object,
      default: {},
    },
    familySerialNumber:{
      type: Number,
      default: 0,
    }
  },
  methods: {},
  computed: {
    //劣後開発(5月)
    // getPaymentErrorMessage() {
    //   //現在日時
    //   const now = this.$moment();
    //   //クレジットカード有効期限
    //   const expiryDate = this.$moment(this.res.expirationOfCreditCard,"YYYY/MM/DD");
    //   //クレジットカード有効期限から６０日
    //   const warningDate = expiryDate.clone().subtract(60, "days");
    //   //クレジットカードの有効期限から翌月の25日
    //   const next25th = expiryDate.clone().add(1, 'month').date(25);
    //   //ダウングレード実施日
    //   const downgradeDate = this.$moment(this.res.downgradeDate,"YYYY/MM/DD");
    //   //ダウングレード実施日から60日
    //   const downgradeDate60 = downgradeDate.clone().add(60, "days");


    //   //クレジットーカードの有効期限切れていれば
    //   if (now.isAfter(expiryDate)) {
    //     //クレジットカードの有効期限が切れて翌月の25まで
    //     if (now.isBefore(next25th)) {
    //       return "お支払いにご登録されたクレジットカードの有効性が確認できなかった為、翌月1日よりベーシックプランへ自動的に変更されます。\n​現在ご登録いただいているクレジットカードの変更を25日までに完了された場合は、引き続き現在ご利用のプランでの視聴が可能となりますので、ご確認をお願いいたします。";
    //     }
    //     //クレジットカードの有効期限が切れて翌月の25日を経過、強制ダウングレードが行われて60日以内
    //     else if (now.isBefore(downgradeDate60)) {
    //       return "ご登録されたクレジットカードの有効性が確認できなかった為、ベーシックプランへ変更いたしました\n​再度アップグレードをご希望の場合は、改めて当ページよりプラン変更のお手続きをお願いいたします";
    //     }
    //   } 
    //   //クレジットカードの有効期限が60日前に迫っていれば
    //   else if (now.isSameOrAfter(warningDate) && now.isBefore(expiryDate)) {
    //     return "間もなくご登録されているクレジットカードの有効期限切れとなります​\n有効期限該当月の翌月25日までに確認ができなかった場合、ベーシックプランへ変更となりますのでご注意ください​";
    //   }
    // },
  },
  methods: {
    formattedRefundAmount(amount) {
      return `(${amount}円返金)`;
    },
  },
};
</script>

<style lang="scss" scoped>
  a {
  text-decoration: underline;
  font-size: 15px;
  color: #007aff;
  padding: 0.8rem 0 0 0;
}
.title {
  background-color: #fff8e5;
  padding: 1rem;
  width: 100vw;
  margin: 0 calc(50% - 50vw) 1.7rem;
}
.active {
  .plan {
    &-list {
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 6px #00000029;
      border-radius: 8px;
      text-align: center;
      margin: 1rem 0;
      padding: 1.5rem 0;

      &__package {
        font-size: 20px;
        font-weight: bold;
        padding: 0 0 1.5rem 0;
      }
      &__netflix {
        color: #dd0000;
        font-size: 20px;
        font-weight: bold;
        padding: 0 0 0.2rem 0;
      }
      &__text {
        color: #73767a;
      }
      a {
        display: block;
      }
    }
  }
  .pay {
    padding: 0 0 0 17rem;
    margin: 2rem 0;
    font-weight: bold;
    width: 51rem;
    &-list {
      > p {
        font-size: 20px;
        position: relative;
        &::before {
          content: "";
          width: 1rem;
          height: 6px;
          display: inline-block;
          background-color: #e60021;
          position: absolute;
          top: calc(50% - 0.3rem);
          left: calc(50% - 18.7rem);
        }
      }
      &:last-child {
        margin: 1.7rem 0 0 0;
      }
    }
    &-flex {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
      &__price {
        color: #dd0000;
        font-size: 20px;
        padding: 0 0.2rem 0 0;
      }
      &__currency {
        font-weight: 100;
        padding: 0 0.3rem 0 0;
      }
      p {
        padding: 1rem 0 0 0;
      }
    }
    &-claim {
      width: 65%;
      &.dot {
        &::before {
          content: "\30FB";
        }
      }
    }
    &-price {
      width: 15%;
      text-align: right;
    }
    &-text {
      width: 20%;
      font-weight: 100;
    }
  }

  .info {
    text-align: center;
    margin: auto;
    width: 61%;
    color: #73767a;
    &-text {
      width: 30rem;
      text-align: left;
      margin: 2.5rem 0;
      display: inline-block;
      > p {
        padding: 0 0 0.7rem 0;
        &::before {
          content: "\203B";
        }
      }
    }
    &-error {
      white-space: pre-wrap;
      color: #dd0000;
      padding: 0 0 0.7rem 0;
    }
    > p {
      &:last-child {
        color: #1f2021;
        &::before {
          content: "\203B";
        }
      }
    }
    a {
      text-decoration: underline;
      font-size: 15px;
      color: #007aff;
    }
    &-change__payment {
      color: #ffffff !important;
      background-color: #e60021;
      border-radius: 4px;
      padding: 1rem;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .active {
    .plan {
      &-list {
        &__package {
          font-size: 13px;
        }
      }
    }
    .pay {
      padding: 0;
      width: auto;
      &-list {
        padding: 10px;
        &:first-child {
          position: relative;
          padding: 27px 10px;
          &::before {
            position: absolute;
            top: 0%;
            content: "";
            width: 100vw;
            border-bottom: 1.5px solid #cacccf;
          }
          &::after {
            position: absolute;
            bottom: 0%;
            content: "";
            width: 100vw;
            border-bottom: 1.5px solid #cacccf;
          }
        }
        > p {
          font-size: 16px;
          position: relative;

          &::before {
            width: 11px;
            height: 5px;
            top: 44%;
            left: -2%;
          }
        }
        &.mb {
          .pay-claim {
            width: 70%;
          }

          .pay-price {
            width: 26%;
          }

          .pay-text {
            width: 4%;
          }
        }
      }
      &-flex {
        justify-content: space-between;
        &__price {
          font-size: 18px;
        }
      }
      &-claim {
        font-size: 13px;
        width: 40%;
      }
      &-price {
        width: 45%;
      }
      &-text {
        &:empty {
          display: none;
        }
        width: 15%;
        text-align: right;
      }
    }
    .info {
      width: 100%;
      &-text {
        width: auto;
      }
      > p {
        font-size: 13px;
      }
    }
  }
}

@media only screen and (max-width: 639px) {
  .active {
    .pay {
      &-list {
        > p {
          &::before {
            top: 44%;
            left: -5%;
          }
        }
        &.mb {
          .pay-claim {
            width: 70%;
          }

          .pay-price {
            width: 20%;
          }

          .pay-text {
            width: 10%;
          }
        }
      }
      &-claim {
        width: 50%;
      }
      &-price {
        width: 18%;
      }
      &-text {
        width: 32%;
      }
    }
    .info {
      font-size: 13px;
    }
  }
}
</style>
