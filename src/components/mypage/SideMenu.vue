<template>
  <nav class="l-side">
    <div class="l-side__wrap">
      <div class="l-side__lists">
        <div class="l-side__mypage__Button">
          <p class="relative">
            <router-link to="/mypage" class="l-side__list__item p-0">
              マイページトップ
            </router-link>
            <Icon name="arrow_right" class="l-side__icon" />
          </p>
        </div>
        <div class="l-side__content">
          <div class="l-side__list__title">会員設定</div>
          <ul class="l-side__list">
            <li>
              <router-link to="/mypage/setting" class="l-side__list__item">
                会員情報設定
                <Icon name="arrow_right" />
              </router-link>
            </li>
            <li v-if="creditCardEnabled">
              <a
                class="l-side__list__item cursor-pointer"
                @click="gotoPaymentGate()"
              >
                └ クレジットカード
                <Icon name="arrow_right" />
              </a>
            </li>
          </ul>

          <template v-if="!isGCService(mypageDisplayCode)">
          <div class="l-side__list__title">マイクーポン</div>
          <ul class="l-side__list">
            <li>
              <router-link
                :to="{ path: '/mypage/coupon', query: { sort: 'getCouponDatetime' } }"
                class="l-side__list__item"
              >
                マイクーポン
                <Icon name="arrow_right" />
              </router-link>
            </li>
            <li>
              <router-link
                :to="{
                  path: '/mypage/coupon/past',
                  query: { sort: 'getCouponDatetime' }
                }"
                class="l-side__list__item"
              >
                使用済み／有効期限切れの<br>クーポン
                <Icon name="arrow_right" />
              </router-link>
            </li>
          </ul>
          <div v-if="isShowSupplementaryCoupon && !isIcService(mypageDisplayCode) && !isTokuhodai(mypageDisplayCode) && !isLifeWell(mypageDisplayCode)" class="l-side__list__title">補助クーポン</div>
          <ul>
            <li v-if="isShowSupplementaryCoupon && !isIcService(mypageDisplayCode) && !isTokuhodai(mypageDisplayCode) && !isLifeWell(mypageDisplayCode)">
              <router-link
                :to="{
                  path: '/mypage/coupons'
                }"
                class="l-side__list__item"
              >
                補助クーポン
                <Icon name="arrow_right" />
              </router-link>
            </li>
          </ul>
          <div  class="l-side__list__title" v-if="isShowCafeteriaPoint && !this.isIcService(this.mypageDisplayCode) && !isTokuhodai(mypageDisplayCode) && !isLifeWell(mypageDisplayCode)">カフェ</div>
          <ul  class="l-side__list" v-if="isShowCafeteriaPoint && !this.isIcService(this.mypageDisplayCode) && !isTokuhodai(mypageDisplayCode) && !isLifeWell(mypageDisplayCode)">
            <li>
              <a
                :href="domainCafe"
                class="l-side__list__item"
                target="_blank"
              >
                カフェ
                <Icon name="arrow_right" />
            </a>
            </li>
          </ul>
          <!-- 「ベネポー会員設定」非対応ICサイトからマイページに遷移した場合は、非表示 -->
          <div v-if="!isIcService(mypageDisplayCode)" class="l-side__list__title">ベネポ</div>
          <ul v-if="!isIcService(mypageDisplayCode)" class="l-side__list">
            <li>
              <router-link
                :to="{ path: '/mypage/benepo', query: { currentID: 0 } }"
                class="l-side__list__item"
              >
                総保有ベネポ・ベネポ履歴
                <Icon name="arrow_right" />
              </router-link>
            </li>
            <!-- TODO:次回フェーズで使用する可能性有り -->
            <!-- <li>
              <router-link
                :to="{ path: '/mypage/benepo/collect' }"
                class="l-side__list__item"
              >
                獲得予定のベネポ
                <Icon name="arrow_right" />
              </router-link>
            </li> -->
          </ul>
          </template>

          <div class="l-side__list__title">申込履歴</div>
          <ul class="l-side__list">
            <template v-if="isGCService(mypageDisplayCode)">
              <li>
                <router-link to="/mypage/orders" class="l-side__list__item">
                  <div class="square-arrow-inner">
                    <p class="relative">申込一覧</p>
                  </div>
                </router-link>
              </li>
              <li>
                <a
                  class="l-side__list__item cursor-pointer"
                  :class="{ 'disableTcfLink': tableCheckURL === ''}"
                  :href="tableCheckURL" target="_blank"
                  >
                  <div class="square-arrow-inner">
                    
                    <p class="relative">
                      申込一覧 (TableCheck予約)
                    </p>
                    <img
                      src="@/assets/images/icon/arrow-up-right-from-square-solid.svg"
                      alt="arrow-up-right-from-square-solid_icon"
                      width="13" height="13"
                    />
                  </div>
                </a>
              </li>
            </template>
            <template v-else>
            <li>
              <router-link to="/mypage/orders" class="l-side__list__item" v-if="!isIcService(mypageDisplayCode)">
                <div class="square-arrow-inner">
                  <p class="relative">ライフサービス・トラベル</p>
                </div>
                <!-- <span
                v-if="isNewBsService(mypageBoCode) || (companyCd && !fromSiteUnsupported(companyCd, 'beneRakuten'))"
                >
                  （Bene楽天・公共の宿はこちら）
                </span> -->
                <!-- <span v-else>（公共の宿はこちら）</span> -->
              </router-link>
              <router-link to="/mypage/orders" class="l-side__list__item" v-else>
                <div class="square-arrow-inner">
                  <p class="relative">LifeService・Goods</p>
                </div>
              </router-link>
            </li>
            <li v-if="!isCrm(mypageDisplayCode) && !isIcService(mypageDisplayCode)">
              <a
                class="l-side__list__item cursor-pointer"
                :href="getLinkSSO('orderStayURL')" target="_blank"
              >
              <div class="square-arrow-inner">
                
                <p class="relative">
                  旧サイトで申込された申込履歴
                </p>
                <img
                  src="@/assets/images/icon/arrow-up-right-from-square-solid.svg"
                  alt="arrow-up-right-from-square-solid_icon"
                  width="13" height="13"
                />
              </div>
                <!-- <span class="orders-list__item--span-width">（パッケージツアー、航空券・交通はこちら）</span> -->
              </a>
            </li>
            <!-- TODO:次回フェーズで使用する可能性があるため、コメントアウト -->
            <!-- ベネ通販非対応ICサイトからマイページに遷移した場合は、非表示  -->
            <!-- <li v-if="mypageDisplayCode && !fromSiteUnsupported(mypageDisplayCode, 'kyutoku') && !fromSiteUnsupported(mypageDisplayCode, 'hitaikou')">
              <a
              class="l-side__list__item cursor-pointer square-arrow-inner"
              :href="getLinkSSO('shopURL')" target="_blank"
              >
                ベネ通販
                <img
                  src="@/assets/images/icon/arrow-up-right-from-square-solid.svg"
                  alt="arrow-up-right-from-square-solid_icon"
                  width="13" height="13"
                  class="inline"
                />
              </a>
            </li> -->
            <li v-if="mypageDisplayCode && !fromSiteUnsupported(mypageDisplayCode, 'kyutoku') && !isIcService(mypageDisplayCode)">
              <a
              class="l-side__list__item square-arrow-inner"
              :href="`${ isKyutokuMember ? qtokPaymentUrl : 'https://bs.benefit-one.inc/otherPage?other_id=kyuutoku_mypage' }`"
              target="_blank"
              >
              <!-- <a class="l-side__list__item cursor-pointer square-arrow-inner" > -->
                給トク払い
              </a>
            </li>
            </template>
          </ul>
          <template v-if="!isGCService(mypageDisplayCode)">
          <div class="l-side__list__title">閲覧履歴</div>
          <ul class="l-side__list">
            <li>
              <router-link to="/mypage/visits" class="l-side__list__item">
                閲覧履歴
                <Icon name="arrow_right" />
              </router-link>
            </li>
          </ul>
          <div class="l-side__list__title">お気に入り</div>
          <ul class="l-side__list">
            <li>
              <router-link to="/mypage/favorites" class="l-side__list__item">
                お気に入りメニュー
                <Icon name="arrow_right" />
              </router-link>
            </li>
          </ul>
          <div
            class="l-side__list__title"
            v-if="mypageDisplayCode && !fromSiteUnsupported(mypageDisplayCode, 'family') && userData.ssoPrincipalFlg == 1 && !isIcService(mypageDisplayCode)"
          >
            家族の登録
          </div>
          <ul
            v-if="mypageDisplayCode && !fromSiteUnsupported(mypageDisplayCode, 'family') && userData.ssoPrincipalFlg == 1 && !isIcService(mypageDisplayCode)"
            class="l-side__list"
          >
            <li>
              <router-link to="/mypage/family" class="l-side__list__item">
                家族アカウント管理
                <Icon name="arrow_right" />
              </router-link>
            </li>
          </ul>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    mypageBoCode: {
      type: String
    },
    mypageDisplayCode: {
      type: String
    },
    companyCd: {
      type: String
    },
    isShowSupplementaryCoupon:{
      type: Boolean,
      default: false
    },
    isShowCafeteriaPoint:{
      type: Boolean,
      default: false
    },
    /**
     * IC のクレジットカード有効/無効
     */
    icSelfPayEnabled: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      cardRegistEndpoint: "",
      contractInfo: [],
      tableCheckURL: ""
    };
  },
  computed: {
    qtokPaymentUrl() {
      return process.env.VUE_APP_WITH_QTOK_PAYMENT_URL
    },
    orderStayURL() {
      return this.getOrderStayURL(this.mypageDisplayCode);
    },
    shopSSOURL() {
      return this.getShopSSOURL(this.mypageDisplayCode);
    },
    appApiDomain() {
      return this.getAppApiDomain(this.mypageDisplayCode);
    },
    domainTop() {
      return this.getTopDomain(this.mypageDisplayCode);
    },
    /**
    * ログインユーザー情報を取得して返却する
    * @return {object} - ログインユーザー情報のオブジェクト
    */
    userData() {
      if (!this.$auth?.user) return "";
      return this.$auth.user;
    },
    domainCafe() {
      const cafeUrl = process.env.VUE_APP_CAFE_SYS_URL;
      return cafeUrl;
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
    creditCardEnabled() {
      let res = false;
      if (!this.isGCService(this.mypageDisplayCode)) {
        res = true;
      }
      if (this.isIcService(this.mypageDisplayCode) && !this.icSelfPayEnabled) {
        res = false;
      }
      console.log("creditCardEnabled: ", res);
      return res;
    },
  },
  mounted() {
    if (this.isGCService(this.mypageDisplayCode) === true) {
      this.tableCheckUrl();
    }
    this.getContractInfo();
  },
  methods: {
    async tableCheckUrl() {
      let res = await this.$repositories("tcf").getCheckReservations();
      console.log("call tableCheckUrl res",res);
      this.tableCheckURL = res?.mypageUrl || "";
    },
    gotoPaymentGate() {
      /**
       * SSOで遷移した場合の決裁画面へ遷移する処理にエラー画面に遷移を追加
       */
      this.$repositories("mypage")
        .cardRegistration()
        .then((res) => {
          if (res.status === 200) {
            window.location.href = res.data.redirectCardRegistrationUrl;
          } else {
            this.$router.push({ name: "noMailAddress" });
          }
        })
        .catch((error) => {
          this.$router.push({ name: "noMailAddress" });
        })
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
  }
};
</script>

<style scoped lang="scss">
::v-deep .force-gray-icon {
  g {
    fill: #73767a !important;
  }
}

.square-arrow-inner {
  display: flex;
  justify-content: space-between;
}
.orders-list__item--span-width {
  width: 180px;
}

.disableTcfLink
{
  opacity: 0.4;
  cursor: default;
  pointer-events: none;
}
</style>
