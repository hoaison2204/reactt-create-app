<template>
  <div>
    <!-- ページヘッダー -->
    <div class="mb-4 sm:mb-1">
        <div class="mb-3">
          <!-- タブ: デジタルチケット/クーポン | 会員証クーポン -->
          <!-- boCodeを追加 -->
          <CouponTabs :mypageDisplayCode="mypageDisplayCode" />
        </div>

        <!-- 旧サイトで取得したチケット/クーポンを見るリンク -->
        <div class="text-right" v-if="!isCrm(mypageDisplayCode) && !isMembershipCouponTab && !isIcService(mypageDisplayCode)">
          <a class="arrow_right text-pc-base text-sp-base block pr-2 hover:text-red-600 hover:no-underline mb-1" :href="oldDigiTicketLink">旧サイトで取得したデジタルチケットを見る</a>
          <a class="arrow_right text-pc-base text-sp-base block pr-2 hover:text-red-600 hover:no-underline" :href="oldDigiCouponLink">旧サイトで取得したデジタルクーポンを見る</a>
        </div>

        <!-- ページネーション画面上部 -->
        <div v-if="items && items.length" class="mt-10">
          <div v-if="!isLoading">
            <Paginator
              :isSort="true"
              :total="pageTotal"
              :sortList="sortList"
              :paginatorAvailable="false"
              :totalFontSizePC="14"
              :totalFontSizeSP="13"
              :selectWithIcon="false"
              :isDropDown="true"
              @pageChange="pageChange"
              @changeSort="changeSort"
            />
          </div>
        </div>
        <div v-else class="pb-2 sm:pb-3"></div>
    </div>
    <!-- メインコンテンツ -->
    <div class="mb-6">
      <template v-if="!isLoading">
        <ul>
          <li v-for="item in items" :key="item.id" class="mb-4 sm:mb-2.5">
            <CouponListBlock
              :item="item"
              :tab="tab"
              @delete-coupon="showSingleDeleteModal(item)"
              @show-detail="showDetail(item)"
            />
          </li>
          <li class="box-shadow w-full rounded-lg text-center bg-pink" v-if="!items || !items.length">
            <p class="text-base text-sp-base py-10 sm:py-8 sm:px-5">
              {{ emptyMessage }}
            </p>
          </li>
        </ul>
      </template>
      <template v-else>
        <LoadingContent />
      </template>
    </div>

    <!-- ページフッター -->
    <div>
      <!-- ページネーション画面下部 -->
      <div class="mb-8 sm:mb-6" v-if="items && items.length">
        <div>
          <div v-if="!isLoading">
            <Paginator
              :total="pageTotal"
              :positionCenter="true"
              :totalFontSizePC="14"
              :totalFontSizeSP="13"
              :paginatorFontSize="20"
              @pageChange="pageChange"
            />
          </div>
        </div>
      </div>
  
      <!-- 使用済み/有効期限切れのクーポン一覧画面へ遷移リンク -->
      <div class="p-mypage-coupon__old__textLink">
        <a @click="gotoMyPageCoupon"
          class="c-text-button c-text-button--right text-pc-base text-sp-base "
        >
        使用済み／有効期限切れのクーポンを見る
          <Icon name="arrow_right" :color="$colors.brand.red" />
        </a>
      </div>
    </div>

    <!-- クーポン削除確認モーダル -->
    <ModalFrame
      ref="delete-coupons"
      width="1032px"
      class="overflow-visible"
      title="削除の確認"
      leftBtnText="戻る"
      rightBtnText="削除"
      :is_contentCenter="true"
      contentText="クーポンを削除しますか？"
      parentMethodNameRight="deleteItems"
      @deleteItems="deleteItems()"
      v-model="currentModalItems"
    >
    </ModalFrame>
  </div>
</template>

<script>
import get from "lodash/get";

