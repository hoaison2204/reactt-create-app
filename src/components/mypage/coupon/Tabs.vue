<template>
  <div class="w-full">
    <ul class="nav-tabs">
      <li class="tab-item" :class="{active: pageName === 'MyPageCoupons'}" @click="goto('/mypage/coupon')">
        <span class="tab-text text-pc-base text-sp-base inline sm:hidden">デジタルチケット／デジタルクーポン</span>
        <span class="tab-text text-pc-base text-sp-base hidden sm:inline">デジタルチケット /<br> デジタルクーポン</span>
      </li>
      <!-- 「会員証クーポン」非対応ICサイトからマイページに遷移した場合は、非表示 -->
      <!-- FIXME: タブのコメントアウトをもとに戻す -->
      <li class="tab-item" :class="{active: pageName === 'MyPageCouponsMember'}" @click="goto('/mypage/coupon/member')" v-if="!isIcService(mypageDisplayCode)">
        <span class="tab-text text-pc-base text-sp-base">会員証クーポン</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    mypageDisplayCode:{
      type: String
    }
  },
  computed: {
    domainMypage() {
      return this.getMypageDomain(this.mypageDisplayCode);
    },
    pageName() {
      return this.$route.name || "";
    },
  },
  methods: {
    goto(path) {
      if(path === this.$route.path) return
      const query = {
        sort: 'getCouponDatetime'
      }
      this.$router.push({
        path,
        query
      })
    }
  }
};
</script>
<style scoped lang="scss">
@media only screen and (min-width: 640px) {
  .text-pc-base {
    font-size: 15px;
  }
}
@media only screen and (max-width: 640px) {
  .text-sp-base {
    font-size: 13px;
  }
}

.nav-tabs {
  display: flex;
  gap: 6px;
  border-bottom: 4px solid #E60021;
  .tab-item {
    background: #E7E7E7;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 13px 5px;
    transition: all 0.4s ease;
    cursor: pointer;
    text-align: center;
    font-size: 13px;
    font-weight: bold;
    color: #73767A;
    border-radius: 8px 8px 0 0;
    align-items: center;
    .tab-icon {
      margin-right: 4px;
      ::v-deep .c-icon, ::v-deep .c-icon g {
        width: 18px;
        height: 18px;
        fill: #73767A;
      }
      &.right-icon {
        margin-right: 0;
        margin-left: 4px;
        ::v-deep .c-icon, ::v-deep .c-icon g, ::v-deep .c-icon g path {
          width: 14px;
          height: 14px;
          fill: #73767A;
        }
      }
    }
    &:hover, &.active {
      background: #E60021;
      > .tab-icon {
          ::v-deep .c-icon, ::v-deep .c-icon g, ::v-deep .c-icon g path {
            fill: #fff !important;
          }
      }
      .tab-text {
          color: #fff !important;
      }
    }
  }
}
@media only screen and (max-width: 640px) {
  .nav-tabs {
      gap: 4px;
      .tab-item {
          padding: 7px 6px;
          font-size: 16px;
          .tab-icon {
              margin-right: 8px;
              ::v-deep .c-icon, ::v-deep .c-icon g {
                width: 25px;
                height: 25px;
              }
          }
      }
  }    
}
</style>
