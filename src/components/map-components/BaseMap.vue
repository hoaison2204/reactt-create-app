<template>
  <div class="component" v-bind:class="sizeSmClass" v-bind:style="styleObject.component()">

    <!-- このエリアで再検索ボタン -->
    <div v-if="isSizeSm" class="reload-by-area-wrapper" v-on:click="$_reloadByArea" v-bind:class="enableReloadByAreaClass"
      v-on:mouseover="iconCurrent.reloadButton = icon.reloadButtonHover"
      v-on:mouseleave="iconCurrent.reloadButton = icon.reloadButton">
      <img class="reload-by-area-wrapper-button" v-bind:src="iconCurrent.reloadButton">
      <p class="reload-by-area-wrapper-text">このエリアで再検索</p>
    </div>

    <!-- 上部コントロール群 -->
    <div class="top-button-wapper">
      <!-- ジオコーディングボタン（PC） -->
      <div class="search-location" v-if="!isSizeSm">
        <search-location
          v-bind:isSizeSm="isSizeSm"
          v-on:map-components-geocode-success="onGeocodeSuccess">
        </search-location>
      </div>

      <!-- このエリアで再検索ボタン -->
      <div class="reload-by-area-wrapper" v-on:click="$_reloadByArea" v-bind:class="enableReloadByAreaClass"
        v-on:mouseover="iconCurrent.reloadButton = icon.reloadButtonHover"
        v-on:mouseleave="iconCurrent.reloadButton = icon.reloadButton">
        <img class="reload-by-area-wrapper-button" v-bind:src="iconCurrent.reloadButton">
        <p class="reload-by-area-wrapper-text">このエリアで再検索</p>
      </div>

      <!-- 一覧表示ボタンと地図コントロール -->
      <div class="list-button-and-control-wrapper">
        <!-- 一覧表示ボタン -->
        <div class="list-button-wrapper" v-on:click="$_showMenuList"
          v-on:mouseover="iconCurrent.showListButton = icon.showListButtonHover"
          v-on:mouseleave="iconCurrent.showListButton = icon.showListButton">
          <img class="list-button-wrapper-button" v-bind:src="iconCurrent.showListButton">
          <p class="list-button-wrapper-text">一覧表示</p>
        </div>
        <!-- 地図コントロール -->
        <div class="custom-control-panel" v-bind:style="controlStyleObject">
          <div class="map-control-wrapper">
            <div class="zoom-in-out-wrapper">
              <img class="zoom-in-button"
                v-on:click="$_onClickZoomIn"
                v-on:mouseover="iconCurrent.plusButton = icon.plusButtonHover"
                v-on:mouseleave="iconCurrent.plusButton = icon.plusButton"
                v-bind:src="iconCurrent.plusButton" />
              <div class="devider"></div>
              <img class="zoom-out-button"
                v-on:click="$_onClickZoomOut"
                v-on:mouseover="iconCurrent.minusButton = icon.minusButtonHover"
                v-on:mouseleave="iconCurrent.minusButton = icon.minusButton"
                v-bind:src="iconCurrent.minusButton" />
            </div>
            <img class="current-location-button" v-on:click="$_onClickCurrentLocation"
              v-on:mouseover="iconCurrent.currentLocationButton = icon.currentLocationButtonHover"
              v-on:mouseleave="iconCurrent.currentLocationButton = icon.currentLocationButton"
              v-bind:src="iconCurrent.currentLocationButton" />
          </div>
        </div>
      </div>

    </div><!-- /上部コントロール群 -->

    <!-- 地図 -->
    <div
      v-bind:id="id"
      v-bind:style="styleObject.map()">
    </div>

    <!-- 下部オブジェクトリスト -->
    <slot name="object-list"></slot>
  </div>
</template>


<script type="text/javascript">
import Vue from 'vue'
import Const from '@/components/map-components/common/const.js'
import * as common from '@/components/map-components/common/common.js'
// eslint-disable-next-line no-unused-vars
import * as api from '@/components/map-components/common/api.js'
import FacilityMenu from '@/components/map-components/model/facilityMenu.js'
import SearchLocation from '@/components/map-components/SearchLocation.vue'

