/* eslint-disable init-declarations */
<template>
  <div class="component" v-bind:style="componentStyle" v-cloak>
    <div class="before-complete" v-if="!isLoadComplete"></div>
    <div class="loading" v-if="isSearching || !isLoadComplete"><vue-loading v-bind:style="loadingStyle" type="spiningDubbles" color="#222222" :size="{ width: '100px', height: '100px' }"></vue-loading></div>
    <!-- スマホ版ヘッダー-->
    <div v-if="isSizeSm" class="sm-header">
      <img
        v-on:click="$_pageBack"
        v-bind:src="iconCurrent.ltButton"
        v-on:mouseover="iconCurrent.ltButton = icon.ltButtonHover"
        v-on:mouseleave="iconCurrent.ltButton = icon.ltButton"
        class="sm-header-button sm-header-back-button" />
      <div class="sm-header-search-location-wrapper">
        <search-location
          v-bind:isSizeSm="isSizeSm"
          v-on:map-components-geocode-success="$_onGeocodeSuccess">
        </search-location>
      </div>
      <div class="sm-header-button-wrapper" v-on:click="showMenuSearchModal = true"
        v-on:mouseover="iconCurrent.showConditionButton = icon.showConditionButtonHover"
        v-on:mouseleave="iconCurrent.showConditionButton = icon.showConditionButton">
        <img class="sm-header-button" v-bind:src="iconCurrent.showConditionButton" />
        <div class="sm-header-button-footer">条件指定</div>
      </div>
      <div v-if="!showMenuDetailList" class="sm-header-button-wrapper" v-on:click="() => $_showDetailList()"
        v-on:mouseover="iconCurrent.showListButton = icon.showListButtonHover"
        v-on:mouseleave="iconCurrent.showListButton = icon.showListButton">
        <img class="sm-header-button" v-bind:src="iconCurrent.showListButton" />
        <div class="sm-header-button-footer">一覧表示</div>
      </div>
      <div v-if="showMenuDetailList" class="sm-header-button-wrapper" v-on:click="() => showMenuDetailList = false"
        v-on:mouseover="iconCurrent.showMapButton = icon.showMapButtonHover"
        v-on:mouseleave="iconCurrent.showMapButton = icon.showMapButton">
        <img class="sm-header-button" v-bind:src="iconCurrent.showMapButton" />
        <div class="sm-header-button-footer">地図表示</div>
      </div>
    </div>

    <!-- 検索メニュー -->
    <transition name="slide-fade">
      <div v-if="!isSizeSm && isExpandPanel" id="left-panel" ref="left-panel" v-bind:style="leftPanelStyle">
        <menu-search-form
          v-bind:isSizeSm="isSizeSm"
          v-bind:catLrgClasses="catLrgClasses"
          v-on:map-components-menu-search="$_getMenuList"
          ref="menu-search-form"
        ></menu-search-form>
      </div>
      <div v-else-if="isSizeSm && showMenuSearchModal">
        <up-to-modal v-on:map-components-notify-from-up-to-modal="$_notifyFromUpToModal">
          <template v-slot:content>
            <menu-search-form
              v-bind:isSizeSm="isSizeSm"
              v-bind:catLrgClasses="catLrgClasses"
              v-on:map-components-menu-search="$_getMenuList"
              v-bind:lastSearchCondition="lastSearchCondition"
              ref="menu-search-form-sm"
            ></menu-search-form>
          </template>
        </up-to-modal>
      </div>
    </transition>

    <!-- 折り畳みボタン -->
    <div v-if="!isSizeSm"
      class="left-panel-expander"
      v-on:click="isExpandPanel = !isExpandPanel"
      v-bind:class="leftPanelExpanderClass">
      <img
        v-if="isExpandPanel"
        v-bind:src="require('@/assets/map-components/right-arrow.svg')"
        class="expand-button" />
      <img
        v-if="!isExpandPanel"
        v-bind:src="require('@/assets/map-components/right-arrow.svg')"
        class="expand-button" />
    </div>

    <base-map
      v-bind:height="mapHeight"
      v-bind:isSizeSm="isSizeSm"
      v-bind:address="address"
      v-bind:menuList="menuList"
      v-bind:language="language"
      v-on:map-components-load-finished="$_onMapLoadFinished"
      v-on:map-components-marker-selected="$_onMarkerSelected"
      v-on:map-components-show-menu-detail="$_showDetailList"
      v-on:map-components-search-by-this-area="$_searchByThisArea"
      ref="base-map">
        <template v-slot:object-list>
          <div
            class="basic-menu-list-switch-wrapper"
            v-show="!isSizeSm && menuList != null && menuList.length > 0"
            v-bind:style="basicMenuListSwitchWrapperStyle"
            v-on:click="showBasicMenu = !showBasicMenu">
            <img v-bind:src="require('@/assets/map-components/upper-arrow.svg')"
              v-bind:style="basicMenuListSwitchImgStyle" />
          </div>
          <!-- ここにメニューリスト -->
          <div class="basic-menu-list" v-bind:style="basicMenuListStyle">
            <basic-menu-list
              ref="basic-menu-list"
              v-on:map-components-click-basic-menu="$_showDetailList"
              v-on:map-components-menu-move="$_onMoveMenu"
              v-bind:isSizeSm="isSizeSm"
              v-bind:menuList="menuList">
            </basic-menu-list>
          </div>
        </template>
    </base-map>

    <!-- メニュー詳細リスト -->
    <div class="detail-menu-list-wrapper"
      v-bind:style="detailMenuListStyle" v-if="showMenuDetailList">
      <detail-menu-list
        ref="detail-menu-list"
        v-on:map-request-go-menu-detail="$_showCuponDetail"
        v-on:map-components-close-detail-menu-list="showMenuDetailList = false"
        v-bind:isSizeSm="isSizeSm"
        v-bind:_menuList="sortedMenuList"
        v-bind:targetMenu="targetDetailMenu">
      </detail-menu-list>
    </div>

  </div>

