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


    <div class="inactive" v-else-if="
      this.res.subscriptionServiceId === 1 &&
      this.res.contractPlanId === 3 && 
      (this.res.planStatus === 'プラン変更中'|| this.res.planStatus === '有効')">
      <h2 class="title">Netflix 給トク払い<br class="sp" />プラン変更お申込み</h2>
      <h3 class="title-sub pc">
        給トク払いでのお申込みとなります。<br />ご変更プランをご確認の上必要事項をご入力下さい。
      </h3>

      <h3 class="title-sub">{{ getPlanName() }}へ変更</h3>

      <div class="title-sub gree">
        <p>＜給トク払いご利用可能プラン＞</p>
      </div>

      <!-- ここからPC -->
      <ul class="plan_list pc">
        <li class="plan_list_item plan_list_item02">
          <div class="plan_list_item_wrap">
            <p class="plan_list_item_name">スタンダードプラン</p>
            <dl class="plan_inner">
              <dt class="plan_inner_title">月額</dt>
              <dd class="plan_inner_text"><span class="em">1,490</span>円</dd>
              <dt class="plan_inner_title">特典</dt>
              <dd class="plan_inner_text red">150ベネポ</dd>
              <dt class="plan_inner_title">画質</dt>
              <dd class="plan_inner_text">高画質<br class="sp" />（フルHD）</dd>
              <dt class="plan_inner_title">同時視聴可能台数</dt>
              <dd class="plan_inner_text">2台</dd>
            </dl>
          </div>
        </li>
        <li class="plan_list_item plan_list_item03">
          <div class="plan_list_item_wrap02">
            <p class="plan_list_item_name">プレミアムプラン</p>
            <dl class="plan_inner">
              <dt class="plan_inner_title">月額</dt>
              <dd class="plan_inner_text"><span class="em">1,980</span>円</dd>
              <dt class="plan_inner_title">特典</dt>
              <dd class="plan_inner_text red">200ベネポ</dd>
              <dt class="plan_inner_title">画質</dt>
              <dd class="plan_inner_text">超高画質<br class="sp" />（4K）</dd>
              <dt class="plan_inner_title">同時視聴可能台数</dt>
              <dd class="plan_inner_text">4台</dd>
            </dl>
          </div>
        </li>
      </ul>
      <div class="change-plan pc">
        <button @click="isOpen = !isOpen">プラン変更<br />お申込み</button>
      </div>
      <!-- ここまでPC -->

      <!-- ここからSP -->
      <table class="plan_table sp">
        <thead>
          <tr>
            <th class="plan_table_title plan_table_title02">スタンダード</th>
            <th class="plan_table_title plan_table_title03">プレミアム</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="plan_table_key" colspan="3">月額</th>
          </tr>
          <tr>
            <td class="plan_table_value plan_table_value02">
              <span class="em">1,490</span>円
            </td>
            <td class="plan_table_value plan_table_value03">
              <span class="em">1,980</span>円
            </td>
          </tr>
          <tr>
            <th class="plan_table_key" colspan="3">特典</th>
          </tr>
          <tr>
            <td class="plan_table_value plan_table_value02 red">150ベネポ</td>
            <td class="plan_table_value plan_table_value03 red">200ベネポ</td>
          </tr>
          <tr>
            <th class="plan_table_key" colspan="3">画質</th>
          </tr>
          <tr>
            <td class="plan_table_value plan_table_value02">
              高画質<br />（フルHD）
            </td>
            <td class="plan_table_value plan_table_value03">
              超高画質<br />（4K）
            </td>
          </tr>
          <tr>
            <th class="plan_table_key" colspan="3">同時視聴可能台数</th>
          </tr>
          <tr>
            <td class="plan_table_value plan_table_value02">2台</td>
            <td class="plan_table_value plan_table_value03">4台</td>
          </tr>
        </tbody>
      </table>
      <button class="sp button" @click="isOpen = !isOpen">お申込み</button>
      <!-- ここまでSP -->

      <!--ここからアコーディオン-->
      <div v-if="isOpen" class="hide">
        <div class="select">
        <div class="select-plan">
          <input type="radio" value="plan" v-model="selectedOption" checked />
          <label for="option1" class="radio-label">{{ getPlanName() }}</label>
        </div>

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
        <p v-if="emailAgainIsValid === false" class="error-message">
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
        </div>
        <div class="info gree">
          以下、ご利用上の注意事項をご了承の上で<br>お申し込みください。
        </div>

        <ul>
          <li class="bold">【ご優待適応条件】</li>
          <li>※Netflixを<span class="red">新規</span>でお申込いただく場合に限ります。過去ご登録の場合、解約から1か月以上経過している場合は新規登録扱いとなります</li>
          <li>※現在Netflixをご利用中で給トク払いをお申込みいただいた場合、Netflixサイトでのアカウント登録の際に既存のNetflixアカウントを登録することができますが、<span class="red">ご優待特典となる毎月のベネポ特典は適用外</span>となりますのでご注意ください。</li>
        </ul>
        <ul class="notes">
          <li class="bold">【ご注意事項】</li>
          <li><span class="red">※初回お申込みから1か月間は途中解約ができません。</span>予めご了承ください。
          <br>（例）1月10日にお申し込みの場合は2月10日以降解約が可能となります。</li>
          <li>※月途中解約の場合は日割り計算でのご請求となります。またそのご利用料金に対して10％分のベネポを付与いたします。</li>
          <li>※お支払いは給トク払い（給与天引き）となりますが、給与天引きご利用上限額を超えている、退職をされたなどの理由から、給与天引きができない場合に備えクレジットカードのご登録をいただいております。</li>
          <li>※ベネポはご利用月の翌々月末までに毎月付与させていただきます。</li>
          <li>※ベネポ特典はスタンダードプランでは毎月151ベネポ、プレミアムプランでは毎月201ベネポとなります。</li>
          <li>※ご所属の企業・団体がベネフィット・ステーションまたは給トク払い契約を解約された場合、本プランではご視聴ができなくなります。改めてNetflixへのお申込が必要になりますのでご了承ください。</li>
          <li>※動画の再生環境は、Netflix視聴プラン、インターネットサービス、デバイス機能、コンテンツによって異なります。詳細は<a href="https://www.netflix.com/TermsOfUse" target="_blank">https://www.netflix.com/TermsOfUse</a>をご覧ください。</li>
          <li>※ベーシックに関しては給トク払い対象外プランとなります。</li>
          <li>※給トク払いを通してNetflixサービスをご利用いただくためには、アカウント登録等、Netflixサービスのアクティベーションが必要となります。その方法については、メールまたはSMSにより別途提供される説明をご参照ください。</li>
          <li>※ご優待特典は適用になりませんが、既存のNetflixアカウントを給トク払いと連携させることが可能です。連携がされるまでは別途請求が継続して生じますのでご注意ください。また既存のNetflixアカウントに係るNetflixからの請求については、Netflixに直接お問い合わせください。</li>
          <li>※他社Netflixパッケージサービスをご契約の方は、他社Netflixパッケージサービスと連携させた既存のNetflixアカウントを給トク払いと連携させても、当該他社Netflixパッケージサービスからのご請求が継続して発生する可能性があります。一度ご解約をいただくか、または当該他社Netflixパッケージサービス提供元に直接お問い合わせください。</li>
          <li>※既存のNetflixアカウントを給トク払いと連携した場合、ご所属の企業・団体がベネフィット・ステーションまたは給トク払い契約を解約・変更された場合でも、お客様のNetflixアカウントは自動的に終了しません。契約を解約・変更された時点で、Netflixに登録されているお支払方法に対して、Netflixからの課金が自動的に再開します。Netflixアカウントの登録情報を確認したい場合には、Netflixのホームページから「アカウント」ページをご覧ください。</li>
          <li>※Netflixサイトで初期登録を行う際に記載されている料金は、給トク払いでお支払いされるため減算された価格表記となっております。</li>
          <li>※別途通信料および対象サービスのご利用料金がかかります。</li>
          <li>※ Netflix はNetflix合同会社が、Netflix合同会社の定める利用規約に基づき提供するサービスです。</li>
          <li>※株式会社ベネフィット・ワンは、給トク払いと連携したNetflixサービスの有効化手続を促進するため、 株式会社ベネフィット・ワンに登録されたお客様の電子メールアドレスまたは携帯電話番号をNetflixに提供します。株式会社ベネフィット・ワンによる個人情報の取扱いに関しましては、<a href="https://bs.benefit-one.inc/contents/kiyaku/handling/" target="_blank">https://bs.benefit-one.inc/contents/kiyaku/handling/</a>にてプライバシーポリシーをご覧ください。またNetflix のプライバシーポリシーについては、<a href="https://help.netflix.com/legal/privacy" target="_blank">netflix.com/privacy</a>をご覧ください。</li>
        </ul>
        <div>
          <label>
            <input type="checkbox" v-model="newslettersOptInFlg" />
            Netflixに関するお得な福利厚生優待キャンペーンメールを希望する場合にチェックをお願いします。
          </label>
        </div>
        <button class="button" :disabled="!isValidForm" @click="changePlan()">
          お申込み
        </button>
      </div>
      <!--ここまでアコーディオン-->
    </div>
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
      isOpen: false,
      isChecked: false,
      selectedOption: "plan",
      email: "",
      emailAgain: "",
      phoneNumber: "",
      emailIsValid: null,
      emailAgainIsValid: null,
      phoneNumberIsValid: null,
      newslettersOptInFlg: false,
      res: {
        subscriptionServiceId: 1,
        planStatus: null,
        selectablePlanList: null,
      },
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
  computed: {
    isValidForm() {
      return (
        this.emailIsValid && this.emailAgainIsValid && this.phoneNumberIsValid
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
    changePlan() {
      const baseUrl = process.env.VUE_APP_NETFLIX_CHANGE_URL;

      const queryParams = {
        customerNumber: this.auth.user.ssoCustomerNo, //BPFお客様番号
        planId: this.getPlanID(),
        personalEmailAddress: this.email,
        personalPhoneNumber: this.phoneNumber,
        newslettersOptInFlg: this.newslettersOptInFlg, //キャンペーンメールの受領意思。true希望するfalse希望しない
      };
      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      const url = `${baseUrl}?${queryString}`;
      window.location.href = url;
    },
    getPlanName() {
      return (
        this.res.selectablePlanList.find(
          (plan) =>
            !plan.selected && plan.subscriptionPlanName !== "ベーシックプラン"
        )?.subscriptionPlanName || ""
      );
    },
    getPlanID() {
      return (
        this.res.selectablePlanList.find(
          (plan) =>
            !plan.selected && plan.subscriptionPlanName !== "ベーシックプラン"
        )?.subscriptionPlanId || ""
      );
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

  &-sub {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    color: #1f2021;
    padding: 2rem 0;
    width: 80%;
    margin: auto;
    position: relative;
  }
}

.change-plan {
  text-align: center;
  &__pass {
    display: block;
    margin: 13px auto;
  }
}

.select {
  background: rgba(173, 216, 230, 0.3);
  padding: 0 0 50px 0;
}

button {
  color: #ffffff;
  background-color: #e60021;
  border-radius: 15px;
  margin: 3%;
  font-size: 24px;
  width: 32%;
  padding: 2%;
  line-height: 1.3;
  font-weight: bold;
  &:disabled {
  background-color: #aaa;
}
  &:hover {
    animation: anima-button-030 1s;
  }
}

@keyframes anima-button-030 {
  0% {
    box-shadow: 0 0 0 0 rgb(227 0 19 / 50%);
  }
  100% {
    box-shadow: 0 0 0 1.2em rgb(0 0 0 / 0%);
  }
}

.notes{
  margin: 0 0 12% 0;
}

.plan {
  &_list {
    display: flex !important;
    margin-bottom: 5%;
    justify-content: space-around;
    &_item {
      border-radius: 10px;
      text-align: center;
      line-height: 2;
      width: 30%;
      &_name {
        font-weight: bold;
        padding: 0.5em;
        font-size: 24px;
      }
      &_wrap {
        border: 2px solid #a5fabe;
        border-radius: 10px;
      }
      &_wrap02 {
        border: 2px solid #ffcfd6;
        border-radius: 10px;
      }
      &02 {
        .plan_list_item_name {
          color: #007864;
          background-color: #a5fabe;
        }

        .plan_inner_title {
          background-color: #e3faea;
        }
      }
      &03 {
        .plan_inner_title {
          background-color: #ffe8eb;
        }

        .plan_list_item_name {
          color: #e50914;
          background-color: #ffcfd6;
        }
      }
    }
  }
  &_inner {
    &_title {
      font-weight: bold;
      color: #737373;
      font-size: 12px;
      padding: 0.5em;
      font-size: 1.3rem;
    }
    &_text {
      font-size: 14px;
      font-weight: bold;
      padding: 0.5em;
      font-size: 20px;

      .em {
        font-size: 32px;
      }
    }
  }
}

.input {
  border: 1px solid #cacccf;
  width: 30%;
  padding: 10px;
  border-radius: 4px;
}

input[type="checkbox"] {
  background-color: initial;
  cursor: default;
  appearance: auto;
  box-sizing: border-box;
  margin: 3px 3px 3px 4px;
  padding: initial;
  border: initial;
}

input[type="radio"] {
  appearance: auto;
}

ul {
  margin: 5% 0 5% 0;
  text-align: left;

  li {
    padding: 1% 0 0 0;
  }
}

.hide {
  text-align: center;
}

.gree {
  background: #e3e3e6;
}

.red {
  color: #f30100;
}

.bold {
  font-weight: bold;
}

.balloon3-right-btm {
  position: absolute;
  display: inline-block;
  margin: 1.5em 15px 1.5em 0;
  padding: 30px 5px;
  width: 202px;
  top: -62%;
  right: -8%;
  height: 112px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  background: #ffe49c;
  border-radius: 50%;
  box-sizing: border-box;
}

.balloon3-right-btm:before {
  content: "";
  position: absolute;
  bottom: -13px;
  right: 173px;
  border: 17px solid transparent;
  border-left: 43px solid #ffe49c;
  z-index: 0;
  transform: rotate(130deg);
}

.error-message {
  color: #e60021;
  font-size: 0.8rem;
  font-weight: bold;
  &::before {
    content: "*";
  }
}

.info {
  width: 80%;
  font-weight: bold;
  margin: 5% auto 1%;
  padding: 5%;
}
.select {
  &-plan {
    margin: 6% auto;
    font-weight: bold;
    text-align: left;
    display: inline-block;
    width: 20%;
    &_list {
      padding: 2%;
    }
  }
}

.radio-label {
  margin-left: 17%;
}

.sp {
  display: none;
}

@media only screen and (max-width: 1024px) {
  .pc {
    display: none !important;
  }

  .sp {
    display: block;
  }

  .select {
    margin-top: 15%;
    padding-top: 10px;
  }

  .button {
    color: #ffffff;
    background-color: #e60021;
    border-radius: 15px;
    margin: 6% auto;
    font-size: 24px;
    width: 250px;
    padding: 5%;
    line-height: 1.3;
    font-weight: bold;
  }

  .input {
    width: 80%;
  }

  ul {
    li {
      padding: 3% 0 0 0;
      font-size: 0.7rem;
    }
  }

  .select-plan {
    width: 50%;
    display: flex;
    justify-content: center;
    margin: 11% auto;
  }

  .change-plan__info {
    margin: 14% 0 0 0;
  }

  .plan {
    &_table {
      &_title {
        &01 {
          color: #005fe6;
          background-color: #a0dcff;
        }
        &02 {
          color: #007864;
          background-color: #a5fabe;
        }
        &03 {
          color: #e50914;
          background-color: #ffcfd6;
        }
        font-size: 12px;
        line-height: 1.4;
        font-weight: bold;
        padding: 0.6em;
        border: 1px solid #e8e8e8;
      }
      width: 80%;
      border-collapse: collapse;
      margin: 7% auto 20px;
      &_key {
        width: calc(100vw - 4rem);
        background-color: #e8e8e8;
        font-size: 12px;
        color: #737373;
        font-weight: bold;
        line-height: 1.4;
        padding: 0.5em;
        border: 1px solid #e8e8e8;
      }
      &_value {
        font-size: 14px;
        font-weight: bold;
        line-height: 1.4;
        padding: 0.5em;
        text-align: center;
        border: 1px solid #e8e8e8;
        width: 33.3333%;

        .em {
          font-size: 20px;
        }
      }
    }
  }

  .title-sub {
    font-size: 1rem;
  }

  label {
    font-size: 0.8rem;
  }
}

@media only screen and (max-width: 639px) {
}
</style>
