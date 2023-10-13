<template>
  <div v-if="isShow" class="p-user-menus">
    <div class="p-user-menus__overlay" @click.stop="$emit('hide')"></div>
    <div class="p-user-menus__inner">
      <ul class="p-user-menus__list">
        <li v-if="isGCService(mypageDisplayCode)"　class="p-user-menus__head">
          会員ID：{{ userData.ssoCustomerNo }}
        </li>
        <li v-else class="p-user-menus__head">
          会員ID：{{ userData.ssoCustomerNo }}<br>
          店頭番号：{{ userData.ssoMembrNo }}
        </li>
        <li class="p-user-menus__item">
          <a
            :href="domainMypage + '/mypage'"
            class="p-user-menus__item__link"
          >
            <span>マイページ</span>
            <div class="p-user-menus__arrow p-user-menus__arrow--right"></div>
          </a>
        </li>
        <li class="p-user-menus__item">
          <a
            :href="domainMypage + '/mypage/orders'"
            class="p-user-menus__item__link"
          >
            <span>申込履歴</span>
            <div class="p-user-menus__arrow p-user-menus__arrow--right"></div>
          </a>
        </li>
        <li class="p-user-menus__item" v-if="!isGCService(mypageDisplayCode)">
          <a
            :href="domainMypage + '/mypage/visits'"
            class="p-user-menus__item__link"
          >
            <span>閲覧履歴</span>
            <div class="p-user-menus__arrow p-user-menus__arrow--right"></div>
          </a>
        </li>
        <li class="p-user-menus__item">
          <a
            :href="domainMypage + '/mypage/setting'"
            class="p-user-menus__item__link"
          >
            <span>会員設定</span>
            <div class="p-user-menus__arrow p-user-menus__arrow--right"></div>
          </a>
        </li>
        <li class="p-user-menus__item">
          <router-link
            to="/"
            class="p-user-menus__item__link"
            @click.native="onClickLogout"
          >
            <span>ログアウト</span>
            <div class="p-user-menus__arrow p-user-menus__arrow--right"></div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
  },

  data: () => ({}),
  computed: {
    domainMypage() {
      return this.getMypageDomain(this.mypageDisplayCode);
    },
    userData() {
      if (!this.$auth || !this.$auth.user) return {};
      return this.$auth.user;
    },
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    topDomain() {
      return this.getTopDomain(this.mypageDisplayCode);
    },
    bffTopDomain() {
      return this.getBffTopDomain(this.mypageDisplayCode);
    },
    authFacade() {
      const authFacadeCode = this.mypageDisplayCode; 
      return `${this.getAuthFacade(this.mypageDisplayCode)}/${authFacadeCode.toLowerCase()}`;
    },
    callback_authorization_start_uri() {
      return `${this.bffTopDomain}/v1/top/auth-start`;
    },
    redirectUrl() {     
      return `${this.authFacade}?force_re_authentication=TRUE&callback_authorization_start_uri=${this.callback_authorization_start_uri}`;
    },
  },
  methods: {
    onClickLogout() {
      const redirectAfterLogout = this.isIcService(this.mypageDisplayCode) ? this.redirectUrl : this.topDomain;
      this.$auth.remove(redirectAfterLogout);
    },
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
