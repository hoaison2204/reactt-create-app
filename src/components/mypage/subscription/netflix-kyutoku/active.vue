<template>
  <section>
    <!--アクティブ-->
    <div class="active">
      <h2 class="title">
        Netflix アカウント管理
      </h2>
      <div class="plan">
        <div class="plan-list">
          <p class="plan-list__package">現在ご利用中のNetflixプラン</p>
          <p class="plan-list__netflix">{{ res.subscriptionPlanName }}</p>
          <div class="plan-list__flex">
            <div class="plan-list__link">
              <router-link to="/mypage/payroll/netflix/changeplan">
              <img src="@/assets/images/mypage/1.svg" alt="Logo" />
              <p>視聴プラン変更</p>
              </router-link>
            </div>
            <div class="plan-list__link">
              <a href="https://bs.benefit-one.inc/otherPage?other_id=netflix_payroll_deduction" target="_blank">
              <img src="@/assets/images/mypage/4.svg" alt="Logo" />
              <p>Netflix<br>各料金プランの特徴</p>
              </a>
            </div>
            <div class="plan-list__link">
              <router-link to="/mypage/payroll/netflix/recovery">
              <img src="@/assets/images/mypage/5.svg" alt="Logo" />              
              <p>NetflixログインID<br>不明の方はこちら</p>
              </router-link>
            </div>
            <div class="plan-list__link">
              <router-link to="/mypage/payroll/netflix/changeopt">
              <img src="@/assets/images/mypage/3.svg" alt="Logo" />
              <p>キャンペーンメルマガ<br>申込・停止</p>
              </router-link>
            </div>
            <div class="plan-list__link">
              <router-link to="/mypage/payroll/netflix/changemail">
              <img src="@/assets/images/mypage/6.svg" alt="Logo" />
              <p>登録メールアドレス<br>変更</p>
              </router-link>
            </div>
            <!--登録後1ヶ月は非活性-->
            <div class="plan-list__link">
              <router-link
                :to="{ path: '/mypage/payroll/netflix/cancel' }"
                :class="{ 'disabled-link': !isLinkEnabled }"
                >
              <img src="@/assets/images/mypage/2.svg" alt="Logo" />
              <p>Netflix解約</p>
              </router-link>
              <p
                v-if="!isLinkEnabled"
                :class="{ 'plan-list__enable': !isLinkEnabled }"
              >
                申し込みから1ヶ月以内は<br>解約ができません
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="pay">
        <div class="pay-list mb">
          <p>毎月のご利用料金</p>
          <div class="pay-flex">
            <p class="pay-claim">{{ res.subscriptionPlanName }}</p>
            <p class="pay-price">
              <span class="pay-flex__price">{{ res.usageFee }}</span
              ><span class="pay-flex__currency">円</span>
            </p>
            <p class="pay-text">/ 月</p>
          </div>
        </div>
        <a class="pay-detail" :href="qtokPaymentUrl">料金明細はこちら</a>
      </div>
      <div>
        <p class="center">
          プラン変更・解約などにおける日割り算出を含め<br>
          こちらでご利用料金を確認することができます。<br>
          ※情報反映のタイミングは、特殊な場合を除き<br>
          お申込み月から翌々月5日となります。
       </p>
        <ul>
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
      </div>
    </div>
    <!--アクティブ-->
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLinkEnabled: null,
    };
  },
  props: {
    res: {
      type: Object,
      default: {},
    },
    familySerialNumber: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.checkLinkStatus();
  },
  methods: {
    // 契約開始から1ヶ月間は導線非活性
    checkLinkStatus() {
      // 現在日時
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
    },
  },
  computed: {
    qtokPaymentUrl() {
      return process.env.VUE_APP_WITH_QTOK_PAYMENT_URL;
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

.title2 {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #1f2021;
  padding: 2rem 0;
  width: 80%;
  margin: auto;
  position: relative;
}

ul {
  margin: 5% 0 5% 0;
  text-align: left;
  li {
    padding: 1% 0 0 0;
  }
}

.red {
  color: #f30100;
}

.center{
  text-align:center;
}

a {
  text-decoration: none;
  font-size: 15px;
  padding: 0.8rem 0 0 0;
}
.active {
  .plan {
    &-list {
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 6px #00000029;
      border-radius: 8px;
      text-align: center;
      margin: 1rem 0;
      padding: 2.5rem 0;

      &__package {
        font-size: 20px;
        font-weight: bold;
        padding: 0 0 1.5rem 0;
      }
      &__netflix {
    color: #dd0000;
    font-size: 20px;
    font-weight: bold;
    padding: 0.5% 0;
    background: linear-gradient(transparent 60%, #FFEDB3 30%);
    width: 220px;
    margin: 0 auto 25px;
      }
      &__text {
        color: #73767a;
      }
      &__flex {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }
      &__link {
        width: 33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 30px 0;
        color: #007aff;
        img {
          width: 20%;
          margin: 0 auto 6px;
        }
      }
      &__enable {
        color: #e60021;
        font-size: 0.8rem;
      }
      a {
        display: block;
      }
    }
  }
  .pay {
    padding: 0 0 0 17rem;
    margin: 6% 0;
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
          content: "・";
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
    &-detail {
      text-align: center;
      display: block;
      margin: 70px 0 0 0;
      font-size: 1.3rem;
      background-color: antiquewhite;
      padding: 15px;
      color: #007aff;
    }
  }

  .info {
    text-align: center;
    margin: auto;
    width: 81%;
    color: #73767a;
    padding: 0%;
    &-text {
      width: auto;
      text-align: left;
      margin: 2.5rem 0;
      display: inline-block;
      > p {
        padding: 0 0 0.7rem 0;
        &::before {
          content: "※";
        }
      }
    }
    &-error {
      white-space: pre-wrap;
      color: #dd0000;
      padding: 0 0 1rem 0;
    }
    > p {
      &:last-child {
        color: #1f2021;
        &::before {
          content: "※";
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
      width: 60%;
      margin: auto;
    }
  }
}

.disabled-link {
  pointer-events: none;
  color: gray;
  text-decoration: none;
  cursor: not-allowed;
}

@media only screen and (max-width: 1024px) {
  .active {
    .plan {
      &-list {
        &__package {
          font-size: 13px;
        }
        &__link {
          margin: 15px 0;
          width: 50%;
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
            width: 90vw;
            border-bottom: 1.5px solid #cacccf;
          }
          &::after {
            position: absolute;
            bottom: 0%;
            content: "";
            width: 90vw;
            border-bottom: 1.5px solid #cacccf;
          }
        }
        > p {
          font-size: 16px;
          position: relative;

          &::before {
            width: 11px;
            height: 5px;
            top: 45%;
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
      &-detail {
        margin: 30px 0 0 0;
      }
    }
    .info {
      width: 100%;
      > p {
        font-size: 13px;
      }
    }
  }
  ul {
    li {
      padding: 3% 0 0 0;
      font-size: 0.7rem;
    }
  }
}

@media only screen and (max-width: 639px) {
  .active {
    .pay {
      &-list {
        > p {
          &::before {
            top: 45%;
            left: -5%;
          }
        }
        &.mb {
          .pay-claim {
            width: 60%;
          }

          .pay-price {
            width: 30%;
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
      font-size: 1rem;
      &-error {
        font-size: 0.7rem;
      }
    }
  }
}
</style>