const plusButton = require('@/assets/map-components/plus-button.svg')
const plusButtonHover = require('@/assets/map-components/plus-button-hover.svg')
const minusButton = require('@/assets/map-components/minus-button.svg')
const minusButtonHover = require('@/assets/map-components/minus-button-hover.svg')
const currentLocationButton = require('@/assets/map-components/current-location-button.svg')
const currentLocationButtonHover = require('@/assets/map-components/current-location-button-hover.svg')
const reloadButton = require('@/assets/map-components/reload.svg')
const reloadButtonHover = require('@/assets/map-components/reload-hover.svg')
const showListButton = require('@/assets/map-components/sm-show-list.svg')
const showListButtonHover = require('@/assets/map-components/sm-show-list-hover.svg')
/* eslint-disable */
export default {
  components: { SearchLocation },
  name: 'BaseMap',
  props: {
    zoomLevel: {
      type: Number,
      default: Const.MAP_DEFAULT_ZOOM
    },
    mapTypeId: {
      type: String,
      default: 'roadmap'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    isSizeSm: {
      type: Boolean,
      default: false
    },
    address: {
      type: String,
      default: ''
    },
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    language: {
      type: String,
      default: 'ja'
    }
  },
  data() {
    return {
      google: null,
      map: null,
      isMapInit: false,
      id: 'map-component-base-map',
      latLng: null,
      /** 最後にマーカーを作成した際のcenter */
      lastCenter: null,
      facilityMenuList: [],
      selectedFacilityMenu: null,
      categoryIconList: [],
      iconDefinitionList: [],
      markers: [],
      marker: {
        sizePc: {
          normal: {
            width: 40,
            height: 40,
            icon: null
          },
          selected: {
            width: 56,
            height: 56,
            icon: null
          }
        },
        sizeSm: {
          normal: {
            width: 56,
            height: 56,
            icon: null
          },
          selected: {
            width: 80,
            height: 80,
            icon: null
          }
        }
      },
      iconCurrent: {
        /** 現在のプラスボタン */
        plusButton,
        /** 現在のマイナスボタン */
        minusButton,
        /** 現在の現在地ボタン */
        currentLocationButton,
        /** 現在の再検索ボタン */
        reloadButton,
        /** 現在の一覧表示ボタン */
        showListButton
      },
      /** アイコン保管オブジェクト */
      icon: {
        plusButton,
        plusButtonHover,
        minusButton,
        minusButtonHover,
        currentLocationButton,
        currentLocationButtonHover,
        reloadButton,
        reloadButtonHover,
        showListButton,
        showListButtonHover
      }
    }
  },
  computed: {
    styleObject() {
      const height = this.height
      return {
        component: () => {
          return {
            width: '100%',
            height
          }

        },
        map: () => {
          return {
            width: 'auto',
            height
          }
        }
      }
    },
    controlStyleObject() {
      return {
        //bottom: "20px"
      }
    },
    sizeSmClass() {
      return this.isSizeSm ? 'size-sm' : ''
    },
    enableReloadByAreaClass() {
      if(!this.lastCenter) {
        return 'disabled'
      }
      if(!this.map) {
        return 'disabled'
      }
      if(this.lastCenter.equals(this.map.getCenter())) {
        return 'disabled'
      }
      return ''
    }
  },
  watch: {
    async address(val) {
      if(val) {
        const latLng = await common.geocode(this.google, val)
        this.$_onFinishedGeocode(latLng)
      }
    },
    menuList(menuList) {
      //再検索されているので選択済みを解除する
      this.selectedFacilityMenu = null
      this.facilityMenuList = common.menuList2FacilityMenuList(menuList)
      this.$_createMarkers(this.facilityMenuList, true)
    },
    isSizeSm() {
      this.$_createMarkers(this.facilityMenuList, true)
    },
    /**
     * 地図言語切り替え
     */
    async language(lang) {
      const zoom = this.map.getZoom()
      const center = this.map.getCenter()
      const centerObj = { lat: 1 * center.lat(), lng: 1 * center.lng() }

      window.google = null
      this.google = await common.initGoogle({
        language: lang
      })

      this.map = this.$_createMap(centerObj, zoom)
      this.$_createMarkers(this.facilityMenuList, false)
    }
  },
  async mounted() {
    let res = await api.getCategoryIcon()
    this.categoryIconList = res.categoryIconList
    res = await api.getIconDefinition()
    this.iconDefinitionList = res.customIconList
    this.google = await common.getGoogle()
    if(this.address) {
      const latLng = await common.geocode(this.google, this.address)
      this.$_onFinishedGeocode(latLng)
    } else {
      const latLng = {
        success: true,
        lat: Const.MAP_ERROR_CENTER_LAT,
        lng: Const.MAP_ERROR_CENTER_LNG
      }
      this.$_onFinishedGeocode(latLng)
    }

    await Promise.all(this.$_createIconImage())
    if (this.map == null) {
      this.$nextTick(function() {
        this.$_loadMap()
      })
    }
  },
  methods: {
    /**
     * デフォルト初期中心点に戻す
     */
    async setDefaultCenter() {
      if(!this.google) {
        return
      }
      const latLng = await common.geocode(this.google, this.address)
      this.$_onFinishedGeocode(latLng)
    },
    /**
     * デフォルトズームレベルに戻す
     */
    setDefaultZoom() {
      this.map.setZoom(this.zoomLevel)
    },
    /**
     * 地図中心点の取得
     */
    getCenter() {
      if(this.map == null) {
        return
      }
      const center = this.map.getCenter()
      return { lat: center.lat(), lng: center.lng() }
    },
    /**
     * GoogleMaps初期化
     *
     */
    $_loadMap() {
      const center = new this.google.maps.LatLng(this.latLng?.lat, this.latLng?.lng)

      // googleMap
      this.map = this.$_createMap(center, this.zoomLevel)

      this.isMapInit = true
      this.$_createMarkers(this.facilityMenuList, true)
      //住所が渡されなかった場合、
      if(!this.address) {
        const that = this
        this.$_onClickCurrentLocation({
          callback() {
            that.$emit('map-components-load-finished')
          }
        })
      }
    },
    $_createMap(center, zoom) {
      return new this.google.maps.Map(document.getElementById(this.id), {
        //zoomControl: true,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        center,
        scaleControl: true,
        zoom,
        mapTypeId: this.mapTypeId,
        gestureHandling: 'greedy',
        clickableIcons: false
      })
    },
    $_onFinishedGeocode(latLng) {
      if(latLng.success) {
        this.latLng = latLng
        if(this.map) {
          this.onGeocodeSuccess(latLng)
        }
      } else if(!this.latLng || typeof this.latLng.lat === 'undefined' || typeof this.latLng.lng === 'undefined') {
        //失敗時でかつ初期緯度経度がない場合
        this.latLng = {
          lat: parseFloat(Const.MAP_ERROR_CENTER_LAT),
          lng: parseFloat(Const.MAP_ERROR_CENTER_LNG)
        }
      }
    },
    /**
     * 施設リストから緯度経度範囲を取得
     */
    $_getBoundsByFacilityMenuList(facilityMenuList) {
      const bounds = new this.google.maps.LatLngBounds()
      facilityMenuList.forEach((facilityMenu) => {
        bounds.extend({lat: facilityMenu.facility.latitude, lng: facilityMenu.facility.longitude})
      })
      return bounds
    },
    /**
     * iconイメージの作成Promiseのリストを返却する
     * @return {Promise[]}
     */
    $_createIconImage() {
      const promises = []
      //カテゴリごとにイメージ作成
      this.categoryIconList.forEach((categoryIcon) => {
        categoryIcon.icon = {
          sizeSm: {
            normal: null,
            selected: null
          },
          sizePc: {
            normal: null,
            selected: null
          }
        }
        const normalIcondefinition = this.iconDefinitionList.find((iconDefinition) => {
          return categoryIcon.iconNo == iconDefinition.no
        })
        const selectedIcondefinition = this.iconDefinitionList.find((iconDefinition) => {
          return categoryIcon.selectedIconNo == iconDefinition.no
        })

        promises.push(this.$_createIconImageByType('normal', true, normalIcondefinition, categoryIcon))
        promises.push(this.$_createIconImageByType('normal', false, normalIcondefinition, categoryIcon))
        promises.push(this.$_createIconImageByType('selected', true, selectedIcondefinition, categoryIcon))
        promises.push(this.$_createIconImageByType('selected', false, selectedIcondefinition, categoryIcon))
      })
      return promises
    },
    /**
     * タイプ別のiconイメージの作成
     */
    $_createIconImageByType(type, isSizeSm, iconDefinition, categoryIcon) {
      const img = new Image()
      return new Promise((resolve) => {
        let width, height
        const sizeType = isSizeSm ? 'sizeSm' : 'sizePc'
        img.src = iconDefinition.iconUrl
        width = this.marker[sizeType][type].width
        height = this.marker[sizeType][type].height
        const originOffset = {
          x: iconDefinition.anchorX,
          y: iconDefinition.anchorY
        }
        img.onload = (event) => {
          //safariの場合はevent.targetを使う
          const imgObj = event.path ? event.path[0] : event.target
          const originWidth = imgObj.width
          const originHeight = imgObj.height
          //マーカーのサイズを取得
          const icon = {
            url: img.src,
            scaledSize: new this.google.maps.Size(width, height),
            // The origin for this image
            origin: new this.google.maps.Point(0, 0),
            anchor: new this.google.maps.Point(
              //オフセットの調整（オフセット値は左下を0,0として設定されている）
              // (originOffset.x / originWidth) * width,
              // ((originHeight - originOffset.y) / originHeight) * height),
              (originOffset.x + originWidth) * (width / originWidth),
              (originHeight - (originOffset.y + originHeight)) * (height / originHeight)
            )
          }
          categoryIcon.icon[sizeType][type] = icon
          resolve()
        }
      })
    },
    /**
     * マーカーの作成
     * @param list Array<FacilityMenu>
     */
    $_createMarkers(list, fitBounds) {
      // console.log('list, %o', list)
      if(!this.isMapInit) {
        return
      }
      if(this.markers != null && this.markers.length !== 0) {
        this.markers.forEach(m => {
          m.setMap(null)
        })
      }
      this.markers = []

      if (!list || list.length === 0) {
        //作成対象がなければ終了
        return
      }
      const sizeType = this.isSizeSm ? 'sizeSm' : 'sizePc'
      list.forEach(item => {
        const facilityMenu = Vue.util.extend({}, item)
        const position = new this.google.maps.LatLng(facilityMenu.facility.latitude, facilityMenu.facility.longitude)
        let selectedStatus = false
        if(this.selectedFacilityMenu && FacilityMenu.isEquals(this.selectedFacilityMenu, facilityMenu)) {
          selectedStatus = true
        }
        //メニューの大カテゴリコードからカテゴリ定義を引当て
        const foundCategoryIcon = this.categoryIconList.find((categoryIcon) => {
          return categoryIcon.catLrgClassCd == facilityMenu.menu.categoryInfomation.catLrgClassCd
        })
        if(!foundCategoryIcon) { return }
        const icon = foundCategoryIcon.icon[sizeType][selectedStatus ? 'selected' : 'normal']

        //マーカーを生成
        const marker = new this.google.maps.Marker({
          map: this.map,
          icon,
          position
        })
        marker.selected = selectedStatus
        marker.facilityMenu = facilityMenu
        marker.iconDefinition = foundCategoryIcon
        marker.addListener('click', () => {
          //クリック時のイベント
          this.selectedFacilityMenu = marker.facilityMenu
          this.$_resetAllMarker2NormalIcon()
          this.$_changeMarkerSelectedStatus(marker, !marker.selected, this.isSizeSm ? 'sizeSm' : 'sizePc')
        })
        this.markers.push(marker)
      })

      const bounds = this.$_getBoundsByFacilityMenuList(list)
      if(fitBounds) {
        this.map.fitBounds(bounds)
        this.lastCenter = this.map.getCenter()
      }
    },
    /**
     * マーカーの選択状態を切り替える
     */
    $_changeMarkerSelectedStatus(marker, toSelected, sizeType) {
      if(toSelected) {
        marker.setIcon(marker.iconDefinition.icon[sizeType].selected)
        this.$emit('map-components-marker-selected', marker.facilityMenu)
      } else {
        marker.setIcon(marker.iconDefinition.icon[sizeType].normal)
      }
      marker.selected = toSelected
    },
    /**
     * 全てのマーカーの選択状態を未選択状態にする
     */
    $_resetAllMarker2NormalIcon() {
      this.markers.forEach((marker) => {
        if(marker.selected) {
          this.$_changeMarkerSelectedStatus(marker, false, (this.isSizeSm ? 'sizeSm' : 'sizePc'))
        }
      })
    },
    /**
     * このエリアで再検索
     */
    $_reloadByArea() {
      if(this.enableReloadByAreaClass == 'disabled') {
        return
      }
      this.$emit('map-components-search-by-this-area')
    },
    /**
     * メニュ一覧表示
     */
    $_showMenuList() {
      this.$emit('map-components-show-menu-detail')
    },
    /**
     * ズームインボタンクリック（地図コントロール）
     *
     * @param イベントオブジェクト
     */
    $_onClickZoomIn(event) {
      this.map.setZoom(this.map.getZoom() + 1)
    },
    /**
     * ズームアウトボタンクリック（地図コントロール）
     *
     * @param イベントオブジェクト
     */
    $_onClickZoomOut(event) {
      this.map.setZoom(this.map.getZoom() - 1)
    },
    /**
     * 現在地ボタンクリック（地図コントロール）
     *
     * @param イベントオブジェクト
     */
    $_onClickCurrentLocation(event) {
      // console.log(event)
      if(!navigator.geolocation) {
        // console.warn('Geolocation APIが利用できません。')
        return
      }
      const option = {
        // 高精度の位置情報を取得する
        enableHighAccuracy: true,
        // タイムアウト（ミリ秒）
        timeout: 10000,
        // 有効期限（ミリ秒）
        maximumAge: 60000
      }
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log('位置情報の取得成功', position)
        this.map.setCenter(new this.google.maps.LatLng(position.coords.latitude, position.coords.longitude))
        if(event.callback) {
          event.callback()
        }
      }, (error) => {
        // console.log('位置情報の取得失敗', error)
        let errMsg = ''
        switch(error.code) {
        case 1:
          errMsg = '位置情報の利用が許可されていません'
          break
        case 2:
          errMsg = 'デバイスの位置が判定できません'
          break
        case 3:
          errMsg = 'タイムアウトしました'
          break
        }
        // console.warn('位置情報の取得失敗', errMsg)
        if(event.callback) {
          event.callback()
        }
      }, option)
    },
    /**
     * ジオコード成功時処理
     *
     * @param イベントオブジェクト
     */
    onGeocodeSuccess(latLng) {
      this.map.setCenter(latLng)
    }
  }
}