</template>


<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'
import { VueLoading } from 'vue-loading-template'
import * as common from '@/components/map-components/common/common.js'
import Store from '@/components/map-components/common/store.js'
import * as api from '@/components/map-components/common/api.js'
import Message from '@/components/map-components/common/message.js'
import Const from '@/components/map-components/common/const.js'
import SearchLocation from '@/components/map-components/SearchLocation.vue'
import BaseMap from '@/components/map-components/BaseMap.vue'
import MenuSearchForm from '@/components/map-components/menu/MenuSearchForm.vue'
import BasicMenuList from '@/components/map-components/menu/BasicMenuList.vue'
import UpToModal from '@/components/map-components/dialog/UpToModal.vue'
import Menu from '@/components/map-components/model/menu.js'
import DetailMenuList from '@/components/map-components/menu/DetailMenuList.vue'

import 'normalize.css'

const showListButton = require('@/assets/map-components/sm-show-list.svg')
const showListButtonHover = require('@/assets/map-components/sm-show-list-hover.svg')
const showConditionButton = require('@/assets/map-components/sm-select-condition.svg')
const showConditionButtonHover = require('@/assets/map-components/sm-select-condition-hover.svg')
const ltButton = require('@/assets/map-components/lt.svg')
const ltButtonHover = require('@/assets/map-components/lt-hover.svg')
const showMapButton = require('@/assets/map-components/trans-location-icon.svg')
const showMapButtonHover = require('@/assets/map-components/trans-location-icon-hover.svg')

Vue.use(Toasted, {
  duration: Const.TOAST_ERROR_DURATION_MILLISECOND,
  singleton: true
})

/** 左パネルのサイズ */
const leftPanelSize = {
  width: 240
}

/** スマホの上部ヘッダーサイズ */
const topSmHeader = {
  height: 56
}

