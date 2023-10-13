<template>
  <section>
    <div class="p-mypage-favorites relative">
      <div class="p-mypage-favoites__header c-card c-card__inner4 shadow-none mb-0 pl-0 relative block overflow-visible z-10" v-if="favoriteList.length > 0">
        <div class="p-mypage-favorites__header__buttons z-10">

          <!-- 絞り込みオプション -->
          <ul class="grid grid-cols-3 gap-3 sm:grid-cols-2">
            <!-- 並び替え -->
            <li class="option_item z-50" :class="isShowDropDown.sort ? 'rounded-b-none' : ''">
              <div class="option_item_btn option--withArrow" @click="showDropDown('sort')">
                <span class="option_item_btn_text">並び替え</span>
              </div>
              <ul class="subOption" :style="isShowDropDown.sort ? 'transform: scaleY(1)' : 'transform: scaleY(0)'">
                <li class="subOption_item">
                  <button @click="changeSortBy()" class="subOption_item_btn">
                    <span class="subOption_item_btn_text">登録日時の新しい順</span>
                  </button>
                </li>
                <li class="subOption_item">
                  <button @click="changeSortBy('asc')" class="subOption_item_btn">
                    <span class="subOption_item_btn_text">登録日時の古い順</span>
                  </button>
                </li>
              </ul>
            </li>

            <!-- TODO: カテゴリで絞り込むは次回フェーズにて使用予定のため、一旦非表示 -->
            <!-- カテゴリで絞り込む -->
            <!-- <li class="option_item z-50" :class="isShowDropDown.cat ? 'rounded-b-none' : ''">
              <div class="option_item_btn" @click="showDropDown('cat')">
                <Icon @click="showModal('showPopupDelete', item.id)" name="action_sort_2" fill="#63666A" stroke="#63666A" class="option_item_icon"/>
                &nbsp;
                <span class="option_item_btn_text">カテゴリで絞り込む</span>
              </div>
              <ul class="subOption" :style="isShowDropDown.cat ? 'transform: scaleY(1)' : 'transform: scaleY(0)'">
                <li class="subOption_item" v-for="cat in catLrgClasses" :key="cat.catLrgClassCd">
                  <button class="subOption_item_btn" @click="changeSortBy('category', cat.catLrgClassCd)">
                    <span class="subOption_item_btn_text">{{ cat.catLrgClassNm }}</span>
                  </button>
                </li>
              </ul>
            </li> -->

            <!-- メニューの一括削除 -->
            <li class="option_item z-10">
              <button class="option_item_btn" @click="handleEditMode()">
                <Icon name="action_delete" class="option_item_icon"/>
                &nbsp;
                <span class="option_item_btn_text">メニューの一括削除</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- ページネーション -->
        <div class="p-mypage-favorites__pager w-36 shadow-none">
          <Paginator
              :total="totalResults"
              :size="10"
              @pageChange="pageChange"
              :paginatorAvailable="false"
              :paginatorFontSize="15"
              :totalFontSizePC="15"
              :totalFontSizeSP="13"
          />
        </div>
      </div>

      <!-- お気に入りリスト -->
      <div class="relative block z-0">
        <!-- お気に入り項目が存在している場合 -->
        <div class="mb-6 sm:mb-8" v-if="favoriteList.length > 0">
          <ul v-for="(item, index) in favoriteList" :key="index">
            <li class="flex items-center">
              <!-- 一括削除用チェックボックス -->
              <div class="checkbox border mr-4 w-6 h-6 rounded sm:mr-2 sm:w-5 sm:h-5" v-if="favoriteEditMode">
                <input type="checkbox" :id="`item${index}`" :value="item.id" v-model="selectedItems" class="w-full h-full" />
              </div>

              <!-- お気に入りカード -->
              <div class="box-shadow relative w-full mb-4 py-8 px-10 rounded sm:mb-2.5 sm:py-5 sm:px-3">
                <!-- 提供プランがある場合 -->
                <div class="flex mb-3 sm:mb-2.5" v-if="!item.comment">
                  <!-- 画像 -->
                  <div class="img-height mr-5 sm:mr-3" v-if="getImageUrl(item)">
                    <img :src="getImageUrl(item)" alt="" class="w-full h-full"/>
                  </div>
                  <!-- 提供プランがない（期限が切れた）場合 -->
                  <div v-else class="img-height mr-5 sm:mr-3">
                    <img class="w-full h-full"/>
                  </div>

                  <div>
                    <div class="flex items-center mb-4 sm:block">
                      <!-- ラベル -->
                      <div v-if="getCatNmItem(item)" class="label-cat__width label-cat__color text-pc-sm text-sp-sm mr-4 py-0.5 px-2 rounded overflow-hidden whitespace-nowrap overflow-ellipsis sm:mb-2">
                          {{ getCatNmItem(item) }}
                      </div>
                      <!-- メニューNo -->
                      <div class="text-gray__color text-pc-sm text-sp-sm whitespace-nowrap">
                        <span v-if="getMenuNo(item)">
                          [メニューNo. {{ getMenuNo(item) }}]
                        </span>
                      </div>
                    </div>

                    <!-- PC表示時（メニュー名・ロケーション） -->
                    <div class="sm:hidden">
                      <!-- メニュー名 -->
                      <div v-if="getMenuNm(item)" class="text-xl font-bold cursor-pointer mb-2" @click="gotoPath(item)" tabindex="0"  @keydown.enter="gotoPath(item)">
                        {{ getMenuNm(item) }}
                      </div>
                      <!-- ロケーション -->
                      <div class="text-pc-base">
                        <Icon name="status_map" v-if="getAreaClassNm(item)" color="#73767A"/>
                        <span class="text-gray__color">{{getAreaClassNm(item)}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 提供プランがない（期限が切れた）場合 -->
                <div class="flex mb-3 sm:mb-2.5" v-else>
                  <div class="img-item show-img img-none"></div>
                  <div
                    class="no-item"
                  >
                    <div class="end-of-offer">
                      {{ item.comment }}
                    </div>
                  </div>
                </div>

                <!-- SP表示時（メニュー名・ロケーション・削除ボタン） -->
                <!-- 提供プランがある場合 -->
                <div class="hidden sm:block">
                  <!-- メニュー名 -->
                  <div v-if="getMenuNm(item)" class="mb-2 text-base cursor-pointer"  @click="gotoPath(item)">
                    {{ getMenuNm(item) }}
                  </div>
                  <div class="flex justify-between items-center">
                    <!-- ロケーション -->
                    <div class="text-gray__color text-sp-base">
                      <Icon name="status_map" v-if="getAreaClassNm(item)"/>{{getAreaClassNm(item)}}
                    </div>
                    <!-- 削除ボタン -->
                    <div @click="showModal('showPopupDelete', item.id)" class="text-sp-base flex items-center cursor-pointer min-w-max">
                      <Icon name="action_delete"/><span>削除</span>
                    </div>
                  </div>
                </div>

                <!-- PC表示時（削除ボタン） -->
                <div class="cursor-pointer sm:hidden" @click="showModal('showPopupDelete', item.id)"  tabindex="0" @keydown.enter="showModal('showPopupDelete', item.id)">
                  <Icon name="action_delete" class="mr-1"/>
                  <span class="text-sm">削除</span>
                </div>

                <!-- お気に入りアイコン -->
                <!-- 提供プランがある場合 -->
                <div class="absolute top-8 right-10 sm:top-5 sm:right-3.5" v-if="!item.comment">
                  <Icon name="action_favorite2" fill="#E60021" stroke="#E60021" class="w-6 h-6 sm:w-4 sm:h-4" />
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- お気に入り項目が0件の場合 -->
        <div v-else >
          <div class="item-cards c-card">
            <div class="base-content-item c-card__inner">
              <div class="text-center" >お気に入りは0件になります。</div>
            </div>
          </div>
        </div>
  
        <!-- ページネーション -->
        <div v-if="favoriteList.length > 0">
          <Paginator
              class="justify-start"
              :total="totalResults"
              :size="10"
              :paginatorFontSize="15"
              :totalFontSizePC="15"
              :totalFontSizeSP="13"
              :positionCenter="true"
              @pageChange="pageChange"
          />
        </div>
      </div>

      <!-- 削除モーダル（1件） -->
      <ModalFrame
        ref="showPopupDelete"
        width="1032px"
        class="overflow-visible"
        title="削除の確認"
        leftBtnText="戻る"
        rightBtnText="削除"
        :is_contentCenter="true"
        contentText="お気に入りから削除しますか？"
        parentMethodNameRight="deleteFavoriteInList"
        @deleteFavoriteInList="deleteFavoriteInList()"
      >
      </ModalFrame>

      <!-- 削除モーダル（複数） -->
      <ModalFrame
        ref="showPopupDeleteItems"
        width="1032px"
        class="overflow-visible"
        title="削除の確認"
        leftBtnText="戻る"
        rightBtnText="削除"
        :is_contentCenter="true"
        contentText="選択したお気に入りをすべて削除しますか？"
        parentMethodNameRight="deleteFavoriteItems"
        @deleteFavoriteItems="deleteFavoriteItems()"
      >
      </ModalFrame>
    </div>
  </section>

</template>

<script>
import get from 'lodash/get'
import * as api from '@/components/map-components/common/api.js'

export default {
  data() {
    return {
      favoriteEditMode: false,
      totalResults: 0,
      isSort: true,
      isSortAsc: true,
      page: 1,
      favoriteList: [],
      params: {
        itemType: 'favourite',
        page: +this.$route.query?.page - 1 || 0,
        size: 10,
        sort: 'dateAdded,desc'
      },
      isShowModal: false,
      menuNoDeleteSelected: null,
      catLrgClasses: [],
      isShowDropDown: {
        sort: false,
        cat: false
      },
      selectedItems: [],
    }
  },
  created() {
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
    loggedIn() {
      return true
      //return this.$auth.loggedIn
    },
    stayDomain() {
      return this.getStayDomain(this.mypageDisplayCode);
    },
    lifeDomain() {
      return this.getLifeDomain(this.mypageDisplayCode);
    },
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.params.page = page - 1;
      this.$emit("pageChange", this.page);
      this.getFavoriteList(this.params)
    },
    setBreadcrumb() {
      this.$page.setBreadcrumb(
          this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("お気に入り"));
    },
    showModal(name, id) {
      this.menuNoDeleteSelected = id
      this.$refs[name].show();
    },
    hideModal(name) {
      this.menuNoDeleteSelected = null
      this.$refs[name].hide();
    },
    changeSortBy(type, catCd) {
      if (type === 'category') {
        this.params.cat = catCd
        this.params.sort = 'dateAdded,desc'
        this.showDropDown('cat')
      } else if (type === 'asc') {
        this.params.sort = 'dateAdded,asc'
        this.params.cat = null
        this.showDropDown('sort')
      } else {
        this.params.sort = 'dateAdded,desc'
        this.params.cat = null
        this.showDropDown('sort')
      }
      this.params.page = this.$route.query.page - 1 || 0
      this.getFavoriteList(this.params)
    },
    getCatLargClassNm(categoryInfomation) {
      if (!this.isIcService(this.mypageDisplayCode) ||
        categoryInfomation?.catLrgClassCd !== this.CONST.CATEGORIES.BENE_MAIL_ORDER_CODE) {
          return get(categoryInfomation, 'catLrgClassNm', '')
      }
      return this.CONST.CATEGORIES.BENE_MAIL_ORDER_IC_NAME;
    },
    getCatNm(categoryInfomation) {
      const catLrgClassNm = this.getCatLargClassNm(categoryInfomation)
      const catMidClassNm = get(categoryInfomation, 'catMidClassNm', '')
      const catSmlClassNm = get(categoryInfomation, 'catSmlClassNm', '')
      return [catLrgClassNm, catMidClassNm, catSmlClassNm].filter(item=>item).join("・");
    },
    getAreaClassNm(item) {
      let areaClassNm = ''
      const areaMidClassNm = get(item, 'areaInfomation.areaMidClassNm', '')
      const areaDtlClassNm = get(item, 'areaInfomation.areaDtlClassNm', '')
      if(areaMidClassNm) {
        areaClassNm = areaMidClassNm
      }
      if(areaDtlClassNm) {
        areaClassNm += ` > ${areaDtlClassNm}`
      }
      return areaClassNm
    },
    getFavoriteList(params) {
      const currentPage = this.$route.query?.page || 0
      this.$repositories("mypage")
        .getFavoriteList(params)
        .then(
          (data) => {
            if(data !== null) {
              this.totalResults = get(data, 'totalElements', '')
              const dataFavorites = []
              if(this.totalResults > 0){
                data.content.forEach(item => {
                  let favoriteItem = item.menuDetailResponse;
                  let endOfOffer = {};
                  if(favoriteItem){
                    favoriteItem.id = item.id
                    favoriteItem.serviceType = item.serviceType
                    dataFavorites.push(favoriteItem)
                  } else {
                    // menuDetailResponse 以外のデータはリストに保存しておく（削除などに必要なため）
                    endOfOffer.id = item.id;
                    endOfOffer.serviceType = item.serviceType;
                    endOfOffer.comment = this.CONST.MENU_ITEM_INFO_SERVICE_TYPE.COMMENT;
                    dataFavorites.push(endOfOffer);
                  }
                })
              }
              this.favoriteList = dataFavorites
              this.favoriteList.splice()
              if(currentPage >= Math.ceil(this.totalResults / 10) + 1) {
                this.$router.push({path: '/mypage/favorites'})
              }
            }
          },
          (error) => {
            console.log('----------> error: ', error)
          }
        );
    },
    getImageUrl(item){
      return get(item, 'menuImages[0].imageUrl', '')
    },
    getMenuNo(item){
      return get(item, 'menuNo', '')
    },
    getCatNmItem(item){
      return this.getCatNm(get(item, 'categoryInfomation', ''))
    },
    getMenuNm(item){
      return get(item, 'menuNm', '')
    },
    updateQueryRoute(page) {
      let query = Object.assign({}, this.$route.query);
      this.$router.push({ query: { ...query, page } }, () => {});
    },
    deleteFavoriteInList() {
      const id = this.menuNoDeleteSelected
      this.deleteFavoriteItem(id)
      this.hideModal('showPopupDelete')
    },
    /**
     * お気に入りリストの一件削除
     */
    deleteFavoriteItem(id) {
      this.$repositories("mypage").deleteFavorite(id).then(
        () => {
          let temp = this.favoriteList.length === 1 ? 2 : 1;
          let page = this.$route.query?.page - temp || 0;
          this.params.page = page < 0 ? 0 : page;
          this.updateQueryRoute(this.params.page + 1);
          this.getFavoriteList(this.params)
        },
        (err) => {
          console.log('----------> err delete: ', err)
        })
    },
    /**
     * お気に入りリストの一括削除
     */
    deleteFavoriteItems() {
      const items = this.selectedItems
      for (let i=0;i<items.length;i++) {
        this.deleteFavoriteItem(items[i])
      }
      this.selectedItems = []
      this.hideModal('showPopupDeleteItems')
    },
    /**
     * お気に入りリストの通常モード/編集モードの切り替え
     * 編集モードの場合、お気に入りリストの一括削除処理
     */
    handleEditMode() {
      if(this.favoriteEditMode && this.selectedItems.length > 0) {
        this.showModal('showPopupDeleteItems', null)
      }
      this.favoriteEditMode = !this.favoriteEditMode;
    },
    gotoPath(item) {
      console.log("mypage/favorites/index.vue > gotoPath: ");
      console.log(item);
      const menuNo = get(item, 'menuNo', '')
      const serviceType = item.serviceType;
      const srvicDiv = item.srvicDiv;
      const catLrg = get(item, "categoryInfomation.catLrgClassCd", null);
      const catMid = get(item, "categoryInfomation.catMidClassCd", null);
      const catSml = get(item, "categoryInfomation.catSmlClassCd", null);
      if (this.mypageDisplayCode != "IC"){
        if(serviceType === 'life'){
          location.href = `${this.lifeReorderDomain}/menus/catExl=null/catLrg=${catLrg}/catMid=${catMid}/catSml=${catSml}/menuNo=${menuNo}`
        } else if(serviceType === this.CONST.MENU_ITEM_INFO_SERVICE_TYPE.SHOP) {
          location.href = `${this.shopReorderDomain}/menus/menuNo=${menuNo}`
        } else {
          if(srvicDiv === this.CONST.SRVIC_DIV.TOURS) location.href =  `${this.stayReorderDomain}/dp/menus/${menuNo}`;
          else location.href =  `${this.stayReorderDomain}/menus/${menuNo}`
        }
      } else {
        if(serviceType === this.CONST.MENU_ITEM_INFO_SERVICE_TYPE.LIFE){
          location.href = `${this.lifeReorderDomain}/product/detail-life/catExl=null/catLrg=${catLrg}/catMid=${catMid}/catSml=${catSml}/menuNo=${menuNo}`
        } else if(serviceType === this.CONST.MENU_ITEM_INFO_SERVICE_TYPE.SHOP) {
          location.href = `${this.shopReorderDomain}/product/detail-goods/menuNo=${menuNo}`
        }
      }
    },
    showDropDown(type) {
      if (type == 'sort') {
        this.isShowDropDown.sort = !this.isShowDropDown.sort;
      } else if (type == 'cat') {
        this.isShowDropDown.cat = !this.isShowDropDown.cat;
      }
    }
  },
  async mounted(){
    if (this.loggedIn) {
      this.getFavoriteList(this.params)
      this.hidden = this.responsiveDisplayValue
    } else {
      const params = {
        loggin: 1
      }
      this.$router.push({path: '/', query: params})
    }
    this.$page.showSideMenu = true;
    this.setBreadcrumb();
    this.$page.isTitle = true;

    //大カテゴリリスト取得
    await api.getCategory().then((response) => {
      const list = [
        {
          'catLrgClassCd': null,
          'catLrgClassNm': '全て'
        },
        {
          'catLrgClassCd': 101,
          'catLrgClassNm': 'トラベル'
        }
      ]
      this.catLrgClasses = list.concat(response.catLrgClasses)
      // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
      this.catLrgClasses = [
        {
          'catLrgClassCd': null,
          'catLrgClassNm': '全て'
        }
      ]
      this.$toasted.show(Message.ERROR_NETWORK, {
        duration: Const.TOAST_ERROR_DURATION_MILLISECOND
      })
    })
  },
  watch: {
    $route() {
      this.setBreadcrumb();
    }
  }
}
</script>

