<template>
  <section>
    <div class="p-mypage-coupon-old">
      <div class="p-mypage-coupon-old__textLink">
        <a :to="domainMypage + '/mypage/coupon'" class="c-text-button c-text-button--left">
          <Icon name="arrow_left" :color="$colors.brand.red"/>
          マイクーポンに戻る
        </a>
      </div>
      <div class="p-mypage-favoites__header c-card c-card__inner4">
        <div class="p-mypage-coupon-old__header__buttons">
          <div class="p-mypage-coupon-old__header__edit">
            <button class="c-button__tertiary" @click="couponOldEdit">リスト編集</button>
          </div>
          <ul class="p-mypage-coupon-old__header__filter">
            <li>
              <button class="c-button__tertiary c-button__tertiary--left"><Icon name="action_sort" />登録日の新しい順</button>
            </li>
            <li>
              <button class="c-button__tertiary c-button__tertiary--left"><Icon name="action_filter" />カテゴリで絞り込む</button>
            </li>
          </ul>
        </div>
        <div class="p-mypage-coupon-old__pager">
          <Paginator
              class="sm:w-full flex justify-center"
              :total="totalResults"
              :size="10"
              @pageChange="pageChange"
          />
        </div>
        <div class="p-mypage-coupon-old__editModeNav" v-if="couponOldEditMode">
          <div class="p-mypage-coupon-old__editModeNav__inner">
            <div class="p-mypage-coupon-old__selectAll">
              <div class="c-checkbox">
                <label class="c-checkbox__inner">
                  <input type="checkbox">
                  <span class="c-checkbox__box" />
                  <span class="c-checkbox__label">全て選択</span>
                </label>
              </div>
            </div>
            <ul class="p-mypage-coupon-old__editButtons">
              <li>
                <button class="c-button__tertiary">まとめて削除</button>
              </li>
              <li>
                <button class="c-button__tertiary" @click="couponOldEdit">完了</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="p-mypage-coupon-old__menus">
        <ul class="p-mypage-coupon-old__menus__item">
          <li class="c-card c-card__inner4">
            <div class="menus__item__list">
              <div class="menus__item__listCheck c-checkbox" v-if="couponOldEditMode">
                <label class="c-checkbox__inner">
                  <input type="checkbox">
                  <span class="c-checkbox__box" />
                </label>
              </div>
              <div class="menus__item__image">
                <img src="@/assets/images/mypage/noImage.png" alt="" class="thumbnail" />
              </div>
              <div class="menus__item__content">
                <div class="top">
                  <div class="label">カテゴリ名</div>
                  <div class="item-number">メニューNo. 123456</div>
                </div>
                <div class="title">
                  メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名
                </div>
                <div class="address">
                  <Icon name="status_map" />東京都23区 > 品川・浜松町・お台場
                </div>
                <div class="delete">
                  <Icon name="action_delete"/><span>削除</span>
                </div>
              </div>
            </div>
            <div class="menus-item__SP">
              <div class="title">
                メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名
              </div>
              <div class="delete">
                <Icon name="action_delete"/><span>削除</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="p-mypage-coupon-old__footer">
        <div class="c-card c-card__inner4">
          <Paginator
              class="sm:w-full flex justify-center"
              :total="totalResults"
              :size="10"
              @pageChange="pageChange"
          />
        </div>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  props: ["mypageDisplayCode"],
  data() {
    return {
      couponOldEditMode: false,
      totalResults: 50,
    }
  },
  created() {
  },
  computed: {
    domainMypage() {
      return this.getMypageDomain(this.mypageDisplayCode);
    },
  },
  methods: {
    couponOldEdit() {
      this.couponOldEditMode = !this.couponOldEditMode;
    },
    pageChange(page) {
      this.$emit("pageChange", page);
    },
    setBreadcrumb() {
      this.$page.setBreadcrumb(
          this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(
          this.$page.formatBreadcrumb("マイクーポン", "/mypage/coupon")
      );
      this.$page.setBreadcrumb(
          this.$page.formatBreadcrumb("過去のクーポン")
      );
    },
  },
  async mounted(){
    this.$page.showSideMenu = true;
    this.setBreadcrumb();
    this.$meta.setDocumentTitle("過去のクーポン");
  },
  watch: {
    $route() {
      this.setBreadcrumb();
      this.$meta.setDocumentTitle("過去のクーポン");
    }
  }
}
</script>

<style scoped>

</style>