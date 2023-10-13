<template>
  <section class="p-mypage-benepo">
    <div class="right-content">
      <div class="p-mypage-benepo__textLink__left inline-block crossIn lg:mb-4">
        <!-- ベネポ画面へ戻るリンク -->
        <router-link
          to="/mypage/benepo?currentID=0"
          class="c-text-button c-text-button--left"
        >
          <div class="crossIn_parent text-sm">
            <Icon name="arrow_left" class="crossIn_parent__icon" :width="20" :height="20" :color="$colors.brand.red" />
            <span class="crossIn_parent__content">ベネポに戻る</span>
          </div>
          <div class="crossIn_child text-sm">
            <span class="crossIn_child__content">もっと見る</span>
          </div>
        </router-link>
      </div>
      <div class="c-card wrapper border-0 shadow-none" v-if="isShowList">
        <div class="c-card__content ">
          <div class="p-mypage-benepo__points">
            <div class="p-mypage-benepo__points__total c-card__inner border-b border-gray-300 sm:py-0 sm:px-3">
              <div class="p-mypage-benepo__points__totalPoint sm:m-0">
                <!-- ヘッダータイトル -->
                <p class="text-xl sm:text-base sm:py-5">獲得予定ベネポ</p>
                <!-- 獲得予定ベネポ合計 -->
                <p class="flex items-center">
                  <span class="text-pc-base text-sp-base font-normal mr-4 sm:mr-2">合計</span>
                  <span class="text-2xl sm:text-lg">
                    {{ points.grantedPoint | formatInteger }}P
                  </span>
                </p>
              </div>
              <div>
              </div>
            </div>
          </div>
          <!-- メインコンテンツ -->
          <div class="c-card__inner2 sm:px-3">
            <ul class="p-mypage-benepo__contentList">
              <li v-for="item in displayItems" :key="item.id" class="border-b border-gray-300 gap-5 py-6 sm:py-5">
                <!-- 獲得予定ベネポ：左要素 -->
                <div class="contentList__head left-content block">
                  <!-- 獲得予定日時 -->
                  <span class="item-left-date text-epip text-sp-base sm:mb-2"
                    >獲得予定日：{{ item.date ? item.date : "未定" }}</span
                  >
                  <!-- ベネポ獲得理由 -->
                  <p class="item-left-menu text-epip text-sp-base">
                    {{ item.content }}
                  </p>
                </div>
                <!-- 獲得予定ベネポ：右要素 -->
                <div class="contentList__point right-content flex flex-col items-end">
                  <div>
                    <span v-if="parseInt(item.point) !== 0" class="value__plus flex text-xl text-sp-base">
                      <div v-if="parseInt(item.point) > 0">+</div>
                      <div v-else-if="parseInt(item.point) < 0">-</div>
                      {{ item.point | formatInteger  }}P
                    </span>
                    <span v-else>ー</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- フッターコンテンツ -->
        <div class="c-card__content">
          <div class="c-card__inner5">
            <!-- ページネーション -->
            <div class="px-8 border-b-2 border-gray-200 sm:border-b-0">
              <Paginator
                class="sm:w-full flex justify-center flex-col mb-6"
                :total="100"
                :size="itemNumPerPage"
                :positionCenter="true"
                :paginatorFontSize="20"
                :totalFontSizePC="14"
                :totalFontSizeSP="13"
                @pageChange="pageChange"
              />
            </div>
            <!-- ベネポ獲得における諸注意 -->
            <div class="p-mypage-benepo__infoMessage sm:p-0">
              <div class="font-bold text-xl mb-4 sm:text-base sm:mb-3">ベネポの付与時期について</div>
              <p class="text-pc-base text-sp-base text-gray-600 break-all sm:pb-5">
                ベネポ付与時期についてのテキストを表示するベネポ付与時期についてのテキストを
                表示するベネポ付与時期についてのテキストを表示するベネポ付与時期についてのテキストを
                表示するベネポ付与時期についてのテキストを表示するベネポ付与時期についてのテキストを
                表示するベネポ付与時期についてのテキストを表示するベネポ付与時期についてのテキストを
                表示する
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="c-card" v-else>
        <div class="c-card__content notice">
          該当するお知らせはありません。
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { get } from "lodash";

