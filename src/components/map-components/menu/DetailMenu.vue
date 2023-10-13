<template>
  <div class="component" v-bind:class="componentClass">
    <!-- スマホ版基本情報 -->
    <div v-if="isSizeSm" class="basic-info-wrapper">
      <div>
        <img class="menu-img" v-bind:src="getMenuImage" />
      </div>
      <div>
        <div class="menu-no">メニューNo.{{menu.menuNo}}</div>
        <div class="menu-nm">{{menu.menuNm}}</div>
      </div>
    </div>
      <!-- スマホ版キャッチ・リード -->
    <div v-if="isSizeSm" class="catch-lead-wrapper">
      <div class="menu-catch-copy">{{menu.catchCopy}}</div>
      <div class="menu-lead-copy">{{menu.leadCopy}}</div>
    </div>

    <!-- PC版基本情報 -->
    <div  v-if="!isSizeSm" class="basic-info-wrapper">
      <div class="menu-no">メニューNo.{{menu.menuNo}}</div>
      <div class="menu-nm">{{menu.menuNm}}</div>
      <div class="menu-pc-flex">
        <div>
          <img class="menu-img" v-bind:src="getMenuImage" />
        </div>
        <!-- PC版キャッチ・リード -->
        <div class="catch-lead-wrapper">
          <div class="menu-catch-copy">{{menu.catchCopy}}</div>
          <div class="menu-lead-copy">{{menu.leadCopy}}</div>
        </div>
      </div>
    </div>

    <transition name="slide-fade">
      <!-- 共通プランを見る -->
      <div class="show-plan-wrapper" v-if="!showPlan">
        <button v-on:click="showPlan = !showPlan"><span>プランを見る</span><img v-bind:src="require('@/assets/map-components/upper-arrow.svg')" /></button>
      </div>
    </transition>

    <!-- 共通プラン情報 -->
    <transition name="slide-fade">
      <div v-if="showPlan && (hasIcon || (hasOneFacility && getAreaText) || (hasOneFacility && hasAccessDetail))" class="plan-info-wrapper">
        <!-- アイコン・アクセス -->
        <div class="icon-access-wrapper">
          <!-- アイコン -->
          <div class="icon-list-wrapper" v-if="hasIcon">
            <div class="icon" v-for="(icon, index) in menu.iconList" v-bind:key="`${uuid + '-icon-' + index}`" v-bind:index="index">{{icon.iconNm}}</div>
          </div>
          <!-- アクセス情報 施設が複数の場合は表示しない-->
          <!-- アイコンがあれば上部マージン表示 -->
          <div class="access-wrapper-margin" v-if="hasIcon && ((hasOneFacility && getAreaText.length > 0) || (hasOneFacility && hasAccessDetail))"></div>
          <div class="access-wrapper" v-if="hasOneFacility">
            <div class="access-area-wrapper" v-if="getAreaText.length > 0">
              <img v-bind:src="require('@/assets/map-components/trans-location-icon.svg')" />
              <div class="access-area">{{ getAreaText }}</div>
            </div>
            <div class="access-detail-margin" v-if="hasOneFacility && getAreaText && hasAccessDetail"></div>
            <div class="access-detail" v-if="hasOneFacility && hasAccessDetail">{{ menu.facilityList[0].access }}</div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 共通クーポン情報 -->
    <transition name="slide-fade">
      <div  v-if="showPlan" class="cupon-info-wrapper">
        <div class="cupon-wrapper" v-for="(plan, planIndex) in menu.planList" v-bind:key="`${uuid + '-cupon-' + planIndex}`" v-bind:index="planIndex">
          <div v-if="!isSizeSm" class="cupon-limit">お申込み期間&emsp;{{ getCuponLimit(plan.planBasicInfo.planRcEndDt) }}まで</div>

          <!-- プラン名 -->
          <div class="cupon-basic">
            {{ plan.planBasicInfo.planNm }}
          </div>

          <!-- クーポン -->
          <div class="cupon-detail" v-for="(benefitHeadline, headlineIndex) in plan.benefitHeadlines" v-bind:key="`${uuid + '-cupon-' + planIndex + '-bene-' + headlineIndex}`" v-bind:index="headlineIndex">
            <div class="cupon-condition">
              {{ benefitHeadline.benefitHeading }}
            </div>
            <div class="cupon-value">
              {{ benefitHeadline.benefitContent }}
            </div>
          </div>
          <div v-if="isSizeSm" class="cupon-limit">お申込み期間&emsp;{{ getCuponLimit(plan.planBasicInfo.planRcEndDt) }}まで</div>
        </div>
      </div>
    </transition>

    <!-- 特典一覧を見る -->
    <transition name="slide-fade">
      <div  v-if="showPlan" class="show-cupon-list-wrapper">
        <button class="show-cupon-list-button" type="button" v-on:click="$_showCuponList">特典一覧を見る</button>
      </div>
    </transition>

    <!-- 閉じる -->
    <transition name="slide-fade">
      <div class="hide-plan-wrapper" v-if="showPlan">
        <button v-on:click="showPlan = !showPlan"><span>閉じる</span><img v-bind:src="require('@/assets/map-components/upper-arrow.svg')" /></button>
      </div>
    </transition>


  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
import moment from 'moment'

// eslint-disable-next-line no-unused-vars
import * as common from '@/components/map-components/common/common.js'
// eslint-disable-next-line no-unused-vars
import * as api from '@/components/map-components/common/api.js'
// eslint-disable-next-line no-unused-vars
import Menu from '@/components/map-components/model/menu.js'
// eslint-disable-next-line no-unused-vars
import FacilityMenu from '@/components/map-components/model/facilityMenu.js'