export default {
  components: {
    SearchLocation,
    BaseMap,
    MenuSearchForm,
    BasicMenuList,
    DetailMenuList,
    UpToModal,
    VueLoading
  },
  name: 'DynamicMap',
  props: {
    width: {
      type: [String, Number],
      default: () => '100%'
    },
    height: {
      type: [String, Number],
      default: () => '100%'
    },
    isSizeSm: {
      type: Boolean,
      default: false
    },
    address: {
      type: String,
      default: ''
    },
    loginFlag: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'ja'
    },
    ssoSubscriptionId: {
      type: String,
      //デフォルト値は使用しない
      default: '00000000'
    },
    priceDiv: {
      type: Number,
      //デフォルト値は使用しない
      default: 10
    },
    crmFlag: {
      type: String,
      //デフォルト値は使用しない
      default: '0'
    }
  },
  data() {
    return {
      leftPanelWidth: leftPanelSize.width,
      /** 検索モーダルの表示フラグ */
      showMenuSearchModal: false,
      google: null,
      /** 検索メニューの開閉フラグ */
      isExpandPanel: true,
      /** 大カテゴリリスト */
      catLrgClasses: [],
      /** メニューリスト */
      menuList: [],
      /** 中間データ */
      intermediate: {
        /** メニュー基本情報リスト */
        menuBasicList: [],
        /** 店舗情報リスト */
        storeList: [],
        /** プラン情報リスト */
        planList: [],
        /** アイコンリスト */
        iconList: [],
        /** メニューと施設リストの紐付け情報 */
        menuFacilitiesList: [],
        /** 施設が範囲内だったか */
        isHit: false
      },
      /** メニュー詳細リストの開閉フラグ */
      showMenuDetailList: false,
      /** メニュー詳細で先頭に表示するメニュー */
      targetDetailMenu: null,
      /** メニュー詳細用に並び替えられたメニューリスト */
      sortedMenuList: [],
      test: false,
      /** 最後の検索条件 */
      lastSearchCondition: null,
      /** メニューカルーセルが移動中かどうか */
      onMoveMenu: false,
      /** メニュー検索中かどうか */
      isSearching: false,
      isLoadComplete: false,
      iconCurrent: {
        /** 現在の一覧表示ボタン */
        showListButton,
        /** 現在の条件指定ボタン */
        showConditionButton,
        /** 現在の戻るボタン */
        ltButton,
        /** 現在の地図表示ボタン */
        showMapButton
      },
      /** アイコン保管オブジェクト */
      icon: {
        showListButton,
        showListButtonHover,
        showConditionButton,
        showConditionButtonHover,
        ltButton,
        ltButtonHover,
        showMapButton,
        showMapButtonHover
      },
      /** メニューリストの表示 */
      showBasicMenu: true
    }
  },
  computed: {
    leftPanelStyle() {
      return {
        'width': `${this.leftPanelWidth}px`,
        'min-width': `${this.leftPanelWidth}px`,
        'flex-basis': `${this.leftPanelWidth}px`
      }
    },
    componentStyle() {
      return {
        display: 'flex'
      }
    },
    basicMenuListStyle() {
      const bottom = '25px'
      let height = this.isSizeSm ? '96px' : '232px'
      if(!this.isSizeSm && !this.showBasicMenu) {
        height = '30px'
      }
      let background = 'rgba(255, 255, 255, 0.6)'
      if(this.isSizeSm || (!this.menuList || this.menuList.length === 0)) {
        background = 'none'
      }
      return {
        height,
        bottom,
        background
      }
    },
    basicMenuListSwitchWrapperStyle() {
      const bottom = this.showBasicMenu ? '255px' : '55px'
      return {
        bottom
      }
    },
    basicMenuListSwitchImgStyle() {
      return {
        'transform': this.showBasicMenu ? 'scale(1, -1)' : 'scale(1, 1)'
      }
    },
    loadingStyle() {
      let paddingLeft = 0
      if(!this.isSizeSm && this.isExpandPanel) {
        paddingLeft = leftPanelSize.width / 2
      }
      let paddingTop = 0
      if(this.isSizeSm) {
        paddingTop = topSmHeader.height / 2
      }
      return {
        top: `calc(50% - 50px + ${paddingTop}px)`,
        left: `calc(50% - 50px + ${paddingLeft}px)`
      }
    },
    leftPanelExpanderClass() {
      return this.isExpandPanel ? 'expander-on-expand' : 'expander-not-expand'
    },
    mapHeight() {
      const isNumber = (`${  this.height}`).indexOf('%') === -1
      if(isNumber) {
        return `${Number.parseFloat(this.height)}px`
      }
      return this.height
    },
    detailMenuListStyle() {
      let left = 0
      let top = 0
      if(!this.isSizeSm) {
        left = this.isExpandPanel ? this.leftPanelWidth : 0
      } else {
        top = topSmHeader.height
      }
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `calc(${this.width} - ${left}px)`,
        height: `calc(${this.height} - ${top}px)`
      }
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    address(val) {
      // console.log(val)
    },
    isExpandPanel() {
      this.$refs['basic-menu-list'].resize()
    },
    // eslint-disable-next-line no-unused-vars
    menuList(list) {
      const ref = this.$refs['detail-menu-list']
      if(ref) {
        this.$_showDetailList(null)
        ref.setList(this.sortedMenuList)
      }
    },
    loginFlag(loginFlag) {
      Store.USER.loginFlag = loginFlag
    },
    priceDiv(priceDiv) {
      Store.USER.priceDiv = priceDiv
    },
    crmFlag(crmFlag) {
      Store.USER.crmFlag = crmFlag
    },
    ssoSubscriptionId(ssoSubscriptionId) {
      Store.USER.ssoSubscriptionId = ssoSubscriptionId
    }
  },
  async mounted() {
    this.$_updateConst()
    //大カテゴリリスト取得
    await api.getCategory().then((response) => {
      const list = [
        {
          'catLrgClassCd': null,
          'catLrgClassNm': '全て'
        }
      ]
      this.catLrgClasses = list.concat(response.catLrgClasses)
    // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
      // console.error(error)
      this.$toasted.show(Message.ERROR_NETWORK, {
        duration: Const.TOAST_ERROR_DURATION_MILLISECOND
      })
    })
    this.$nextTick(function() {
      // eslint-disable-next-line no-invalid-this
      this.isLoadComplete = true
    })
  },
  destroyed() {
    window.google = null
  },
  methods: {
    /**
     * マップ状態の初期化
     */
    clearMapStatus() {
      //検索条件初期化
      this.lastSearchCondition = null
      if(this.$refs['menu-search-form']) {
        // eslint-disable-next-line no-unused-expressions
        this.$refs['menu-search-form']
        this.$refs['menu-search-form'].resetCondition()
      }
      if(this.$refs['menu-search-form-sm']) {
        // eslint-disable-next-line no-unused-expressions
        this.$refs['menu-search-form-sm']
        this.$refs['menu-search-form-sm'].resetCondition()
      }

      //検索されたメニュー初期化
      this.menuList = []
      this.sortedMenuList = []

      //検索パネルの開閉状態初期化
      this.isExpandPanel = true
      this.showMenuSearchModal = false

      /** メニュー詳細リストの開閉フラグ初期化 */
      this.showMenuDetailList = false
      /** メニュー詳細で先頭に表示するメニュー初期化 */
      this.targetDetailMenu = null

      //地図中心座標初期化
      this.$refs['base-map'].setDefaultCenter()

      //地図ズームレベル初期化
      this.$refs['base-map'].setDefaultZoom()
    },
    /**
     * マップ読み込み完了後
     */
    $_onMapLoadFinished () {
      this.$emit('map-components-load-finished')
      this.$_getMenuList()
    },
    /**
     * 子モーダルから受信したイベントのハンドラー
     */
    $_notifyFromUpToModal(eventName) {
      if(eventName === 'map-components-menu-search-close') {
        this.showMenuSearchModal = false
      } else if(eventName === 'map-components-menu-search-if-sm-close') {
        if(this.isSizeSm) {
          this.showMenuSearchModal = false
        }
      }
    },
    $_updateConst() {
      Store.USER.loginFlag = this.loginFlag
      Store.USER.priceDiv = this.priceDiv
      Store.USER.crmFlag = this.crmFlag
      Store.USER.ssoSubscriptionId = this.ssoSubscriptionId
    },
    /**
     * 通信エラートースト表示
     *
     */
    $_showNetworkErrorToast() {
      Vue.toasted.show(Message.ERROR_NETWORK)
    },
    /**
     * このエリアで再検索
     */
    $_searchByThisArea() {
      this.$_getMenuList(this.lastSearchCondition)
    },
    /**
     * メニューリスト取得
     */
    async $_getMenuList(param) {
      this.isSearching = true
      this.$refs['basic-menu-list'].resetEmphasizeSlides()
      const center = this.$refs['base-map'].getCenter()
      const catLrgClassCd = param ? param.category : null
      const radius = param ? param.distance : 500
      this.lastSearchCondition = param

      //全ての情報取得後解決される
      let promiseList = []
      this.intermediate.menuBasicList = []
      this.intermediate.storeList = []
      this.intermediate.planList = []
      this.intermediate.iconList = []
      this.intermediate.menuFacilitiesList = []
      /** メニュー出し分けで取得する施設No配列 */
      let facilityNoList = []
      //メニュー番号リスト取得
      const response = await api.getMenuNoList(catLrgClassCd, center.lat, center.lng, radius)
      // console.log('res %o', response)

      if(!response || response.facilities === null || response.facilities.length === 0) {
        this.$_showNetworkErrorToast()
        this.isSearching = false
        return
      }
      this.intermediate.isHit = response.isHit

      //メニュNoごとの施設Noを保持
      response.facilities.forEach((facility) => {
        const found = this.intermediate.menuFacilitiesList.find((menuFacilities) => {
          return menuFacilities.menuNo === facility.menuNo
        })
        if(found) {
          found.facilities.push(facility.facilityNo)
          if(facility.distance < found.facilities) {
            found.distance.push(facility.distance)
          }
        } else {
          this.intermediate.menuFacilitiesList.push({
            menuNo: facility.menuNo,
            facilities: [facility.facilityNo],
            distance: facility.distance
          })
        }
      })

      let menuNoList = response.facilities.map((facility) => {
        return facility.menuNo
      })
      facilityNoList = response.facilities.map((facility) => {
        return facility.facilityNo
      })
      //menoNoでユニークにする
      menuNoList = Array.from(new Set(menuNoList))

      //メニュー基本情報取得
      promiseList.push(this.getMenuBasicInfoList(menuNoList))
      //店舗情報取得
      promiseList = promiseList.concat(this.getMenuStoreList(menuNoList, facilityNoList))
      //プラン情報取得
      promiseList = promiseList.concat(this.getMenuPlanList(menuNoList))
      await Promise.all(promiseList)
      await Promise.all(this.getMenuIconList(menuNoList))
      this.isSearching = false
      let menuList = common.createMenuListFromIntermediate(
        this.intermediate.menuBasicList,
        this.intermediate.storeList,
        this.intermediate.planList,
        this.intermediate.iconList
      )

      //距離を付与
      menuList = this.$_setDistance2MenuList(menuList, this.intermediate.menuFacilitiesList)

      //距離でソートする
      this.menuList = this.$_sortMenuListByDistance(menuList)

      //スマホの場合、メニューを閉じる
      if(this.isSizeSm && this.showMenuSearchModal) {
        this.showMenuSearchModal = false
      }

      //距離外の取得の場合、メッセージを出す
      if(!this.intermediate.isHit) {
        this.$toasted.show(Message.NOT_HIT_FACILITY, {
          duration: Const.TOAST_OUTOF_DISTANCE_WARN_DURATION_MILLISECOND
        })
      }

      //検索後はリストを表示状態にする
      this.showBasicMenu = true

      
    },
    /**
     * メニューリストを距離でソート
     * @param menuList メニューリスト List<Menu>
     * @return List<Menu>
     */
    $_sortMenuListByDistance(menuList) {
      if(menuList === null || menuList.length === 0) {
        return menuList
      }
      return menuList.sort((aMenu, bMenu) => {
        const a = aMenu.distance
        const b = bMenu.distance
        if(a === null && b === null) {
          //お互いnullならaとb間のソートは変更しない
          return 0
        }
        if(a === null) {
          return 1
        } else if(b === null) {
          return -1
        }

        return a - b
      })
    },
    /**
     * メニューリストに距離を付与
     * @param menuList メニューリスト List<Menu>
     * @param menuDistList メニュー別距離リスト
     * @return 距離付与済みMenuのリスト List<Menu>
     */
    $_setDistance2MenuList(menuList, menuDistList) {
      menuList.forEach(menu => {
        this.$_setDistance2Menu(menu, menuDistList)
        return menu
      })
      return menuList
    },
    /**
     * メニューに距離を付与
     * @param menu メニューリスト Menu
     * @param menuDistList メニュー別距離リスト
     */
    $_setDistance2Menu(menu, menuDistList) {
      const menuDist = menuDistList.find(menuDist => {
        if(Menu.isEquals(menu, menuDist)) {
          return menuDist
        }
      })
      if(menuDist) {
        menu.distance = menuDist.distance
      }
    },
    /**
     * メニュー基本情報取得
     * @param menuNoList メニュー番号の配列
     * @returns Promise
     */
    getMenuBasicInfoList(menuNoList) {
      return api.getMenuBasicList(menuNoList).then((menuBasicList) => {
        // console.log('getMenuBasicList %o', menuBasicList)
        this.intermediate.menuBasicList = menuBasicList
        // console.log('getMenuBasicInfoList resolve')
          
      // eslint-disable-next-line no-unused-vars
      }).catch((error) => {
        // console.error(error)
        this.$_showNetworkErrorToast()
      })
    },
    /**
     * 店舗一覧取得
     * @param menuNoList メニュー番号配列
     * @returns Array<Promise>
     */
    // eslint-disable-next-line no-unused-vars
    getMenuStoreList(menuNoList, facilityNoList) {
      const promiseList = []
      menuNoList.map((menuNo) => {
        const targetMenuFacilities = this.intermediate.menuFacilitiesList.find((menuFacilities) => {
          return menuFacilities.menuNo === menuNo
        })
        if(!targetMenuFacilities) {
          return
        }
        const promise = api.getMenuStoreList(menuNo, targetMenuFacilities.facilities)
          .then((response) => {
            // console.log('getMenuStoreList %o', response)
            // if(!response) {
            //   console.log("getMenuStoreList no response")
            //   return;
            // }
            if(response) {
              const facilities = []
              response.facilities.forEach((facility) => {
                facilities.push(facility)
              })
              this.intermediate.storeList.push({
                menuNo,
                data: facilities
              })
            }
          // eslint-disable-next-line no-unused-vars
          }).catch((error) => {
            // console.error(error)
            this.$_showNetworkErrorToast()
          })
        promiseList.push(promise)
      })
      return promiseList
    },
    /**
     * プラン一覧取得
     * @param menuNoList メニュー番号配列
     * @returns Array<Promise>
     */
    getMenuPlanList(menuNoList) {
      const promiseList = []
      menuNoList.map((menuNo) => {
        const promise = api.getMenuPlanList(menuNo)
          .then((planList) => {
            // console.log('getMenuPlanList %o', planList)
            this.intermediate.planList.push({
              menuNo,
              data: planList
            })
            // console.log('getMenuPlanList resolve')
            
          // eslint-disable-next-line no-unused-vars
          }).catch((error) => {
            // console.error(error)
            this.$_showNetworkErrorToast()
          })
        promiseList.push(promise)
      })
      return promiseList
    },
    /**
     * アイコン一覧取得
     * @param menuNoList メニュー番号配列
     * @returns Array<Promise>
     */
    getMenuIconList(menuNoList) {
      const promiseList = []
      menuNoList.forEach((menuNo) => {
        //メニューと施設が1:1か確認する
        const storeList = this.intermediate.storeList.find((store) => {
          return store.menuNo === menuNo
        })
        if(!storeList) {
          return
        }
        if(storeList.length === 1) {
          //メニュー単位アイコン一覧取得
          // console.log('メニュー単位アイコン一覧取得')
          promiseList.push(api.getMenuIconList(menuNo)
            .then((iconList) => {
              this.intermediate.iconList.push({
                menuNo,
                data: iconList
              })
              // console.log('getMenuIconList resolve')
              
            }).
            // eslint-disable-next-line no-unused-vars
            catch((error) => {
              // console.error(error)
              this.$_showNetworkErrorToast()
            }))
        } else {
          //プラン単位アイコン一覧取得（プラン件数分実行）
          // console.log('プラン単位アイコン一覧取得（プラン件数分実行）')
          const planList = this.intermediate.planList.filter((plan) => {
            return plan.menuNo === menuNo
          })
          planList.forEach((plan) => {
            plan.data.forEach((p) => {
              const promise = api.getPlanIconList(menuNo, p.planBasicInfo.planId)
                .then((iconList) => {
                  this.intermediate.iconList.push({
                    menuNo,
                    data: iconList
                  })
                  // console.log('getMenuIconList resolve')
                  
                })
                // eslint-disable-next-line no-unused-vars
                .catch((error) => {
                  // console.error(error)
                  this.$_showNetworkErrorToast()
                })
              promiseList.push(promise)
            })

          })
        }
      })
      return promiseList
    },
    $_onMoveMenu(onMove) {
      this.onMoveMenu = onMove
    },
    /**
     * メニュー詳細一覧表示
     */
    $_showDetailList(facilityMenu) {
      if(this.onMoveMenu) {
        //カルーセル移動中はクリック判定を起こさない
        return
      }
      if(!this.menuList || this.menuList.length === 0) {
        return
      }
      // eslint-disable-next-line init-declarations
      let menu
      if(facilityMenu) {
        menu = this.menuList.find((m) => {
          return Menu.isEquals(facilityMenu.menu, m)
        })
      } else {
        menu = this.menuList[0]
      }
      if(!menu) {
        return
      }
      this.targetDetailMenu = menu
      const list = this.menuList.map((item) => Menu.createFromPureObject(Vue.util.extend({}, item)))
      const targetIndex = list.findIndex((item) => {
        return Menu.isEquals(this.targetDetailMenu, item)
      })
      if(targetIndex === -1) {
        return
      }

      //ターゲットをリストの先頭にする
      const found = list[targetIndex]
      list.splice(targetIndex, 1)
      list.unshift(found)
      this.sortedMenuList = list

      //表示
      this.showMenuDetailList = true
    },
    $_getRefSize(refName) {
      const size = {
        height: 0,
        width: 0
      }
      let ref = this.$refs[refName]
      if (!ref) {
        return size
      }
      if('$el' in ref) {
        ref = ref.$el
      }
      size.height = ref.offsetHeight
      size.width = ref.offsetWidth
      return size
    },
    /**
     * マーカー選択時に呼ばれる
     */
    $_onMarkerSelected(facilityMenu) {
      this.$refs['basic-menu-list'].emphasizeSlide(facilityMenu)
      this.showBasicMenu = true
    },
    /**
     * ジオコード成功時
     * スマートフォン版のジオコーダーのイベントハンドラ
     *
     * @param latLng
     */
    $_onGeocodeSuccess(latLng) {
      this.$refs['base-map'].onGeocodeSuccess(latLng)
    },
    /**
     * 前の画面に戻る
     */
    $_pageBack() {
      this.$emit('map-request-go-back')
    },
    /**
     * 詳細を表示（画面遷移）
     */
    $_showCuponDetail(catLrgClassCd, catMidClassCd, catSmlClassCd, menuNo) {
      this.$emit(
        'map-request-go-menu-detail',
        catLrgClassCd,
        catMidClassCd,
        catSmlClassCd,
        menuNo)
    }
  }
}


