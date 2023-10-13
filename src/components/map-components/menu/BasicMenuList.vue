/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
<template>
  <div class="component">
    <div class="slider-container" ref="slider-container" v-on:touchmove="$_onTouchmove" v-on:touchend="$_onTouchend">

      <div class="slider-wrapper" v-bind:style="wrapperStyle" v-on:mousedown="$_onMousedown" v-on:touchstart="$_onTouchstart">
        <div class="slider-content"
            v-for="(facilityMenu, index) in facilityMenuList" v-bind:key="`${uuid + '-' + index}`" v-bind:index="index"
            v-on:click="$_showDetail(`${index}`)">
          <basic-menu
            v-bind:isSizeSm="isSizeSm"
            v-bind:facilityMenu="facilityMenu"
            v-bind:index="index"
            ref="slide"></basic-menu>
        </div>
      </div>

      <div class="button-wrapper" v-if="!isSizeSm">
        <img class="plus-button" v-on:click="$_scrollSlide(true)" v-bind:src="iconCurrent.plusButton"
          v-on:mouseover="iconCurrent.plusButton = icon.ltButtonHover"
          v-on:mouseleave="iconCurrent.plusButton = icon.ltButton"/>
        <img class="minus-button" v-on:click="$_scrollSlide(false)" v-bind:src="iconCurrent.minusButton"
          v-on:mouseover="iconCurrent.minusButton = icon.ltButtonHover"
          v-on:mouseleave="iconCurrent.minusButton = icon.ltButton"/>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'


import * as common from '@/components/map-components/common/common.js'
// eslint-disable-next-line no-unused-vars
import * as api from '@/components/map-components/common/api.js'
// eslint-disable-next-line no-unused-vars
import Menu from '@/components/map-components/model/menu.js'
import FacilityMenu from '@/components/map-components/model/facilityMenu.js'
import BasicMenu from '@/components/map-components/menu/BasicMenu.vue'

const ltButton = require('@/assets/map-components/lt.svg')
const ltButtonHover = require('@/assets/map-components/lt-hover.svg')

const componentId = 'basic-menu-list'
let uuid = 0
let slideStartX = 0

