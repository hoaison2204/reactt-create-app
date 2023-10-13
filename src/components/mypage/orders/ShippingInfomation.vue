<template>
  <div
    id="OrderApplicantInfor"
    class="order-shipping-infomation font-size-over-ride"
  >
    <h1 class="font-bold mb-5 md:mb-4">配送先情報</h1>
    <template v-if="srvicDiv !== CONST.SRVIC_DIV.MAIL_ORDER">
      <h2
        class="mb-5 md:mb-3"
        v-if="dlvryAddrNm"
        wovn-ignore
      >
        {{ dlvryAddrNm }} 様
      </h2>
    </template>
    <template v-if="srvicDiv == CONST.SRVIC_DIV.MAIL_ORDER">
      <template v-for="(data, index) in shippingInfoListForShop">
          <h2
          class="mb-5 md:mb-3"
          v-if="dlvryAddrNmForShop(index)"
          wovn-ignore
        >
          {{ dlvryAddrNmForShop(index) }} 様
        </h2>
        <div class="mb-8 md:mb-6">
          <!-- お届け先 -->
          <div class="infor-item">
            <span>お届け先</span>
            <div>
              <span wovn-ignore v-if="zipCodeForShop[index]" class="mr-2">〒 {{ zipCodeForShop[index] }}</span>
              <br class="md:block" />
              <span wovn-ignore v-if="locationForShop">{{ locationForShop[index] }}</span>
            </div>
          </div>

          <!-- 配送先電話番号 -->
          <div
            class="infor-item"
            v-if="dlvryTelForShop(index)"
          >
            <span>配送先電話番号</span>
            <span wovn-ignore>{{ dlvryTelForShop(index) }}</span>
          </div>

          <!-- 出荷日 -->
          <div
            class="infor-item"
            v-if="dlvryDatetime(index)"
          >
            <span>出荷日</span>
            <span wovn-ignore>{{ dlvryDatetime(index) | formatDate("YYYY年MM月DD日") }}</span>
          </div>

          <!-- 運送会社名 -->
          <div
            class="infor-item"
            v-if="orderTo(index)"
          >
            <span>運送会社名</span>
            <span wovn-ignore>{{ orderTo(index) }}</span>
          </div>

          <!-- 配達お問い合わせ番号 -->
          <div
            class="infor-item"
            v-if="dlvrySlipNo(index)"
          >
            <span>配達お問い合わせ番号</span>
            <span wovn-ignore>{{ dlvrySlipNo(index) }}</span>
          </div>

          <!-- 運送会社URL -->
          <div
            class="infor-item"
            v-if="dlvryURL(index)"
          >
            <span>運送会社URL</span>
            <a  wovn-ignore
              :href="dlvryURL(index)"
              class="c-lists__list__inquiry--link mr5"
              target="_blank">
              {{ dlvryURL(index) }}
            </a>
          </div>
          
        </div>
      </template>
    </template>
    <template v-else>
      <div v-if="zipCode || location || dlvryTel" class="mb-8 md:mb-6">
        <!-- 住所 -->
        <div class="infor-item">
          <span>住所</span>
          <div>
            <span wovn-ignore v-if="zipCode" class="mr-2">〒 {{ zipCode }}</span>
            <br class="hidden md:block" />
            <span wovn-ignore v-if="location">{{ location }}</span>
          </div>
        </div>
      </div>
      <!-- 電話番号 -->
      <div
        class="infor-item"
        v-if="dlvryTel"
      >
        <span>ご連絡先電話番号</span>
        <span wovn-ignore>{{ dlvryTel }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import { Core as YubinBangoCore } from 'yubinbango-core2';

export default {
  props: {
    shippingInfo: {
      type: Object,
      required: true
    },
    srvicDiv: {
      type: String,
      required: true
    },
    shippingInfoListForShop: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      name: null,
      location: null,
      locationForShop: [],
      zipCode1: null,
      zipCode2: null,
      zipCode: null,
      zipCodeForShop: [],
      prefecture: null,
      address1: null,
      address2: null,
      profileInfo: {}
    }
  },
  computed: {
    /**
     * 配送者名
     * @returns { string? }
     */
    dlvryAddrNm() {
      return this.shippingInfo.acptDlvry?.dlvryAddrNm
    },
    /**
     * ご連絡先電話番号
     * @returns { string? }
     */
    dlvryTel() {
      return this.shippingInfo.acptDlvry?.dlvryTel
    },
  },
  watch: {
    shippingInfo: {
      deep: true,
      immediate: true,
      handler() {
        console.log('Watch.Handler');
        this.getCustomerInfo()
      }
    },
    shippingInfoListForShop: {
      deep: true,
      immediate: true,
      handler() {
        this.getCustomerInfoForShop()
      }
    }
  },
  methods: {
     /**
     * 配送者名
     * @returns { string? }
     */
     dlvryAddrNmForShop(index) {
      return this.shippingInfoListForShop[index].familyNm + ' ' + this.shippingInfoListForShop[index].firstNm;
    },
    /**
     * ご連絡先電話番号
     * @returns { string? }
     */
    dlvryTelForShop(index) {
      return this.shippingInfoListForShop[index].dlvryTel
    },
    /**
     * 配送日
     * @returns { string? }
     */
    dlvryDatetime(index) {
      return this.shippingInfoListForShop[index].arnge.shipDatetime
    },
    /**
     * 運送会社名
     * @returns { string? }
     */
    orderTo(index) {
      return this.shippingInfoListForShop[index].arnge.dlvryCompanyNmDisp
    },
    /**
     * 配達お問い合わせ番号
     * @returns { string? }
     */
    dlvrySlipNo(index) {
      return this.shippingInfoListForShop[index].arnge.dlvrySlipNo
    },
    /**
     * 追跡URL
     * @returns { string? }
     */
    dlvryURL(index) {
      return this.shippingInfoListForShop[index].arnge.trackingUrl
    },
    getCustomerInfo() {
      const postCod = this.shippingInfo.acptDlvry.dlvryZipCd;
      if(postCod && postCod.indexOf('-') < 0) {
        console.log('PostHyphen1');
        this.zipCode1 = postCod.toString().substring(0, 3);
        this.zipCode2 = postCod.toString().substring(3, 7);
        this.zipCode = `${this.zipCode1}-${this.zipCode2}`;
        this.getPrefecture(this.zipCode);
      }
      if(postCod && postCod.indexOf('-') > 0) {
        console.log('PostHyphen2');
        this.zipCode = postCod;
        this.getPrefecture(this.zipCode);
      }
    },
    getPrefecture(zipcode){
      if (zipcode) {
        console.log('getPrefecture');
        zipcode = zipcode.replace('-', '');
        let inst = new YubinBangoCore
        this.prefecture =  inst.REGION[Number(this.shippingInfo.acptDlvry.dlvryPrefectureCd)];
        const address1 = this.shippingInfo.acptDlvry.dlvryAddr1;
        const address2 = this.shippingInfo.acptDlvry.dlvryAddr2;
        if (address2) {
          console.log('Address1');
          this.$set(this, "location", this.prefecture + address1 + address2);
        } else {
          console.log('Address2');
          this.$set(this, "location", this.prefecture + address1);
        }
      }
    },
    getCustomerInfoForShop() {
      const len = this.shippingInfoListForShop.length;
      this.locationForShop = []
      this.zipCodeForShop = []
      for (let i = 0; i < len; i++) {
        const postCod = this.shippingInfoListForShop[i].dlvryZipCd;
        if(postCod && postCod.indexOf('-') < 0) {
          console.log('PostHyphen1');
          this.zipCode1 = postCod.toString().substring(0, 3);
          this.zipCode2 = postCod.toString().substring(3, 7);
          this.zipCodeForShop[i] = `${this.zipCode1}-${this.zipCode2}`;
          this.getPrefectureForShop(this.zipCode, i);
        }
        if(postCod && postCod.indexOf('-') > 0) {
          console.log('PostHyphen2');
          this.zipCodeForShop[i] = postCod;
          this.getPrefectureForShop(this.zipCode, i);
        }
      }
    },
    getPrefectureForShop(zipcode, index){
      if (zipcode) {
        console.log('getPrefecture');
        zipcode = zipcode.replace('-', '');
        let inst = new YubinBangoCore
        this.prefecture =  inst.REGION[Number(this.shippingInfoListForShop[index].dlvryPrefectureCd)];
        const address1 = this.shippingInfoListForShop[index].dlvryAddr1;
        const address2 = this.shippingInfoListForShop[index].dlvryAddr2;
        if (address2) {
          console.log('Address1');
          this.locationForShop[index] = this.prefecture + address1 + address2;
        } else {
          console.log('Address2');
          this.locationForShop[index] = this.prefecture + address1;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-shipping-infomation {
  &.font-size-over-ride * {
    font-size: 15px;
    @include mq() {
      font-size: 13px;
    }
  }

  .infor-item {
    @apply flex flex-wrap mb-4 md:mb-3;

    > :first-child {
      @apply w-1/3 md:w-full;
      color: #73767A;
    }

    > :last-child {
      @apply w-2/3 md:w-full
    }
  }
}
</style>
