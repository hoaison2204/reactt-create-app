<template>
  <div class="c-select" :style="{ 'max-width': getWidth}" :class="{'coupons_wrapper': $route.path.indexOf('/mypage/coupon') === 0}">
    <div 
      v-if="isDropDown"
      class="dropdown"
      @click="showDropDown"
    >
      <div class="dropdown_selected" :class="isActive ? 'rounded-b-none' : ''">
        {{ selectedItem }}
      </div>
      <div class="dropdown_list" :class="isActive ? 'dropdown_list__active' : ''">
        <slot name="dropdown" />
      </div>
    </div>

    <select
      v-else
      class="c-select__control"
      :class="{
        'c-select__error': isError,
        'c-select__control--coupons': $route.path.indexOf('/mypage/coupon') === 0,
        'c-select__control--disabled': isDisabled
      }"
      :value="value"
      @input="input"
    >
      <slot name="select"/>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    opt: {
      type: Object,
      default: () => {}
    },
    /**
     * 選択肢をドロップダウンにするか
     */
    isDropDown: {
      type: Boolean,
      default: false
    },
    /**
     * ソート項目リスト
     */
    sortList: {
      type: Array, 
      default: () => []
    }
  },
  data: () => ({
    classList: [],
    isActive: false
  }),
  computed: {
    option() {
      if (this.opt) return this.opt;
      return {};
    },
    getWidth() {
      if (!this.option || !this.option.width) return "100%";
      return this.option.width;
    },
    isDisabled() {
      if (!this.option || !this.option.disabled) return false;
      return this.option.disabled;
    },
    isError() {
      if (!this.option || !this.option.error) return '';
      return this.option.error;
    },
    selectedItem() {
      if (!this.value || !this.sortList.length) return this.sortList[0].label
      const currentValue = this.value === 'displayFrom' ? "getCouponDatetime" : this.value
      const selected = this.sortList.find(e => e.value === currentValue)
      return selected.label
    }
  },
  async mounted() {},
  methods: {
    input(e) {
      this.$emit("input", e.target.value);
      this.$emit("change", e.target.value);
    },
    showDropDown() {
      this.isActive = !this.isActive;
    }
  },
};
</script>

<style lang="scss" scoped>
.coupons {
  padding: 20px 14px;
  height: auto;
  position: relative;
  font-size: 15px;
}
.coupons_wrapper {
  width: 195px;
  &:after {
    border-color: #1F2021;
    width: 7px;
    height: 7px;
    top: 50%;
    right: 16px;
  }
}

.dropdown {
  position: relative;

  &_selected {
    width: 195px;
    height: 100%;
    padding: 14px;
    font-size: 15px;
    border: 1px solid #CACCCF;
    border-radius: 4px;
    font-size: 15px;
  }
  &_list {
    position: absolute;
    width: 195px;
    transform: scaleY(0);
    opacity: 0;
    transform-origin: top;
    transition: all .3s ease-out;
    &__active {
      transform: scaleY(1);
      opacity: 1;
    }
  }
}

@media only screen and (max-width: 640px) {
  .coupons {
    padding: 9px 12px 9px 16px;
    font-size: 13px;
  }
  .coupons_wrapper {
    width: 172px;
    &:after {
      right: 12px;
    }
  }

  .dropdown {
    &_selected {
      width: 172px;
      height: 100%;
      padding: 10px;
      font-size: 13px;
      border: 1px solid #CACCCF;
      border-radius: 3px;
    }
    &_list {
      width: 172px;
    }
  }
}
</style>
