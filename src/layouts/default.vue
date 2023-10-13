<template>
  <div
    class="l-default l-default__container"
    :class="{
      'l-default__container--maintenance': isMaintenance,
      'c-page-print': $route.path === '/mypage/coupon/show/digi'
    }"
  >
    <div class="l-default__content" id="capture">
      <Header
        class="l-default l-default__header"
        :class="{ 'l-default__header--map': $route.path === '/map' }"
        :isShowSupplementaryCoupon="isShowSupplementaryCoupon"
        :isShowCafeteriaPoint="isShowCafeteriaPoint"
        v-if="isHeader"
      />
      <div
        class="l-default__header--bottom"
        :class="isBorderBottom"
        v-if="isHeader"
      >
        <div class="l-default__header--bottom__inner">
          <PageHeader
            v-if="isPageHeader"
            :mypageDisplayCode="mypageDisplayCode"
            :class="{ 'c-page-header--map': $route.path === '/map' }"
          />
        </div>
      </div>
      <router-view @contractAndCourseIDs="contractAndCourseID = $event" :isShowSupplementaryCoupon="isShowSupplementaryCoupon" :isShowCafeteriaPoint="isShowCafeteriaPoint"/>
      <Footer-link />
      <div class="c-pageTop" v-if="isPageTop">
        <div class="c-pageTop__button" @click="scrollToTop" tabindex="0" role="button" @keyup.enter="scrollToTop">
          <Icon
            class="pageTop__button__icon"
            name="arrow_up"
            width="40px"
            height="40px"
          />
        </div>
      </div>
      <Footer
        class="l-default__footer"
        :class="{ 'l-default__footer--map': $route.path === '/map' }"
      />
    </div>
    <Debug v-if="isDebug" />
    <Notify ref="notify" />
    <CommonModal />
    <!-- <TokenTimer v-if="isLogin" /> -->
    <LoadingProcess />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import get from 'lodash/get';
export default {
  data() {
    return {
      contractAndCourseID: {},
      scroll: 0,
      isHeader: true,
      isFooter: true,
      isPageTop: true,
      isMaintenance: false,
      isShowSupplementaryCoupon: false,
      isShowCafeteriaPoint: false,
      isPageHeader: true,
    };
  },
  async created() {
    // ICかつ、not-available画面だったら createdでのAPIコールは不要
    const currentPath = location.href;
    if (this.mypageDisplayCode == "IC" && currentPath.endsWith("/not-available")) {
      return;
    }
    const coupons = await this.$repositories('mypage').getMyCoupons();
    const cafe = await this.$repositories('cafe').checkCafeAvailable();

    const availableDataList = get(coupons, 'data.availableDataList', []) || [];
    const avaialbleCafe = cafe.data;

    if (availableDataList && availableDataList.length > 0) {
      this.isShowSupplementaryCoupon = true;
    }

    if (avaialbleCafe && avaialbleCafe === 'OK') {
      this.isShowCafeteriaPoint = true;
    }
  },
  mounted() {
    console.log("this.isDebug", this.isDebug);
    this.isTitle = this.$page.isTitle;
    // Dont use this cookie anymore
    // this.checkLogin();
    this.$nextTick(() => {
      this.getHeaderFlg();
      this.getPageTopFlg();
      this.getMaintenanceFlg();
      this.getPageHeaderFlg();
    });
  },
  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    isBorderBottom() {
      if (this.$page.isBreadcrumb && !this.$page.isTitle) return "";
      return "l-default__header--bottom-border";
    },
    isLogin() {
      if (this.$auth.loggedIn) return true;
      return false;
    },
    isDebug() {
      return (
        process.env.VUE_APP_DEV_MODE === this.CONST.ENV.LOCAL ||
        process.env.VUE_APP_DEV_MODE === this.CONST.ENV.DEVELOPMENT
      );
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    getHeaderFlg() {
      this.isHeader = this.$page.isHeader;
    },
    getPageTopFlg() {
      this.isPageTop = this.$page.isPageTop;
    },
    getMaintenanceFlg() {
      this.isMaintenance = this.$page.isMaintenance;
    },
    getPageHeaderFlg() {
      this.isPageHeader = this.$page.isPageHeader;
    },
    /**
     * Cookie userInfoが存在しない場合、store auth.userを削除する
     * ※ログイン有効期間を過ぎたため、ログアウトとする
     */
    checkLogin() {
      if (!Cookies.get("userInfo")) {
        this.$auth.removeUser();
        this.$store.commit["subsidy/remove"];
      }
    }
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.getHeaderFlg();
        this.getPageTopFlg();
        this.getMaintenanceFlg();
      });
    }
  },
  errorCaptured(error, vm, info) {
    // let errorNotifyOptions = {
    //   group: "error",
    //   type: "error",
    //   title: info,
    //   text: error,
    //   duration: 10000,
    // };
    // this.$refs.notify.show(errorNotifyOptions);
    this.$log.error(info);
  }
};
</script>