export default {
  components: {
    BasicMenu
  },
  name: 'BasicMenuList',
  props: {
    menuList: {
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
      sliderContainerWidth: 0,
      selectedIndex: 0,
      isMousedown: false,
      slideOffsetX: 0,
      facilityMenuList: [],
      smStartX: 0,
      iconCurrent: {
        plusButton: ltButton,
        minusButton: ltButton
      },
      icon: {
        ltButton,
        ltButtonHover
      },
      onMousemove: () => {}
    }
  },
  computed: {
    wrapperStyle() {
      return {
        transform: `translate3d(${this.slideOffsetX}px, 0px, 0px)`
      }
    },
    getSliderWidth() {
      return this.isSizeSm ? BasicMenu.sizeSmComponentWidth : BasicMenu.componentWidth
    }
  },
  watch: {
    menuList(menuList) {
      this.facilityMenuList = common.menuList2FacilityMenuList(menuList)
      this.resize()
      this.$nextTick(() => {
        this.$_setCenterByIndex(0)
      })
    },
    // eslint-disable-next-line no-unused-vars
    isSizeSm(value) {
      this.resize()
    },
    sliderContainerWidth() {
      this.$_handleResize()
    }
  },
  mounted() {
    const onResize = _.debounce(this.$_handleResize, 100)
    window.addEventListener('resize', onResize)
    this.$once('hook:beforeDestroy', function() {
      window.removeEventListener('resize', onResize)
    })
    onResize()

    //PC用イベント設定
    this.onMousemove = _.throttle(this.$_onMousemove, 100)
    this.setUpPcEventHandler()
  },
  updated() {
  },
  methods: {
    setUpPcEventHandler() {
      window.addEventListener('mouseup', this.$_onMouseup)
      this.$once('hook:beforeDestroy', function() {
        // eslint-disable-next-line no-invalid-this
        window.removeEventListener('mouseup', this.$_onMouseup)
      })
      window.addEventListener('mousemove', this.onMousemove)
      this.$once('hook:beforeDestroy', function() {
        // eslint-disable-next-line no-invalid-this
        window.removeEventListener('mousemove', this.onMousemove)
      })
    },
    removePcEventHandler() {
      window.removeEventListener('mouseup', this.$_onMouseup)
      window.removeEventListener('mousemove', this.onMousemove)
    },
    /**
     * 1つのスライドを強調表示する
     */
    emphasizeSlide(facilityMenu) {
      //transition効果により遅延したリサイズイベント対策
      this.$_handleResize()
      if(!facilityMenu) {
        return
      }
      const index = this.facilityMenuList.findIndex(item => {
        return FacilityMenu.isEquals(facilityMenu, item)
      })
      if(index === -1) {
        return
      }
      //スライドを中央にする
      this.$_setCenterByIndex(index)
      if(this.$refs['slide']) {
        this.$refs['slide'].forEach((basicMenu, i) => {
          basicMenu.setEmphasize(i === index)
        })
      }
    },
    /**
     * 強調状態をリセットする
     */
    resetEmphasizeSlides() {
      if(this.$refs['slide']) {
        // eslint-disable-next-line no-unused-vars
        this.$refs['slide'].forEach((basicMenu, i) => {
          basicMenu.setEmphasize(false)
        })
      }
    },
    $_onTouchstart(event) {
      //カルーセルのドラッグ開始
      this.smStartX = event.touches[0].clientX
      this.$_onMousedown({
        x: event.touches[0].clientX
      })
    },
    $_onTouchmove(event) {
      event.stopPropagation()
      event.preventDefault()
      this.$_onMousemove({
        x: event.touches[0].clientX
      })
    },
    $_onTouchend(event) {
      this.$_onMouseup(true, event)
    },
    $_onMousedown(event) {
      //transition効果により遅延したリサイズイベント対策
      this.$_handleResize()
      //カルーセルのドラッグ開始
      this.isMousedown = true
      slideStartX = event.x
    },
    $_onMouseup(isSm, event) {
      //カルーセルのドラッグ終了
      this.isMousedown = false
      const emit = () => {
        this.$emit('map-components-menu-move', false)
      }
      setTimeout(function() {
        emit()
      }, 500)
      if(isSm === true) {
        //スマホは1スライド分追加で動かす
        const toRight = event.changedTouches[0].clientX - this.smStartX
        // 0ピクセルの場合は動かさない
        const judgMagni = 1
        if(toRight > 0) {
          if(toRight > this.getSliderWidth * judgMagni) {
            this.slideOffsetX += this.getSliderWidth
          }
        } else if (toRight < 0) {
          if(toRight < this.getSliderWidth * judgMagni) {
            this.slideOffsetX -= this.getSliderWidth
          }
        }
      }

      //画面からはみ出していた場合は戻す
      this.slideOffsetX = this.$_getScrollAdjustWidth(this.slideOffsetX)
    },
    $_onMousemove(event) {
      if(this.isMousedown) {
        this.$emit('map-components-menu-move', true)
        this.slideOffsetX += event.x - slideStartX
        slideStartX = event.x
      }
    },
    /**
     * カルーセルを1つ移動する
     * @param isAhead 右に進む場合はtrue, 左に進む場合はfalse
     */
    $_scrollSlide(isAhead) {
      let offsetX = this.slideOffsetX + 0
      if(isAhead) {
        offsetX += this.getSliderWidth
      } else {
        offsetX -= this.getSliderWidth
      }
      this.slideOffsetX = this.$_getScrollAdjustWidth(offsetX)
    },
    $_getScrollAdjustWidth(offsetX) {
      const max = this.sliderContainerWidth - this.getSliderWidth
      const min = -this.getSliderWidth * (this.facilityMenuList.length - 1)
      if(offsetX < min) {
        //値が小さ過ぎる場合
        offsetX = min
      } else if(offsetX > max) {
        //値が大きすぎる場合
        offsetX = max
      }
      return offsetX
    },
    /**
     * index番号でスライドを中央に動かす
     */
    $_setCenterByIndex(index) {
      index = parseInt(index, 10)
      if(index < 0) {
        index = 0
      } else if(index > this.facilityMenuList.length - 1) {
        index = this.facilityMenuList.length - 1
      }
      // eslint-disable-next-line no-unused-expressions
      this.sliderContainerWidth / 2
      const width = this.sliderContainerWidth <= 1000 ? this.sliderContainerWidth / 2 : this.sliderContainerWidth / 6; 
      this.slideOffsetX = this.$_getScrollAdjustWidth(
        width - this.getSliderWidth * (index + 0.5)
      )
    },
    $_showDetail(index) {
      console.log('showDetail, %d', parseInt(index, 10))
      this.$emit('map-components-click-basic-menu', this.facilityMenuList[parseInt(index, 10)])
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
      const container = this.$_getRefSize('slider-container')
      this.sliderContainerWidth = container.width
      //this.sliderContainerLeft = this.$refs["slider-container"].getBoundingClientRect().left;
      this.slideOffsetX = this.$_getScrollAdjustWidth(this.slideOffsetX)
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
.component {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.slider-wrapper {
  box-sizing: border-box;
  position: relative;
  display: flex;
  transition-duration: 500ms;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  margin: 0;
  height: 100%;
  cursor: pointer;
}

.slider-content {
  width: fit-content;
}

.button-wrapper {
  position: relative;
}
.button-wrapper > img {
  position: absolute;
  bottom: 100px;
  width: 40px;
  height: 40px;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  cursor: pointer;
}
.minus-button {
  left: 20px;
}
.plus-button {
  right: 20px;
  transform: scale(-1, 1);
}
</style>