export default {
  props: ["mypageDisplayCode"],
  data() {
    return {
      points: {},
      curPage: 1,
      pageNum: 0,
      itemNumPerPage: 10,
      totalRecordPoint: 0,
      listPointHistory: [],
      grantedPoint: null
    };
  },
  async created() {},
  async mounted() {
    this.setBreadcrumb();
      this.$page.showSideMenu = true;
    this.$page.isTitle = true;
    this.$meta.setDocumentTitle("獲得予定ベネポ詳細");
    const points = await this.$repositories("mypage").getPointHistory({
      commandType: "4",
      pointFrom: this.$moment().format("YYYYMMDDTHHmmss+0900")
    });
    this.points = points.data;
    this.curPage = this.$route.query.page
      ? this.$route.query.page
      : this.curPage;
    await this.getTotalElePoint(this.points.historyDataList);
    this.calcPageNum();
  },
  computed: {
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    displayItems() {
      const startIdx = (this.curPage - 1) * this.itemNumPerPage;
      const endIdx = startIdx + this.itemNumPerPage;
      return this.listPointHistory.slice(startIdx, endIdx);
    },
    isShowList() {
      return this.displayItems.length > 0;
    }
  },
  methods: {
    getTotalElePoint(obj) {
      let commandTypelist = obj.filter((item) => {
        return item;
      });
      this.totalRecordPoint = commandTypelist.length;
      this.getListPointHistory(commandTypelist);
    },
    async getListPointHistory(obj) {
      this.listPointHistory = [];
      const objects = [];
      for(let i = 0; i < obj.length; i++){
        const pointHistory = {};
        pointHistory.menuNo = obj[i].menuNo;
        pointHistory.point = obj[i].point;
        pointHistory.content = obj[i].reasonCustomer;
        pointHistory.date = obj[i].validFrom
          ? this.$moment(obj[i].validFrom).format("YYYY/MM/DD")
          : "";
        if(obj[i].menuNo){
          pointHistory.menuNm = await this.getMenuName(obj[i].menuNo)
        }
        objects.push(pointHistory);
      }
      const descObjects = [...objects].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
        );
        this.listPointHistory = descObjects;
    },
    async getMenuName(menuNo){
      const menuNm = await this.$repositories("orders")
        .getMenuBasicInfo(menuNo)
        .then(
          (data) => {
            return get(data, "menuNm", "");
          }
        );
      return menuNm
    },
    pageChange(page) {
      this.curPage = page;
    },
    calcPageNum() {
      this.pageNum = Math.ceil(
        this.listPointHistory.length / this.itemNumPerPage
      );
    },
    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("ベネポ", "/mypage/benepo")
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("獲得予定ベネポ詳細"));
    }
  },
  watch: {
    $route() {
      this.setBreadcrumb();
      this.currentId = this.$route.query.currentID;
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  border: 1px #f1f1f1 solid;
}

.item-left-date {
  display: block;
  width: 35%;
  min-width: 201px;
  font-size: 14px;
  margin-bottom: 12px;
}

.item-left-menu {
  display: flex;
  align-items: center;
}
.item-left-menu__menuNm {
  color: #9d9d9d;
  font-size: 12px;
}

.text-epip {
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
}

.notice {
  padding: 2.5rem;
  text-align: center;
}

.crossIn {
  position: relative;
  &_parent {
    opacity: 1;
    transition: .3s;
    &__content {
      font-size: 15px;
    }
  }
  &_child {
    position: absolute;
    color: #259BEE;
    opacity: 0;
    transition: .3s;
    &::before, 
    &::after {
      content: '';
      position: absolute;
      background-color: #259BEE;
      width: 1px;
      height: 7px;
      transform: translate(-50%, -50%);
      left: -10px;
      transition: all .3s;
      border-radius: 2px;
    }
    &::before {
      top: calc(50% - 1px);
      transform: rotate(45deg);
    }
    &::after {
      top: calc(50% - 6px);
      transform: rotate(-45deg);
    }
  }

  &:hover {
  .crossIn_parent {
    opacity: 0;
  }
  .crossIn_child {
    opacity: 1;
    &::before, 
    &::after {
      left: 85px;
    }
  }
}
}

@media only screen and (min-width: 500px) {
  .text-pc-base {
    font-size: 15px !important;
  }
}
@media only screen and (max-width: 500px) {
  .text-sp-base {
    font-size: 13px !important;
    line-height: 19px !important;
  }
}
</style>
