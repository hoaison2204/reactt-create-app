<template>
  <!-- モーダルウインドウ -->
  <transition name="modal">
    <div v-if="isShow" @click.self="clickOutside && hideModal()" :class="classObject">
      <div class="c-modal__inner overflow-visible">
        <!-- 閉じるボタン -->
        <div v-if="closeBtn" @click="hideModal()" class="relative">
          <button style="cursor: pointer;" class="absolute -top-9 right-0">
            <Icon name="action_close" width="30" height="30" :color="'#ffff'" />
          </button>
        </div>
        <!-- タイトル -->
        <div class="mypage-modal__title">
          <p>{{ title }}</p>
        </div>
        <div class="mypage-modal__body">
          <div :class="{ 'mypage-modal__content': is_contentCenter }">
            <p v-if="is_contentCenter">
              {{ contentText }}
            </p>
            <slot />
          </div>
          <div v-if="parentMethodNameLeft" class="flex gap-4 justify-center">
            <button @click="parentMethodIgnition(parentMethodNameLeft)" class="c-btn c-btn-gray">
              <span>{{ leftBtnText }}</span>
            </button>
            <button @click="parentMethodIgnition(parentMethodNameRight)" class="c-btn c-btn-red">
              <span>{{ rightBtnText }}</span>
            </button>
          </div>
          <div v-else class="flex gap-4">
            <button @click="hideModal()" class="c-btn c-btn-gray">
              <span>{{ leftBtnText }}</span>
            </button>
            <button @click="parentMethodIgnition(parentMethodNameRight)" class="c-btn c-btn-red">
              <span>{{ rightBtnText }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    closeBtn: {
      type: Boolean,
      default: true
    },
    clickOutside: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    isHideValid: {
      type: Boolean,
      default: true
    },
    // ボタン テキスト
    leftBtnText: {
      type: String,
      default: ""
    },
    rightBtnText: {
      type: String,
      default: ""
    },
    // コンテンツのテキストを上下、左右中央に寄せる
    is_contentCenter: {
      type: Boolean,
      default: false
    },
    // コンテンツの中央のテキスト
    contentText: {
      type: String,
      default: ""
    },
    // 左のボタンをクリックしたとき、発火させたいメソッド名
    // メソッド名が空欄の場合、hideModalメソッドが発火
    parentMethodNameLeft: {
      type: String,
      default: ""
    },
    // 右のボタンをクリックしたとき、発火させたいメソッド名
    parentMethodNameRight: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    isShow: false,
    scrollTopTimer: false,
    scrollTopFlg: false,
    fromTop: null
  }),
  computed: {
    widthSizeClass() {
      if (!this.widthSize) return;
      return "c-modal--width" + this.widthSize;
    },
    classObject() {
      return ["c-modal", this.widthSizeClass];
    }
  },
  mounted() {
    // 画面をリサイズした時にもモーダル用に高さを取得
    const onResize = _.debounce(this.setHeight, 200);
    window.addEventListener("resize", onResize);
    this.$once("hook:beforeDestroy", function () {
      window.removeEventListener("resize", onResize);
    });
    this.setHeight();
  },
  methods: {
    show() {
      if (this.isShow) return;
      this.isShow = true;
      this.$modal.inert = true;
      this.fixScroll();
    },
    hideModal() {
      if (!this.isHideValid) return;
      this.hide();
      this.$emit('close')
    },
    hide() {
      if (!this.isShow) return;
      this.isShow = false;
      this.$emit("hide", "");
      this.$modal.inert = false;
      this.fixReset();
    },
    fixReset() {
      document.body.style.top = "";
      document.body.style.position = "static";
      window.scrollTo({ top: parseInt(this.fromTop || "0") });
    },
    fixScroll() {
      // 表示時にスクロールを固定
      if (this.isShow) {
        this.fromTop = window.scrollY;
        document.body.style.width = "100%";
        document.body.style.top = `-${this.fromTop}px`;
        document.body.style.position = "fixed";
      }
    },
    // モーダルのSP用にアドレスバーを除いた画面の高さを取得
    setHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
    // 右のボタンを押したとき、親コンポーネントのメソッドを発火
    parentMethodIgnition(parentMethodName) {
      // 親コンポーネントにv-on ディレクティブの記述が必要
      this.$emit(parentMethodName)
    }
  },
  beforeDestroy() {
    this.fixReset();
  }
};
</script>

<style lang="scss" scoped>
.c-modal {
  @include mq() {
    display: inline-block;
  }
}
::v-deep .c-modal {
  flex: none;
  &__inner {
    @include mq() {
      height: 30%;
      width: 80%;
      background-color: rgba(255, 0, 0, 0);
    }
  }
}
.mypage-modal {
  &__title {
    height: 91px;
    font-size: 24px;
    font-weight: bold;
    line-height: 91px;
    text-align: center;
    border-bottom: 2px solid #E60021;
    @include mq {
      display: none;
    }
  }
  &__body {
    width: 75vw;
    min-height: 35vh;
    padding: 0 25vh 4vh;
    @include mq() {
      position: absolute;
      top: 30%;
      left: 2.5%;
      width: 95%;
      min-height: 0;
      padding: 0 12px 20px;
      background-color: white;
      border-radius: 12px;
    }
  }
  &__content {
    height: 25vh;
    line-height: 25vh;
    text-align: center;
    >p {
      font-weight: bold;
      font-size: 24px;
      @include mq() {
        font-size: 13px;
      }
    }
  }
}
// ボタン
.c-btn {
  width: 80vw;
  padding: 13px 15px;
  font-size: 14px;
  text-align: center;
  border-radius: 0.375rem;
  font-weight: 700;
  border-width: 1px;
  border-style: solid;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  @include mq() {
    width: 100%;
    font-size: 13px;
  }
  &-white {
    background-color: #FFFFFF;
    color: #1F2021;
  }
  &-red {
    background-color: #E60021;
    color: #FFFFFF;
  }
}
// Modal transaction
.modal-enter-active,
.modal-leave-active .modal-enter,
.modal-leave-to {
  transition: opacity ease 0.2s;
}
.modal-enter-active,
.modal-leave-active {
  opacity: 1;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>