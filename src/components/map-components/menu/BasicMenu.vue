<template>
  <div class="component" v-bind:class="emphasizeClass">
    <div v-if="isSizeSm" class="component-wrapper component-wrapper-sm">
      <img class="menu-image" v-bind:src="getMenuImage" />
      <div class="text-wrapper">
        <div class="menu-name">{{facilityMenu.menu.menuNm}}</div>
        <div class="facility-name">{{facilityMenu.facility.facilityNm}}</div>
      </div>
    </div>
    <div v-else class="component-wrapper component-wrapper-pc">
      <img class="menu-image" v-bind:src="getMenuImage" />
      <div class="text-wrapper">
        <div class="menu-name">{{facilityMenu.menu.menuNm}}</div>
        <div class="facility-name">{{facilityMenu.facility.facilityNm}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import * as common from '@/components/map-components/common/common.js'
// eslint-disable-next-line no-unused-vars
import * as api from '@/components/map-components/common/api.js'
// eslint-disable-next-line no-unused-vars
import Menu from '@/components/map-components/model/menu.js'

const componentWidth = 208
const sizeSmComponentWidth = 296

export default {
  componentWidth,
  sizeSmComponentWidth,
  components: { },
  name: 'BasicMenu',
  props: {
    facilityMenu: {
      type: Object,
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
      emphasize: false
    }
  },
  computed: {
    getMenuImage() {
      return this.facilityMenu.menu.getPriorityImageUrl()
    },
    emphasizeClass() {
      return this.emphasize ? 'emphasize' : ''
    }
  },
  methods: {
    /**
     * 強調表示する
     */
    setEmphasize(isEmphasize) {
      this.emphasize = isEmphasize
    }
  }
}
</script>


<style scoped>
.component
.component * {
  box-sizing: border-box;
  font-family: "Noto Sans JP";
}

.component {
  background: none;
  padding: 0 8px;
}

.component-wrapper {
  height: 100%;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  cursor: pointer;
}
.emphasize .component-wrapper {
  background: #FFF5E2;
  border: 1px solid #DA291C;
}
.component-wrapper-pc {
  width: 192px;
  height: 232px;
}
.component-wrapper-sm {
  width: 280px;
  height: 96px;
  display: flex;
  line-height: 100%;
}

.menu-image {
  display: block;
  width: auto;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  pointer-events: none;
  margin: 0 auto;
}
.component-wrapper-pc .menu-image {
  max-width: 160px;
  max-height: 120px;
}
.component-wrapper-sm .menu-image {
  max-width: 80px;
  max-height: 60px;
  margin-right: 12px;
}

.menu-name {
  margin-top: 16px;
  font-size: 14px;
  line-height: 150%;
  user-select: none;
  pointer-events: none;
  max-height: 42px;
  overflow-y: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.component-wrapper-sm .menu-name {
  margin-top: 0;
}

.facility-name {
  margin-top: 10px;
  font-size: 12px;
  user-select: none;
  pointer-events: none;
  max-height: 39px;
  overflow-y: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.component-wrapper-sm .facility-name {
  margin-top: 4px;
}


</style>
