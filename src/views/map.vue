<template>
  <div id="map-cpn" ref="map-cpn">
    <div class="map-wrapper" v-bind:style="mapWrapperStyle">
      <DynamicMap
        v-bind:isSizeSm="isSizeSm"
        v-bind:address="address"
        v-bind:language="language"
        v-bind:loginFlag="loginFlag"
        v-bind:priceDiv="priceDiv"
        v-bind:crmFlag="crmFlag"
        v-bind:ssoSubscriptionId="ssoSubscriptionId"
        v-on:map-components-load-finished="$_handleResize">
      </DynamicMap>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import DynamicMap from '@/components/map-components/DynamicMap.vue'

export default {
  components: {
    DynamicMap
  },
  mounted() {
    const onResize = _.debounce(this.$_handleResize, 100)
    window.addEventListener('resize', onResize)
    this.$once('hook:beforeDestroy', function() {
      window.removeEventListener('resize', onResize)
    })
  },
  data() {
    return {
      isSizeSm: false,
      // address: "東京都千代田区学士会館",
      address: '',
      loginFlag: true,
      //loginFlag: false,
      ssoSubscriptionId: '202129',
      priceDiv: 20,
      crmFlag: '0'
    }
  },
  computed: {
    language() {
      return this.$store.getters["wovn/getLang"];
    },
    mapWrapperStyle() {
      const headerHeight = this.isSizeSm ? '0' : '40'
      return {
        height: `calc(105vh - ${headerHeight}px - 96px - 40px - 32px)`
      }
    }
  },
  methods: {
    /**
     * リサイズハンドラ。dynamic-mapのサイズを確定させる
     */
    $_handleResize() {
      const appSize = this.$_getRefSize('map-cpn')
      //ブレークポイントを640pxと仮決め
      this.isSizeSm = appSize.width < 1024
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
  }
}
</script>

<style scoded>
.home {
  background-color: "#cdcdcd";
}
.n-card {
  max-width: 300px;
}
#map-cpn {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#map-cpn header {
  box-sizing: border-box;
  text-align: center;
  vertical-align: middle;
  height: 40px;
  padding: 5px;
}

.map-wrapper {
  box-sizing: border-box;
}

.breadcrumb {
  display: none !important;
}

.header {
  background-color: #ffffff;
}
</style>
