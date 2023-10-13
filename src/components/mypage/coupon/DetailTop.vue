<template>
  <div>
    <div v-if="item" class="mb-4 sm:mb-3">
      <div class="flex gap-3">
        <!-- プラン画像 -->
        <div class="thumbnail sm:w-16 sm:h-16">
          <img
            class="block object-fit w-full h-full"
            :src="item.imageURL"
            :alt="item.menuNm"
          />
        </div>

        <!-- メニューNo・メニュー名・プラン名 -->
        <div class="w-full">
          <!-- メニューNo -->
          <div class="mb-4 sm:mb-1">
            <div class="label inline-block sm:mb-1" v-if="getCatNm(item)">
              {{ getCatNm(item) }}
            </div>

            <span class="text-pc-sm text-sp-sm sm:block">
              [メニューNo.{{ item.menuNo }}]
            </span>
          </div>

          <!-- メニュー名 -->
          <div class="text-pc-base text-sp-base font-bold">
            {{ item.menuNm }}
          </div>

          <!-- プラン名 -->
          <div class="text-pc-sm text-sp-sm text-gray">
            {{ item.planNm }}
          </div>
        </div>

        <!-- グルメの時に右上に表示するLOGO -->
        <div
          v-if="
            item.srvicDiv == CONST.SRVIC_DIV.GOURMET
          "
          class="p-mypage-coupon-detail__logo-gourmet"
        >
          <img src="/cdn/images/logo_tabetime.png" alt="TABE TIME" />
        </div>

      </div>
    </div>

    <div>
      <h2
        class="p-mypage-listBlock__content__description text-epip p-mypage-listBlock--pc text-xl mt-0"
      >
        {{ item.planNm }}
      </h2>
      <div class="p-mypage-listBlock__content__footer p-mypage-listBlock--pc ">
        <span> 受付番号 : {{ item.acptNo }} </span>
      </div>
    </div>
    <div class="p-mypage-listBlock--sp">
      <h2 class="p-mypage-listBlock__content__description">
        {{ item.planNm }}
      </h2>
      <!-- /.p-mypage-listBlock__content__description -->

      <div class="p-mypage-listBlock__content__footer">
        <span> 受付番号 : {{ item.acptNo }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
  computed: {},
  async created() {},
  methods: {
    getCatNm(item) {
      const catLrgclassNm = _.get(
        item,
        'basicInformationCategory.catLrgClassNm',
        ''
      );
      const catMidClassNm = _.get(
        item,
        'basicInformationCategory.catMidClassNm',
        ''
      );
      const catSmlClassNm = _.get(
        item,
        'basicInformationCategory.catSmlClassNm',
        ''
      );
      return [catLrgclassNm, catMidClassNm, catSmlClassNm]
        .filter((item) => item)
        .join('・');
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  background-color: #fff8e5;
}
.thumbnail {
  width: 120px;
  height: 120px;
  min-width: 120px;
  min-height: 120px;
}

.text-gray {
  color: #73767a;
}

@media only screen and (min-width: 640px) {
  .text-pc-base {
    font-size: 15px;
  }
  .text-pc-sm {
    font-size: 12px;
  }
}
@media only screen and (max-width: 640px) {
  .text-sp-base {
    font-size: 13px;
  }

  .text-sp-sm {
    font-size: 10px;
  }

  .thumbnail {
    width: 70px;
    height: 70px;
    min-width: 70px;
    min-height: 70px;
  }
}
</style>
