<template>
  <div class="c-menu-block c-card">
    <div class="c-card__inner3">
      <div class="c-menu-block__image">
        <Thumbnail
          :thumb_src="blockImage"
          :thumb_alt="item.alt"
          :thumb_ratio="0.75"
          @onClickImage="onGotoDetail"
        />
      </div>
      <div>
        <div class="c-category__title" v-if="getCategoryNm(item)">
          {{ getCategoryNm(item) }}
        </div>
        <div class="c-menu-block__menuInfo">
          <!-- <span class="c-label">{{ categoryName }}</span> -->
          <span v-if="type == 1" class="c-menu-block__menuInfo__menuNo">
            メニューNo. {{ item.menuNo }}
          </span>
        </div>
        <span v-if="type != 1" class="c-menu-block__menuInfo__menuNo">
          メニューNo. {{ item.menuNo }}
        </span>
        <div class="c-menu-block__par c-menu-block__name">
          <span @click="onGotoDetail">{{ item.menuNm || item.menuDetailResponse.menuNm }}</span>
        </div>
        <p class="c-menu-block__par c-menu-block__description">
          {{ item.planNm }}
        </p>
        <p
          v-if="option.expiration == 1 && !hideExpDate"
          class="c-menu-block__par c-menu-block__expirationDate"
        >
          <span class="c-menu-block__expirationDate__label">有効期限</span
          >{{ $moment(item.expireTo).format("L") }}
        </p>
      </div>
    </div>
    <!-- /.c-card__inner3 -->
  </div>
  <!-- /.c-card -->
</template>

<script>
import get from "lodash/get";
export default {
  props: {
    item: {
      type: Object,
    },
    opt: {
      type: Object,
    },
    type: {
      type: Number,
      default: 1,
    },
    hideExpDate: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    option() {
      if (this.opt) return this.opt;
      return {};
    },
    blockImage() {
      const defaultNoImage = "/cdn/images/noImage.png";
      const imageURL = get(this.item, 'imageURL', null);
      // Case: item favorite & visits
      const menuDetailImageUrl = get(this.item, 'menuDetailResponse.menuImages[0].imageUrl', null);
      // Case: item order
      const menuInfoImageUrl = get(this.item, 'menuInfo.menuImages[0].imageUrl', null)

      return imageURL || menuDetailImageUrl || menuInfoImageUrl || defaultNoImage;
    },
  },
  methods: {
    onGotoDetail() {
      this.$emit('onGotoDetail')
    },
    getCategoryNm(item) {
      const menuDetailCategory = get(item, 'menuDetailResponse.categoryInfomation', null)
      const menuInfoCategory = get(item, 'menuInfo.categoryInfomation', null)
      const categoryInformation = menuDetailCategory || menuInfoCategory
      if(!categoryInformation) return false;
      const catLrgClassNm = get(categoryInformation, 'catLrgClassNm', '')
      const catMidClassNm = get(categoryInformation, 'catMidClassNm', '')
      const catSmlClassNm = get(categoryInformation, 'catSmlClassNm', '')
      return [catLrgClassNm, catMidClassNm, catSmlClassNm].filter(item=>item).join("・");
    },
  },
};
</script>

<style lang="scss" scoped>
.c-category__title {
  display: inline-block;
  background-color: #edeef0;
  color: #da291c;
  padding: 0.1rem 0.5rem;
  font-size: 10px;
}
</style>
