<template>
  <header class="l-header" :inert="$modal.inert">
    <div v-if="crmHeaderFlag" :class="{ 'l-header__sub': isSubHeader, 'l-header__top': showHeaderBottomBorder }">
      <section class="l-header__top__inner">
        <h1>This is header</h1>
        <div class="l-header__top__logo">
          <CMS
              contents_type="block_contents"
              :location_code="headerLogoLocationCode"
          />
        </div>
        <div v-if="showHeaderContent" class="l-header__top__menu">
          <ul class="l-header__menu__list l-header__menu__list--lg">
            <li v-if="!isGCService(mypageDisplayCode)" class="l-header__menu__item">
              <a
                :href="mypageDomain + '/mypage/coupon?sort=displayFrom'"
                class="l-header__menu__item__link"
              >
                <div>
                  <Icon name="mycoupon" />
                </div>
                <p>マイクーポン</p>
              </a>
            </li>
            <li v-if="isLogin && this.isShowSupplementaryCoupon && !isIcService(mypageDisplayCode) && !isGCService(mypageDisplayCode)" class="l-header__menu__item">
              <a
                :href="mypageDomain + '/mypage/coupons'"
                class="l-header__menu__item__link"
              >
              <div>
                <Icon name="auxiliarycoupon" />
              </div>
              <p>補助クーポン</p>
              </a>
            </li>
            <li v-if="isLogin && showCafe && !isGCService(mypageDisplayCode)" class="l-header__menu__item">
              <a
                :href="domainCafe"
                class="l-header__menu__item__link"
                target="_blank"
              >
                <div>
                  <Icon name="mypage_cafe" />
                </div>
                <p>カフェ</p>
              </a>
            </li>
            <li v-if="!isGCService(mypageDisplayCode)" class="l-header__menu__item">
              <a
                :href="mypageDomain + '/mypage/favorites'"
                class="l-header__menu__item__link"
              >
              <div>
                <Icon name="favorite_border" />
              </div>
              <p>お気に入り</p>
              </a>
            </li>
            <li class="l-header__menu__item" v-if="isLogin && !isIcService(mypageDisplayCode) && !isGCService(mypageDisplayCode)">
              <a
                :href="mypageDomain + '/mypage/benepo?currentID=0'"
                class="l-header__menu__item__link"
              >
              <p><span class="l-header__menu__item__benepo">{{ userData.totalPoint }}</span> ベネポ</p>
              </a>
            </li>
            <li class="l-header__menu__item" v-if="isGCService(mypageDisplayCode)">
              <a :href="topDomain + '/howtouse'" target="_blank" class="header-link">ご利用方法</a>
            </li>
            <li class="l-header__menu__item" v-if="isGCService(mypageDisplayCode)">
              <a :href="activationURL" class="header-link">更新登録</a>
            </li>
            <li
              v-if="isLogin"
              class="l-header__menu__item"
              tabindex="0"
              @click="isUserInfoMenus = true"
              @keyup.enter="isUserInfoMenus = !isUserInfoMenus"
            >
              <div v-if="userData.ssoPrincipalFlg == 1" class="l-header__menu__item__label--self">
                本人
              </div>
              <div v-if="userData.ssoPrincipalFlg == 0" class="l-header__menu__item__label--family">
                家族
              </div>
              <p
                v-if="userData.familyName || userData.firstName"
                class="l-header__menu__list__text"
                wovn-ignore
              >
                <span>{{ userName }}</span>様
              </p>
              <p v-else class="l-header__menu__list__text" wovn-ignore>
                氏名未設定
              </p>
              <div v-if="isGCService(mypageDisplayCode)" class="downArrow"></div>
              <UserMenus
                :isShow="isUserInfoMenus"
                :mypageDisplayCode="mypageDisplayCode"
                @hide="isUserInfoMenus = false"
              />
            </li>
            <li v-if="!isLogin">
              <a class="c-button__login" :href="redirectUrl">ログイン</a>
            </li>
            <li v-if="isLogin && isGCService(mypageDisplayCode)">
              <div
                class="uic-a-link-logout"
                @click="logout()"
                style="margin-left: 5px;"
              >
                <div class="uic-a-link-logout__label">ログアウト</div>
              </div>
            </li>
          </ul>
          <div class="l-header__menu__list mobile-header-action-wrapper">
            <template v-if="isMobileF === true && isGCService(mypageDisplayCode)">
              <a :href="activationURL" class="header-link updateRegSp">更新登録</a>
            </template>
            <template v-if="isMobileF === true && isGCService(mypageDisplayCode)">
              <div
                class="uic-a-link-logout logoutSp"
                @click="logout()"
              >
                <img src="@/assets/images/icon/logout.svg" />
                <div class="uic-a-link-logout__label">ログアウト</div>
              </div>
            </template>
            <!-- ハンバーガメニュー -->
            <div class="l-header__menu__list--sm">
              <a
                tabindex="0"
                @keyup.enter="toggleDrawerMenu"
                @click="toggleDrawerMenu"
                :class="{ 'menuIconSp': isGCService(mypageDisplayCode) }"
              >
                <div>
                  <template v-if="isDrawerMenus">
                    <Icon
                      name="navigation_close"
                      width="24px"
                      height="24px"
                      style="vertical-align: middle"
                    />
                    <p>閉じる</p>
                  </template>
                  <template v-else>
                    <Icon
                      name="navigation_hamburger"
                      width="24px"
                      height="24px"
                      style="vertical-align: middle"
                    />
                    <p>メニュー</p>
                  </template>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- SPドロワーメニュー -->
    <DrawerMenuSp
      :isShow="isDrawerMenus"
      @hide="isDrawerMenus = false"
      :isShowSupplementaryCoupon="isShowSupplementaryCoupon"
      :isShowCafeteriaPoint="isShowCafeteriaPoint"
      :isLogin="isLogin"
      :mypageDisplayCode="mypageDisplayCode"
      :companyCd="companyCd"
      v-if="!isTokuhodai(mypageDisplayCode) && !isLifeWell(mypageDisplayCode)"
    />
  </header>
