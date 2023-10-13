<template>
  <div class="p-mypage-content p-mypage-coupon p-mypage-coupon--list">
    <div class="p-mypage-coupon__header">
      <div class="p-mypage-coupon__old__textLink__reverse">
        <TextButton to="/mypage/coupon?sort=getCouponDatetime" position="left">
          マイクーポンに戻る
          <Icon name="arrow_right" :color="$colors.brand.red" />
        </TextButton>
      </div>
      <div class="p-mypage-coupon__notice sm:text-xs text-sm">
        削除した場合、クーポンの表示・閲覧はできなくなります。
      </div>
      <div class="c-card__content">
        <div v-if="!isLoading" class="c-card__inner3">
          <div class="p-mypage-coupon-old__search">
            <!--<SearchStatic />-->
          </div>
          <div class="pagination-top" v-if="items && items.length">
            <Paginator
              :paginatorAvailable="false"
              :isSort="false"
              :total="pageTotal"
              @pageChange="pageChange"
            />

            <button
              class="btn-sort px-6 py-3 sm:px-3 sm:py-0.5"
              @click="isEditable = !isEditable"
              v-show="!isEditable"
            >
              <Icon
                name="action_delete"
                class="align-text-bottom mx-2"
              />メニューの一括削除
            </button>
          </div>

          <div class="p-mypage-coupon-old__editModeNav" v-if="isEditable">
            <div class="p-mypage-coupon-old__editModeNav__inner">
              <div class="p-mypage-coupon-old__selectAll">
                <div class="c-checkbox">
                  <label class="c-checkbox__inner">
                    <input
                      type="checkbox"
                      v-model="isSelectedAll"
                      @change="onSelectAll()"
                    />
                    <span class="c-checkbox__box" />
                    <span class="c-checkbox__label">全て選択</span>
                  </label>
                </div>
              </div>
              <ul class="p-mypage-coupon-old__editButtons">
                <li>
                  <button
                    class="c-button__tertiary"
                    @click="showMultiDeleteModal()"
                    :disabled="isDisableBtn()"
                  >
                    まとめて削除
                  </button>
                </li>
                <li>
                  <button class="c-button__tertiary" @click="hideCheckBox()">
                    完了
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 一時的に -->
    <template v-if="!isLoading">
      <ul class="p-mypage-coupon__menus">
        <li
          v-for="(item, index) in items"
          :key="`${item.menuNo}-${item.planId}`"
        >
          <PastCouponListItem
            :item="item"
            :isEditable="isEditable"
            :isChecked="item.isChecked"
            @select-item="checkRowItem($event, index)"
            @remove-item="removeRowItem($event, index)"
            @delete-coupon="showSingleDeleteModal(item)"
            @show-detail="showDetail(item)"
          />
        </li>
        <li class="c-card c-card--radius0" v-if="!items || !items.length">
          <p class="c-card__inner text-center">
            該当するクーポンはありません。
          </p>
        </li>
      </ul>
      <!-- /.p-mypage-coupon__menus -->
    </template>
    <template v-else>
      <LoadingContent />
    </template>

    <div class="p-mypage-coupon__footer" v-if="items && items.length">
      <div v-if="!isLoading" class="c-card__inner4">
        <Paginator
          class="sm:w-full flex justify-center flex-col"
          :positionCenter="true"
          :isSort="false"
          :total="pageTotal"
          @pageChange="pageChange"
        />
      </div>
      <!-- /.c-card__inner4 -->
      <!-- /.c-card -->
    </div>
    <!-- /.p-mypage-coupon__footer -->
    <Modal
      ref="delete-coupons"
      width-size="M"
      :closeBtn="closeModalDeleteCoupon()"
    >
      <div class="c-modal__sp-contain c-modal__sp-contain--isVisible-Title">
        <div>
          <h4 class="c-title3 c-modal__sp-contain__fixedText">
            クーポンを削除します。 <br />よろしいですか？
          </h4>
          <!-- <p v-for="item in currentModalItems" :key="item.id" class="c-lead">
            {{ item.description }}
          </p> -->
        </div>
        <div class="c-buttons">
          <div class="c-buttons__inner">
            <div class="c-buttonWrap4">
              <Button
                style-type="primary"
                color="color4"
                @click.native="hideModal('delete-coupons')"
              >
                キャンセル
              </Button>
            </div>
          </div>
          <div class="c-buttons__inner">
            <div class="c-buttonWrap4">
              <Button
                style-type="primary"
                color="color2"
                @click.native="handleDelete()"
              >
                削除する
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  data: () => ({
    pageInfo: {},
    pageTotal: 0,
    currentPage: 1,
    currentModalItems: {},
    items: [],
    tab: null,
    sortList: [
      { value: 'getCouponDatetime', label: '取得日順' },
      { value: 'expireTo', label: '有効期限が近い順' },
    ],
    isLoading: false,
    isEditable: false,
    isSelectedAll: false,
    selectItemIds: [],
  }),
  watch: {
    $route() {
      this.$meta.setDocumentTitle('マイクーポン');
      this.setBreadcrumb();
      this.pageInfo = this.$route || {};
      this.getList();
    },
  },
  created() {
    if (!this.$route.query.sort) {
      this.$router.push({ query: { sort: 'getCouponDatetime' } });
    }
    if (this.$route.query.page) {
      this.currentPage = this.$route.query.page;
    } else {
      this.currentPage = 1;
    }
  },
  async mounted() {
    this.$meta.setDocumentTitle('マイクーポン');
    this.$page.showSideMenu = true;
    this.$page.isTitle = true;
    this.setBreadcrumb();
    this.pageInfo = this.$route || {};
    this.getList();
  },
  methods: {
    isDisableBtn() {
      return !this.selectItemIds.length;
    },
    hideCheckBox() {
      if (this.isSelectedAll) {
        const arr = [];
        this.items.forEach((item) => {
          item.isChecked = false;
          arr.push(item.acptNo);
        });
        this.selectItemIds = arr;
      } else {
        this.items.forEach((item) => {
          item.isChecked = false;
        });
        this.selectItemIds = [];
      }
      this.isEditable = !this.isEditable;
      this.selectItemIds = [];
      this.isSelectedAll = false;
    },
    closeModalDeleteCoupon() {
      return true;
    },
    async getList() {
      let query = Object.assign({}, this.$route.query);
      let paths = this.pageInfo.path.split('/') || [];
      // tabの指定: 0->デジチケ・デジポン 1->会員証
      this.tab = paths[paths.length - 1] == 'member' ? 1 : 0;
      let params = {
        isPastCoupon: true,
        page: this.currentPage - 1,
        sortBy: query.sort || 'getCouponDatetime',
        tab: this.tab,
        keyword: '',
      };
      this.isLoading = true;
      const page = await this.$repositories('mypage').getMycoupon(params);
      this.isLoading = false;
      if (page.isError) {
        return;
      }
      this.items = page.data.couponDataList;

      // 一時的
      this.$route.query.no_result || this.items.length === 0
        ? (this.pageTotal = 0)
        : (this.pageTotal = page.data.totalCount);
    },
    showDetail(item) {
      this.$router.push({ path: `/mypage/coupon/past/${item.acptNo}` });
    },
    pageChange(page) {
      this.currentPage = page;
      this.isSelectedAll = false;
      this.selectItemIds = [];
    },
    showModal(name) {
      this.$refs[name].show();
    },
    hideModal(name) {
      this.$refs[name].hide();
    },
    showSingleDeleteModal(item) {
      this.isSingleSelected = true;
      this.selectItem(item);
      this.showModal('delete-coupons');
    },
    async handleDelete() {
      if (this.isSingleSelected) {
        await this.deleteItems();
      } else {
        await this.deleteMultipleRow();
      }
    },
    async deleteItems(agParams = null) {
      this.$loading.startProcessing();
      try {
        let params = {
          acptNoList: [],
          deleteFlag: 1,
          menuPlanList: [],
        };
        if (agParams) {
          params = agParams;
        } else if (this.currentModalItems.acptNo) {
          params.acptNoList.push(this.currentModalItems.acptNo);
        } else {
          params.menuPlanList.push({
            menuNo: this.currentModalItems.menuNo,
            planId: this.currentModalItems.planId,
          });
        }
        const res = await this.$repositories('mypage').deleteMycoupon(params);

        const pageCur = this.$route.query.page;
        const pageLast = Math.ceil(this.pageTotal / 10);

        if (parseInt(pageCur) === parseInt(pageLast)) {
          const queryParam = _.cloneDeep(this.$route.query);
          if (
            this.currentPage > 1 &&
            ((this.isSingleSelected && this.items.length === 1) ||
              (!this.isSingleSelected &&
                this.selectItemIds.length === this.items.length))
          ) {
            queryParam.page = pageCur - 1;
            this.currentPage -= 1;
          }
          this.$router.replace({
            path: this.$route.path,
            params: this.$route.params,
            query: queryParam,
          });
        }
        this.getList();
      } catch (e) {
        console.error(e);
      } finally {
        this.hideModal('delete-coupons');
        this.resetItems();
        this.$loading.finishProcessing();
      }
    },
    checkRowItem(item, index) {
      item.isChecked = true;
      this.selectItemIds.push(index);
      if (this.selectItemIds.length === this.items.length) {
        this.isSelectedAll = true;
      }
    },
    removeRowItem(item, index) {
      item.isChecked = false;
      this.selectItemIds = this.selectItemIds.filter((i) => i != index);
      if (this.isSelectedAll) {
        this.isSelectedAll = false;
      }
    },
    resetItems() {
      this.currentModalItems = {};
      this.isSingleSelected = false;
      this.selectItemIds = [];
      this.isSelectedAll = false;
    },
    selectItem(item) {
      const key = 'coupon' + item.menuNo;
      let obj = {};
      this.currentModalItems['coupon' + item.menuNo] = item;
      this.currentModalItems = Object.assign(
        {},
        this.currentModalItems,
        (obj[key] = item)
      );
    },
    changeSort() {
      let sort = 'getCouponDatetime';
      let query = Object.assign({}, this.$route.query);
      if (query.page) delete query.page;
      if (!query.sort || query.sort == sort) {
        sort = 'expireTo';
      }
      this.$router.push({ query: { ...query, sort } });
    },
    /**
     * パンくずリスト作成
     */
    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb('マイページ', '/mypage')
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb('マイクーポン', '/mypage/coupon')
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb('使用済み／有効期限切れのクーポン')
      );
    },
    onSelectAll() {
      if (this.isSelectedAll) {
        const arr = [];
        this.items.forEach((item, index) => {
          item.isChecked = true;
          arr.push(index);
        });
        this.selectItemIds = arr;
      } else {
        this.items.forEach((item) => {
          item.isChecked = false;
        });
        this.selectItemIds = [];
      }
    },
    showMultiDeleteModal() {
      if (this.selectItemIds.length) {
        this.isSingleSelected = false;
        this.showModal('delete-coupons');
      }
    },
    async deleteMultipleRow() {
      const params = {
        acptNoList: [],
        deleteFlag: 1,
        menuPlanList: [],
      };
      this.items.forEach((item, index) => {
        if (this.selectItemIds.includes(index)) {
          if (item.acptNo) {
            params.acptNoList.push(item.acptNo);
          } else {
            params.menuPlanList.push({
              menuNo: item.menuNo,
              planId: item.planId,
            });
          }
        }
      });
      await this.deleteItems(params);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.pagination-top {
  position: relative;
}
.btn-sort {
  position: absolute;
  top: 4px;
  right: 0;
  border: 1px solid #63666a;
  border-radius: 4px;
  font-size: 12px;
  color: #1f2021;
}

.c-card__inner3 {
  @apply px-0;
}
.p-mypage-coupon__notice {
  @apply mt-4;
  color: #dd0000;
}

button:disabled {
  pointer-events: none;
  background-color: rgb(223 223 223 / 30%);
}
</style>
