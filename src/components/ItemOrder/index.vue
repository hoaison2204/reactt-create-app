<template>
  <div class="flex gap-5 md:gap-3">
    <div class="float-left">
      <div class="item-order-img-item item-order-show-img-1" v-if="!imageUrl" />
      <div
        class="item-order-img-item item-order-show-img"
        :style="{ 'background-image': `url(${imageUrl})` }"
        v-if="imageUrl"
      />
    </div>

    <div class="item-order-hotel-data">
      <div class="flex flex-wrap gap-2 md:gap-1 md:w-11/12">
        <div
          class="joined-cat-nm"
          style="background-color: #FFF8E5;"
          v-if="joinedCatNm"
        >
          {{ joinedCatNm }}
        </div>
        <div class="item-order-menu-id" :class="{ 'menu-id-wrap': isGCService(mypageDisplayCode) }" v-if="menuNo">[メニューNo.{{ menuNo }}]</div>
      </div>

      <div
        class="item-order-main-top-right"
      >
        <div class="item-order-label" :class="{ 'reserve-sp': isGCService(mypageDisplayCode) }" v-if="reserveSts">
          手配状況：{{ reserveSts }}
        </div>
        <div class="item-order-label" v-if="orderSts">
          {{ orderSts }}
        </div>
      </div>

      <slot name="item-order-hotel-data-bottom" />
    </div>
  </div>
</template>

<script>
export default {
  name: "item-order",

  props: {
    imageUrl: String,
    menuNo: String,
    /** 利用状況 */
    orderSts: String,
    /** 手配状況 */
    reserveSts: String,

    /**
     * 大カテゴリ、中カテゴリ、小カテゴリ
     * @type {import("vue").PropType<{
     *  catLrgClassNm: string?;
     *  catMidClassNm: string?;
     *  catSmlClassNm: string?;
     * }>} */
    categoryInfomation: Object
  },

  computed: {
    /**
     * 大カテゴリ、中カテゴリ、小カテゴリを"・"で連結した文字列を返す。
     * @returns { string? }
     * */
    joinedCatNm() {
      console.log("ItemOrder > joinedCatNm: ", this.categoryInfomation);
      if (this.categoryInfomation == null) return;

      const {
        catLrgClassNm,
        catMidClassNm,
        catSmlClassNm
      } = this.categoryInfomation;

      return [catLrgClassNm, catMidClassNm, catSmlClassNm]
        .filter((v) => v)
        .join("・");
    },
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
  }
};
</script>

<style lang="scss">
// グローバルに読み込まれるcssなので触るとスタイルが崩れる
@import "./style.scss";
</style>

<style scoped lang="scss">
.item-order-img-item {
  width: 120px;
  height: 120px;
  @include mq() {
    width: 70px;
    height: 70px;
  }
}

.item-order-hotel-data {
  @media only screen and (max-width: 768px){
    @apply grid;
  }
  .item-order-menu-id {
    font-size: 12px;
    font-weight: 400;
    color: #73767A;
    line-height: 2;
    @include mq() {
      font-size: 10px;
    }
  }
}
.menu-id-wrap {
  white-space: nowrap;
}
.reserve-sp {
  height: 1.5rem;
}

.item-order-show-img {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  // background-image: url('~@/assets/images/footer/img-1.png');
}

.item-order-show-img-1 {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('~@/assets/images/slide-img-placeholder.png') !important;
}

.item-order-label {
  @apply p-1 text-xs rounded;
  background-color: #E7E7E7;

  @include mq() {
    font-size: 10px;
  }
}

.item-order-main-top-right {
  @apply flex mt-4 md:mt-1;

  .item-order-label:not(:last-of-type) {
    @apply mr-2;
  }
}

.joined-cat-nm {
  @apply item-order-label overflow-hidden overflow-ellipsis whitespace-nowrap;
  max-width: 11rem;
  @include mq() {
    max-width: 9rem;
  }
}
</style>
