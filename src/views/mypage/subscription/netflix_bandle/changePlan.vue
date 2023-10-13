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

    <div class="main" v-else-if="
      this.res.subscriptionServiceId === 1 &&
      (this.res.planStatus === 'プラン変更中' || this.res.planStatus === '有効')">
      <h2 class="title">
        ご利用プラン　変更受付
      </h2>
      <div class="change">
        <p>現在ご利用中のNetflixプラン</p>
        <p class="change-active__plan">{{ res.subscriptionPlanName }}</p>
        <!-- <div class="change-wait">
            <p>ご登録手続きに約30分程度のお時間をいただいております。<br>
              大変ご迷惑をおかけいたしますが、30分後を目安に再度ご確認をお願いいたします。
            </p>
        </div> -->
        <div class="change-area">
          <p>変更希望のプランを選択してください</p>
          <select class="change-plan__select input" v-model="selectedPlan">
            <option disabled value="">選択する</option>
            <option v-for="(option, index) in options" :key="index" :value="option.subscriptionPlanId">  {{ option.subscriptionPlanName }} {{ option.usageFee }}円/月</option>
          </select>
          <p class="change-plan__info">メールアドレスをご入力ください</p>
          <input
            type="text"
            autocomplete="off"
            v-model="email"
            class="change-plan__pass input"
            oncopy="return false"
            onpaste="return false"
            oncontextmenu="return false"
            placeholder="メールアドレスを入力"
            @blur="validateEmail"
          />
          <span v-if="emailIsValid === false" class="error-message">
            正しいメールアドレスの形式で入力してください。
          </span>
          <input
            type="text"
            autocomplete="off"
            v-model="emailAgain"
            class="change-plan__pass input"
            oncopy="return false"
            onpaste="return false"
            oncontextmenu="return false"
            placeholder="メールアドレスを再入力"
            @blur="validateEmailAgain"
            :class="{ 'is-invalid': emailAgain !== '' && email !== emailAgain }"
          />
          <p
            v-if="emailAgainIsValid === false"
            class="error-message"
          >
            メールアドレスが一致していません。
          </p>

          <p class="change-plan__info">
            電話番号をご入力ください<br />(半角数字・ハイフン不要)
          </p>
          <input
            type="tel"
            v-model="phoneNumber"
            class="change-plan__pass input"
            placeholder="電話番号を入力"
            @blur="validatePhoneNumber"
          />
          <p v-if="phoneNumberIsValid === false" class="error-message">
            正しい電話番号の形式で入力してください。
          </p>
          <p class="change-plan__text">
            以下、ご利用上の注意事項をご了承の上で、お申し込みください。
          </p>
          <p>
            ボタンを押すことでお申し込みが完了します。<br />改めてご入力内容をご確認下さい。
          </p>
          <button :disabled="!isValidForm" @click="changePlan()">お申込</button>
        </div>
        <div class="info">
          <p>【ご利用上の注意事項】</p>
          <ul>
            <li>
              ※ご登録手続きに約30分程度のお時間をいただいております<br>大変ご迷惑をおかけいたしますが、30分後を目安に再度ご確認をお願いいたします。
            </li>
            <li>
              ※ベーシックプラン以外をご選択される場合、ご退職時など所属する企業・団体の福利厚生から外れる際には、ご自身でのダウングレードのお手続きが必要となりますのでご注意ください。
            </li>
            <li>
              ※月の途中でプランを変更した場合、日割り計算として追加のご請求・ご返金を行っております。
            </li>
            <li>
              ※退会またはプラン変更により差額が発生した場合のご返金方法につきましては、カスタマーセンターよりご連絡をさせていただきます。
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      res: {
        subscriptionServiceId: 1,
        planStatus:null
      },
      options: [],
      selectedPlan: "",
      email: "",
      emailAgain: "",
      phoneNumber: "",
      emailIsValid: null,
      emailAgainIsValid: null,
      phoneNumberIsValid: null,

      familySerialNumber: "0",
      errorText: "",
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
        // 未アクティベート状態であればTOPにリダイレクト      
        if(this.res.subscriptionServiceId === 1 && this.res.planStatus === 'アクティベーション中'){
          this.$router.push('/mypage/netflix');
        }
        this.options = this.res.selectablePlanList.filter(option => !option.selected);  
      } catch (error) {
        console.error(error);
      }
    } else {
    }
    this.$loading.finishProcessing();
  },
  computed: {
    isValidForm() {
      return (
        this.emailIsValid &&
        this.emailAgainIsValid &&
        this.phoneNumberIsValid &&
        this.selectedPlan
      );
    },
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailIsValid = emailRegex.test(this.email);
    },
    validateEmailAgain() {
      this.emailAgainIsValid = this.email === this.emailAgain;
    },
    validatePhoneNumber() {
      const phoneNumberRegex = /^0\d{9,10}$/;
      this.phoneNumberIsValid = phoneNumberRegex.test(this.phoneNumber);
    },
    changePlan () {
      const baseUrl = process.env.VUE_APP_NETFLIX_CHANGE_URL;

      const queryParams = {
        customerNumber: this.auth.user.ssoCustomerNo,  //BPFお客様番号
        planId: this.selectedPlan,
        personalEmailAddress: this.email,
        personalPhoneNumber: this.phoneNumber,
      };
      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      const url = `${baseUrl}?${queryString}`;
      window.location.href = url;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  background-color: #fff8e5;
  padding: 1rem;
  width: 100vw;
  margin: 0 calc(50% - 50vw) 1.7rem;
}