<style lang="scss" scoped>
.box-shadow {
  box-shadow: #00000029 0 0 8px;
}

.text-gray__color {
  color: #73767A;
}

.img-height {
  width: 120px;
  height: 120px;
  flex: 0 0 120px;
  @media only screen and (max-width: 639px) {
    width: 64px;
    height: 64px;
    min-width: 64px;
    min-height: 64px;
    flex: 0 0 64px;
  }
  img {
    object-fit: contain;
  }
}

.label-cat {
  &__width {
    width: 168px;
  }
  &__color {
    background: #FFF8E5;
  }
}

.option {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  transition: .3s;
  z-index: 10;
  &_item {
    position: relative;
    border: 1px solid #CACCCF;
    border-radius: 4px;
    padding: 14px 20px;
    min-width: 195px;
    max-width: 195px;
    cursor: pointer;
    &_btn {
      width: 100%;
      height: 100%;
      text-align: left;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      flex-shrink: 0;
      &_text {
        font-size: 16px;
        white-space: nowrap;
      }
    }
    &_icon {
      min-width: 18px;
      min-height: 18px;
    }
  }
}

.option--withArrow {
  position: relative;
  &:before, 
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 7px;
    height: 2px;
    border-radius: 9999px;
    transform: translate(-50%, -50%);
    top: 50%;
    background-color: #1F2021;
  }
  &:before {
    transform: rotate(45deg);
    right: 4px;
  }
  &:after {
    transform: rotate(-45deg);
    right: 0;
  }
}

