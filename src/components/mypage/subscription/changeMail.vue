<template>
  <section>
    <h2 class="title">
      {{ this.title }}
    </h2>
    <div class="mail-change">
      <p>以下の内容をご確認の上、お申し込みください。</p>
      <div class="mail-now">    
        <p>現在ご登録中のアドレス</p>
        <p class="address">{{ this.registaddress }}</p>
      </div>
      <p>新しいメールアドレスを入力して「変更する」ボタンを押して下さい。</p>
      <input
        type="email"
        autocomplete="off"
        v-model="email"
        oncopy="return false"
        onpaste="return false"
        oncontextmenu="return false"
        placeholder="メールアドレスを入力"
        @blur="validateEmail();validateEmailAgain()"
      />
      <span v-if="emailIsValid === false" class="error-message">
        正しいメールアドレスの形式で入力してください。
      </span>
      <input
        type="email"
        autocomplete="off"
        v-model="emailAgain"
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
      <button :disabled="!isValidForm" @click="changeMail()">変更する</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailAgain: "",
      emailIsValid: null,
      emailAgainIsValid: null,
    };
  },
  props: {
    subscriptionServiceId: null,
    title: null,
    registaddress: null,
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailIsValid = emailRegex.test(this.email);
    },
    validateEmailAgain() {
      this.emailAgainIsValid = this.email === this.emailAgain;
    },
    async changeMail() {
      this.$loading.startProcessing();
      try {
        const response = await this.$repositories("mypage").changeMail(this.email);
        if (response.data.apiResult === "OK") {
          const val = "2";
          const newTab = window.open(
            "/mypage/payroll/netflix/success?val=" + val,
            "_blank"
          );
          newTab.onload = () => {
            location.reload();
          };
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.email = null;
        this.emailAgain = null;
        this.$loading.finishProcessing();
      }
    },
  },
  computed: {
    isValidForm() {
      return this.emailIsValid && this.emailAgainIsValid;
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

input {
  border: 1px solid #cacccf;
  width: 30%;
  padding: 10px;
  border-radius: 4px;
  display: block;
  margin: 30px auto 8px;
}

.error-message {
  color: #e60021;
  font-size: 0.8rem;
  font-weight: bold;
  &::before {
    content: "*";
  }
}

.active-error {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 6px #00000029;
  border-radius: 8px;
  padding: 3rem 13rem;
  text-align: center;
  margin: 5rem;
  white-space: pre-wrap;
  a {
    text-decoration: underline;
    font-size: 15px;
    color: #007aff;
    padding: 0.8rem 0 0 0;
  }
}

.main {
  text-align: center;
  .mail {
    &-change {
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 6px #00000029;
      border-radius: 8px;
      text-align: center;
      margin: 1rem 0;
      padding: 3% 0 0 0;
    }
    &-now {
      margin: 50px 0 80px 0;
    }
  }
  button {
    color: #ffffff;
    background-color: #e60021;
    border-radius: 4px;
    padding: 1rem 16%;
    margin: 3%;
    font-size: 24px;
    width: auto;
    &:disabled {
      background-color: #aaa;
    }
  }
  .address {
  font-weight: bold;
  font-size: 1.8rem;
  width: 50%;
  display: inline-block;
  background: #f2f2f2;
  padding: 5px;
  margin: 12px 0 0 0;
}
}

@media only screen and (max-width: 1024px) {
  .active-error {
    padding: 3rem 6rem;
  }
}

@media only screen and (max-width: 639px) {
  .title {
    margin: -1.5rem calc(50% - 50vw) 1.7rem;
  }

input {
  width: 80%;
}

  .active-error {
    padding: 3rem 1rem;
    margin: 1rem 1rem;
    font-size: 13px;
  }

  .main {
    .mail {
      &-change {
        padding: 4% 2% 12%;
        > p {
          &:first-child {
            font-size: 16px;
            padding: 0 3%;
          }
        }
      }
      &-now {
        margin: 50px 0 80px 0;
      }
    }
    button {
    color: #ffffff;
    border-radius: 15px;
    margin: 6% 0 0 0;
    font-size: 24px;
    width: 250px;
    padding: 5%;
    line-height: 1.3;
    font-weight: bold;
    }
    .address {
      font-size: 1.6rem;
      width: 80%;
    }
  }
}
</style>
