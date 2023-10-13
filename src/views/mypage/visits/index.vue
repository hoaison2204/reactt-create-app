<template>
  <section>
    <div v-if="this.dataList.length >= 1" class="p-mypage-visits">
      <!-- 並び替え -->
      <!-- TODO：カテゴリ機能実装時下のコメントアウトはずす　SP画面時　ソートボタンが中央に寄ってしまうため -->
      <!-- <div class="flex mt-2 sm:justify-around gap-2"> -->
      <div class="flex mt-2 gap-2">
        <div class="flex-col">
          <div class="border border-gray-200 rounded p-1 mr-2 sm:mr-0 relative filter-select"
            @click="selectorSortShow = !selectorSortShow"
            :class="[selectorSortShow ? 'open' : '' ]"
          >
            <span class="p-mypage-visits__item--sort absolute left-4" v-show="selectedSort == '並び替え'">並び替え</span>
            <span class="absolute bottom-3 left-4 top-2.5"
              v-for="selectorSort in selectorSorts"
              v-show="selectedSort == selectorSort.value"
              :key="selectorSort.id"
            >
              {{ selectorSort.text}}
            </span>
            <Icon name="arrow_down" width="20" height="20" class="absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <transition name="top">
            <div
              class="selectBox__selector"
              v-show="selectorSortShow"
            >
              <div
                class="selectBox__selectorItem"
                v-for="selectorSort in selectorSorts"
                @click="isSort = selectorSort.value, selectedSort = selectorSort.value, selectorSortShow = !selectorSortShow"
                :key="selectorSort.id"
              >
                {{ selectorSort.text}}
              </div>
            </div>
          </transition>
        </div>
        <!-- ===================================================================
                                TODO:カテゴリ機能後回し 
        ========================================================================-->
        <div class="flex-col hidden">
          <div class="border border-gray-200 rounded p-1 relative filter-select"
            @click="selectorCategoryShow = !selectorCategoryShow"
            :class="[ selectorCategoryShow ? 'open' : '' ]"
          >
            <div class="img-item-sort show-img-sort absolute" v-show="selectedCategory == 'カテゴリで絞り込む'" />
            <span class="p-mypage-visits__item--category absolute right-3" v-show="selectedCategory == 'カテゴリで絞り込む'">カテゴリで絞り込む</span>
            <span class="absolute bottom-3 left-4"
              v-for="selectorCategory in largeCategoryList"
              v-show="selectedCategory == selectorCategory.name"
              :key="selectorCategory.id"
            >
              {{ selectorCategory.name}}
            </span>
          </div>
          <transition name="top">
            <div
              class="selectBox__selector"
              v-show="selectorCategoryShow"
            >
              <div
                class="selectBox__selectorItem"
                v-for="selectorCategory in largeCategoryList"
                @click="isSort = selectorCategory.value, selectedCategory = selectorCategory.name, selectorCategoryShow = !selectorCategoryShow"
                :key="selectorCategory.id"
              >
                {{ selectorCategory.name}}
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="p-mypage-visits__pager mt-6 sm:mt-5">
        <Paginator
          :total="totalResults"
          :size="10"
          @pageChange="pageChange"
          :paginatorAvailable="false"
          :paginatorFontSize="15"
          :totalFontSizePC="15"
          :totalFontSizeSP="13"
          class="flex-row"
      />
      </div>

      <div
        class="p-mypage-visits__menus"
        :class="{ menuFirstMargin: index == 0 }"
        v-for="(item, index) in dataList"
        :key="`view-list-${index}`"
      >
        <ul>
          <li class="c-card c-card__inner4 sm:px-3 sm:py-5">
            <div class="menus__item__list item-list">
              <div class="menus__item__image image">
                <div
                  class="img-item show-img"
                  :style="{
                    'background-image': `url(${item.menuDetailResponse.menuImages[0].imageUrl})`
                  }"
                  v-if="
                    item.menuDetailResponse &&
                    item.menuDetailResponse.menuImages[0]
                  "
                />
                <div class="img-item show-img img-none" v-else></div>
                <!-- PC 削除ボタン -->
                <div class="point-event menus__item__button flex sm:hidden" @click="showModal('showPopupAnnounce', item.id)">
                  <div class="mr-1">
                    <Icon name="action_delete" :width="19" :height="19" />
                  </div>
                  <p class="menus__item__button-text lg:mt-1">削除</p>
                </div>
              </div>

              <!-- 提供プランがある場合 -->
              <div
                class="menus__item__content w-full flex flex-col justify-between"
                v-if="item.menuDetailResponse"
              >
                <div>
                  <div class="top justify-between sm:flex">
                    <!-- タイトル・メニューナンバー -->
                    <div class="flex sm:flex-col">
                      <div class="label cat-title menus__item__content__label--title text-center" v-if="getCategoryNm(item)">
                        {{ getCategoryNm(item) }}
                      </div>
                      <div class="item-number menus__item__content__label--number sm:self-start" v-if="getMenuNo(item)">
                        [メニューNo. {{ getMenuNo(item) }}]
                      </div>
                    </div>
                    <!-- お気に入りマーク -->
                    <div class="control justify-top mt-0 sm:pb-5">
                      <span
                        @click="addInFavoriteList(item)"
                        class="point-event"
                        v-if="!item.favourite"
                      >
                        <Icon name="action_favorite" class="mr-0" :color="`#ef3d55`" :width="20" :height="20" />
                      </span>
                      <span
                        @click="removeInFavoriteList(item.idFavourite)"
                        class="point-event"
                        v-if="item.favourite"
                      >
                        <Icon name="action_favorite_fill" class="mr-0" :color="`#ef3d55`" :width="20" :height="20" />
                      </span>
                    </div>
                  </div>
                  <!-- PC ホテル名・住所 -->
                  <div
                    class="title two-lines-ellipsis point-event text-left text-xl  mt-3 mb-2 pb-0 sm:hidden"
                    @click="gotoPath(item)"
                    v-if="getMenuNm(item)"
                  >
                    {{ getMenuNm(item) }}
                  </div>
                  <div class="address">
                    <Icon name="status_map" :color="'#73767A'" v-if="getAreaName(item)" />{{
                      getAreaName(item)
                    }}
                  </div>
                </div>
              </div>
              <!-- 提供プランがない（期限が切れた）場合 -->
              <div
                class="menus__item__content w-full no-item"
                v-else
              >
                <div class="end-of-offer">
                  {{ item.comment }}
                </div>
              </div>
            </div>
            <!-- SP ホテル名 住所 削除ボタン-->
            <div class="menus-item__SP">
              <div
                class="title menus-item__SP__content text-left text-epip point-event my-2 pb-0"
                @click="gotoPath(item)"
              >
                {{ getMenuNm(item) }}
              </div>
              <div class="flex justify-between h-5">
                <div class="address menus-item__SP__cotent--address mt-0 pt-1">
                  <Icon name="status_map" v-if="getAreaName(item)"/>
                  <span class="address-name">{{ getAreaName(item) }}</span>
                </div>
                <div class="point-event flex relative" @click="showModal('showPopupAnnounce', item.id)">
                  <div class="absolute right-7 -top-1">
                    <Icon name="action_delete" :width="16" :height="16" />
                  </div>
                  <p class="menus__item__button-text">削除</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="p-mypage-favorites__footer" v-if="dataList.length > 0">
        <div class="c-card__inner4 pt-8">
          <Paginator
            :total="totalResults"
            @pageChange="pageChange"
            :sortList="sortList"
            :size="10"
            :totalFontSizePC="15"
            :totalFontSizeSP="13"
            :paginatorFontSize="20"
          />
        </div>
      </div>

      <!-- PC閲覧履歴削除モーダル -->
      <ModalFrame
        ref="showPopupAnnounce"
        width="1032px"
        class="overflow-visible"
        title="削除の確認"
        leftBtnText="戻る"
        rightBtnText="削除"
        :is_contentCenter="true"
        contentText="閲覧履歴から削除しますか？"
        parentMethodNameRight="handleOk"
        @handleOk="handleOk"
      >
      </ModalFrame>
    </div>

    <!-- 閲覧履歴が0のとき以下を表示する -->
    <div v-else>
      <div class="pt-2">
        <div class="c-card c-card__inner4 h-32 flex flex-row justify-center items-center">
          <p v-if="isIcService(mypageDisplayCode)" class="items-center text-center">
            閲覧履歴はありません<br>
          </p>
          <p v-else class="items-center text-center">
            閲覧履歴はありません<br>
            ぜひベネフィット・ステーションをお楽しみください。
          </p>
        </div>
      </div>
      <TextButton to="/mypage/" position="left" class="mt-4">
          マイページに戻る
          <Icon name="arrow_left" :color="$colors.brand.red" />
      </TextButton>
    </div>
  </section>