select {
  -moz-appearance: menulist;
  -webkit-appearance: menulist;
  &::-ms-expand {
    display: block;
  }
}
.main {
  text-align: center;
  .change {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 6px #00000029;
    border-radius: 8px;
    text-align: center;
    margin: 1rem 0;
    padding: 4% 0;
    > p {
      &:first-child {
        font-size: 20px;
        font-weight: bold;
      }
    }
    &-active {
      &__plan {
        font-weight: bold;
        color: #dd0000;
        font-size: 24px;
        margin: 3%;
      }
    }
    &-area {
      margin: 5% 0 0 0;
    }
    &-wait{
      margin: 7%;
    }
    &-plan {
      &__select {
        margin: 13px 0 0 0;
      }
      &__pass {
        display: block;
        margin: 13px auto;
      }
      &__tell {
        display: block;
        margin: 10px auto;
      }
      &__text {
        margin: 50px;
      }
      &__info {
        margin: 2.5% 0 0 0;
      }
    }
  }
  .input {
    border: 1px solid #cacccf;
    width: 30%;
    padding: 10px;
    border-radius: 4px;
  }
  button {
    color: #ffffff;
    background-color: #e60021;
    border-radius: 4px;
    padding: 1rem 16%;
    margin: 3%;
    font-size: 24px;
    &:disabled {
      background-color: #aaa;
    }
  }

  .info {
    width: 78%;
    margin: auto;
    > p {
      &:first-child {
        font-weight: bold;
      }
    }
    ul {
      margin: 2% 0;
      text-align: left;
      li {
        padding: 2% 0;
      }
    }
  }
  .error-message {
    color: #e60021;
    font-size: 0.8rem;
    font-weight: bold;
    &::before {
      content: "*";
    }
  }
}

@media only screen and (max-width: 639px) {
  .title {
    margin: -1.5rem calc(50% - 50vw) 1.7rem;
  }

  .main {
    .change {
      padding: 4% 0;
      &-active {
        &__plan {
          margin: 4% 0 9% 0;
        }
      }
      &-plan {
        &__select {
          margin: 13px;
        }
        &__pass {
          display: block;
          margin: 13px auto;
        }
        &__tell {
          margin: 10px;
        }
        &__text {
          margin: 12% 0;
        }
      }
    }
    .input {
      width: 92%;
      padding: 2% 2%;
    }
    button {
      padding: 3% 35%;
      font-size: 18px;
    }

    .info {
      width: 90%;
      margin: 10% auto 0;
      ul {
        margin: 2% 0;
        li {
          padding: 2% 0;
        }
      }
    }
  }
}
</style>