.subOption {
  position: absolute;
  display: block;
  top: 58px;
  left: -1px;
  transform: scaleY(1);
  transform-origin: top;
  transition: all .3s;
  &_item {
    border-right: 1px solid #CACCCF;
    border-bottom: 1px solid #CACCCF;
    border-left: 1px solid #CACCCF;
    background-color: white !important;
    padding: 8px 10px 8px 20px;
    min-width: 195px;
    cursor: pointer;
    text-align: left;
    &:last-child {
      border-radius: 0 0 4px 4px;
    }
    &_btn {
      text-align: left;
    }
  }
}

.checkbox {
  border-color: #CACCCF;
  input[type="checkbox"]:checked {
    position: relative;
    &:before, 
    &:after {
      content: '';
      position: absolute;
      display: block;
      height: 2.5px;
      border-radius: 2px;
      background-color: $Red;
      top: 50%;
    }
    &:before {
      width: 14px;
      left: 6px;
      transform: translate(-3%, -50%) rotate(-45deg);
    }
    &:after {
      width: 7px;
      left: 3px;
      transform: translateX(-11%) rotate(45deg);
    }
  }
}

@media only screen and (min-width: 639px) {
  .text-pc-base {
    font-size: 15px;
  }
  .text-pc-sm {
    font-size: 12px;
  }
}

