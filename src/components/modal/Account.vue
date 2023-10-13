<template>
  <div class="p-account-modal">
    <Modal
      ref="account-modal"
      width-size="M"
      title="アカウントを選択"
      @hide="hide"
      :isHideValid="false"
      :closeBtn="false"
    >
      <div class="c-modal__sp-contain c-modal__sp-contain--isVisible-Title">
        <div class="c-modal__body__inner">
          <p class="p-account-modal__title">
            ログインするアカウントを<br class="c-displaySp" />選択してください。
          </p>
          <div class="p-account-modal__list">
            <button
              v-for="account in accountList"
              :key="account.id"
              class="p-account-modal__list__account"
              :class="{
                'p-account-modal__list__account--current':
                  account.id == selectedId
              }"
              @click="selectedAccount(account.id)"
              style="width: 100%"
              :style="
                account.id == selectedId
                  ? 'background: #fff5e2'
                  : 'background: #fff'
              "
            >
              <span
                v-if="account.id == selectedId"
                class="p-account-modal__list__account--current__check"
              >
                <Icon
                  name="menu_check"
                  :color="$colors.brand.red"
                  width="18px"
                  height="18px"
                />
              </span>
              <p class="p-account-modal__list__name">{{ account.name }}</p>
            </button>
          </div>
        </div>
        <div class="c-buttons">
          <div class="c-buttons__inner">
            <div class="c-buttonWrap4" @click="hide">
              <Button style-type="primary" color="color4">
                キャンセル
              </Button>
            </div>
          </div>
          <div class="c-buttons__inner">
            <div class="c-buttonWrap4" @click="userSelect">
              <Button style-type="primary" color="color2">
                ログイン
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  props: ["accountList"],
  data() {
    return {
      selectedId: 1
    };
  },
  methods: {
    selectedAccount(id) {
      this.selectedId = id;
    },
    userSelect() {
      this.$emit("userSelect", this.selectedId);
    },
    hide() {
      this.$refs["account-modal"].hide();
      this.$emit("hide");
    },
    show() {
      this.$refs["account-modal"].show();
      this.selectedId = this.accountList[0].id;
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped></style>
