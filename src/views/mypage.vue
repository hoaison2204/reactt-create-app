<template>
  <main :class="mainClasses">
    <router-view
      class="l-main__content"
      :mypageBoCode="mypageBoCode"
      :mypageDisplayCode="mypageDisplayCode"
      :isShowSupplementaryCoupon="isShowSupplementaryCoupon"
      :isShowCafeteriaPoint="isShowCafeteriaPoint"
      :companyCd="isCompanyCd"
    />
    <MypageSideMenu
      class="l-side lg:hidden"
      v-if="showSideMenu && mypageSideMenuReady"
      :isShowSupplementaryCoupon="isShowSupplementaryCoupon"
      :isShowCafeteriaPoint="isShowCafeteriaPoint"
      :mypageBoCode="mypageBoCode"
      :mypageDisplayCode="mypageDisplayCode"
      :companyCd="isCompanyCd"
      :icSelfPayEnabled="icSelfPayEnabled"
    />
  </main>
</template>

<script>
export default {
  meta: {
    page: {
      name: 'マイページ',
    },
  },
  props: {
    isShowSupplementaryCoupon:{
      type: Boolean,
      default: false
    },
    isShowCafeteriaPoint:{
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    showSideMenu: true,
    singleColumnLayoutPages: [
      'MyPageMembership',
      'お申し込みキャンセル（内容確認）'
    ],
    isCompanyCd: '',
    mypageBoCode: '',
    icSelfPayEnabled: false,
    mypageSideMenuReady: false,
  }),
  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    isSingleColumnLayout() {
      return this.singleColumnLayoutPages.includes(this.$route.name) ||
             this.$route.name.toLowerCase().includes('netflix') ;
    },
    mainClasses() {
      return [
        'l-main',
        {
          'l-main--has-side': !this.isSingleColumnLayout,
        },
      ];
    }
  },
  methods: {
    getSideMenuFlg() {
      this.showSideMenu = this.$page.showSideMenu;
    },
    selfPayEnabled() {
      return this.$repositories("user").icUserSession()
        .then((res) => {
            return {
              self_pay_enabled: res.data.selfPayEnabled
            }
        })
        .catch(() => {
            return {
              self_pay_enabled: false
            }
        });
    },
  },
  mounted() {
    this.$meta.setDocumentTitle('マイページ');
    this.$nextTick(() => {
      this.getSideMenuFlg();
    });
    // 遷移元のサイトを判断するコードの取得
    this.getFromSiteCode().then((codes) => {
      this.isCompanyCd = codes.companyCd;
      this.mypageBoCode = codes.mypageBoCode;
    });
    this.selfPayEnabled().then((res) => {
      console.log("selfPayEnabled: ", res.self_pay_enabled);
      this.icSelfPayEnabled = res.self_pay_enabled;
      this.mypageSideMenuReady = true;
    });
  },
  watch: {
    $route() {
      this.$meta.setDocumentTitle('マイページ');
      this.$nextTick(() => {
        this.getSideMenuFlg();
      });
    },
  },
};
</script>
