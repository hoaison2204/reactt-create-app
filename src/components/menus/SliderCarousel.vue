<template>
  <div class="c-menu-slider-carousel">
    <div class="c-menu-slider-carousel__wrap">
      <swiper ref="sliderCarousel" :options="swiperOption">
        <slot />
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div @click="prevThumbnail" class="swiper-button-prev" slot="button-prev">
        <Icon name="arrow_left" width="33px" height="48px" color="#FFF" />
      </div>
      <div @click="nextThumbnail" class="swiper-button-next" slot="button-next">
        <Icon name="arrow_right" width="33px" height="48px" color="#FFF" />
      </div>
    </div>
    <!-- thumbnail list -->
    <ul class="c-menu-slider-carousel__thumbnailList">
      <li
        v-for="(src, i) in thumbnail"
        :key="i"
        @click="slideTo(src.id)"
        class="c-menu-slider-carousel__thumbnail"
      >
        <img :src="src.src" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    opt: {
      type: Object,
      default: () => ({})
    },
    thumbnail: {
      type: Array,
      default: () => []
    },
    thumOpt: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      option: {
        initialSlide: 0,
        loop: false,
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
          type: "custom",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
      // thumbsOption: {
      //   loop: false,
      //   slidesPerView: 4,
      //   spaceBetween: 16,
      //   centeredSlides: false,
      //   touchRatio: 0.2,
      //   slideToClickedSlide: true,
      // },
    };
  },
  computed: {
    swiper() {
      return this.$refs.sliderCarousel.$swiper;
    },
    swiperOption() {
      if (!this.opt) return this.option;
      return { ...this.option, ...this.opt };
    }
  },
  methods: {
    slideTo(idx) {
      this.swiper.slideTo(idx);
    },
    prevThumbnail() {
      this.pickUpThumbnails = this.getThumbnailList();
    },
    nextThumbnail() {
      this.pickUpThumbnails = this.getThumbnailList();
    }
  }
};
</script>

<style lang="scss" scoped></style>
