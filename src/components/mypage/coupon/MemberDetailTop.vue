<template>
  <div class="p-mypage-coupon-detail">
    <div v-if="item" class="p-mypage-coupon-detail__inner sm:mb-3">
      <div class="flex mb-4 sm:mb-3">
        <div class="couponDetail_img">
          <img :src="item.imageURL" :title="item.menuNm" />
        </div>
        <div class="p-mypage-coupon-detail__content">
          <div class="p-mypage-listBlock__content">
            <div class="p-mypage-listBlock__content__header">
              <span class="p-mypage-listBlock__content__header--menuNo">[メニューNo.{{ item.menuNo }}]</span>
            </div>
            <p>
              {{ item.menuNm }}
            </p>
            <span 
              class="p-mypage-listBlock__content__header--planNm"
              :class="item.srvicDiv == CONST.SRVIC_DIV.GOURMET && (item.usageDiv == CONST.USAGE_DIV.MEMBERSHIP_COUPON || item.usageDiv == CONST.USAGE_DIV.DIGITAL_TICKET) ? 'sm:hidden' : ''"
            >
              {{ item.planNm }}
            </span>
          </div>
        </div>
        <!-- グルメの時に右上に表示するLOGO -->
        <div
          v-if="item.srvicDiv == CONST.SRVIC_DIV.GOURMET && (item.usageDiv == CONST.USAGE_DIV.MEMBERSHIP_COUPON || item.usageDiv == CONST.USAGE_DIV.DIGITAL_TICKET)"
          class="p-mypage-coupon-detail__logo-gourmet"
        >
          <img src="/cdn/images/logo_tabetime.png" alt="TABE TIME" />
        </div>
      </div>
      <span
        class="p-mypage-listBlock__content__header--planNm hidden mb-3 sm:inline"
        :class="item.srvicDiv == CONST.SRVIC_DIV.GOURMET && (item.usageDiv == CONST.USAGE_DIV.MEMBERSHIP_COUPON || item.usageDiv == CONST.USAGE_DIV.DIGITAL_TICKET) ? 'sm:block' : 'sm:hidden'"
      >
            {{ item.planNm }}
      </span>
    </div>
    <div>
      <h2 class="p-mypage-listBlock__content__description">
        {{ item.planNm }}
      </h2>
      <div class="p-mypage-listBlock__content__footer">
        <span> 有効期限 : {{ getExpireTo(item.expireTo) }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    item: {
      type: Object
    },
    opt: {
      type: Object
    }
  },
  computed: {
    option() {
      if (this.opt) return this.opt;
      return {};
    }
  },
  async created() {},
  methods: {
    getExpireTo(time) {
      const expireTo = moment(time).format("YYYY/MM/DD");
      return moment(expireTo, "YYYY/MM/DD").year() === 2999
        ? `${moment().add(1, "y").year()}/03/31`
        : expireTo;
    },
  }
};
</script>

<style lang="scss" scoped>
.p-mypage-coupon-detail {
  @include mq() {
    font-size: 13px;
  }

  &__inner {
    display: block;
  }

  &__thumbnail {
    width: 100px;
    height: 100px;

    @include mq() {
      width: 70px;
      height: 70px;
    }
  }
}

.p-mypage-listBlock__content {
  > p {
    font-size: 15px;
    font-weight: bold;
    color: #1F2021;

    @include mq() {
      font-size: 13px;
    }
  }

  &__header {
    &--menuNo {
      font-size: 12px;
      color: #73767A;

      @include mq() {
        font-size: 10px;
      }
    }

    &--planNm {
      font-size: 12px;

      @include mq() {
        font-size: 10px;
      }
    }
  }

  &__footer {
    justify-content: right;
    > span {
      color: #DD0000;
    }
  }

  &__description:not(:last-child) {
    @include mq() {
      margin-bottom: 8px;
      font-size: 16px;
    }
  }
}

.p-mypage-coupon-detail__logo-gourmet {
  img {
    width: 40px;
    height: 38px;
    
    @include mq() {
      object-fit: cover;
      overflow: visible;
      height: 45px;
    }
  }
}

.couponDetail {
  &_img {
    width: 100px;
    height: 100px;
    > img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}

@media only screen and (max-width: 640px) {
  .couponDetail {
    &_img {
      width: 70px;
      height: 70px;
      min-width: 70px;
      min-height: 70px;
    }
  }
}
</style>
