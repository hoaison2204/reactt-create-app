<template>
  <section>
    <div class="p-mypage-orders">
      <div class="flex mb-6 md:mb-5">
        <!-- 並び替えボタン -->
        <div class="relative mr-5 md:mr-2">
          <div class="filter-summary" @click="isOpenOrderBtn = !isOpenOrderBtn">
            <span>並び替え</span>
            <Icon
              name="arrow_down"
              width="15"
              height="15"
              stroke="#1F2021"
              class="transform transition-transform"
              :class="{ 'rotate-180': isOpenOrderBtn }"
            />
          </div>

          <div class="overflow-hidden absolute w-full z-10">
            <ul class="filter-ul" :class="{ 'is-open': isOpenOrderBtn }">
              <li
                @click="changeOrder('desc')"
                :class="{
                  selected: currentSearchParams.sortOrder === 'desc'
                }"
              >
                登録日時の新しい順
              </li>
              <li
                @click="changeOrder('asc')"
                :class="{
                  selected: currentSearchParams.sortOrder === 'asc'
                }"
              >
                登録日時の古い順
              </li>
            </ul>
          </div>
        </div>

        <!-- カテゴリで絞り込むボタン -->
        <div class="relative" v-if="!isGCService(mypageDisplayCode)">
          <div
            class="filter-summary"
            @click="isOpenCategoryBtn = !isOpenCategoryBtn"
          >
            <Icon name="action_sort_2" stroke="#63666A" class="category" />
            <span>カテゴリで絞り込む</span>
          </div>

          <div class="overflow-hidden absolute w-full z-10">
            <ul class="filter-ul" :class="{ 'is-open': isOpenCategoryBtn }">
              <li
                @click="changeCategory(null)"
                :class="{
                  selected: currentSearchParams.catLrgClassCd == null
                }"
              >
                絞り込みなし
              </li>
              <li
                v-for="cat in catLrgClasses"
                :key="cat.catLrgClassCd"
                :class="{
                  selected:
                    cat.catLrgClassCd === currentSearchParams.catLrgClassCd
                }"
                @click="changeCategory(cat.catLrgClassCd)"
              >
                {{ cat.catLrgClassNm }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex justify-between mb-4 md:text-xs">
        <p>
          <span class="font-bold mr-1">{{ totalCount }}件中</span>
          <span v-if="totalCount">{{ paginateText }}</span>
          <span v-else>0件表示</span>
        </p>

        <!-- TODO: SSO仕様確定次第リンク有効化 -->
        <!-- <router-link class="old-history-link" to="">
          記載のものより過去の履歴を確認する
        </router-link> -->
      </div>
      <!-- Cards detail -->
      <div v-if="orderInfoList.length">
        <div v-for="orderInfo in orderInfoList" :key="orderInfo.acptNo">
          <MypageOrderItem
            :item="orderInfo"
            :shippingDetail="getShippingDetail(orderInfo.acptNo)"
            :mypageBoCode="mypageBoCode"
            :mypageDisplayCode="mypageDisplayCode"
          />
        </div>
      </div>
      <div v-else>
        <div class="item-cards c-card">
          <div class="base-content-item c-card__inner">
            <div style="text-align: center">該当するお知らせはありません。</div>
          </div>
        </div>
      </div>
    </div>

    <Paginator
      v-if="orderInfoList.length > 0"
      class="sm:w-full flex justify-center"
      :total="totalCount"
      :size="10"
      @pageChange="changePage"
    />
  </section>
</template>

<script>
/**
 * @typedef { Object } SearchParams - 申し込み履歴取得時のクエリパラメータ
 * @property { number } page - ページ番号
 * @property { "asc" | "desc" } sortOrder - acptDatetime(受付日時)の昇順または降順
 * @property { string? } catLrgClassCd  - 絞り込みの大カテゴリ番号
 */

export default {
  props: {
    mypageBoCode: String,
  },

  data() {
    return {
      orderHistory: null,

      shippingInfoList: null,

      /** @type { { catLrgClassCd: string; catLrgClassNm: string }[] } カテゴリ一覧 */
      catLrgClasses: null,

      /** 並び替えボタン開閉フラグ */
      isOpenOrderBtn: false,

      /** カテゴリで絞り込むボタン開閉フラグ */
      isOpenCategoryBtn: false
    };
  },

  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    /**
     * 申し込み履歴の総件数
     * @returns { number }
     * */
    totalCount() {
      return this.orderHistory?.totalCount || 0;
    },

    /** @returns { object[] } */
    orderInfoList() {
      return this.orderHistory?.orderInfoList || [];
    },

    /**
     * 現在のURLから申し込み履歴取得に必要なクエリパラメータを参照する
     * @returns { SearchParams }
     * */
    currentSearchParams() {
      const { page, sortOrder, catLrgClassCd } = this.$route.query;
      return {
        page: page || 1,
        sortOrder: sortOrder || "desc",
        catLrgClassCd
      };
    },

    /**
     * ページ上部のページネーションテキストを返す
     * @returns { string }
     */
    paginateText() {
      // ページ表示件数
      const perPage = 10;

      const countFrom = (this.currentSearchParams.page - 1) * perPage + 1;

      let countTo;

      if (this.totalCount > this.currentSearchParams.page * perPage) {
        countTo = this.currentSearchParams.page * perPage;
      } else {
        countTo = this.totalCount;
      }

      return countFrom + "〜" + countTo + "件表示";
    },
  },

  watch: {
    $route: {
      handler: function() {
        // パンくずリスト表示。watchに登録しないとソート、ページ遷移等でパンくずが消失する。
        this.$page.setBreadcrumb(
          this.$page.formatBreadcrumb("マイページ", "/mypage")
        );
        this.$page.setBreadcrumb(this.$page.formatBreadcrumb("申込履歴"));
      },
      // immediate: true にすることでマウント時に1回発火させる
      immediate: true
    }
  },

  methods: {
    /**
     * 現在のページを切り替え、新たなページ番号の申し込み履歴を取得する
     * @param { SearchParams['page'] } page
     * */
    changePage(page) {
      const { sortOrder, catLrgClassCd } = this.currentSearchParams;
      this.fetchOrderHistory({ page, sortOrder, catLrgClassCd });
    },

    /**
     * 並べ替え順序を切り替え、1ページ目から申し込み履歴を取得する
     * @param { SearchParams['sortOrder'] } sortOrder
     */
    changeOrder(sortOrder) {
      const { catLrgClassCd } = this.currentSearchParams;
      this.fetchOrderHistory({ page: 1, sortOrder, catLrgClassCd });
    },

    /**
     * 絞り込みカテゴリを切り替え、1ページ目から申し込み履歴を取得する。
     * nullが渡された場合はカテゴリクリア。
     * @param { SearchParams['catLrgClassCd'] | null } catLrgClassCd
     */
    changeCategory(catLrgClassCd) {
      const { sortOrder } = this.currentSearchParams;
      const query = catLrgClassCd
        ? { page: 1, sortOrder, catLrgClassCd }
        : { page: 1, sortOrder };
      this.fetchOrderHistory(query);
    },

    /**
     * 閲覧履歴をAPIから取得する(初期状態はacptDatetimeの降順)
     * @param { SearchParams } query - 検索に使用するページ数、並び替え、絞り込みの値
     * */
    async fetchOrderHistory(query) {
      this.isOpenOrderBtn = false;
      this.isOpenCategoryBtn = false;

      this.$loading.startProcessing();

      const count = 10;
      const { page, sortOrder, catLrgClassCd } = query;
      this.orderHistory = await this.$repositories("mypage").getOrderHistory({
        reserveSts: 0,
        count,
        startIndex: (page - 1) * count,
        sortBy: "acptDatetime",
        sortOrder,
        catLrgClassCd
      });

      // 総ページ数よりpageの方が高い場合はクエリパラメータを付与しない
      if (page >= Math.ceil(this.totalCount / count) + 1) {
        this.$router.push({ path: "/mypage/orders" });
      } else {
        this.$router.push({ path: "/mypage/orders", query });
      }

      this.$loading.finishProcessing();
    },

    /** 発送対象一覧を取得する */
    async getShippingInfoList() {
      if (this.isGCService(this.mypageDisplayCode)) return;

      await this.$repositories("orders")
        .getShippingTargetInfoList()
        .then(
          (res) => {
            this.shippingInfoList = res.shippingTargetInfoList;
          },
          (error) => {
            this.$toasted.error(error);
          }
        );
    },

    /** @param { string } acptNo - 受付番号 */
    getShippingDetail(acptNo) {
      if (this.isGCService(this.mypageDisplayCode)) return;
      return this.shippingInfoList?.find((item) => item.acptNo == acptNo);
    },
    /** カテゴリを取得する */
    getCategory() {
      this.$repositories("mypage")
      .getCategory()
      .then(
        (res) => {
          if (this.isIcService(this.mypageDisplayCode)) {
            const excludeListCategoryCodes = [
              '110', // 介護
              '112', // 出会い・結婚
              '116' // オリジナル企画
            ];

            this.catLrgClasses = res.catLrgClasses.filter(c => !excludeListCategoryCodes.includes(c.catLrgClassCd));
            const beneIndex = this.catLrgClasses.findIndex(c => c.catLrgClassCd == this.CONST.CATEGORIES.BENE_MAIL_ORDER_CODE);
            const shoppingIndex = this.catLrgClasses.findIndex(c => c.catLrgClassCd == this.CONST.CATEGORIES.SHOPPING_CODE);

            if (beneIndex >= 0) {
              this.catLrgClasses[beneIndex].catLrgClassNm = this.CONST.CATEGORIES.BENE_MAIL_ORDER_IC_NAME;
            }

            if (shoppingIndex >=  0) {
              this.catLrgClasses[shoppingIndex].catLrgClassNm = this.CONST.CATEGORIES.SHOPPING_IC_NAME;
            }
          } else {
            this.catLrgClasses = res.catLrgClasses;
          }
        },
        (error) => {
          this.$toasted.error(error);
        }
      )
    }
  },

  async mounted() {
    // サイドバー表示
    this.$page.showSideMenu = true;
    // タイトル表示
    this.$page.isTitle = true;
    // 申し込み一覧取得
    this.fetchOrderHistory(this.currentSearchParams);
    // 発送対象一覧取得
    this.getShippingInfoList();
    // カテゴリ一覧取得
    await this.getCategory() 
  }
};
</script>

<style lang="scss" scoped>
.c-card {
  position: relative;
  &-loading {
    position: absolute;
    width: 100%;
    height: 100%;
    ::v-deep {
      .c-loading-content__overlay {
        background-color: #ffffff5e;
      }
      .c-loading {
        width: 48px;
        height: 48px;
      }
    }
  }
}

.filter-summary {
  @apply border border-gray-300 rounded h-12 md:h-10 w-48 md:w-40
         flex justify-around items-center cursor-pointer select-none;
  font-size: 15px;

  @include mq() {
    font-size: 13px;
  }
}

.filter-ul {
  @apply opacity-0 bg-white transform -translate-y-full h-0;
  transition: transform 0.3s, opacity 0.2s, height 0.3s;

  > li {
    @apply pl-4 py-2 bg-white border border-t-0 cursor-pointer hover:bg-gray-200;
    font-size: 15px;

    @include mq() {
      font-size: 13px;
    }
  }

  .selected {
    @apply bg-gray-200 cursor-default;
  }

  &.is-open {
    @apply transform translate-y-0 opacity-100 h-full;
  }
}

.old-history-link {
  color: #007aff;
}
</style>