</template>

<script>
import get from "lodash/get";
import func_utils from "@/mixins/func_utils";
import { parseCookie } from "@/utils/cookie";

export default {
  props: {
    isShowSupplementaryCoupon:{
      type: Boolean,
      default: false
    },
    isShowCafeteriaPoint:{
      type: Boolean,
      default: false
    },
  },
  mixins: [func_utils],
  data() {
    return {
      isDrawerMenus: false,
      isUserInfoMenus: false,
      isSearch: false,
      isSubHeader: false,
      crmHeaderFlag: true,
      companyCd: "",
      activationURL: process.env.VUE_APP_BOAK_DOMAIN,
      isMobileF: false,
    };
  },
  computed: {
    showCafe() {
      return this.isShowCafeteriaPoint && !this.isIcService(this.mypageDisplayCode) && !this.isTokuhodai(this.mypageDisplayCode) && !this.isLifeWell(this.mypageDisplayCode);
    },
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    mypageDomain() {
      return this.getMypageDomain(this.mypageDisplayCode);
    },
    bffTopDomain() {
      return this.getBffTopDomain(this.mypageDisplayCode);
    },
    topDomain() {
      return this.getTopDomain(this.mypageDisplayCode);
    },
    authFacade() {
      const authFacadeCode = this.mypageDisplayCode; 
      return `${this.getAuthFacade(this.mypageDisplayCode)}/${authFacadeCode.toLowerCase()}`;
    },
    callback_authorization_start_uri() {
      return `${this.bffTopDomain}/v1/top/auth-start`;
    },
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    authorizationUrl() {
      return this.getApiAuthorizationUrl(this.mypageDisplayCode);
    },
    domainCafe() {
      const cafeUrl = process.env.VUE_APP_CAFE_SYS_URL;
      return cafeUrl;
    },
    headerLogoLocationCode() {
      if (this.isTokuhodai(this.mypageDisplayCode)) return "CRTH_TOP_01_001-TOP_LOGO";
      if (this.isLifeWell(this.mypageDisplayCode)) return "CRLY_TOP_01_001-TOP_LOGO";
      if (this.isGCService(this.mypageDisplayCode)) return "GC_HEADER_05_01_hanyou";

      return "BS_TOP_01_001-TOP_LOGO";
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
     * ユーザーがログインしているかどうかを判定する
     * @return {boolean} - ログインしているかどうか
     */
    isLogin() {
      if (this.$auth.loggedIn) return true;
      return false;
    },
    /**
     * ヘッダーメニューの本体部分を表示するかどうかを判定する
     * @return {boolean} - ヘッダーメニューの本体部分を表示するかどうか
     */
    showHeaderContent() {
      if (this.isTokuhodai(this.mypageDisplayCode) || this.isLifeWell(this.mypageDisplayCode))
        return false;

      if (typeof this.$route.meta.isShowHeaderContent !== "boolean")
        return true;
      this.isShowHeaderContent = this.$route.meta.isShowHeaderContent;
      return this.isShowHeaderContent;
    },
    /**
     * ヘッダーメニューの特定項目を表示するかどうかを判定する
     * @return {boolean} - ヘッダーメニューの特定項目を表示するかどうか
     */
    showMenu() {
      const excludePaths = ["/"];
      return !excludePaths.includes(this.$route.path);
    },
    /**
     * ログインページからのリダイレクトするためのURLを生成して返却する
     * @return {string} - ログインページからのリダイレクトするためのURLテキスト
     */
    redirectUrl() {
      if (this.isIcService(this.mypageDisplayCode)) {
        return `${this.authFacade}?force_re_authentication=TRUE&callback_authorization_start_uri=${this.callback_authorization_start_uri}`;
      }
      return this.authorizationUrl + "/v1/mypage/login";
    },
    /**
     * 現在のページのpathを取得して返却する
     * @return {string} - 現在のページのpathテキスト
     */
    currentpath() {
      return this.$route.path;
    },
    /**
     * 現在TOPページにいるかどうかを判定する
     * @return {boolean} - 現在TOPページにいるかどうか
     */
    isTop() {
      return this.$route.path == "/";
    },
    points() {
      return this.$auth.points;
    },
    /**
    * ヘッダーの下線表示/非表示判定
    */
    showHeaderBottomBorder() {
      if (this.$route.name == "CrthCrlyNotMemberError" || this.$route.name == "CrthCrlyLineBusyError") {
        return false;
      }
      return true;
    },
  
  },
  created() {
    if (this.$store.getters["auth/get"].authenticate) {
      console.log(this.$store.getters["auth/get"].authenticate)
      // this.$modal.open("LoginGuidanceModal");
      this.$store.commit("auth/set", { authenticate: false });
      this.setCurrentHref()
      // window.location.href = `${this.mypageApiUrl}/v1/mypage/login`
      return window.location = `${this.mypageApiUrl}/v1/mypage/login`
    }

    // GET POINTS
    this.$repositories("mypage")
      .getPointHistory({
      })
      .then((response) => {
        const totalPoint = get(response, "data.totalPoint") || 0;
        this.$auth.points = totalPoint;
      });
  },
  methods: {
    /**
     * 現在フォーカスしているHTML要素からフォーカスを外す
     */
    blur() {
      document.activeElement.blur();
    },
    search() {
      window.alert("Not Implemented");
    },
    /**
     * ハンバーガーメニューの表示非表示を切り替える
     */
    toggleDrawerMenu() {
      if (window.innerWidth > this.$config.responsiveWidth) return false;
      this.isDrawerMenus = !this.isDrawerMenus;
    },
    /**
     * サブヘッダーの表示の有無を判定するフラグをストアから取得する
     */
    getSubHeaderFlg() {
      this.isSubHeader = this.$page.isSubHeader;
    },
    /**
     * 未認証時にCRM汎用用のマイページURLが直接叩かれた時の対応
     * ヘッダーの表示の有無を判定するフラグをストアから取得する
     */
    getCRMHeaderFlag() {
      this.crmHeaderFlag = this.$page.crmHeaderFlag;
    },
    logout() {
      const redirectAfterLogout = this.topDomain;
      this.$auth.remove(redirectAfterLogout);
    },
    handleResize () {
      if (window.innerWidth > this.$config.responsiveWidth) {
        this.isMobileF = false;
      } else {
        this.isMobileF = true;
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.getCRMHeaderFlag();
    this.$nextTick(() => {
      this.getSubHeaderFlg();
    });
    // src/views/authorization/cb/index.vue の場合は、ユーザセッション作成完了前にコールされる場合があり、エラーになるため制御する
    console.log(`★★★★★ isCallback: ${this.$route.meta.isCallback}`);
    if ((typeof this.$route.meta.isCallback === "boolean") && !this.$route.meta.isCallback) {
      this.getFromSiteCode().then((codes) => {
        this.companyCd = codes.companyCd;
      });
    }
  },
  watch: {
    $route() {
      this.isDrawerMenus = false;
      this.isUserInfoMenus = false;
      this.isSearch = false;
      if (this.$store.getters["auth/get"].authenticate) {
        this.$store.commit("auth/set", { authenticate: false });
        this.setCurrentHref()
        return window.location = `${this.mypageApiUrl}/v1/mypage/login`
        // this.$modal.open("LoginGuidanceModal");
      }
      this.getCRMHeaderFlag();
      this.$nextTick(() => {
        this.getSubHeaderFlg();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_gourmet/atoms/UicALinkLogout.scss';
.display--none {
  display: none;
}
@media only screen and (max-width: 820px) {
  .display--none {
    display: block;
    padding: 0.5rem;
  }
}
@media only screen and (max-width: 1023px) {
  .menu-bar {
    height: 100%;
    .mobile-header-action-wrapper {
      height: 100%;
      .display--none {
        padding: 0;
      }
      .action-wrapper {
        height: 100%;
        display: flex;
        a {
          padding: 0 10px;
          cursor: unset;
          display: flex;
          font-weight: bold;
          font-size: 10px;
          line-height: 15px;
          height: 100%;
          align-items: center;
          -webkit-tap-highlight-color: transparent;
        }
        .last-action-link {
          padding-right: 0;
        }
      }
    }
  }
}
.header-link {
  border: 1px solid $CoolGray;
  text-decoration: none;
  color: $CoolBlack;
  padding: 0.25rem 0.75rem;
  margin-right: 1rem;
  &:hover {
    background-color: $CoolGray6;
  }
  @include mq() {
    margin: 0;
  }
}
.header-pc {
  @include mq() {
    display: none;
  }
}
.downArrow {
  border-top: 2px solid #e60021;
  border-right: 2px solid #e60021;
  content: "";
  height: 7px;
  position: absolute;
  right: 2px;
  top: 41%;
  transform: translateY(-50%) rotate(135deg);
  width: 7px;
  padding: 4px 4px;
}
.updateRegSp {
  margin-right: 10px;
  min-width: 74px;
}
.logoutSp {
  min-width: 50px;
}
.menuIconSp {
  min-width: 50px;
}
</style>
