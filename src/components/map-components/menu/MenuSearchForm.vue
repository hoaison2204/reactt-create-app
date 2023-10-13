<template>
  <div class="component" v-bind:class="componentClass">

    <button v-if="isSizeSm" type="button" class="close-buttom" v-on:click="$_onClickClose">×</button>
    <form class="form">
      <!-- 距離 -->
      <div class="condition-wrapper">
        <label class="caption" v-bind:for="`${uuid}-distance`">距離</label>
        <select v-bind:id="`${uuid}-distance`" v-model="param.distance">
          <option v-for="distance in distanceList" v-bind:value="distance.value" v-bind:key="distance.value">
            {{distance.text}}
          </option>
        </select>
      </div>

      <!-- カテゴリ -->
      <div class="condition-wrapper">
        <label class="caption" v-bind:for="`${uuid}-category`">カテゴリ</label>
        <select v-bind:id="`${uuid}-category`" v-model="param.category">
          <option v-for="category in catLrgClasses" v-bind:value="category.catLrgClassCd" v-bind:key="category.catLrgClassCd">
            {{category.catLrgClassNm}}
          </option>
        </select>
      </div>

      <!-- 利用方法 -->
      <!-- <div class="condition-wrapper">
        <div class="chechbox-container">
          <div class="caption">利用方法</div>
          <div v-for="usage in usageList" v-bind:key="usage.value" class="checkbox-row">
            <input v-bind:id="`${uuid}-usage-${usage.value}`" type="checkbox" v-bind:value="usage.value" v-model="param.usage" />
            <label v-bind:for="`${uuid}-usage-${usage.value}`">{{usage.text}}</label>
          </div>
        </div>
      </div> -->

      <div class="bottom-button-container">
        <button class="search-button" type="button" v-on:click="$_searchMenu">検索する</button>
      </div>

    </form>
  </div>
</template>

<script>
const componentId = 'menu-search-form'
let uuid = 0

const distanceList = [
  {text: '300m以内', value: 300},
  {text: '500m以内', value: 500},
  {text: '800m以内', value: 800},
  {text: '1km以内', value: 1000},
  {text: '3km以内', value: 3000},
  {text: '5km以内', value: 5000},
  {text: '10km以内', value: 10000}
]
const distanceDefault = 500


const usageList = [
  {text: '給与天引きで支払可', value: 1},
  {text: '会員証クーポン呈示利用可', value: 2},
  {text: 'ベネポが使えるプラン', value: 3},
  {text: 'ベネポが貯まるプラン', value: 4}
]


export default {
  name: 'MenuSearchForm',
  props: {
    isSizeSm: {
      type: Boolean,
      default: false
    },
    catLrgClasses: {
      type: Array,
      default() {
        return []
      }
    },
    lastSearchCondition: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      uuid: `${componentId  }-${  (uuid++).toString()}`,
      distanceList,
      usageList,
      catLrgList: [],
      param: {
        distance: distanceDefault,
        category: null,
        usage: []
      }
    }
  },
  computed: {
    componentClass() {
      return this.isSizeSm ? 'size-sm' : ''
    }
  },
  watch: {
    // catLrgClasses: function(list) {
    //   //カテゴリの初期値を配列の最初の要素にする
    //   this.param.category = this.catLrgClasses[0] ? this.catLrgClasses[0].catLrgClassCd : null;
    // },
  },
  mounted() {
    if(this.lastSearchCondition) {
      if('distance' in this.lastSearchCondition) {
        this.param.distance = this.lastSearchCondition.distance
      }
      if('category' in this.lastSearchCondition) {
        this.param.category = this.lastSearchCondition.category
      }
      if('usage' in this.lastSearchCondition) {
        this.param.usage = this.lastSearchCondition.usage
      }
    }
  },
  methods: {
    /**
     * 検索条件の初期化
     */
    resetCondition() {
      this.param.distance = distanceDefault
      this.param.category = this.catLrgClasses[0] ? this.catLrgClasses[0].catLrgClassCd : null
      this.param.usage = []
    },
    /**
     * 検索条件のセット
     */
    setCondition(param) {
      this.param.distance = param.distance
      this.param.category = param.category
      this.param.usage = param.usage
    },

    /**
     * メニュー検索の実行
     */
    $_searchMenu() {
      this.$emit('map-components-menu-search', this.param)
    },
    /**
     * このコンポーネントをラップするUpToModalへのイベント通知
     * TODO: UpToModalに依存してしまっているので、できれば修正
     */
    $_onClickClose() {
      this.$emit('map-components-notify-to-up-to-modal', 'map-components-menu-search-close')
    }
  }
}
</script>

<style scoped>
  .component,
  .component * {
    box-sizing: border-box;
  }

  .component {
    width: 100%;
    background-color: #ffffff;
    padding: 16px;
  }
  .component.size-sm {
    padding: 32px;
    background-color: #FFFFFF;
    height: auto;
    min-height: 400px;
  }

  .close-buttom {
    background: none;
    border: none;
    position: absolute;
    right: 12px;
    top: 12px;
    font-size: 32px;
  }

  .form .condition-wrapper {
    margin-bottom: 15px;
  }

  .form .condition-wrapper .caption {
    margin-bottom: 7.5px;
    letter-spacing: 0.75px;
    color: #222222;
    font-weight: bold;
    font-size: 14px;
    line-height: 150%;
  }

  .form .condition-wrapper label {
    display: block;
    height: 21px;
    padding-bottom: 8px;
    letter-spacing: 0.75px;
  }

  .form .condition-wrapper select {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 6px 8px 6px 12px;
    width: 100%;
    height: 36px;
    background: #FFFFFF;
    border: 1px solid #CDCDCD;
    border-radius: 4px;
  }

  .chechbox-container {
    margin: 16px 0;
  }

  .chechbox-container > .checkbox-row {
    font-size: 14px;
    margin-bottom: 7.5px;
    padding-left: 8px;
    display: flex;
    align-items: center;
  }
  .chechbox-container > .checkbox-row > label {
    padding-left: 10px;
  }

  .bottom-button-container {
    display: flex;
    justify-content: center;
    /* margin: 0 auto;
    margin-top: auto; */
    /* position: fixed; */
    /* bottom: 16px; */
  }
  .search-button {
    color: #ffffff;
    background-color: #222222;
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
    width: 144px;
    height: 36px;
    border-radius: 8px;

    /* display: flex;
    align-items: center;
    justify-content: center; */
    cursor: pointer;
  }
  .search-button:hover {
    background-color: #505050;
  }
  .search-button:focus {
    background-color: #353535;
  }

  .component.size-sm .search-button{
    position: fixed;
    bottom: 16px;
  }

</style>