</script>

<style scoped>
.component {
  position: relative;
}

/** 上部ボタンのラッパー */
.top-button-wapper {
  position: relative;
  z-index: 6000;
  top: 10px;
}

/* 住所検索 */
.search-location {
  position:absolute;
  left: 40px;
}

/** このエリアで再検索 */
.reload-by-area-wrapper {
  position: absolute;
  background-color: #ffffff;
  box-sizing: border-box;
  width: 240px;
  height: 40px;
  left: calc(50% - 120px);
  padding: 5px;
  vertical-align: middle;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: solid 1px #eeeeee;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  cursor: pointer;
}
.size-sm .reload-by-area-wrapper {
  top: 60px;
}

.reload-by-area-wrapper-button {
  width: 18px;
  height: 18px;
  margin-left: 5px;
}
.reload-by-area-wrapper-text {
  margin: 0;
  margin-left: 15px;
  flex-basis: 190px;
  font-weight: bold;
}
.disabled.reload-by-area-wrapper {
  cursor: not-allowed;
  /* opacity: 50%; */
  background-color: #eee;
  color: gray;
}
.disabled.reload-by-area-wrapper .reload-by-area-wrapper-button {
  opacity: 60%;
}

/** 一覧表示ボタンと地図コントロールのラッパー */
.list-button-and-control-wrapper {
  position: absolute;
  display: flex;
  right: 10px;
}