export default {
  data: () => ({
    pageInfo: {},
    pageTotal: 0,
    currentPage: 1,
    currentModalItems: {},
    items: [],
    tab: null,
    sortList: [
      { value: "getCouponDatetime", label: "取得日が新しい順" },
      { value: "getCouponDatetimeAsc", label: "取得日が古い順" },
      { value: "expireToAsc", label: "有効期限が近い順" },
      { value: "expireTo", label: "有効期限が遅い順" }
    ],
    isLoading: false,
  }),
  watch: {
    $route() {
      this.$meta.setDocumentTitle("マイクーポン");
      this.setBreadcrumb();
      this.pageInfo = this.$route || {};
      this.getList();
      this.currentPage = 1;
    }
  },
  created() {
    if (!this.$route.query.sort) {
      this.$router.replace({ query: { sort: "expireTo" } });
    }
    if (this.$route.query.page) {
      this.currentPage = this.$route.query.page;
    } else {
      this.currentPage = 1;
    }
  },
  async mounted() {
    this.$meta.setDocumentTitle("マイクーポン");
    this.$page.isTitle = true;
    this.$page.showSideMenu = true;
    this.setBreadcrumb();
    this.pageInfo = this.$route || {};
    this.getList();
  },
  computed: {
    mypageDomain() {
      return this.getMypageDomain(this.mypageDisplayCode);
    },
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    emptyMessage() {
      if (this.$route.path === "/mypage/coupon") {
        return "該当するデジタルチケット／デジタルクーポンはございません。";
      } else {
        return "該当する会員証クーポンはございません。";
      }
    },
    /**
     * 旧サイトで取得したデジタルチケットまでのURL
     * @return { String }
     */
    oldDigiTicketLink() {
      switch (process.env.VUE_APP_DEV_MODE) {
        // 本番環境用URL
        case this.CONST.ENV.PRODUCTION:
          return 'https://bopf.benefit-one.inc/bssso?mode=bssso&nbsreqflg=1&ssoTrnstTo=https://bs.benefit-one.co.jp/bs/pages/bo/sso/cl/bpflogin.faces&trnsttourl=%2Fbs%2Fpages%2Fbs%2FmyPage%2FdigitickList.faces'

        // ST環境用URL
        case this.CONST.ENV.STAGING:
          return 'https://bopf.st.benefit-one.inc/bssso?mode=bssso&nbsreqflg=1&ssoTrnstTo=https%3a%2f%2ftest.bene-st.jp%2fbs%2fpages%2fbo%2fsso%2fcl%2fbpflogin.faces&trnsttourl=%2Fbs%2Fpages%2Fbs%2FmyPage%2FdigitickList.faces'
        
        // デフォルトでは本番環境用URLを設定
        default:
          return 'https://bopf.benefit-one.inc/bssso?mode=bssso&nbsreqflg=1&ssoTrnstTo=https://bs.benefit-one.co.jp/bs/pages/bo/sso/cl/bpflogin.faces&trnsttourl=%2Fbs%2Fpages%2Fbs%2FmyPage%2FdigitickList.faces'
      }
    },
    /**
     * 旧サイトで取得したデジタルクーポンまでのURL
     * @return { String }
     */
    oldDigiCouponLink() {
      switch (process.env.VUE_APP_DEV_MODE) {
        // 本番環境用URL
        case this.CONST.ENV.PRODUCTION:
          return 'https://bopf.benefit-one.inc/bssso?mode=bssso&nbsreqflg=1&ssoTrnstTo=https://bs.benefit-one.co.jp/bs/pages/bo/sso/cl/bpflogin.faces&trnsttourl=%2Fbs%2Fpages%2Fbs%2FmyPage%2FdigiponList.faces'

        // ST環境用URL
        case this.CONST.ENV.STAGING:
          return 'https://bopf.st.benefit-one.inc/bssso?mode=bssso&nbsreqflg=1&ssoTrnstTo=https%3a%2f%2ftest.bene-st.jp%2fbs%2fpages%2fbo%2fsso%2fcl%2fbpflogin.faces&trnsttourl=%2Fbs%2Fpages%2Fbs%2FmyPage%2FdigiponList.faces'
        
        // デフォルトでは本番環境用URLを設定
        default:
          return 'https://bopf.benefit-one.inc/bssso?mode=bssso&nbsreqflg=1&ssoTrnstTo=https://bs.benefit-one.co.jp/bs/pages/bo/sso/cl/bpflogin.faces&trnsttourl=%2Fbs%2Fpages%2Fbs%2FmyPage%2FdigiponList.faces'
      }
    },
    isMembershipCouponTab() {
      let currentTab = this.$route.name || "";
      return currentTab === 'MyPageCouponsMember';
    },
  },
  methods: {
    gotoMyPageCoupon() {
      const mypageDomain = this.getMypageDomain(this.mypageDisplayCode);
      const mypageCouponUrl = mypageDomain  + '/mypage/coupon/past?sort=getCouponDatetime';
      location.href = mypageCouponUrl; 
    },
    async getList() {
      let query = Object.assign({}, this.$route.query);
      let paths = this.pageInfo.path.split("/") || [];
      // tabの指定: 0->デジチケ・デジポン 1->会員証
      this.tab = paths[paths.length - 1] == "member" ? 1 : 0;

      let params = {
        isPastCoupon: false,
        page: this.currentPage,
        sortBy: query.sort || "getCouponDatetime",
        tab: this.tab,
        keyword: "",
        sortOrder: query.sortOrder || "desc"
      };
      this.isLoading = true;
      const page = await this.$repositories("mypage")
        .getMycoupon(params)
        .catch((error) => {
          return error;
        });
      this.isLoading = false;
      if (page.isError) {
        return;
      }
      this.items = get(page, "data.couponDataList") || [];

      this.$route.query.no_result || this.items.length === 0
        ? (this.pageTotal = 0)
        : (this.pageTotal = page.data.totalCount);
    },
    showDetail(item) {
      if (Number(this.tab) === 1) {
        // 会員証クーポンの時、提示ページへ
        // this.$router.push(
        //   `/mypage/coupon/show/member?menuNo=${item.menuNo}&planId=${item.planId}`
        // );
        window.location.href =
          this.mypageDomain +
          `/mypage/coupon/show/member?menuNo=${item.menuNo}&planId=${item.planId}`;
        // BFFと繋いだ後はこちらを使う
      } else {
        // デジチケ・デジポンの時、クーポン詳細ページへ
        // this.$router.push("/mypage/coupon/" + item.acptNo);
        window.location.href =
          this.mypageDomain + "/mypage/coupon/" + item.acptNo;
      }
    },
    pageChange(page) {
      this.currentPage = page;
    },
    showModal(name) {
      if (!Object.keys(this.currentModalItems).length) return;
      this.$refs[name].show();
    },
    hideModal(name) {
      this.$refs[name].hide();
      this.resetItems();
    },
    showSingleDeleteModal(item) {
      this.isSingleSelected = true;
      this.selectItem(item);
      this.showModal("delete-coupons");
    },
    async deleteItems() {
      this.$loading.startProcessing();
      this.$log.debug("クーポン削除");
      try {
        let params = {
          deleteFlag: 1,
          acptNoList: this.currentModalItems.acptNo
            ? [this.currentModalItems.acptNo]
            : [],
          menuPlanList: this.currentModalItems.acptNo
            ? []
            : [
                {
                  menuNo: this.currentModalItems.menuNo,
                  planId: this.currentModalItems.planId
                }
              ]
        };
        const res = await this.$repositories("mypage").deleteMycoupon(params);
        console.log(res); ////
        this.getList();
      } catch (e) {
        console.error(e);
      } finally {
        this.hideModal("delete-coupons");
        this.resetItems();
        this.$loading.finishProcessing();
      }
    },
    resetItems() {
      this.currentModalItems = {};
      this.isSingleSelected = false;
    },
    selectItem(item) {
      const key = "coupon" + item.menuNo;
      let obj = {};
      this.currentModalItems["coupon" + item.menuNo] = item;
      this.currentModalItems = Object.assign(
        {},
        this.currentModalItems,
        (obj[key] = item)
      );
    },
    changeSort(sortCd) {
      let sort = "getCouponDatetime";
      let sortOrder = "desc"
      let query = Object.assign({}, this.$route.query);
      if (query.page) delete query.page;
      if ((!query.sort || query.sort == sort) && !sortCd) {
        sort = "expireTo";
        this.$router.push({ query: { ...query, sort, sortOrder } });
      }

      switch (sortCd) {
        case "getCouponDatetime":
          sort = "getCouponDatetime"
          break;
        case "getCouponDatetimeAsc":
          sort = "getCouponDatetime"
          sortOrder = "asc"
          break;
        case "expireToAsc":
          sort = "expireTo"
          sortOrder = "asc"
          break;
        case "expireTo":
          sort = "expireTo"
          break;
        default:
          sort = "getCouponDatetime"
          break;
      }
      query.sort = sort
      query.sortOrder = sortOrder
      this.$router.push({ query: { ...query, sort, sortOrder } }, () => {});
    },
    /**
     * パンくずリスト作成
     */
    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("マイクーポン"));
    }
  }
};
</script>
<style lang="scss" scoped>
.box-shadow {
  box-shadow: #00000029 0 0 8px;
}

.arrow_right {
  position: relative;
  &::after {
    content: ''; 
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
    width: 7px;
    height: 7px;
    background-color: transparent;
    border-right: 1.5px solid black;
    border-bottom: 1.5px solid black;
  }
  &:hover::after {
    border-color: #DA291C;
  }
}

@media only screen and (min-width: 640px) {
  .text-pc-base {
    font-size: 15px;
  }
}
@media only screen and (max-width: 640px) {
  .text-sp-base {
    font-size: 13px;
  }
}
</style>