@media only screen and (max-width: 639px) {
  .text-sp-base {
    font-size: 13px;
  }

  .text-sp-sm {
    font-size: 10px;
  }

  .label-cat {
    &__width {
      width: 156px;
    }
  }

  .option {
    &_item {
      position: relative;
      border: 1px solid #CACCCF;
      border-radius: 4px;
      padding: 8px 16px;
      min-width: 160px;
      max-width: 160px;
      cursor: pointer;
      &_btn {
        width: 100%;
        height: 100%;
        text-align: left;
        &_text {
          font-size: 13px;
        }
      }
      &_icon {
        min-width: 13px;
        min-height: 13px;
      }
    }
  }

  .subOption {
    top: 40px;
    left: -1px;
    &_item {
      padding: 8px 16px;
      min-width: 160px;
      max-width: 160px;
      width: 160px;
      &_btn {
        &_text {
          font-size: 13px;
          
        }
      }
    }
  }

  .checkbox input[type="checkbox"]:checked {
    &:before {
      width: 12px;
      left: 6px;
      transform: translate(-12%, -50%) rotate(-45deg);
    }
    &:after {
      width: 6px;
      left: 3px;
      transform: translateX(-22%) rotate(45deg);
    }
  }
}

.img-none {
  background-image: url("https://d3u3cps1l61p9b.cloudfront.net/img/NOIMAGE.jpg");
}

.show-img {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.img-item {
  width: 120px;
  height: 120px;
  @media only screen and (max-width: 768px) {
    width: 64px;
    height: 64px;
  }
}

.no-item {
  width: calc(100% - 120px - 1.25rem);
  margin-left: 1.25rem;
  background-color: #D9D9D9;
  color: #7f7f7f;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 768px) {
    width: calc(100% - 64px - 0.75rem);
    margin-left: 0.75rem;
  }
}

</style>