/** 一覧表示ボタンラッパー */
.list-button-wrapper {
  display: flex;
  background-color: #ffffff;
  box-sizing: border-box;
  width: 100px;
  height: 30px;
  padding: 5px;
  margin-right: 10px;
  vertical-align: middle;
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: solid 1px #eeeeee;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  cursor: pointer;
}
.list-button-wrapper-button {
  width: 20px;
}
.list-button-wrapper-text {
  margin: 0;
  margin-left: 10px;
  flex-basis: 70px;
  font-size: 12px;
}


/** 地図コントロール */
.custom-control-panel,
.custom-control-panel * {
  box-sizing: border-box;
}
.custom-control-panel img {
  display: block;
  cursor: pointer;
}
.custom-control-panel .zoom-in-out-wrapper {
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  border-radius: 2px;
  background-color: #ffffff;
}
.custom-control-panel .zoom-in-out-wrapper img {
  width: 40px;
  height: 40px;
}
.custom-control-panel .current-location-button {
  width: 32px;
  height: 32px;
  margin-top: 20px;
  margin-left: 4px;
  padding: 6px;
  position: relative;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
}
.custom-control-panel .devider {
  border-bottom: rgb(230, 230, 230) solid 1px;
  position: absolute;
  overflow: hidden;
  margin: 0 5px;
  width: 30px;
  height: 1px;
}
/** スマホサイズ時の地図コントロール位置 */
.size-sm .map-control-wrapper {
  position: absolute;
  top: 60px;
  right: 0;
}

</style>
