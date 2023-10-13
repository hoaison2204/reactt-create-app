<template>
  <div
    class="p-menu-slider"
    :class="{
      'p-menu-slider--one': photoList.length == 1
    }"
  >
    <div v-if="option.counter" class="p-menu-slider__counter">
      {{ currentIdx }} / {{ photoList.length }}
    </div>
    <MenusSliderCarousel
      ref="sliderCarousel"
      :thumbnail="getThumbnailList(photoList, 'imageUrl')"
      :opt="sliderOptions"
    >
      <swiper-slide v-for="(item, i) in photoList" :key="i">
        <div class="p-menu-slider__inner">
          <img :src="item.imageUrl" />
        </div>
        <p v-if="isDescription" class="p-menus-no-photo__modal__description">
          {{ item.imageExplanation }}
        </p>
      </swiper-slide>
    </MenusSliderCarousel>
  </div>
</template>

<script>
export default {
  props: {
    photoList: {
      type: Array,
      default: () => []
    },
    opt: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currentIdx: 1,
      sliderOptions: {
        paginationClickable: true,
        loop: false,
        slidesPerView: 1,
        centeredSlides: false,
        slideToClickedSlide: true,
        spaceBetween: 10,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        on: {
          slideChangeTransitionEnd: () => {
            this.currentIdx =
              this.swiper.activeIndex == 0 ? 1 : this.swiper.activeIndex + 1;
          }
        }
      }
    };
  },
  computed: {
    option() {
      if (!this.opt) return {};
      return this.opt;
    },
    isThumbnail() {
      if (!this.option || !this.option.thumbnail) return null;
      return this.option.thumbnail;
    },
    isDescription() {
      if (!this.option || !this.option.description) return null;
      return this.option.description;
    },
    swiper() {
      if (!this.$refs["sliderCarousel"] || !this.$refs["sliderCarousel"].swiper)
        return {};
      return this.$refs["sliderCarousel"].swiper;
    },
    activeIndex() {
      if (!this.swiper) return 0;
      return this.swiper.activeIndex;
    }
  },
  methods: {
    getPhotoList(list) {
      return list.length > 0 ? list : [];
    },
    getThumbnailList(list, type) {
      if (!this.isThumbnail) return [];
      return list.map((x, index) => ({
        id: index,
        src: x[type]
      }));
    },
    slideTo(idx) {
      this.$refs["sliderCarousel"].slideTo(idx);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