</template>

<script>
import get from "lodash/get";
import uniqBy from "lodash/uniqBy";
import filter from "lodash/filter";

export default {
  data() {
    return {
      totalResults: 0,
      dataList: [],
      currentPage: 1,
      isSort: false,
      sortList:[
        { value: "dateAdded,desc", label: "閲覧日時新しい順" },
        { value: "dateAdded,asc", label: "閲覧日時が古い順" }
      ],
      selected: null,
      params: {
        itemType: "viewed",
        page: this.$route.query?.page - 1 || 0,
        size: 10,
        sort: "dateAdded,desc"
      },
      sortBy: "dateAdded,desc",
      selectedSort: '並び替え',
      selectedCategory: 'カテゴリで絞り込む',
      selectorSortShow: false,
      selectorCategoryShow: false,
      selectorSorts: [
        { id: 1, text: "閲覧日時の新しい順", value: false },
        { id: 2, text: "閲覧日時の古い順", value: true },
      ],
      selectorCategorys: [],
      categories: [],
      catLrgClassCd: "",
    };
  },
  created() {
    this.getDataViewed(this.params);
  },
  async mounted() {
    if (this.sortValue) this.selected = this.sortValue;
    this.showSlideMenus()
    this.$page.isTitle = true;
    this.setBreadcrumb();
    const res = await this.$repositories("search").getLargeCategories();
    if (res) {
      this.categories = res.data.categories || [];
    }
  },
  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    lifeReorderDomain() {
      return this.getLifeReorderDomain(this.mypageDisplayCode);
    },
    stayReorderDomain() {
      return this.getStayReorderDomain(this.mypageDisplayCode);
    },
    shopReorderDomain() {
      return this.getShopReorderDomain(this.mypageDisplayCode);
    },
    sortValue() {
      let query = Object.assign({}, this.$route.query);
      if (!query.sort) return this.sortList[0];
      return query.sort;
    },
    largeCategoryList() {
      if (this.categories.length) {
        const listFilter = filter(
          this.categories,
          (item) =>
            item.level === 1 &&
            ((+item.catClassCd >= 102 && +item.catClassCd <= 114) ||
              (+item.catClassCd >= 116 && +item.catClassCd <= 119))
        );
        return uniqBy(listFilter, "catClassCd");
      }
    }
  },
  methods: {
    onChangeLargeCat(event) {
      if (event.target.value === "") {
        this.form.catLrgClassCd = "";
        this.form.catMidClassCd = "";
        this.form.catSmlClassCd = "";
      } else if (event.target.value !== "") {
        this.form.catLrgClassCd = event.target.value;
        this.form.catMidClassCd = "";
        this.form.catSmlClassCd = "";
      }
    },
    getCategoryNm(item) {
      const catLrgClassCd = get(
        item,
        "menuDetailResponse.categoryInfomation.catLrgClassCd",
        ""
      );
      const catLrgClassNm = get(
        item,
        "menuDetailResponse.categoryInfomation.catLrgClassNm",
        ""
      );
      if (catLrgClassNm) {
        if (!this.isIcService(this.mypageDisplayCode) || catLrgClassCd !== this.CONST.CATEGORIES.BENE_MAIL_ORDER_CODE) {
          return catLrgClassNm;
        }
        return this.CONST.CATEGORIES.BENE_MAIL_ORDER_IC_NAME;
      } else {
        return null
      }
    },
    gotoPath(item) {
      console.log("mypage/visits/index.vue > gotoPath: ");
      console.log(item);
      const menuNo = get(item, "menuDetailResponse.menuNo", "");
      const srvicDiv = item?.menuDetailResponse?.srvicDiv;
      const catLrg = get(item, "menuDetailResponse.categoryInfomation.catLrgClassCd", null);
      const catMid = get(item, "menuDetailResponse.categoryInfomation.catMidClassCd", null);
      const catSml = get(item, "menuDetailResponse.categoryInfomation.catSmlClassCd", null);
      const serviceType = item.serviceType;
      if (this.mypageDisplayCode != "IC"){
        if (serviceType === this.CONST.MENU_ITEM_INFO_SERVICE_TYPE.LIFE) {
        location.href = `${this.lifeReorderDomain}/menus/catExl=null/catLrg=${catLrg}/catMid=${catMid}/catSml=${catSml}/menuNo=${menuNo}`;
        } else if(serviceType === this.CONST.MENU_ITEM_INFO_SERVICE_TYPE.SHOP) {
          location.href = `${this.shopReorderDomain}/menus/menuNo=${menuNo}`
        }  else {
          if(srvicDiv === this.CONST.SRVIC_DIV.TOURS) location.href =  `${this.stayReorderDomain}/dp/menus/${menuNo}`;
          else location.href =  `${this.stayReorderDomain}/menus/${menuNo}`
        }
      }else{
        if(serviceType === this.CONST.MENU_ITEM_INFO_SERVICE_TYPE.LIFE){
          location.href = `${this.lifeReorderDomain}/product/detail-life/catExl=null/catLrg=${catLrg}/catMid=${catMid}/catSml=${catMid}/menuNo=${menuNo}`
        } else if(serviceType === this.CONST.MENU_ITEM_INFO_SERVICE_TYPE.SHOP) {
          location.href = `${this.shopReorderDomain}/product/detail-goods/menuNo=${menuNo}`
        }
      }
      
    },
    getImageUrl(item) {
      const imageUrl = get(
        item,
        "menuDetailResponse.menuImages[0].imageUrl",
        null
      );
      if (imageUrl) {
        return imageUrl;
      }
      return require("@/assets/images/mypage/noImage.png");
    },
    getMenuNo(item) {
      return get(item, "menuDetailResponse.menuNo", "");
    },
    getMenuNm(item) {
      return get(item, "menuDetailResponse.menuNm", "");
    },
    getAreaName(item) {
      const areaMidClassNm = get(
        item,
        "menuDetailResponse.areaInfomation.areaMidClassNm",
        ""
      );
      const areaDtlClassNm = get(
        item,
        "menuDetailResponse.areaInfomation.areaDtlClassNm",
        ""
      );
      if (areaMidClassNm && areaDtlClassNm) {
        return `${areaMidClassNm} > ${areaDtlClassNm}`;
      }
      if (areaMidClassNm && !areaDtlClassNm) {
        return `${areaMidClassNm}`;
      }
      if (!areaMidClassNm && areaDtlClassNm) {
        return `${areaDtlClassNm}`;
      }
      return "";
    },
    // menuDetailResponse が null のデータがある場合の処理
    getMenuDetailResponse(res, totalResults) {
      const dataLists = [];
      if(totalResults > 0){
        res.content.forEach(item => {
          let dataItem = item.menuDetailResponse;
          let endOfOffer = {};
          if(dataItem){
            dataLists.push(item);
          } else {
            // menuDetailResponse 以外のデータはリストに保存しておく（削除などに必要なため）
            endOfOffer.customerNo = item.customerNo;
            endOfOffer.dateAdded = item.dateAdded;
            endOfOffer.id = item.id;
            endOfOffer.favourite = item.favourite;
            endOfOffer.idFavourite = item.idFavourite;
            endOfOffer.itemType = item.itemType;
            endOfOffer.menuNo = item.menuNo;
            endOfOffer.serviceType = item.serviceType;
            endOfOffer.comment = this.CONST.MENU_ITEM_INFO_SERVICE_TYPE.COMMENT;
            dataLists.push(endOfOffer);
          }
        })
      }
      return dataLists;
    },
    async getDataViewed(params) {
      this.$loading.startProcessing();
      const res = await this.$repositories("mypage").getViewedListHistory(
        params
      );
      this.$loading.finishProcessing();
      if (res.isError) {
        const text = "エラーが発生しました";
        this.$notifyToast.show({
          title: res?.data?.message || "エラーが発生しました",
          text: text,
          duration: 5000
        });
        return;
      }
      this.totalResults = get(res, "totalElements", 0);
      this.dataList = this.getMenuDetailResponse(res, this.totalResults);
      const currentPage = this.$route.query?.page || 0;
      if (currentPage >= Math.ceil(this.totalResults / 10) + 1) {
        this.$router.push({ path: "/mypage/visits" });
      }
    },
    getPanigationResults(val) {
      const params = {
        itemType: "viewed",
        page: val < 1 ? 0 : val - 1,
        size: 10,
        sort: this.sortBy
      };
      this.getDataViewed(params);
    },
    addInFavoriteList(item) {
      const page = this.$route.query?.page || 0;
      const data = {
        itemType: "favourite",
        menuNo: item.menuNo,
        serviceType: item.serviceType
      };
      this.$repositories("mypage")
        .addFavorite(data)
        .then(() => {
          this.getPanigationResults(page);
        });
    },
    removeInFavoriteList(menuNo) {
      const page = this.$route.query?.page || 0;
      this.$repositories("mypage")
        .deleteFavorite(menuNo)
        .then(() => {
          this.getPanigationResults(page);
        });
    },
    updateQueryRoute(page) {
      let query = Object.assign({}, this.$route.query);
      this.$router.push({ query: { ...query, page } });
    },
    async deleteItemInList(id) {
      const temp = this.dataList.length === 1 ? 1 : 0;
      const page = this.$route.query?.page - temp || 0;
      this.$repositories("mypage")
        .removeItemInList(id)
        .then(() => {
          this.getPanigationResults(page < 0 ? 0 : page);
          this.updateQueryRoute(page < 0 ? 0 : page);
          this.visiblePopupDelete = false;
        });
    },
    getSortResults() {
      if (this.isSort) {
        this.sortBy = "dateAdded,asc";
      } else {
        this.sortBy = "dateAdded,desc";
      }
      
      const params = {
        itemType: "viewed",
        page: this.$route.query?.page - 1 || 0,
        size: 10,
        sort: this.sortBy
      };
      this.$repositories("mypage")
        .getViewedListHistory(params)
        .then((data) => {
          if (data && Array.isArray(data.content)) {
            this.totalResults = get(data, "totalElements", 0);
            this.dataList = this.getMenuDetailResponse(data, this.totalResults);
          }
        });
    },
    showModal(name, id) {
      this.$refs[name].show();
      this.itemDelete = id;
    },
    hideModal(name) {
      this.$refs[name].hideModal();
    },
    showModalDelete($event) {
      this.itemDelete = $event;
      this.visiblePopupDelete = true;
    },
    handleOk() {
      this.deleteItemInList(this.itemDelete);
      this.hideModal("showPopupAnnounce");
    },
    handleCancel() {
      this.visiblePopupDelete = false;
      this.hideModal("showPopupAnnounce");
    },
    pageChange(page) {
      this.getPanigationResults(page);
      this.$emit("pageChange", page);
    },
    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("閲覧履歴"));
    },
    changeSort() {
      let sort = "ticketDate";
      let query = Object.assign({}, this.$route.query);
      if (query.page) delete query.page;
      if (!query.sort || query.sort == sort) {
        sort = "expireTo";
      }
      this.$router.push({ query: { ...query, sort } });
    },
    // SP画面時、サイドバーの表示をなくす
    showSlideMenus() {
      if (window.innerWidth > 768) {
        this.$page.showSideMenu = true
      } else {
        this.$page.showSideMenu = false
      }
    }
  },
  watch: {
    $route() {
      this.setBreadcrumb();
      this.selected = this.sortValue;
    },
    isSort: function () {
      this.getSortResults()
    }
  }
};
</script>