const componentId = 'detail-menu'
let uuid = 0

export default {
  components: {

  },
  name: 'DetailMenu',
  props: {
    menu: {
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
      uuid: `${componentId  }-${  (uuid++).toString()}`,
      showPlan: false
    }
  },
  computed: {
    componentClass() {
      return this.isSizeSm ? 'size-sm' : ''
    },
    getMenuImage() {
      return this.menu.getPriorityImageUrl()
    },
    getAreaText() {
      const facility = this.menu.facilityList[0]
      if(!facility) {
        return ''
      }
      const textList = []
      const delimeter = '＞'
      if(facility.areaLrgClassNm) {
        textList.push(facility.areaLrgClassNm)
      }
      if(facility.areaMidClassNm) {
        textList.push(facility.areaMidClassNm)
      }
      if(facility.areaSmlClassNm) {
        textList.push(facility.areaSmlClassNm)
      }
      return textList.join(delimeter)
    },
    hasIcon() {
      return this.menu.iconList && this.menu.iconList.length > 0
    },
    hasOneFacility() {
      return this.menu.facilityList && this.menu.facilityList.length === 1
    },
    hasAccessDetail() {
      return this.menu.facilityList && this.menu.facilityList.length === 1 && this.menu.facilityList[0].access !== null
    }
  },
  methods: {
    $_showCuponList() {
      this.$emit(
        'map-request-go-menu-detail',
        this.menu.categoryInfomation.catLrgClassCd,
        this.menu.categoryInfomation.catMidClassCd,
        this.menu.categoryInfomation.catSmlClassCd,
        this.menu.menuNo)
    },
    getCuponLimit(date) {
      return moment(date, 'YYYYMMDD hh:mm:ss').format('YYYY年MM月DD日')
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
  padding: 24px;
}
.size-sm.component {
  padding: 16px;
}

.basic-info-wrapper {
  border-bottom: solid 1px #DCDEE0;
  padding-bottom: 12px;
}
.size-sm .basic-info-wrapper {
  display: flex;
}

.menu-no {
  color: #63666A;
  font-size: 14px;
  margin-bottom: 8px;
}
.size-sm .menu-no {
  font-size: 12px;
}

.menu-nm {
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: bold;
}
.size-sm .menu-nm {
  font-size: 16px;
}

.menu-img {
  display: block;
  max-width: 240px;
  max-height: 240px;
  margin-right: 16px;
}
.size-sm .menu-img {
  max-width: 96px;
  max-height: 96px;
  margin-right: 8px;
}

.menu-pc-flex {
  display: flex;
}

/** キャッチ・リードコピー */
.size-sm .catch-lead-wrapper {
  border-bottom: solid 1px #DCDEE0;
  padding: 16px;
}
.menu-catch-copy {
  margin-bottom: 16px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
}
.size-sm .menu-catch-copy {
  font-weight: bold;
}

.menu-lead-copy {
  font-size: 14px;
  line-height: 21px;
  white-space: break-spaces;
}

/** プランを見るボタン・閉じるボタン */
.show-plan-wrapper > button,
.hide-plan-wrapper > button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  margin: 18px auto;
  margin-bottom: 0;
}
.show-plan-wrapper img {
  transform: scale(1, -1);
}
.show-plan-wrapper span,
.hide-plan-wrapper span {
  display: block;
}

/** プラン情報 */
.plan-info-wrapper {
  border-bottom: solid 1px #DCDEE0;
  padding: 12px 0;
}
.size-sm .plan-info-wrapper {
  padding: 8px 0;
}

.icon-list-wrapper {
  display: flex;
  height: 20px;
}

.icon-list-wrapper .icon {
  padding: 4px;
  height: 20px;
  font-size: 12px;
  border-radius: 2px;
  background-color: #EDEEF0;
  margin-right: 8px;
}

/** アクセス */
.access-wrapper-margin {
  margin-top: 9px;
}

/** アクセスエリア */
.access-area-wrapper {
  height: 21px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 21px;
}
.size-sm .access-area-wrapper {
  line-height: 17.5px;
}

.access-area-wrapper img {
  width: 14px;
  height: 19px;
  display: block;
  margin-right: 9px;
}

.access-detail-margin {
  margin-top: 18px;
}

/** クーポン情報 */
.cupon-wrapper {
  padding: 12px 0;
  border-bottom: solid 1px #DCDEE0;
}
.size-sm .cupon-wrapper {
  padding: 8px 0;
}

.cupon-limit {
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 16px;
}
.size-sm .cupon-limit {
  text-align: right;
  margin-bottom: 0;
}

.cupon-basic {
  font-weight: bold;
  margin-bottom: 16px;
  font-size: 18px;
}
.size-sm .cupon-basic {
  font-size: 16px;
}

.cupon-detail:not(.size-sm) {
  display: flex;
  align-items: center;
}
.cupon-detail:not(.size-sm) .cupon-condition {
  margin-right: 24px;
}

.cupon-value {
  font-size: 16px;
  line-height: 24px;
  color: red;
  font-weight: bold;
}
.size-sm .cupon-condition,
.size-sm .cupon-value  {
  margin-bottom: 4px;
}

/** 特典一覧を見る */
.show-cupon-list-wrapper {
  border-bottom: solid 1px #DCDEE0;
  display: flex;
  justify-content: center;
}
.show-cupon-list-button {
  margin: 12px 0;
  color: #ffffff;
  background-color: #222222;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  width: 144px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
}
.show-cupon-list-button:hover {
  background-color: #505050;
}
.show-cupon-list-button:focus {
  background-color: #353535;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  /* transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
