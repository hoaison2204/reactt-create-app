<template>
  <section class="p-mypage">
    <h1 class="p-mypage__hidden-header">マイページ</h1>
    <div class="p-mypage__banner mb-0">
      <CMS
        contents_type="block_contents"
        location_code="BS_MYPAGE_01_001-BANNER"
      />
    </div>

    <div class="p-mypage__outline__container">
      <MypageOutline
        :data="coupons"
        :mypageBoCode="mypageBoCode"
        :mypageDisplayCode="mypageDisplayCode"
        :companyCd="companyCd"
        :isShowSupplementaryCoupon="isShowSupplementaryCoupon"
        :isShowCafeteriaPoint="isShowCafeteriaPoint"
      />
    </div>

    <!-- Netflixバナー -->
    <div class="p-mypage__banner mb-0">
      <CMS
        contents_type="block_contents"
        location_code="BS_MYPAGE_01_002-Netflix"
      />
    </div> 
  </section>
</template>

<script>
import { getCookieValue } from '@/utils/cookie';
import get from 'lodash/get';
import order from '@/mixins/mypage/order.js';

export default {
  mixins: [order],
  props: {
    mypageBoCode: {
      type: String,
    },
    mypageDisplayCode: {
      type: String,
    },
    companyCd: {
      type: String,
    },
    isShowSupplementaryCoupon:{
      type: Boolean,
      default: false
    },
    isShowCafeteriaPoint:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // categories_: [],
      coupons: [],

      userId: null,
      fullName: null,
      email: null,
      // totalPoint: null,
      grantedPoint: null,
      totalPointValidOfMonth: 0,
      lineType: { horizontal: 'h-line', vertical: 'v-line' },
      favoriteList: null,
      totalResultsFavorite: null,
      familySerialNumber:null,
      subscriptions:null,
      params: {
        itemType: 'favourite',
        page: 0,
        size: 10,
      },
      params1: {
        itemType: 'viewed',
        page: 0,
        size: 10,
      },
      dataCat: {
        catLrgClassNm: null,
        catMidClassNm: null,
        catSmlClassNm: null,
      },
      order: {
        header: {
          ID: 'xxxxxx@xxxxx',
          title: 'ベネフィット太郎 様（氏名）',
          sub_title: 'コーギー大好き（ニックネーム）',
        },
        body: {
          total_benepo: 600,
          benepo_near_expiry: 50,
          earn_benepo: 100,
        },
        footer: {},
      },
      menu_item: [
        {
          icon: 'icon icon-bor-coupon',
          name: 'クーポン',
          path: '/mypage/bs-myp-02-001',
        },
        {
          icon: 'icon icon-bor-heart',
          name: 'お気に入り',
          path: '/mypage/favorites',
        },
        {
          icon: 'icon icon-bor-clock-undo',
          name: '閲覧履歴',
          path: '/mypage/visits',
        },
        {
          icon: 'icon icon-bor-shopping-cart-time',
          name: '申込履歴',
          path: '/mypage/orders',
        },
        {
          icon: 'icon icon-bor-take-note',
          name: 'クチコミ',
          path: '/mypage/bs-myp-06-001',
        },
        {
          icon: 'icon icon-bor-user',
          name: '会員設定',
          path: '/mypage/setting',
        },
      ],
      myCoupons: {
        subTitle: 'マイクーポン',
        data: [],
        seemore: [
          {
            name: 'マイクーポン一覧を見る',
            path: '/mypage/bs-myp-02-001',
          },
        ],
      },
      subsidyData: [],
      favoriteData: {
        subTitle: 'お気に入りメニュー',
        data: [],
        seemore: [
          {
            name: 'お気に入りメニューを見る',
            path: '/mypage/favorites',
          },
          {
            name: 'Wishリストを見る',
            path: 'by-myp-04-002',
          },
        ],
      },
      viewedHistoryList: {
        subTitle: '閲覧履歴',
        data: [],
        seemore: [
          {
            name: '閲覧履歴を見る',
            path: '/mypage/visits',
          },
        ],
      },
      orderHistoryList: {
        subTitle: 'お申し込み履歴',
        data: [],
        seemore: [
          {
            name: '利用履歴を見る',
            path: '/mypage/orders',
          },
        ],
      },
      breadcrumb_data: ['トップ', 'マイページ'],
      status: null,
      favouriteList: [],
      visitList: [],
    };
  },
  created() {
    const bsjsessionid = getCookieValue('BSJSESSIONID');
    this.status = bsjsessionid?.slice(0, 2);
    this.initData();
  },
  computed: {
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    mypageDomain() {
      return this.getMypageDomain(this.mypageDisplayCode);
    },
    lifeReorderDomain() {
      return this.getLifeReorderDomain(this.mypageDisplayCode);
    },
    stayReorderDomain() {
      return this.getStayReorderDomain(this.mypageDisplayCode);
    },
    couponList() {
      if (
        !this.coupons ||
        !this.coupons.couponData ||
        !this.coupons.couponData.couponDataList
      ) {
        return [];
      }
      return this.coupons.couponData.couponDataList;
    }
  },
  methods: {
    gotoDetailOrder(item) {
      const acptNo = get(item, 'acptNo', '');
      const menuNo = get(item, 'menuNo', '');
      const srvicDiv = get(item, 'srvicDiv', '');

      const query = {
        acptNo,
        srvicDiv,
        isPublicStay:
          srvicDiv !== this.CONST.SRVIC_DIV.DOMESTIC_STAY &&
          srvicDiv.startsWith('A'),
      };

      this.$router.push({ path: `/mypage/orders/${menuNo}`, query });
    },
    gotoMenuNo(serviceType, menuNo) {
      if (serviceType === this.CONST.MENU_ITEM_INFO_SERVICE_TYPE.LIFE) {
        location.href = `${this.lifeReorderDomain}/menus/catExl=null/catLrg=null/catMid=null/catSml=null/menuNo=${menuNo}`;
      } else {
        location.href = `${this.stayReorderDomain}/menus/${menuNo}`;
      }
    },
    gotoViewerDetail(item) {
      const menuNo = get(item, 'menuDetailResponse.menuNo', '');
      const serviceType = item.serviceType;
      this.gotoMenuNo(serviceType, menuNo);
    },
    gotoFavoriteDetail(item) {
      const menuNo = get(item, 'menuNo', '');
      const serviceType = item.serviceType;
      this.gotoMenuNo(serviceType, menuNo);
    },
    async initData() {
      this.$loading.startProcessing();
      const promises = [
        this.getFavoriteList(),
        this.getViewerListHistory(),
      ];
      await Promise.allSettled(promises);
      this.$loading.finishProcessing();
    },
    async getFavoriteList() {
      const params = {
        itemType: 'favourite',
        page: 0,
        size: 4,
        sort: 'dateAdded,desc',
      };
      const res = await this.$repositories('mypage').getFavoriteList(params);
      if (!res?.isError) {
        this.favouriteList = get(res, 'content', []);
      }
    },
    async getViewerListHistory() {
      const params = {
        itemType: 'viewed',
        page: 0,
        size: 4,
        sort: 'dateAdded,desc',
      };
      const res = await this.$repositories('mypage').getViewedListHistory(
        params
      );
      if (!res?.isError) {
        this.visitList = get(res, 'content', []);
      }
    },
    getMenuInfo(list, cnt) {
      let ary = [];
      if (Array.isArray(list) && list.length == 0) return ary;
      ary = JSON.parse(JSON.stringify(list));
      return ary.splice(0, cnt);
    },
    showCouponDetail(item) {
      if (item.kind === 1) {
        // 会員証クーポンの時、提示ページへ
        // this.$router.push(
        //     `/mypage/coupon/show/member?menuNo=${item.menuNo}&planId=${item.planId}`
        // );
        window.location.href =
          this.mypageDomain +
          `/mypage/coupon/show/member?menuNo=${item.menuNo}&planId=${item.planId}`;
      } else {
        // デジチケ・デジポンの時、クーポン詳細ページへ
        // this.$router.push(`/mypage/coupon/${item.acptNo}`);
        window.location.href =
          this.mypageDomain + `/mypage/coupon/${item.acptNo}`;
      }
    },
    // TODO 必要なければ完全に削除
    // subsidyItem(obj) {
    //   if (!obj || !obj.availableDataList) {
    //     return;
    //   }
    //   const availableDataLists = obj.availableDataList;
    //   const remainingCounts = obj.remainingCount;
    //   const datas = [];

    //   availableDataLists.forEach((item, key) => {
    //     datas[key] = {
    //       availableDataList: availableDataLists[key],
    //       remainingCount: remainingCounts[key],
    //     };
    //   });
    //   console.log('data subsidy', datas);
    //   this.subsidyData = datas.sort(
    //     (a, b) =>
    //       new Date(a.availableDataList.receptionDateTo) -
    //       new Date(b.availableDataList.receptionDateTo)
    //   );
    // },
    /**
     * パンくずリスト作成
     */
    setBreadcrumb() {
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb('マイページ'));
    },
    gotoNextPath(path, query) {
      // const query = this.$router.query
      this.$router.push({ path, query });
    },
  },
  async mounted() {
    this.$meta.setDocumentTitle('マイページ');
    this.$page.isTitle = true;
    this.$page.showSideMenu = true;
    this.setBreadcrumb();

    //userSession呼び出し
    const codes = await this.getFromSiteCode();
    this.familySerialNumber = codes.familySerialNumber;
    this.subscriptions = codes.subscriptions;

    // TODO
    // order-listをリクエストし、エラーを起こしている
    // 取得しているのは補助金情報で、補助金の表示はトップからなくなっているので不必要
    // 挙動に問題なければ完全に削除

    // const coupons = await this.$repositories('mypage').getMypageTop();
    // this.coupons = coupons.data;
    // console.log('coupon data', coupons.data);

    // BFFからデータを取って来れるか実験（成功）
    // this.coupons = await this.$axios.get("/v1/mypage/top");

    // await this.subsidyItem(coupons.data.subsidyData);

    // console.log('repo', this.$repositories)
    // try {
    //   await this.$store.dispatch("subsidy/getSubsidy");
    //   const subsidyData = this.$store.state.subsidy.availableDataList;
    //   console.log('store subsidyData', subsidyData);
    //   console.log('this', this);
    // } catch (e) {
    //   console.log("this.coupons $store.dispatch(\"subsidy/getSubsidy\") error",e)
    // }
  },
  watch: {
    $route() {
      this.$meta.setDocumentTitle('マイページ');
      this.setBreadcrumb();
    },
  },
};
</script>

