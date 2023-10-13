<template>
  <div
    id="OrderApplicantInfor"
    class="order-applicant-infor font-size-over-ride"
  >
    <h1 class="font-bold mb-5 md:mb-4">申込者情報</h1>
    <h2 class="mb-5 md:mb-3" wovn-ignore>{{ name }} 様</h2>

    <div class="mb-8 md:mb-6">
      <!-- 住所 -->
      <div class="infor-item">
        <span>住所</span>
        <div>
          <span wovn-ignore class="mr-2 md:mr-0">〒{{ zipCode }}</span>
          <br class="md:block" />
          <span wovn-ignore>{{ location }}</span>
        </div>
      </div>

      <!-- 会社名 -->
      <div class="infor-item">
        <span>会社名</span>
        <span wovn-ignore>{{ companyName || 'なし' }}</span>
      </div>

      <!-- ご連絡先メールアドレス -->
      <div class="infor-item">
        <span>ご連絡先メールアドレス</span>
        <span wovn-ignore>{{ emailAddress || 'なし' }}</span>
      </div>

      <!-- ご連絡先電話番号 -->
      <div class="infor-item">
        <span>ご連絡先電話番号</span>
        <span wovn-ignore> {{ phoneNumber1 || 'なし' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { Core as YubinBangoCore } from 'yubinbango-core2';

export default {
  props: ["customerInfo", "mypageDisplayCode"],
  data() {
    return {
      name: null,
      location: null,
      zipCode1: null,
      zipCode2: null,
      zipCode: null,
      prefecture: null,
      companyName: null,
      emailAddress: null,
      phoneNumber1: null,
      firstName: null,
      familyName: null,
      address1: null,
      address2: null,
      profileInfo: {},
      departmentName: null,
      inforContact: [
        {
          contact: 'ご連絡先メールアドレス',
          infor: 'abc@abc.com'
        },
        {
          contact: 'ご連絡先電話番号1',
          infor: '自宅：03-0000-0000'
        },
        {
          contact: 'ご連絡先電話番号2',
          infor: '携帯電話：080-0000-0000'
        }
      ]
    }
  },
  mounted() {
    this.getProfileInfo()
  },
  computed: {
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    }
  },
  watch: {
    customerInfo: {
      deep: true,
      handler(val) {
        this.getCustomerInfo(val)
      }
    }
  },
  methods: {
    getCustomerInfo(customerInfo) {
      this.name = `${_.get(customerInfo, 'familyName', '')  } ${  _.get(customerInfo, 'firstName', '')}`
      const postCod = _.get(customerInfo, 'postalCode', null)
      if(postCod && postCod.indexOf('-') < 0) {
        this.zipCode1 = postCod.toString().substring(0, 3)
        this.zipCode2 = postCod.toString().substring(3, 7)
        this.zipCode = `${this.zipCode1  }-${this.zipCode2}`
        this.getPrefecture(this.zipCode)
      }
      if(postCod && postCod.indexOf('-') > 0) {
        this.zipCode = postCod
        this.getPrefecture(this.zipCode)
      }
      this.emailAddress = _.get(customerInfo, 'emailAddress', null)
      this.phoneNumber1 = _.get(customerInfo, 'tel', null)
      this.companyName = _.get(customerInfo, 'companyName', null)
    },
    getPrefecture(zipcode){
      if (zipcode) {
        zipcode = zipcode.replace('-', '')
        let inst = new YubinBangoCore
        this.prefecture =  inst.REGION[Number(_.get(this.customerInfo, 'prefectureCode', 0))];
        const address1 = _.get(this.customerInfo, 'address1', '') || ''
        const address2 = _.get(this.customerInfo, 'address2', '') || ''
        this.location = this.prefecture + address1 + address2
      }
    },
    getProfileInfo() {
      this.$repositories('orders').getProfileInfo().then(
        (data) => {
          if(data) {
            this.companyName = _.get(data, 'companyName', '')
          }
        },
        (err) => {

        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.order-applicant-infor {
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
