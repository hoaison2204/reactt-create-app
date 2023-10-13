<template>
  <!-- モーダルウインドウ -->
  <transition name="modal">
    <div v-if="isShow" @click.self="clickOutside&&hideModal()" :class="classObject">
      <div class="c-modal__inner">
        <div v-if="closeBtn || title" class="c-modal__head">
          <!-- 閉じるボタン -->
          <div v-if="closeBtn" @click="hideModal()" class="c-modal__btnClose">
            <button style="background: #fff; cursor: pointer;">
              <Icon name="action_close" width="18" height="18" />
            </button>
          </div>

          <!-- タイトル -->
          <h3 v-if="title" class="c-modal__head__title">{{ title }}</h3>
          <!-- HTMLとして渡すタイトル -->
          <h3
            v-if="htmlTitle"
            v-html="htmlTitle"
            class="c-modal__head__title c-modal__head__title--textArignLeft"
          ></h3>

          <p v-if="licenser" class="c-modal__head__licenser">{{ licenser }}</p>
        </div>

        <div class="c-modal__content">
          <!-- <div tabindex="0" ref="modalStartFocus" @keydown.prevent.shift.tab="moveBottom"></div> -->
          <slot />
          <!-- <div tabindex="0" ref="modalEndFocus" @keydown.prevent.tab.exact="moveTop"></div> -->
        </div>
      </div>
      <!-- /.c-modal__inner -->
    </div>
    <!-- /.c-modal -->
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
    this.$once("hook:beforeDestroy", function() {
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
    }
  },

  beforeDestroy() {
    this.fixReset();
  }
};
</script>

<style lang="scss" scoped>
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

.c-modal__head__licenser {
  margin-top: 1.125rem;
  text-align: right;
}
</style>
