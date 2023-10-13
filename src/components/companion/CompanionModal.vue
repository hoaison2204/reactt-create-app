<template>
  <!-- モーダルウインドウ -->
  <transition name="companion-modal">
    <div v-if="isShow" :class="classObject" >
      <div class="c-modal__inner">
        <div class="companion-modal-header flex justify-between items-center">
          <div class="back-page-companion-icon-arrow justify-self-start">
            <Icon name="arrow_left" width="30" height="30" @click="hideModal()"/>
          </div>
          <p class="companion-header-title text-xl font-bold">宿泊同行者の申請</p>
          <div></div>
        </div>
        <div class="c-modal__content">
          <slot />
        </div>
        <div class="companion-modal-footer">
          <button class="companion-modal-back-btn" @click="hideModal()">
            戻る
          </button>
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
    htmlTitle: {
      type: String,
      default: ""
    },
    licenser: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: ""
    },
    widthSize: {
      type: String,
      default: ""
    },
    isHideValid: {
      type: Boolean,
      default: true
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
    showModalCompanion() {
      if (this.isShow) return;
      this.isShow = true;
      this.$modal.inert = true;
      this.fixScroll();
    },
    hideModal() {
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
    }
  },

  beforeDestroy() {
    this.fixReset();
  }
};
</script>

<style lang="scss" scoped>
.companion-modal-header {
  position: absolute;
  top: 0;
  left: 0;
  height: 52px;
  width: 100%;
  background: #ffff;
  border-bottom: 2px solid rgb(230, 0, 33);
}

.companion-header-title {
  font-size: 18px;
  color: #1F2021;
}

.companion-modal-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 52px;
  width: 100%;
  background: #ffff;
  box-shadow: 0px -2px 4px #1F20211A;
  display: flex;
  justify-content: center;
  align-items: center;
}

.companion-modal-back-btn {
  height: 37px;
  width: 95%;
  border: 1px solid #A8AAAD;
  border-radius: 3px;
  background: #ffff;
}

.add-companion-icon-plus {
  display: inline;
}

.companion-modal-leave-active {
  transform: translate(0px, 0px);
  transition: transform 300ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.companion-modal-leave-to {
  transform: translateX(-100vw) translateX(0px);
}

.c-modal__head__licenser {
  margin-top: 1.125rem;
  text-align: right;
}
</style>
