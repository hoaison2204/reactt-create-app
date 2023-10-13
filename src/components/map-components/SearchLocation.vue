<template>
  <div
    class="component"
    v-bind:class="`${sizeSmClass} ${componentDisabledClass}`"
  >
    <img id="location-icon" v-on:click="$_searchAddress"
      v-bind:src="currentButton"
      v-on:mouseover="currentButton = buttonHover"
      v-on:mouseleave="currentButton = button"
      >
    <input id="location-input" type="text" placeholder="東京駅"
      v-model="address"
      v-on:keyup.enter="$_searchAddress"
      v-bind:disabled="disabled"
    />
  </div>
</template>


<script type="text/javascript">
import * as common from '@/components/map-components/common/common.js'

const button = require('@/assets/map-components/trans-location-icon.svg')
const buttonHover = require('@/assets/map-components/trans-location-icon-hover.svg')

export default {
  name: 'SearchLocation',
  props: {
    width: {
      type: [String, Number],
      default: () => '100%'
    },
    height: {
      type: [String, Number],
      default: () => '100%'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isSizeSm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      google: null,
      address: '',
      currentButton: button,
      button,
      buttonHover
    }
  },
  computed: {
    sizeSmClass() {
      return this.isSizeSm ? 'size-sm' : ''
    },
    /**
     * 本コンポーネント自体がDisabledの場合のクラス
     */
    componentDisabledClass() {
      return this.disabled ? 'component-disabled' : ''
    }
  },
  async mounted() {
    this.google = await common.getGoogle()
  },
  methods: {
    $_searchAddress() {
      if(this.disabled) {
        return
      }
      if(!this.address || this.address.trim().length === 0) {
        return
      }
      common.geocode(this.google, this.address)
        .then((latLng) => {
          if(latLng.success) {
            this.$_onGeocodeSuccess(latLng)
          } else {
            // console.error(latLng.error)
          }
        })
    },
    $_onGeocodeSuccess(latLng) {
      this.$emit('map-components-geocode-success', latLng)
    }
  }
}


</script>

<style scoped>
.component {
  position: relative;
  box-sizing: border-box;
  font-family: 'Noto Sans JP', sans-serif;
}
.component * {
  box-sizing: border-box;
}

#location-icon {
  position: absolute;
  top: 10px;
  left: 8px;
  cursor: pointer;
}
.component-disabled #location-icon {
  cursor: auto;
  opacity: 50%;
}

#location-input {
  height: 40px;
  width: 230px;
  border-radius: 8px;
  border: solid 1px #eeeeee;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  padding-left: 30px;
  background-color: #ffffff;
}
.size-sm #location-input {
  box-shadow: none;
  width: calc(100% - 5px);
  height: 36px;
}
.component-disabled #location-input {
  background-color: #eeeeee;
}

</style>