<style lang="scss" scoped>
.p-mypage-visits {

  &__item--sort {
    top: 11px;

    @include mq() {
      top: 10px;
    }
  }

  &__item--category {
    top: 11px;
    @include mq() {
      top: 10px;
    }
  }

  &__item--page {
    margin-top: 21px;
    margin-bottom: 16px;
  }

  &__select {
    width: 195px;
  }

  &__menus {
      margin-top: 1rem;
    &__item {
      li {
        padding: 32px 42px;
      }
    }
  }

  &__menus .menus__item__list .menus__item__content .top .label {
    background: #FFF8E5;
    color: #1F2021;

    @include mq() {
      font-size: 10px;
    }
  }

  &__menus .menus__item__list .menus__item__content .address {
    color: #73767A;
    font-size: 15px;
  }
}

.address-name {
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  }


::v-deep .c-modal__content {
  padding: 0 !important;
}

.show-img {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.img-none {
  background-image: url("https://d3u3cps1l61p9b.cloudfront.net/img/NOIMAGE.jpg");
}
.image {
  align-self: start;
}
.img-item {
  width: 120px;
  height: 120px;
  @media only screen and (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
}
.two-lines-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.item-list {
  align-items: normal;
}
.title-modal {
  font-style: normal;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}
.description-modal {
  width: 100%;
  font-weight: 400;
  font-size: 15px;
  color: #1f2021;
  text-align: center;
  margin-bottom: 1.5rem;
}
.btn-cms-modal {
  margin: 2rem 0;
  text-align: center;
}
.mw-select-modal {
  text-align: center;
  min-width: 200px;
}
.c-btn-modal {
  min-width: 140px;
  height: 37px;
}

.btn-right {
  background-color: black;
  color: white;
  border: 1px solid;
  border-radius: 5px;
}

.btn-left {
  border: 1px solid;
  border-radius: 5px;
}

.submit-btn {
  background-color: #1f2021;
  box-shadow: 0 2px 8px 0 #1f202152;
  border-radius: 8px;
  .title-btn {
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
  }
}
.option-btn {
  background-color: #ffffff;
  border: 1px solid #a8aaad;
  span {
    font-size: 0.75rem;
    color: #1f2021;
  }
}
.option_btn_active {
  background-color: #63666a;
  span {
    color: #ffffff;
  }
}
.text-epip {
  line-height: 21px;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 40px;
}
.pointer {
  cursor: pointer;
}
.font-sm {
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
}

.font-14 {
  font-size: 14px;
}

.font-15 {
  font-size: 15px;
}

.point-event {
  cursor: pointer;
}

.menus__item {
  &__button {
    width: 55px;
    margin-top: 13px;

    &-text {
      padding-top: 1px;

      @include mq() {
        padding-top: 0;
        font-size: 13px;
      }
    }
  }

  &__content {
    &__label--title {
      padding: 2px 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__label--number {
      font-size: 10px !important;
      margin-top: 4px;
    }
  }
}


.text-epip {
  line-height: 21px;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 40px;
}
.pointer {
  cursor: pointer;
}
.font-sm {
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
}
.cat-title {
  @media only screen and (max-width: 768px) {
    height: 15px;
    line-height: 15px;
    max-width: 180px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box !important;
  }
}

.font-14 {
  font-size: 14px;
}

.font-15 {
  font-size: 15px;
}

.point-event {
  cursor: pointer;
}

.filter-select {
  height: 48px;
  width: 195px;
  @include mq() {
    height: 41px;
    width: 168px;
    font-size: 13px;
  }
}

.img-item-sort {
  width: 18px;
  height: 18px;
  
  @include mq() {
    width: 13px;
    height: 13px;
  }
}

.show-img-sort {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('~@/assets/images/sort-icon.png') !important;
  top: 14px;
  left: 10px;

  @include mq() {
    top: 13px;
  }
}

.menuFirstMargin {
  margin-top: 6px;
}

.menus-item__SP {
  &__content {
    margin-top: 10px;
    height: 24px;
    font-size: 16px !important;

  }
}

.menus-item__SP__cotent--address {
  height: 19px;
  font-size: 13px;
  color: #73767A;
}

.selectBox {
  position: relative;
  width: 10em;
  height: 60px;
}

.selectBox select {
  position: absolute;
  left: 100%;
  top: 100%;
  width: 100%;
  height: 100%;
}

.selectBox__output {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1em;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  z-index: 2;
}

.selectBox__output::after {
  display: block;
  position: absolute;
  right: 3%;
  top: 50%;
  transform: translateY(-50%);
  content: "û";
}

.selectBox__output.open::after {
  transform: translateY(-50%) rotate(180deg);
}

.selectBox__selector {
  position: absolute;
  border: none;
  border-radius: 0.25rem;
  background-color: #fff;
  transform-origin: left top;
  z-index: 10;
}

.selectBox__selectorItem {
  border-width: 1px;
  border-color: rgba(229, 231, 235);
  height: 37px;
  width: 193px;
  padding-left: 20px;
  display: flex;
  align-items: center;

  @include mq() {
    width: 167px;
    font-size: 15px;
  }
}
.top-enter-active,
.top-leave-active {
  transition: 0.3s;
  overflow: hidden;
}

.top-enter,
.top-leave-to {
  transform: scaleY(0);
}

.top-leave,
.top-enter-to {
  transform: scaleY(1);
}

.no-item {
  margin-left: 1.5rem;
  background-color: #D9D9D9;
  color: #7f7f7f;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1.5rem;
}

</style>