</script>

<style scoped>
[v-cloak] {
  display: none;
}

.component
.component * {
  box-sizing: border-box;
}
.component {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/** スマホサイズの上部ヘッダー */
.sm-header {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  z-index: 9000;
  background-color: #ffffff;
  padding: 10px;
  display: flex;
  align-items: center;
}

.sm-header > * {
  flex-basis: 50px;
  flex-shrink: 0;
}

.sm-header-button {
  color: #63666A;
  background: none;
  border: none;
  cursor: pointer;
}

.sm-header-back-button {
  height: 16px;
}

.sm-header-button-wrapper {
  width: 50px;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  cursor: pointer;
}

.sm-header-button-wrapper > img {
  width: 24px;
  height: 24px;
}

.sm-header-search-location-wrapper {
  flex-basis: calc(100% - 150px);
}

/** PCサイズの左側パネル */
#left-panel {
  box-sizing: border-box;
}

/** 左側パネルの開閉操作部分 */
.left-panel-expander {
  position: absolute;
  top: 10px;
  left: 0px;
  width: 28px;
  height: 32px;
  background-color: #ffffff;
  z-index: 9000;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
}

/** 左側パネルの開閉操作部分（パネルを表示している場合） */
.left-panel-expander.expander-on-expand {
  left: 240px;
}

