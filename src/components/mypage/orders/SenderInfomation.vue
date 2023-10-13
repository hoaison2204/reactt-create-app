<template>
  <div
    id="OrderApplicantInfor"
    class="order-shipping-infomation font-size-over-ride"
  >
    <h1 class="font-bold mb-5 md:mb-4">送り主情報</h1>
    <h2
      class="mb-5 md:mb-3"
      v-if="dlvryAddrNm"
      wovn-ignore
    >
      {{ dlvryAddrNm }} 様
    </h2>

    <div v-if="zipCode || location || dlvryTel" class="mb-8 md:mb-6">
      <!-- 住所 -->
      <div class="infor-item">
        <span>送り主</span>
        <div>
          <span wovn-ignore v-if="zipCode" class="mr-2">〒 {{ zipCode }}</span>
          <br class="md:block" />
          <span wovn-ignore v-if="location">{{ location }}</span>
        </div>
      </div>

      <!-- 電話番号 -->
      <div
        class="infor-item"
        v-if="dlvryTel"
      >
        <span>送り主電話番号</span>
        <span wovn-ignore>{{ dlvryTel }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Core as YubinBangoCore } from 'yubinbango-core2';

export default {
  props: {
    senderInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: null,
      location: null,
      zipCode1: null,
      zipCode2: null,
      zipCode: null,
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
      return this.senderInfo.prodSenderList.familyNm + ' ' + this.senderInfo.prodSenderList.firstNm
    },
    /**
     * ご連絡先電話番号
     * @returns { string? }
     */
    dlvryTel() {
      return this.senderInfo.prodSenderList.tel
    }
  },
  watch: {
    senderInfo: {
      deep: true,
      immediate: true,
      handler() {
        this.getCustomerInfo()
      }
    }
  },
  methods: {
    getCustomerInfo() {
      const postCod = this.senderInfo.prodSenderList.zipCd;
      if(postCod && postCod.indexOf('-') < 0) {
        this.zipCode1 = postCod.toString().substring(0, 3);
        this.zipCode2 = postCod.toString().substring(3, 7);
        this.zipCode = `${this.zipCode1}-${this.zipCode2}`;
        this.getPrefecture(this.zipCode);
      }
      if(postCod && postCod.indexOf('-') > 0) {
        this.zipCode = postCod;
        this.getPrefecture(this.zipCode);
      }
    },
    getPrefecture(zipcode){
      if (zipcode) {
        zipcode = zipcode.replace('-', '');
        let inst = new YubinBangoCore
        this.prefecture =  inst.REGION[Number(this.senderInfo.prodSenderList.prefectureCd)];
        const address1 = this.senderInfo.prodSenderList.addr1;
        const address2 = this.senderInfo.prodSenderList.addr2;
        if (address2) {
          this.$set(this, "location", this.prefecture + address1 + address2);
        } else {
          this.$set(this, "location", this.prefecture + address1);
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
