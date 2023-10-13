<template>
  <div class="p-mypage-listBlock">
    <div class="c-card c-card--radius0">
      <div :class="innerClasses">
        <div v-if="isEditable" class="p-mypage-listBlock__checkbox">
          <FormsCheckbox v-model="isCheckedBox" />
        </div>

        <div class="c-card__inner4 pb-0">
          <div class="p-mypage-listBlock__header">
            <div
              class="p-mypage-listBlock__thumbnail"
              @click="$emit('show-detail')"
            >
              <Thumbnail
                :thumb_src="item.imageURL"
                :thumb_alt="item.menuNm"
                :object_fit="'--cover'"
              />
            </div>
          </div>

          <div class="p-mypage-listBlock__content">
            <div class="p-mypage-listBlock__content__header">
              <div
                class="label inline-block text-epip-cat"
                v-if="getCatNm(item)"
              >
                {{ getCatNm(item) }}
              </div>
              <div class="p-mypage-listBlock__content__no sm:hidden">
                [メニューNo.{{ item.menuNo }}]
              </div>
              <div
                class="p-mypage-listBlock__content__statusTag sm:text-xs ml-auto"
              >
                {{ statusTag }}
              </div>
            </div>
            <div class="p-mypage-listBlock__content__no hidden sm:block">
              [メニューNo.{{ item.menuNo }}]
            </div>
            <div
              class="p-mypage-listBlock__content__name text-epip sm:text-xs text-lg"
            >
              {{ item.menuNm }}
            </div>
            <div class="sm:text-xs">
              {{ item.planNm }}
            </div>
          </div>
        </div>
      </div>

      <div class="c-card__inner4 sm:pt-0">
        <div
          class="p-mypage-listBlock__content__description p-mypage-listBlock--pc"
          @click="$emit('show-detail')"
        >
          {{ item.planNm }}
        </div>

        <div class="p-mypage-listBlock__content__footer p-mypage-listBlock--pc">
          <span v-show="item.latestUsedDateTime">
            利用日 :
            {{ $moment(item.latestUsedDateTime).format('YYYY/MM/DD') }}
          </span>
        </div>

        <div v-if="!isEditable" class="p-mypage-listBlock__footer c-displayPc">
          <div
            @click.stop="$emit('delete-coupon')"
            class="c-card__inner0 flex justify-between"
          >
            <TextButton tag="button" position="left">
              削除<Icon name="action_delete" />
            </TextButton>
            <div>
              <span class="expire-text">
                有効期限 : {{ $moment(item.expireTo).format('YYYY/MM/DD') }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-mypage-listBlock--sp">
        <div class="c-card__inner4 ">
          <div class="p-mypage-listBlock__content__description">
            {{ item.planNm }}
          </div>
          <div
            class="p-mypage-listBlock__content__footer p-mypage-listBlock__content__footer--right"
          >
            <div class="w-full flex justify-between">
              <span v-show="item.latestUsedDateTime">
                利用日 :
                {{ $moment(item.latestUsedDateTime).format('YYYY/MM/DD') }}
              </span>
            </div>
            <div class="w-full">
              <div
                v-if="!isEditable"
                class="p-mypage-listBlock__delete flex justify-between"
                @click.stop="$emit('delete-coupon')"
              >
                <TextButton tag="button" position="left">
                  削除<Icon name="action_delete" />
                </TextButton>
                <div>
                  <span class="expire-text">
                    有効期限 : {{ $moment(item.expireTo).format('YYYY/MM/DD') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div
        v-if="!isEditable"
        class="p-mypage-listBlock__footer c-displayPc"
      >
        <div @click.stop="$emit('delete-coupon')" class="c-card__inner4">
          <TextButton tag="button" position="left">
            削除<span class="c-displayPc">する</span
            ><Icon name="action_delete" />
          </TextButton>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';

export default {
  name: 'PastCouponListItem',
  data: () => ({
    // typeList: [
    //   { value: 1, name: "購入済み" },
    //   { value: 2, name: "当日払い" },
    //   { value: 3, name: "過去のクーポン" },
    // ],
  }),
  props: {
    item: {
      type: Object,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    option() {
      if (this.opt) return this.opt;
      return {};
    },
    isAllUsedStatus() {
      return this.item.allUsedStatus || false;
    },
    allDisableStatus() {
      return this.item.allDisableStatus || false;
    },
    isExpiredStatus() {
      return this.item.expiredStatus || false;
    },
    statusTag() {
      if (this.isAllUsedStatus) {
        return '利用済';
      } else if (this.allDisableStatus) {
        return '利用不可';
      } else if (this.isExpiredStatus) {
        return '期限切れ';
      }
      return '';
    },
    statusName() {
      let value = '';
      if (this.isAllUsedStatus) {
        value = 'invalid';
      } else {
        value = 'sameDayPayment';
      }
      return value || '';
    },
    statusLabel() {
      let value = '';
      if (this.isAllUsedStatus) {
        value = '利用不可';
      } else {
        value = '当日払い';
      }
      return value || '';
    },
    innerClasses() {
      return [
        'p-mypage-listBlock__inner',
        {
          'p-mypage-listBlock__inner--hasDelete':
            this.statusName !== 'purchased',
        },
        {
          'p-mypage-listBlock__inner--isEditable': this.isEditable,
        },
      ];
    },
    isCheckedBox: {
      get() {
        let value = '';
        if (this.isChecked) {
          value = true;
        } else {
          value = false;
        }
        return value;
      },
      set(value) {
        if (value) {
          this.$emit('select-item', this.item);
        } else {
          this.$emit('remove-item', this.item);
        }
      },
    },
    smlCatNm() {
      return get(this.item, 'catLrgClassNm', '');
    },
  },
  created() {
    this.fetchStatus();
  },
  methods: {
    getCatNm(item) {
      return _.get(item, 'basicInformationCategory.catLrgClassNm', '');
    },
    fetchStatus() {
      if (this.isAllUsedStatus) {
        this.statusLabel === '利用不可';
        this.statusName === 'invalid';
      } else if (this.purchased) {
        this.statusLabel === '購入済み';
        this.statusName === 'purchased';
      } else {
        this.statusLabel === '当日払い';
        this.statusName === 'sameDayPayment';
      }
    },
    selectItem(value) {
      if (value) {
        this.$emit('select-item', this.item.menuNo);
      } else {
        this.$emit('remove-item', this.item.menuNo);
      }
    },
  },
  watch: {
    isSelected(value) {
      this.isChecked = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.p-mypage-listBlock__content {
  &__header {
    @apply flex items-center;
  }

  &__smlCat {
    background-color: #eeeeee;
    color: #222222;
    font-size: 10px;
  }

  &__statusTag {
    display: inline-block;
    background-color: #cdcdcd;
    color: #222222;
    font-size: 12px;
    padding: 0.25rem;
    border-radius: 2px;
    margin-top: 7px;
    margin-bottom: 11px;
  }

  &__footer {
    .p-mypage-listBlock--pc {
    }
    span {
      font-size: 15px !important;
      color: #1f2021;
    }
  }
  .p-mypage-listBlock__footer.c-displayPc {
    font-size: 12px !important;
  }
  .text-epip {
    line-height: 1.2;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .text-epip-cat {
    line-height: 1.7;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 50%;
    padding: 4px;
    font-size: 12px !important;
    background: #fff8e5;
  }
}
.expire-text {
  color: #dd0000 !important;
  font-size: 15px;
}
</style>
