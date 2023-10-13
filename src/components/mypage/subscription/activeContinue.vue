<template>
  <section>
    <div class="inactive">
      <!--TODO:文言についてprops化-->
      <h2 class="title">
       {{this.title}}
      </h2>
      <p>
       {{this.lead}}<br>
       画面の指示に従ってお進みください。
      </p>
      <div class="register">
        <button class="register-button" @click="activationContinue()">
          {{this.buttonText}}
        </button>
      </div>
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
    title:null,
    lead:null,
    buttonText:null
  },
  methods: {
    activationContinue () {
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
    background-color: #e60021;
    border-radius: 4px;
    padding: 1rem 16%;
    margin: 4% 3% 3%;
    font-size: 24px;
    width: auto;
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
    border-radius: 15px;
    margin: 3% 0;
    font-size: 24px;
    width: 250px;
    padding: 5%;
    line-height: 1.3;
    font-weight: bold;
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