<style lang="scss" scoped>
.field-recommendItem {
  max-width: 100%;

  @media (max-width: 720px) {
    overflow-x: scroll;
  }

  @media (max-width: 375px) {
    max-width: 335px;
  }

  &__notif-err {
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    color: red;
    font-size: 16px;
    font-weight: 500;
  }
}

.other-product-data {
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    overflow-x: scroll;

    :deep() .item-recommended {
      flex: 0 0 210px;
    }
  }
}
.title-box {
  @apply relative flex items-center mt-3;

  h2 {
    font-size: 20px;
    @apply font-bold;
  }

  &.v-line {
    &:before {
      content: '';
      width: 12px;
      height: 3px;
      @apply bg-primary;
      margin-right: 11px;
      border-radius: 3px;
    }
  }

  &.h-line {
    h2 {
      font-size: 24px;
      @apply font-bold;
    }

    &:before {
      content: '';
      width: 4px;
      height: 30px;
      @apply bg-primary;
      margin-right: 24px;
      border-radius: 3px;
    }
  }
}
.subsidy {
  &__dispSubsidyNm {
    width: 40%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  &__info {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    &__container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: start;
    }
  }

  &__label {
    margin-right: 1rem;
    padding: 0.125rem 0.4rem;
    border-radius: 2px;
    background-color: $CoolGray4;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      margin-right: 0.25rem;
      font-size: 10px;
    }
  }

  &__subInfo {
    font-size: 12px;
    color: $CoolGray4;
  }

  .number-of-assets {
    margin: 0;
  }

  .remaining-amount {
    width: 107px;
    display: inline-block;
    text-align: center;
  }

  &__count {
    font-size: 32px;
    font-weight: 600;
  }
}
.text-note {
  color: black;
}
</style>
