<template>
  <Modal
    class="p-mypage-coupon-detail__modal"
    ref="coupon-detail-password"
    width-size="M"
    :closeBtn="closeBtn"
    :isHideValid="isHideValid"
    @close="cancel"
  >
    <div class="c-modal__sp-contain">
      <div class="c-modal__head__title">
        <h3>【現地スタッフ用操作画面】<br>パスワードを入力</h3>
      </div>
      <div>
        <div
          class="p-mypage-coupon-detail__modal__input"
          :class="{ 'modal--reject': rejectPassword }"
        >
          <label class="c-title3" for="password">パスワード</label>
          <div class="c-input">
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="パスワードを入力"
            />
          </div>
        </div>
        <p v-if="rejectPassword" class="p-mypage-coupon-detail__modal__reject">
          <Icon name="alert" color="#CC0621" width="20px" height="20px" /><span
            >パスワードが異なります。</span
          >
        </p>
      </div>
      <div class="c-buttons c-buttons--mb-sp">
        <div class="c-buttons__inner">
          <div class="c-buttonWrap4">
            <Button @click.native="cancel" style-type="primary" color="color4">
              キャンセル
            </Button>
          </div>
        </div>
        <div class="c-buttons__inner">
          <div class="c-buttonWrap4">
            <Button style-type="primary" @click.native="submit" color="color2">
              送信する
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "detail"
    },
    rejectPassword: {
      type: Boolean,
      default: false
    },
    closeBtn: {
      type: Boolean,
      default: true
    },
    isHideValid: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    password: ""
  }),
  computed: {
    isShowCoupon() {
      return this.type != "detail";
    }
  },
  methods: {
    showModal(name) {
      this.$refs[name].show();
    },
    hideModal(name) {
      this.$refs[name].hide();
    },
    submit() {
      this.$emit("submit", password);
      this.password = "";
    },
    cancel() {
      this.$emit("closePopup");
      this.password = "";
      this.$refs["coupon-detail-password"].hide();
    }
  }
};
</script>
