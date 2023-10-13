<template>
  <section>
    <div class="inactive">
      <h2 class="title">
        Netflix 視聴開始のご案内
      </h2>
      <p>
        所属する企業・団体の福利厚生により、Netflixベーシックプランを無料でご利用いただけます。
      </p>
      <div class="register">
        <p>初回登録はこちら▼</p>
        <p> ご登録手続きの反映に約30分程度のお時間をいただいております。<br>
            大変ご迷惑をおかけいたしますが、30分後を目安に再度ご確認をお願いいたします。
        </p>
        <button class="register-button" @click="activation()">
          Netflix視聴開始
        </button>
        <p>※この特典は会員ご本人様のみご利用いただけます。</p>
        <p>
          ※ベーシックプラン以外をご選択される場合、以下2点のご確認をお願いします。
        </p>
        <ol>
          <li>
            初回登録時はベーシックプランをご選択いただき、登録後改めてBenefit
            Stationマイページの「Netflixアカウント管理ページ（本ページ）」よりアップグレードのご登録をお願いいたします。
          </li>

          <li>
            ご退職時など所属する企業・団体の福利厚生から外れる際には、ご自身でのダウングレードのお手続きが必要となりますので予めご注意ください
          </li>
        </ol>
      </div>
      <p>Netflixご優待の<a href="https://bs.benefit-one.inc/otherPage?other_id=netflixplan">詳細はこちら</a></p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    res: {
      type: Object,
      default: {},
    },
  },
  methods: {
    activation () {
      const Url = this.res.activationProxyURL;
      window.open(Url, '_blank');
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

.inactive {
  text-align: center;
  > p {
    &:first-of-type {
      font-size: 20px;
    }
  }

  a {
    text-decoration: underline;
    font-size: 15px;
    color: #007aff;
    padding: 0.8rem 0 0 0;
  }
  ol {
    list-style: decimal;
    list-style-position: inside;
    li {
      padding: 4% 0 0 0;
    }
  }

  .register {
    margin: 45px 0;
    &-button {
      color: #ffffff;
      font-size: 24px;
      background: var(--メインカラー-e60021) 0% 0% no-repeat padding-box;
      background: #e60021 0% 0% no-repeat padding-box;
      border-radius: 4px;
      margin: 15px 0;
      padding: 18px 126px;
    }
    > p {
      font-size: 15px;
      padding: 2% 0 0 0;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .inactive {
    > p {
      font-size: 13px !important;
    }

    a {
      text-decoration: underline;
      font-size: 15px;
      color: #007aff;
      padding: 0.8rem 0 0 0;
    }

    .register {
      margin: 40px 0;
      &-button {
        padding: 10px 93px;
      }
      > p {
        font-size: 13px;
      }
    }
  }
}

@media only screen and (max-width: 639px) {
  .title {
    margin: -1.5rem calc(50% - 50vw) 1.7rem;
  }
}
</style>
