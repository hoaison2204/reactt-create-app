<template>
  <section>
    <div class="main">
      <h2 class="title">
        {{ this.title }}
      </h2>
      <div class="recovery">
        <p>{{ this.text }}</p>
        <button @click="recovery()">{{ this.buttonText }}</button>
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
    recoveryUrl: null,
    title: null,
    text: null,
    buttonText: null,
  },
  methods: {
    recovery() {
      const Url = this.recoveryUrl;
      window.open(Url, "_blank");
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
  .recovery {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 6px #00000029;
    border-radius: 8px;
    text-align: center;
    margin: 1rem 0;
    padding: 3% 0 0 0;
    > p {
      &:first-child {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  button {
    color: #ffffff;
    background-color: #e60021;
    border-radius: 4px;
    padding: 1rem 16%;
    margin: 7% 3% 3%;
    font-size: 24px;
    width: auto;
    &:disabled {
      background-color: #aaa;
    }
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
  .active-error {
    padding: 3rem 1rem;
    margin: 1rem 1rem;
    font-size: 13px;
  }

  .main {
    .recovery {
      padding: 6% 0;
      > p {
        &:first-child {
          font-size: 16px;
          padding: 0 3%;
        }
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
  }
}
</style>
