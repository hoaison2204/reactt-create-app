<template>
  <div
    class="p-drawer-menu-sp"
    :class="{ 'p-drawer-menu-sp--hide': hideSideMenu }"
  >
    <div
      v-if="isShow"
      class="p-drawer-menu-sp__overlay"
      @click.stop="$emit('hide')"
    ></div>
    <div
      class="p-drawer-menu-sp__inner"
      :class="{ 'p-drawer-menu-sp__inner--open': isShow }"
    >
      <div class="p-drawer-menu-sp__list p-drawer-menu-sp__list--loggedIn">
        <template v-if="$auth.loggedIn">
          <div class="p-drawer-menu-sp__head">
            <template
              v-if="userData.familyName || userData.firstName"
              wovn-ignore
            >
              <div class="p-drawer-menu-sp__head__wrapper">
                <span class="p-drawer-menu-sp__head--userName">{{ userName }}様 </span>
                <div v-if="userData.ssoPrincipalFlg == 1" class="l-header__menu__item__label--self">
                  本人
                </div>
                <div v-if="userData.ssoPrincipalFlg == 0" class="l-header__menu__item__label--family">
                  家族
                </div>
              </div>
              <span v-if="isGCService(mypageDisplayCode)" class="p-drawer-menu-sp__head--userInfo">
                会員ID：{{ userData.ssoCustomerNo }}
              </span>
              <span v-else class="p-drawer-menu-sp__head--userInfo">
                会員ID：{{ userData.ssoCustomerNo }}<br />
                店頭番号：{{ userData.ssoMembrNo }}
              </span>
            </template>
            <span v-else wovn-ignore>氏名未設定</span>
          </div>
          <a v-if="!isIcService(mypageDisplayCode) && !isGCService(mypageDisplayCode)" :href="mypageDomain + '/mypage/benepo?currentID=0'">
            <div class="p-drawer-menu-sp__item--benepo">
              <div class="p-drawer-menu-sp__benepo">
                <p class="p-drawer-menu-sp__benepo--title">保有ベネポ</p>
                <p class="p-drawer-menu-sp__benepo--point">
                  {{ userData.totalPoint }}<span>ベネポ</span>
                </p>
              </div>
              <div
                class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
              ></div>
            </div>
          </a>
        </template>
        <div v-if="!isGCService(mypageDisplayCode)" class="p-drawer-menu-sp__section">クーポン</div>
        <a v-if="!isGCService(mypageDisplayCode)" :href="mypageDomain + '/mypage/coupon?sort=displayFrom'">
          <div
            class="p-drawer-menu-sp__item"
            :class="{ 'p-drawer-menu-sp__bottom-none': (isLogin && isShowSupplementaryCoupon) }"
          >
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>マイクーポン</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <a v-if="!isIcService(mypageDisplayCode) && !isGCService(mypageDisplayCode) && isLogin && isShowSupplementaryCoupon" :href="mypageDomain + '/mypage/coupons'">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>補助クーポン</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <div class="p-drawer-menu-sp__section" v-if="isLogin && isShowCafeteriaPoint && !this.isIcService(this.mypageDisplayCode) && !isGCService(mypageDisplayCode)">カフェ</div>
        <a v-if="isLogin && isShowCafeteriaPoint && !this.isIcService(this.mypageDisplayCode) && !isGCService(mypageDisplayCode)" :href="domainCafe" target="_blank">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>カフェ</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <div v-if="!isGCService(mypageDisplayCode)" class="p-drawer-menu-sp__section">お気に入り</div>
        <a v-if="!isGCService(mypageDisplayCode)" :href="mypageDomain + '/mypage/favorites'">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>お気に入り</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <div v-if="!isGCService(mypageDisplayCode)" class="p-drawer-menu-sp__section">閲覧履歴</div>
        <a v-if="!isGCService(mypageDisplayCode)" href="/mypage/visits">
          <div class="p-drawer-menu-sp__item p-drawer-menu-sp__bottom-none">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>閲覧履歴</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <div v-if="!isGCService(mypageDisplayCode)" class="p-drawer-menu-sp__section">申込履歴</div>
        <a v-if="!isGCService(mypageDisplayCode)" href="/mypage/orders">
          <div class="p-drawer-menu-sp__item p-drawer-menu-sp__bottom-none items-start">
            <div class="p-drawer-menu-sp__subitem"></div>
            <div class="flex flex-col" v-if="!isIcService(mypageDisplayCode)">
              <span>ライフサービス・トラベル</span>
              <!-- <span v-if="isNewBsService(mypageDisplayCode) || (companyCd && !fromSiteUnsupported(companyCd, 'beneRakuten'))">
                （Bene楽天・公共の宿はこちら）
              </span> -->
            </div>
            <div class="flex flex-col" v-else>
              <span>LifeService・Goods</span>
            </div>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>


        <a target="_blank" :href="getLinkSSO('orderStayURL')" v-if="!isCrm(mypageDisplayCode) && !isIcService(mypageDisplayCode) && !isGCService(mypageDisplayCode)">
          <div class="p-drawer-menu-sp__item p-drawer-menu-sp__bottom-none items-start justify-between">
            <div class="flex">
              <div class="p-drawer-menu-sp__subitem"></div>
              <div class="flex flex-col">
                <span>旧サイトで申込された申込履歴</span>
              </div>
            </div>
            <div class="">
              <img
                  src="@/assets/images/icon/arrow-up-right-from-square-solid.svg"
                  alt="arrow-up-right-from-square-solid_icon"
                  width="13" height="13"
                />
            </div>
          </div>
        </a>

        <!-- TODO:次回フェーズで使用する可能性があるため、コメントアウト -->
        <!-- <a target="_blank" :href="getLinkSSO('shopURL')" v-if="mypageDisplayCode && !fromSiteUnsupported(mypageDisplayCode, 'kyutoku') && !fromSiteUnsupported(mypageDisplayCode, 'hitaikou')">
          <div class="p-drawer-menu-sp__item p-drawer-menu-sp__bottom-none items-start justify-between">
            <div class="flex">
              <div class="p-drawer-menu-sp__subitem"></div>
              <div class="flex flex-col">
                <span>ベネ通販</span>
              </div>
            </div>
            <div class="">
              <img
                  src="@/assets/images/icon/arrow-up-right-from-square-solid.svg"
                  alt="arrow-up-right-from-square-solid_icon"
                  width="13" height="13"
                />
            </div>
          </div>
        </a> -->

        <a target="_blank"  :href="`${ isKyutokuMember ? qtokPaymentUrl : 'https://bs.benefit-one.inc/otherPage?other_id=kyuutoku_mypage' }`" v-if="mypageDisplayCode && !fromSiteUnsupported(mypageDisplayCode, 'kyutoku') && !isIcService(mypageDisplayCode) && !isGCService(mypageDisplayCode)">
          <div class="p-drawer-menu-sp__item p-drawer-menu-sp__bottom-none items-start">
            <div class="p-drawer-menu-sp__subitem"></div>
            <div class="flex flex-col">
              <span>給トク払い</span>
            </div>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>



        <div class="p-drawer-menu-sp__section">会員設定</div>
        <a :href="mypageDomain + '/mypage/setting'">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>会員設定</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <div class="p-drawer-menu-sp__section" v-if="!isIcService(mypageDisplayCode) && !isGCService(mypageDisplayCode)">ご利用ガイド</div>
        <a :href="topDomain + '/otherPage?other_id=goriyou'" v-if="!isIcService(mypageDisplayCode) && !isGCService(mypageDisplayCode)">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>ご利用ガイド</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <div class="p-drawer-menu-sp__section" v-if="isGCService(mypageDisplayCode)">ご利用方法</div>
        <a :href="gourmetHowToUseUrl" v-if="isGCService(mypageDisplayCode)">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>ご利用方法</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <div class="p-drawer-menu-sp__section" v-if="!isIcService(mypageDisplayCode)">お知らせ</div>
        <a :href="topDomain + '/information'" v-if="!isIcService(mypageDisplayCode)">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>お知らせ</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
          <router-link
            v-if="$auth.loggedIn"
            class="p-drawer-menu-sp__logout mt-4"
            to="/"
            @click.native="loggedOut"
          >
            ログアウト
          </router-link>
        <div v-else class="p-drawer-menu-sp__login">
          <a :href="redirectUrl">ログイン</a>
        </div>
      </div>
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
    isShowSupplementaryCoupon: {
      type: Boolean,
      default: false
    },
    isLogin: {
      type: Boolean,
      default: false
    },
    isShowCafeteriaPoint:{
      type: Boolean,
      default: false
    },
    companyCd: {
      type: String,
    },
    mypageBoCode: {
      type: String,
    },
  },
  data() {
    return {
      hideSideMenu: false,
      resizeFlag: "",
      contractInfo: []
    };
  },
  computed: {
    orderStayURL() {
      return this.getOrderStayURL(this.mypageDisplayCode);
    },
    shopSSOURL() {
      return this.getShopSSOURL(this.mypageDisplayCode);
    },
    topDomain() {
      return this.getTopDomain(this.mypageDisplayCode);
    },
    mypageDomain() {
      return this.getMypageDomain(this.mypageDisplayCode);
    },
    bffTopDomain() {
      return this.getBffTopDomain(this.mypageDisplayCode);
    },
    domainCafe() {
      const cafeUrl = process.env.VUE_APP_CAFE_SYS_URL;
      return cafeUrl;
    },
    authorizationUrl() {
      return this.getApiAuthorizationUrl(this.mypageDisplayCode);
    },
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    /**
     * ログインユーザー情報を取得して返却する
     * @return {object} - ログインユーザー情報のオブジェクト
     */
    userData() {
      if (!this.$auth || !this.$auth.user) return "";
      return this.$auth.user;
    },
    /**
     * ログインユーザー名を登録状況ごとに結合して返却する
     * @return {string} - ログインユーザー名のテキスト
     */
    userName() {
      if (!this.userData) {
        return "";
      } else if (this.userData.familyName && this.userData.firstName) {
        return this.userData.familyName + " " + this.userData.firstName;
      } else {
        return this.userData.familyName || this.userData.firstName;
      }
    },
    /**
     * ログインページからのリダイレクトするためのURLを生成して返却する
     * @return {string} - ログインページからのリダイレクトするためのURLテキスト
     */
    redirectUrl() {
      return (
        this.authorizationUrl + "/v1/top/login"
      );
    },
    /**
     * 「給トク払い」リンクの条件分岐フラグ
     * @param { void }
     * @return { boolean } boServiceCodeが「SD」の場合、給トクありのアカウント
     */
    isKyutokuMember() {
      let kyutokuFlg = false
      let containFlgs = []
      // ログインユーザが本人以外の場合FALSEで返却
      if (this.userData.ssoPrincipalFlg != 1) { return kyutokuFlg; };
      // contractInfoがなければFALSEで返却
      if (!this.contractInfo || this.contractInfo?.length === 0) { return kyutokuFlg; };

      this.contractInfo.map(obj => {
        const filteredArr = obj.subscriptions.filter(obj => obj.boServiceCode === "SD")
        if (filteredArr.length > 0) return containFlgs.push(true)
        containFlgs.push(false)
      })
      
      if (containFlgs.includes(true)) kyutokuFlg = true
      return kyutokuFlg
    },
    /**
     * 給トクメンバーの場合、「給トク払い」リンク
     * @param { void }
     * @return { string }
     */
    qtokPaymentUrl() {
      return process.env.VUE_APP_WITH_QTOK_PAYMENT_URL
    },
    authFacade() {
      const authFacadeCode = this.mypageDisplayCode; 
      return `${this.getAuthFacade(this.mypageDisplayCode)}/${authFacadeCode.toLowerCase()}`;
    },
    icLogoutRedirectUrl() {
      const callback_authorization_start_uri = `${this.bffTopDomain}/v1/top/auth-start`;
      return `${this.authFacade}?force_re_authentication=TRUE&callback_authorization_start_uri=${callback_authorization_start_uri}`;
    },
    gourmetHowToUseUrl() {
      const topPath = this.topDomain;
      return topPath + '/howtouse';
    },
  },
  methods: {
    /**
     * ログアウトの処理を行う
     */
    loggedOut() {
      const redirectAfterLogout = this.isIcService(this.mypageDisplayCode) ? this.icLogoutRedirectUrl : this.topDomain;
      this.$auth.remove(redirectAfterLogout);
      this.$nextTick(() => {
        this.$emit("hide");
        window.location.href = redirectAfterLogout
      });
    },
    /**
     * モーダル表示時にスクロールを固定する
     */
    fixScroll() {
      if (this.isShow) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "visible";
      }
    },
    /**
     *  画面のリサイズ中はプルダウンメニューを非表示にする
     */
    async hideSideMenuDuringResize() {
      this.hideSideMenu = true;
      if (this.resizeFlag !== false) {
        clearTimeout(this.resizeFlg);
      }
      const self = this;
      this.resizeFlg = await setTimeout(() => {
        self.hideSideMenu = false;
      }, 500);
    },
    getLinkSSO(type){
      switch(type){
        case 'shopURL': return this.shopSSOURL;
        case 'orderStayURL': return this.orderStayURL;
        default: return'';
      }
    },
    // アカウント情報の取得
    async getContractInfo() {
      await this.$repositories("user").contractInfo()
        .then((res) => {
          this.contractInfo = res.data.contractInfo
        })
    },
  },
  mounted() {
    this.fixScroll();
    window.addEventListener("resize", this.hideSideMenuDuringResize);
    this.getContractInfo()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.hideSideMenuDuringResize);
  },
  watch: {
    isShow() {
      this.fixScroll();
    }
  }
};
</script>

<style lang="scss" scoped></style>
