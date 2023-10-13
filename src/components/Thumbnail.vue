<template>
  <div
    class="c-thumbnail"
    :class="addedClass"
    v-model="reloadSrc"
  >
    <!-- :style="{ paddingTop: caliculateThumbRatio() + '%' }" -->
    <Loading v-show="isLoading" />
    <img :class="thumbnailStyle" :src="img_src" :alt="!isLoading?thumb_alt:''" @click="onClickImage" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      thumbnailStyle: "",
      isLoading: true,
      img_src: "",
      error_img_src: "/cdn/images/noImage.png",
      errorThumbnail: ""
    };
  },
  props: {
    addedClass: {
      type: String,
      default: "",
    },
    thumb_src: {
      type: String,
      default: "",
    },
    thumb_alt: {
      type: String,
      default: "読み込みに失敗しました",
    },
    thumb_ratio: {
      type: Number,
      default: 0.75,
    },
    object_fit: {
      type: String,
      default: ""
    }
  },
  computed: {
    reloadSrc: function (){
      return this.img_src = this.$props.thumb_src;
    },
  },
  methods: {
    onClickImage() {
      this.$emit('onClickImage');
    }
    // caliculateThumbRatio () {
    //   return Number(this.thumb_ratio) * 100;
    // },
  },
  async mounted() {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
      });
    };

    try {
      // 画像読み込み時エラー用代替イメージ
      this.errorThumbnail = await loadImage(this.error_img_src);
      // 表示したいイメージURL
      const res = await loadImage(this.thumb_src);
      this.isLoading = false; // 読み込み中の表示を消す
      this.img_src = this.thumb_src;

      if (res.naturalWidth < res.naturalHeight) {
        this.thumbnailStyle = "c-thumbnail__image-vertical";
      } else {
        this.thumbnailStyle = "c-thumbnail__image-horizontal";
      }
      // 画像を正方形にトリミングする場合
      if(this.object_fit) this.thumbnailStyle += ' '+this.thumbnailStyle+this.object_fit;
    } catch (e) {
      // 画像の読み込みに失敗した場合の処理
      this.isLoading = false; // 読み込み中の表示を消す
      this.img_src = this.errorThumbnail.src;

      if (this.errorThumbnail.naturalWidth < this.errorThumbnail.naturalHeight) {
        this.thumbnailStyle = "c-thumbnail__image-vertical";
      } else {
        this.thumbnailStyle = "c-thumbnail__image-horizontal";
      }
      // 画像を正方形にトリミングする場合
      if(this.object_fit) this.thumbnailStyle += ' '+this.thumbnailStyle+this.object_fit;
    }
  },
};
</script>

<style lang="scss" scoped></style>
