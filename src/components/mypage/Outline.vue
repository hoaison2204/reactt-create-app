<template>
  <div
    class="p-mypage__outline"
    :class="{ 'p-mypage__outline--no-contents': $route.query.no_result }"
  >
    <div class="p-mypage-outline__header">
      <div v-if="$auth.loggedIn" class="p-mypage-outline__header__user">
        <p class="mb-2">会員情報</p>
        <div class="flex">
          <div
            v-if="userData.ssoPrincipalFlg == 1"
            class="l-header__menu__item__label--self"
          >
            本人
          </div>
          <div
            v-if="userData.ssoPrincipalFlg == 0"
            class="l-header__menu__item__label--family"
          >
            家族
          </div>
          <h1
            v-if="userData.familyName || userData.firstName"
            wovn-ignore
            class="text-md font-bold"
          >
            {{ userName }} 様
          </h1>
          <h1 v-else class="c-title6" wovn-ignore>氏名未設定</h1>
        </div>

        <div v-if="!isIcService(mypageDisplayCode) && !isGCService(mypageDisplayCode)" class="p-mypage-outline__header__id mt-2">
          <p>
            会員ID：<span wovn-ignore>{{ userData.ssoCustomerNo }}</span>
          </p>
          <p class="flex items-center">
            <Tooltip
              direction="right"
              class="mr-1 cursor-pointer right-0"
              text="<p class='text-xs'>店頭番号とは・・・<br/>JTB、近畿日本ツーリストの各店頭でサービス提供を受ける場合、店頭番号を店舗窓口でお伝えください。</p>"
              :classes="[
                'bg-gray-500',
                'text-white',
                'break-words',
                'whitespace-pre-wrap',
              ]"
            >
              <Icon name="mypage_information" class="align-text-bottom" />
            </Tooltip>
            店頭番号：<span wovn-ignore>{{ userData.ssoMembrNo }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="outline__section">
      <div class="p-mypage-outline__navigation__itemsBox">
        <ItemBox
          :menu_item="item"
          v-for="(item, index) in menu_item"
          :key="index"
          @gotoPath="gotoPath(item)"
          :mypageBoCode="mypageBoCode"
          :mypageDisplayCode="mypageDisplayCode"
          :companyCd="companyCd"
          :menuIndex="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ItemBox from '../itemBox/BenepoItem';
import { getCookieValue } from '@/utils/cookie';
import moment from 'moment';

export default {
  components: {
    ItemBox,
  },
  props: {
    data: {
      type: [Object, Array],
    },
    mypageBoCode: {
      type: String,
    },
    mypageDisplayCode: {
      type: String,
    },
    companyCd: {
      type: String,
    },
    isShowSupplementaryCoupon:{
      type: Boolean,
      default: false
    },
    isShowCafeteriaPoint:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menu_item: [
        {
          icon: 'mypage_user_new',
          name: '会員情報',
          path: '/mypage/setting',
          subItems: null,
        },
        {
          icon: 'mycoupon',
          name: 'マイクーポン',
          path: '/mypage/coupon',
          subItems: null,
        },
        {
          icon: 'auxiliarycoupon',
          name: '補助クーポン',
          path: '/mypage/coupons',
          subItems: null,
        },
        {
          icon: 'mypage_cafe',
          name: 'カフェ',
          path: '#',
          subItems: 'cafe',
        },
        {
          icon: 'mypage_benepo_new',
          name: 'ベネポ',
          path: 'mypage/benepo?currentID=0',
          subItems: null,
        },
        {
          icon: 'mypage_orders_new',
          name: '申込履歴',
          path: '/mypage/orders',
          subItems: null,
        },
        {
          icon: 'mypage_viewHistory_new',
          name: '閲覧履歴',
          path: '/mypage/visits',
          subItems: null,
        },
        {
          icon: 'mypage_favorite_new',
          name: 'お気に入り',
          path: '/mypage/favorites',
          subItems: null,
        },
        {
          icon: 'mypage_family',
          name: '家族設定',
          path: '/mypage/family',
          subItems: null,
        },
      ],
      params: {
        pointFrom: null,
        pointTo: null,
        startIndex: null,
        count: null,
        commandType: null,
      },
      totalPointValidOfMonth: 0,
      points: {},
      status: null,
      // 会員IDに表示するメールアドレス
      memberIdEmail: '',
    };
  },
  async created() {
    this.getMenuItem();
    const params = {
      commandType: '1,2',
    };
    const pointHistory = await this.$repositories('mypage').getPointHistory(
      params
    );
    if (pointHistory && pointHistory.data) {
      if (pointHistory.data.historyDataList) {
        pointHistory.data.historyDataList
          .filter((item) => this.checkValidTime(item.validTo))
          .forEach((ele) => {
            this.totalPointValidOfMonth += ele.point;
          });
      }
      this.$auth.points = pointHistory.data.totalPoint || 0;
    }
    this.points = pointHistory.data;

    // 会員IDに表示するメールアドレスを取得する
    let userRes = await this.$repositories('user').postUser();
    if (userRes && userRes.data && userRes.data.email) {
      this.memberIdEmail = userRes.data.email;
    }
  },
  computed: {
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    domainMypage() {
      return this.getMypageDomain(this.mypageDisplayCode);
    },
    orgData() {
      if (this.data.subsidyData)
        return this.data.subsidyData.availableDataList || [];
    },
    remainingData() {
      if (this.data.subsidyData)
        return this.data.subsidyData.remainingCount || [];
    },
    userData() {
      if (!this.$auth || !this.$auth.user) return '';
      return this.$auth.user;
    },
    userName() {
      if (!this.userData) {
        return '';
      } else if (this.userData.familyName && this.userData.firstName) {
        return this.userData.familyName + ' ' + this.userData.firstName;
      } else {
        return this.userData.familyName || this.userData.firstName;
      }
    },
  },
  methods: {
    checkValidTime(timeStr) {
      if (timeStr) {
        const endOfMonthCurrent = moment()
          .clone()
          .endOf('month')
          .format('YYYY/MM/DD');
        const datePoint = moment(timeStr).format('YYYY/MM/DD');
        const dayOfPointHist = moment(timeStr).format('DD');
        return (
          moment(datePoint,'YYYY/MM/DD').isSame(moment(endOfMonthCurrent,'YYYY/MM/DD'), 'month') &&
          dayOfPointHist >= moment().format('DD')
        );
      }
      return null;
    },
    getPrice(unitPrice, sheets) {
      return this.$utils.addComma(parseInt(unitPrice) * parseInt(sheets));
    },
    gotoPath(router) {
      const path = router.path;
      const subItem = router.subItems;
      if (subItem === 'cafe') {
        // カフェの場合
        const cafeUrl = process.env.VUE_APP_CAFE_SYS_URL;
        window.open(cafeUrl, '_blank');
      } else {
        const query = this.$route.query;
        this.$router.push({ path: path, query });
      }
    },
    getMenuItem() {
      if(!this.isGCService(this.mypageDisplayCode)){
        if (!this.isShowCafeteriaPoint || this.isIcService(this.mypageDisplayCode) || this.isTokuhodai(this.mypageDisplayCode) || this.isLifeWell(this.mypageDisplayCode)) {
          let idx = this.menu_item.findIndex(item => item.icon === 'mypage_cafe');
          if(idx > -1) this.menu_item.splice(idx, 1);
        }
        if (!this.isShowSupplementaryCoupon || this.isTokuhodai(this.mypageDisplayCode) || this.isLifeWell(this.mypageDisplayCode)) {
          let idx = this.menu_item.findIndex(item => item.icon === 'auxiliarycoupon');
          if(idx>-1) this.menu_item.splice(idx, 1);
        }
        if (!this.mypageDisplayCode || this.fromSiteUnsupported(this.mypageDisplayCode, 'family') || this.userData.ssoPrincipalFlg == 0) {
          let idx = this.menu_item.findIndex(item => item.icon === 'mypage_family');
          if (idx > -1) this.menu_item.splice(idx, 1);
        }
        if (this.mypageDisplayCode === "IC"){
          let idx = this.menu_item.findIndex(item => item.icon === 'mypage_benepo_new');
          if (idx > -1) this.menu_item.splice(idx, 1);
          
          let family_idx = this.menu_item.findIndex(item => item.icon === 'mypage_family');
          if (family_idx > -1) this.menu_item.splice(family_idx, 1);       
        }

        const bsjsessionid = getCookieValue('BSJSESSIONID');
        this.status = bsjsessionid.slice(0, 2);
        if (this.status != null && this.status == "CC") {
          let idx = this.menu_item.findIndex(item => item.icon === 'mycoupon');
          if(idx>-1) this.menu_item.splice(idx, 1);
        }
      } else {
        // グルメログイン時は、会員情報と申込履歴のみ表示
        this.menu_item.splice(-3,3); // 後ろ3つ（閲覧履歴,お気に入り,家族設定削除）
        this.menu_item.splice(1,4); // 間4つ（マイクーポン,補助クーポン,カフェ,ベネポ）
      }
    },
  },
  watch: {
    isShowSupplementaryCoupon(value){
      if (!value || this.mypageDisplayCode === "IC" || this.isTokuhodai(this.mypageDisplayCode) || this.isLifeWell(this.mypageDisplayCode)) {
        let idx = this.menu_item.findIndex(item => item.icon === 'auxiliarycoupon');
        if(idx>-1) this.menu_item.splice(idx, 1);
      } else {
        let idx = this.menu_item.findIndex(item => item.icon === 'auxiliarycoupon');
        if(idx === -1) {
          let idxMycoupon = this.menu_item.findIndex(item => item.icon === 'mycoupon');
          let item =  {
            icon: 'auxiliarycoupon',
            name: '補助クーポン',
            path: '/mypage/coupons',
            subItems: null,
          }
          this.menu_item.splice( idxMycoupon? idxMycoupon+1 : 1, 0,item);
        }
      }
    },
    mypageDisplayCode(value) {
      if (!value || this.fromSiteUnsupported(value, 'family') || this.userData.ssoPrincipalFlg == 0) {
        let idx = this.menu_item.findIndex(item => item.icon === 'mypage_family');
        if (idx > -1) this.menu_item.splice(idx, 1);
      } else {
        let idx = this.menu_item.findIndex(item => item.icon === 'mypage_family');
        if (idx === -1) {
          let idxFamily = this.menu_item.findIndex(item => item.icon === 'mypage_family');
          let item =  {
            icon: 'mypage_family',
            name: '家族設定',
            path: '/mypage/family',
            subItems: null,
          };
          this.menu_item.push(item);
        }
      }
    },
    isShowCafeteriaPoint(value){
      if (!value || this.isIcService(this.mypageDisplayCode) || this.isTokuhodai(this.mypageDisplayCode) || this.isLifeWell(this.mypageDisplayCode)) {
        let idx = this.menu_item.findIndex(item => item.icon === 'mypage_cafe');
        if(idx>-1) this.menu_item.splice(idx, 1);
      } else {
        let idx = this.menu_item.findIndex(item => item.icon === 'mypage_cafe');
        if(idx === -1) {
          let idxSbsd = this.menu_item.findIndex(item => item.icon === 'auxiliarycoupon');
          let idxMycoupon = this.menu_item.findIndex(item => item.icon === 'mycoupon');
          let item =  {
            icon: 'mypage_cafe',
            name: 'カフェ',
            path: '#',
            subItems: 'cafe'
          }
          this.menu_item.splice( idxSbsd !== -1 ? idxSbsd + 1 : idxMycoupon + 1, 0, item);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.l-header__menu__item {
  position: relative;
  display: flex;
  justify-content: center;
  padding-right: 20px;
  align-items: center;
  cursor: pointer;
  &__label {
    display: inline-block;
    color: #fff;
    font-weight: 700;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 10px;
    margin-right: 5px;
    &--self {
      @extend .l-header__menu__item__label;
      background-color: $Red;
    }
    &--family {
      @extend .l-header__menu__item__label;
      background-color: $Blue;
    }
  }
}
</style>
