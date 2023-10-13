<template>
    <div class="c-paginator" :class="[{ 'c-paginator--center__footerDesign': footerDesign }, isPositionCenter ? 'items-start' : '']">
      <p v-if="total" class="c-paginator__label" :class="{'c-paginator__label--center': isPositionCenter}">
        <span class="c-paginator__label--total" :class="{'c-paginator__label--total--font': !isWhereFontBold }"
          ><span class="c-paginator__label--num" :class="{'c-paginator__label--total--font': isWhereFontBold }" :style="windowWidth > 768 ? `font-size: ${totalFontSizePC}px` : `font-size: ${totalFontSizeSP}px`">{{ total }}</span
          >件中</span
        >
        {{ getItemCountFrom }}～{{ getItemCountTo }}件表示
      </p>
      <p v-else class="c-paginator__label">
        <span class="c-paginator__label--total"
          ><span class="c-paginator__label--num" :style="windowWidth > 768 ? `font-size: ${totalFontSizePC}px` : `font-size: ${totalFontSizeSP}px`">0</span>件中</span
        >
        0件表示
      </p>
  
      <div v-if="this.total > 10 && paginatorAvailable" class="c-paginator__wrap" :class="{ 'c-paginator__wrap__footerDesign': footerDesign }">
        <a
          class="c-paginator__button c-paginator__button--left"
          :class="{ 'is-disable': currentPage == 1 }"
          @click="pageChange(1, currentPage == 1)"
          tabindex="0"
          @keydown.enter="pageChange(1, currentPage == 1)"
          ><Icon name="arrow_first_page"
        /></a>
        <a
          class="c-paginator__button c-paginator__button--left"
          :class="{ 'is-disable': currentPage == 1 }"
          tabindex="0"
          @keydown.enter="pageChange(currentPage - 1, currentPage == 1)"
          @click="pageChange(currentPage - 1, currentPage == 1)"
          ><Icon name="arrow_left"
        /></a>
  
        <div class="c-paginator__inner">
          <!-- PCレイアウト時 -->
          <ul class="c-paginator__list c-paginator__list--PC">
            <li
              v-for="page in pageRange(false)"
              :key="page"
              class="c-paginator__item"
              :style="('font-size:' + paginatorFontSize + 'px')"
              :class="isCurrent(page) ? 'is-current' : ''"
              @click="pageChange(page)"
              tabindex="0"
              @keydown.enter="pageChange(page)"
            >
              {{ page }}
            </li>
          </ul>
          <!-- SPレイアウト時 -->
          <ul class="c-paginator__list c-paginator__list--SP">
            <li
              v-for="page in pageRange(false)"
              :key="page"
              class="c-paginator__item"
              :class="isCurrent(page) ? 'is-current' : ''"
              @click="pageChange(page)"
            >
              {{ page }}
            </li>
          </ul>
        </div>
        <a
          class="c-paginator__button c-paginator__button--right"
          :class="{ 'is-disable': currentPage == lastPage }"
          @click="pageChange(currentPage + 1, currentPage == lastPage)"
          tabindex="0"
          @keydown.enter="pageChange(currentPage + 1, currentPage == lastPage)"
          ><Icon name="arrow_right"
        /></a>
        <a
          class="c-paginator__button c-paginator__button--right"
          :class="{ 'is-disable': currentPage == lastPage }"
          @click="pageChange(lastPage, currentPage == lastPage)"
          tabindex="0"
          @keydown.enter="pageChange(lastPage, currentPage == lastPage)"
          ><Icon name="arrow_last_page"
        /></a>
      </div>
      <!-- /.c-paginator__wrap -->
  
      <div v-if="isSort" class="c-paginator__sort top-1">
        <Icon
          v-if="selectWithIcon"
          class="c-paginator__sort__icon"
          name="action_sort"
          width="20px"
          height="20px"
        />

        <FormsSelect :value="selected" :sortList="sortList" :isDropDown="isDropDown" @change="$emit('changeSort')">
          <!-- ドロップダウン表示 -->
          <template v-if="isDropDown" v-slot:dropdown>
            <div v-for="(item, i) in sortList" :key="i" class="dropdownItem" @click="changeSort(item)">
              {{ item.label }}
            </div>
          </template>
          <!-- セレクトボックス表示 -->
          <template v-else v-slot:select>
            <option v-for="(item, i) in sortList" :key="i" :value="item.value">
              {{ item.label }}
            </option>
          </template>
        </FormsSelect>

      </div>
      <!-- /.c-paginator__sort -->
    </div>
    <!-- /.c-paginator -->
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      required: false
    },
    total: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: false
    },
    isSort: {
      type: Boolean,
      default: false
    },
    sortList: {
      type: Array,
      default: () => []
    },
    paginatorAvailable: {
      type: Boolean,
      default: true
    },
    // ページネーションのページ数のフォントサイズ
    paginatorFontSize: {
      type: Number,
      default: 14
    },
    // トータル件数のフォントサイズ（PC）
    totalFontSizePC: {
      type: Number,
      default: 15
    },
    // トータル件数のフォントサイズ（SP）
    totalFontSizeSP: {
      type: Number,
      default: 13
    },
    // ページネーションを中央寄せにするかの判定フラグ
    positionCenter: {
      type: Boolean,
      default: false
    },
    // trueにするとトータル件数のフォントのみbold
    isWhereFontBold: {
      type: Boolean,
      default: false
    },
    // trueにするとページ下のページネーションデザインに変更
    footerDesign: {
      type: Boolean,
      default: true
    },
    // PC画面時、表示されるページ数の上限値
    pageIndexRangePC: {
      type: Number,
      default: 3
    },
    // SP画面時、表示されるページ数上限値
    pageIndexRangeSP: {
      type: Number,
      default: 3
    },
    // セレクトボタン表示時にアイコンを表示するか
    selectWithIcon: {
      type: Boolean,
      default: false
    },
    isDropDown: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    range: 0,
    selected: null,
    windowWidth: window.innerWidth
  }),
  computed: {
    getItemCountFrom() {
      return (this.currentPage - 1) * this.pageSize + 1;
    },
    getItemCountTo() {
      return this.total > this.currentPage * this.pageSize
        ? this.currentPage * this.pageSize
        : this.total;
    },
    pageSize() {
      return this.size || this.$config.pageSize;
    },
    pagination() {
      return [...Array(Math.ceil(this.total / this.pageSize)).keys()].map(
        (n) => n + 1
      );
    },
    currentPage() {
      if (!this.$route.query || !this.$route.query.page) return 1;
      return parseInt(this.$route.query.page);
    },
    lastPage() {
      return this.pagination[this.pagination.length - 1];
    },
    pageRange() {
      let self = this;
      return function(isSmartPhone) {
        let start = "";
        let end = "";

        if (self.windowWidth > 768) {
          self.range = self.pageIndexRangePC - 1
        } else {
          self.range = self.pageIndexRangeSP - 1
        }

        if (self.currentPage < self.range) {
          start = 1;
          end = self.range + 1;
        } else if (self.currentPage > self.lastPage - self.range + 1) {
          start = self.lastPage - self.range;
          end = self.lastPage;
        } else {
          start = self.currentPage - Math.floor(self.range / 2);
          end = self.currentPage + Math.floor(self.range / 2);
        }
        if (self.lastPage <= self.range + 1) {
          start = 1;
          end = self.lastPage;
        }
        if (!isSmartPhone) return self.calRange(start, end);
        return [self.currentPage];
      };
    },
    sortValue() {
      let query = Object.assign({}, this.$route.query);
      if (!query.sort) return this.sortList[0];
      return query.sort;
    },
    isPositionCenter() {
      if (this.footerDesign) return true
      return this.positionCenter
    }
  },
  mounted() {
    if (this.sortValue) this.selected = this.sortValue;
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    pageChange(page, disabled = false) {
      if (disabled) return false;
      let query = Object.assign({}, this.$route.query);
      this.$router.push({ query: { ...query, page } });
      this.$emit("pageChange", page);
    },
    isCurrent(page) {
      return page === this.currentPage;
    },
    calRange(start, end) {
      const range = [];
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    },
    // window幅を検知
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    changeSort(catInfo) {
      this.selected = catInfo.value
      this.$emit('changeSort', catInfo.value)
    },
    formatedSortList() {	
      const sortOrder = this.$route.query.sortOrder == 'asc' ? `${this.sortValue}Asc` : this.sortValue	
      return this.sortList.filter((item) => item.value != sortOrder)	
    }
  },
  watch: {
    $route() {
      this.selected = this.sortValue;
    },
    total(val) {
      if (parseInt(val) === 0) {
        this.$router.replace({
          path: this.$route.path,
          params: this.$route.params,
          query: ""
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdownItem {
  padding: 14px;
  background-color: white;
  border: 1px solid #CACCCF;
  font-size: 15px;
  &:last-of-type {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}

@media only screen and (max-width: 640px) {
  .dropdownItem {
    padding: 10px;
    font-size: 13px;
    &:last-of-type {
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
}
</style>
