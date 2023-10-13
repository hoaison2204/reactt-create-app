<template>
  <div class="component" v-on:click="$_close">
    <!-- 地図表示ボタン -->
    <div class="button-wrapper" v-if="!isSizeSm" v-on:click="$_close"
      v-on:mouseover="iconCurrent.showMapButton = icon.showMapButtonHover"
      v-on:mouseleave="iconCurrent.showMapButton = icon.showMapButton">
      <img class="button-wrapper-button" v-bind:src="iconCurrent.showMapButton" />
      <p class="button-wrapper-text">地図表示</p>
    </div>

    <div class="component-container" ref="component-container" v-bind:style="componentContainerStyle">
      <div class="counter" v-on:click.stop>{{getMenuListCount}}件</div>

      <div class="content-list-wrapper" v-on:click.stop>
        <div class="content-wrapper"
            v-for="(menu, index) in menuList" v-bind:key="`${uuid + '-' + index}`" v-bind:index="index">
          <detail-menu
            v-bind:isSizeSm="isSizeSm"
            v-bind:menu="menu"
            v-bind:index="index"
            v-on:map-request-go-menu-detail="$_showCuponDetail"
            ref="detail-menu"></detail-menu>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import _ from 'lodash'


// eslint-disable-next-line no-unused-vars
import * as common from '@/components/map-components/common/common.js'
// eslint-disable-next-line no-unused-vars
import * as api from '@/components/map-components/common/api.js'
// eslint-disable-next-line no-unused-vars
import Menu from '@/components/map-components/model/menu.js'
// eslint-disable-next-line no-unused-vars
import FacilityMenu from '@/components/map-components/model/facilityMenu.js'
import DetailMenu from '@/components/map-components/menu/DetailMenu.vue'

const showMapButton = require('@/assets/map-components/trans-location-icon.svg')
const showMapButtonHover = require('@/assets/map-components/trans-location-icon-hover.svg')

const componentId = 'detail-menu-list'
let uuid = 0

export default {
  components: {
    DetailMenu
  },
  name: 'DetailMenuList',
  props: {
    _menuList: {
      type: Array,
      default() {
        return []
      }
    },
    isSizeSm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uuid: `${componentId  }-${  (uuid++).toString()}`,
      iconCurrent: {
        /** 現在の地図表示ボタン */
        showMapButton
      },
      /** アイコン保管オブジェクト */
      icon: {
        showMapButton,
        showMapButtonHover
      },
      menuList: this._menuList
    }
  },
  computed: {
    getMenuListCount() {
      if(!this.menuList || this.menuList.length === 0) {
        return 0
      }
      return this.menuList.length
    },
    componentContainerStyle() {
      if(this.isSizeSm) {
        return {
          'width': 'auto',
          'margin': '16px'
        }
      }
      return {
        width: '744px',
        margin: '16px auto'
      }
    }
  },
  watch: {
    isSizeSm() {
      this.resize()
    }
  },
  mounted() {
    const onResize = _.debounce(this.$_handleResize, 100)
    window.addEventListener('resize', onResize)
    this.$once('hook:beforeDestroy', function() {
      window.removeEventListener('resize', onResize)
    })
    onResize()
  },
  methods: {
    setList(list) {
      this.menuList = list
    },
    $_close() {
      this.$emit('map-components-close-detail-menu-list')
    },
    $_showCuponDetail(catLrgClassCd, catMidClassCd, catSmlClassCd, menuNo) {
      this.$emit(
        'map-request-go-menu-detail',
        catLrgClassCd,
        catMidClassCd,
        catSmlClassCd,
        menuNo)
    },
    /**
     * リサイズハンドラ（Public）
     */
    resize() {
      this.$nextTick(() => {
        this.$_handleResize()
      })
    },
    /**
     * リサイズハンドラ
     */
    $_handleResize() {

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
    }
  }
}
</script>


<style scoped>
.component
.component * {
  box-sizing: border-box;
}
.component:not(.component-container *) {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(31, 32, 33, 0.64);
  z-index: 6500;
  overflow-y: auto;
  /* IE, Edge 対応 */
  -ms-overflow-style: none;
  /* Firefox 対応 */
  scrollbar-width: none;
}
.component:not(.component-container *)::-webkit-scrollbar {
    display:none;
  }

/* .component-container {
  width: 744px;
  margin: 16px auto;
} */

.counter {
  background-color: #ffffff;
  width: fit-content;
  min-width: 67px;
  height: 35px;
  margin-bottom: 16px;
  padding: 4px 16px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-wrapper {
  background-color: #ffffff;
  margin-bottom: 8px;
}


/** 地図表示ボタンラッパー */
.button-wrapper {
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
  top: 10px;
  position: sticky;
  margin-left: auto;
  margin-right: 60px;
}
.button-wrapper-button {
  width: 20px;
}
.button-wrapper-text {
  margin: 0;
  margin-left: 10px;
  flex-basis: 70px;
  font-size: 12px;
}


</style>
