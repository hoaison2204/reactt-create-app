<template>
  <footer
    :class="footerClassName"
    :style="isGCService(mypageDisplayCode) ? 'padding-top: 0px;' : '' "
    :inert="$modal.inert"
  >
    <template v-if="showFooterMenu">
      <!-- CRM では English が不要の処理になるので非表示 -->
      <div class="wovn-languages" v-if="isShowLanguage()">
        <i><img src="https://cms.benefit-one.inc/sites/default/files/2023-02/wovn-icon%402x.png" alt="" width="28" height="28"></i>
        <span class="wovn-switch" data-value="ja">日本語</span>
        <span>|</span>
        <span class="wovn-switch" data-value="en">English</span>
      </div>
      <CMS v-if="!isCrm(mypageDisplayCode)"
          contents_type="block_contents"
          location_code="BS_TOP_01_012-TOP_minibanner"
      />
      <div class="l-footer__menu" v-if="!isCrm(mypageDisplayCode) && !isGCService(mypageDisplayCode)">
        <div class="l-footer__menu__inner">
          <ul class="l-footer__info__inner__serviceList">
            <template v-if="!isLogin()">
              <li>
                <a @click="linkToHealthPortal">
                  <img src="https://cms.benefit-one.inc/sites/default/files/contents/top/logo_kenkopoint.jpg" alt="健康ポイント">
                </a>
              </li>
              <li v-if="!isIcService(mypageDisplayCode)">
                <a @click="linkToIncentivepoint">
                  <img src="https://cms.benefit-one.inc/sites/default/files/contents/top/logo_incentivepoint.jpg" alt="IC">
                </a>
              </li>
              <li v-if="!isGCService(mypageDisplayCode)">
                <a @click="linkToBopf">
                  <img src="https://cms.benefit-one.inc/sites/default/files/contents/top/logo_bpf.jpg" alt="BPF">
                </a>
              </li>
            </template>
            <template v-else>
              <li v-if="subscriptions.find(el => el.boServiceCode === 'HP')">
                <a @click="linkToHealthPortal">
                  <img src="https://cms.benefit-one.inc/sites/default/files/contents/top/logo_kenkopoint.jpg" alt="健康ポイント">
                </a>
              </li>
              <li v-if="subscriptions.find(el => el.boServiceCode === 'IC') && !isIcService(mypageDisplayCode)">
                <a @click="linkToIncentivepoint">
                  <img src="https://cms.benefit-one.inc/sites/default/files/contents/top/logo_incentivepoint.jpg" alt="IC">
                </a>
              </li>
              <li v-if="!isGCService(mypageDisplayCode)">
                <a @click="linkToBopf">
                  <img src="https://cms.benefit-one.inc/sites/default/files/contents/top/logo_bpf.jpg" alt="BPF">
                </a>
              </li>
            </template>
          </ul>
        </div>
      </div>

      <div class="l-footer__menu">
        <!-- とく放題とライフエールではフッターを横幅いっぱいに表示する-->
        <CMS v-if="isTokuhodai(mypageDisplayCode)"
            contents_type="block_contents"
            location_code="CRTH_TOP_99_01-footer"
        />
        <CMS v-else-if="isLifeWell(mypageDisplayCode)"
            contents_type="block_contents"
            location_code="CRLY_TOP_99_01-footer"
        />
        <div v-else class="l-footer__menu__inner l-footer__menu__inner-bottom"
          :style="isGCService(mypageDisplayCode) ? 'padding-top: 0;padding-bottom: 0;' : ''">
          <CMS 
              contents_type="header_footer"
              view_area="footer"
          />
          <!--
          <div class="l-footer__menu-list">
            <div class="l-footer__menu-list__body">
              <CMS
                  contents_type="header_footer"
                  view_area="footer"
              />
            </div>
          </div>
          <div class="l-footer__menu-banner">
            <ul>
              <li class="l-footer__menu-banner__item">
                <CMS
                    contents_type="block_contents"
                    location_code="BS_TOP_01_013-TOP_form"
                />
              </li>
            </ul>
          </div>
          -->
        </div>
      </div>
    </template>
    <!-- とく放題とライフエールではCMSにcopyrightが含まれるためこのcopyrightは非表示 -->
    <div v-if="!isTokuhodai(mypageDisplayCode) && !isLifeWell(mypageDisplayCode)" class="l-footer__copy">
      &copy;{{ $moment().year() }} {{ $config.author }}
    </div>
  </footer>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      showFooterMenu: true,
      subscriptions: [],
    };
  },
  methods: {
    /**
     * CRM 汎用用で English を非表示にする対応
     */
    isShowLanguage() {
      if (this.mypageDisplayCode == `CR` || this.mypageDisplayCode == `TH` || this.mypageDisplayCode == `LY` || this.isIcService(this.mypageDisplayCode) || this.isGCService(this.mypageDisplayCode)) {
        return false;
      }
      return true;
    },
    linkToHealthPortal(){
      const link = process.env.VUE_APP_HLPT_URL
      window.open(link, '_blank')
    },
    linkToIncentivepoint(){
      const link = process.env.VUE_APP_ICPT_URL
      window.open(link, '_blank')
    },
    linkToBopf(){
      const link = process.env.VUE_APP_BOPF_URL
      window.open(link, '_blank')
    },
    /**
     * フッターのメニュー表示の有無を判定するフラグをストアから取得する
     */
    getShowFooterMenuFlg() {
      this.showFooterMenu = this.$page.showFooterMenu;
    },
    isLogin() {
      if (this.$auth.loggedIn) return true;
      return false;
    },
    getFromSiteCode() {
      return this.$repositories("user").contractInfo(this.mypageDisplayCode)
        .then((res) => {
          // store から、companyCd・customerNo を取得
          const { user } = this.$store.getters['auth/get'];
          const customerNo = user.ssoCustomerNo

          // リクエストから、一致する情報を抽出
          const contractInfo = res.data.contractInfo;
          contractInfo.forEach((info) => {
            if( info.customerNo === customerNo ) {
              this.subscriptions = info.subscriptions;
            }
          });
        })
        .catch(() => {
          // TODO: エラー時の処理
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getShowFooterMenuFlg();
    });
    console.log("login", this.$auth.loggedIn);
    this.getFromSiteCode();
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.getShowFooterMenuFlg();
      });
    }
  },
  computed: {
    footerClassName() {
      let className = this.isTokuhodai(this.mypageDisplayCode) || this.isLifeWell(this.mypageDisplayCode) ? "footer" : "l-footer";

      if (this.showFooterMenu) className += " l-footer--show";

      return className;
    },
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
  },
};
</script>
<style lang="scss" scoped>
.wovn-languages {
  color: #73767A;
  display: flex!important;
  gap: 6px;
  justify-content: center;
  margin-bottom: 10px;
}
.wovn-languages i {
  align-self: center;
  display: flex;
}
.wovn-languages img {
  display: inline-block;
  max-width: 14px;
  height: auto;
}
.wovn-languages .wovn-switch {
  cursor: pointer;
}
.wovn-switch:hover {
  color: #da291c;
}
.wovn-switch.selected {
  cursor: unset;
  color: #1F2021;
}
</style>