.expand-button {
  width: 20px;
  height: 100%;
  margin: auto;
  display: block;
}
.expander-on-expand .expand-button {
  transform: scale(-1, 1);
}

/** 下部メニュー一覧 */
.basic-menu-list {
  position: absolute;
  width: 100%;
  z-index: 6000;

  transition-property: all;
  transition-duration: 0.5s;
}

.basic-menu-list-switch-wrapper {
  position: absolute;
  background: rgba(255,255,255,0.6);
  z-index: 6000;
  width: 100px;
  height: 30px;
  bottom: 255px;
  left: calc(50% - 50px);
  border-radius: 8px 8px 0 0;
  box-shadow: 0 0 2px 0 rgb(0 0 0 / 20%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition-property: all;
  transition-duration: 0.5s;
}

/** メニュー詳細リスト */
.detail-menu-list-wrapper {
  position: absolute;
}


:not(.before-complete) .slide-fade-enter-active {
  transition: all .3s ease;
}
:not(.before-complete) .slide-fade-leave-active {
  /* transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
  transition: all .3s ease;
}
:not(.before-complete) .slide-fade-enter, :not(.before-complete) .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.loading .vue-loading {
  position: absolute;
  z-index: 9999;
}

.before-complete {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(128,128,128,1.0);
}
</style>
