<template>
  <div class="box-shadow py-8 px-10 sm:py-5 sm:px-3">
    <div :class="innerClasses" class="mb-4 sm:mb-3">

      <!-- 編集モードのチェックボックス -->
      <div
        v-if="option && option.isEditable"
        class="p-mypage-listBlock__checkbox"
      >
        <FormsCheckbox v-model="isChecked" />
      </div>

      <!-- カードヘッダー -->
      <div class="flex gap-3">
        <!-- プラン画像 -->
        <div
          class="thumbnail sm:w-16 sm:h-16"
          @click="$emit('show-detail')"
        >
          <img class="block object-fit w-full h-full" :src="item.imageURL" :alt="item.menuNm">
        </div>

        <!-- メニューNo・メニュー名・プラン名 -->
        <div class="w-full">
          <!-- メニューNo -->
          <div class="mb-4 sm:mb-1">
            <span class="text-pc-sm text-sp-sm text-gray">
              [メニューNo.{{ item.menuNo }}]
            </span>
          </div>

          <!-- メニュー名 -->
          <div class="mb-2 text-xl text-sp-base font-bold sm:mb-1">
            {{ item.menuNm }}
          </div>

          <!-- プラン名 -->
          <div
            class="text-pc-sm text-sp-sm text-gray "
          >
            {{ item.planNm }}
          </div>

        </div>
      </div>
    </div>

    <!-- カードフッター -->
    <div>
      <!-- プラン名 -->
      <h3
        class="mb-3 text-2xl font-bold sm:text-base cursor-pointer"
        @click="$emit('show-detail')"
      >
        {{ item.planNm }}
      </h3>
      <!-- 削除・有効期限の表示切り替え | デジタルチケット/クーポン:0 会員証クーポン:1 -->
      <div
        class="flex justify-between items-center"
      >
        <div
          v-if="!option.isEditable && Number(tab) === 1"
          @click.stop="$emit('delete-coupon')"
        >
          <TextButton tag="button" position="left">
            <span class="text-pc-base text-sp-base">
              削除
              <Icon name="action_delete" class="hover:text-black"/>
            </span>
          </TextButton>
        </div>
        <span v-if="Number(tab) === 0" class="text-pc-base text-sp-base">受付番号 : {{ item.acptNo }}</span>
        <span class="text-pc-base text-sp-base text-red">
          {{ isSaleStockTermValid ? "利用日 :" : "有効期限 :" }}
          {{ getExpireTo(item.expireTo) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    // typeList: [
    //   { value: 1, name: "購入済み" },
    //   { value: 2, name: "当日払い" },
    //   { value: 3, name: "過去のクーポン" },
    // ],
  }),
  props: {
    item: {
      type: Object
    },
    tab: {
      type: Number,
      default: 0
    },
    opt: {
      type: Object
    }
    // isAllSelected: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  computed: {
    option() {
      if (this.opt) return this.opt;
      return {};
    },
    // isDeleteFlag() {
    //   return this.item.deleteFlag || false;
    // },
    isAllUsedStatus() {
      return this.item.allUsedStatus || false;
    },
    statusName() {
      let value = "";
      // if (this.isDeleteFlag) {
      //   value = "purchased";
      // } else
      if (this.isAllUsedStatus) {
        value = "invalid";
      } else {
        value = "sameDayPayment";
      }
      return value || "";
    },
    statusLabel() {
      let value = "";
      // if (this.isDeleteFlag) {
      //   value = "購入済み";
      // } else
      if (this.isAllUsedStatus) {
        value = "利用不可";
      } else {
        value = "当日払い";
      }
      return value || "";
    },
    innerClasses() {
      return [
        "p-mypage-listBlock__inner",
        {
          "p-mypage-listBlock__inner--hasDelete":
            this.statusName !== "purchased"
        },
        {
          "p-mypage-listBlock__inner--isEditable": this.option.isEditable
        }
      ];
    },
    isChecked: {
      get() {
        let value = "";
        if (this.isAllSelected) {
          value = true;
        } else if (this.value) {
          value = this.value;
        } else {
          value = false;
        }
        return value;
      },
      set(value) {
        if (value) {
          this.$emit("select-item", this.item.menuNo);
        } else {
          this.$emit("remove-item", this.item.menuNo);
        }
      }
    },
    /**
     * 販売期限有効判定
     * @returns { boolean }
     * */
    isSaleStockTermValid() {
      const expireFromDay = moment(this.item.expireFrom).format("YYYYMMDD")
      const expireFromTime = moment(this.item.expireFrom).format("HHmmss")

      const expireToDay = moment(this.item.expireTo).format("YYYYMMDD")
      const expireToTime = moment(this.item.expireTo).format("HHmmss")

      // 開始日と終了日が同じかつ、開始時刻が000000、終了時刻が235959の場合、販売期限有効とする
      return (
        expireFromDay === expireToDay &&
        expireFromTime === "000000" &&
        expireToTime === "235959"
      )
    }
  },
  created() {
    this.fetchStatus();
  },
  methods: {
    getExpireTo(time) {
      const expireTo = moment(time).format("YYYY/MM/DD");
      return moment(expireTo, "YYYY/MM/DD").year() === 2999
        ? `${moment().add(1, "y").year()}/03/31`
        : expireTo;
    },
    getCatNm(item) {
      const catLrgclassNm = _.get(
        item,
        "basicInformationCategory.catLrgClassNm",
        ""
      );
      const catMidClassNm = _.get(
        item,
        "basicInformationCategory.catMidClassNm",
        ""
      );
      const catSmlClassNm = _.get(
        item,
        "basicInformationCategory.catSmlClassNm",
        ""
      );
      return [catLrgclassNm, catMidClassNm, catSmlClassNm]
        .filter((item) => item)
        .join("・");
    },
    fetchStatus() {
      if (this.isAllUsedStatus) {
        this.statusLabel === "利用不可";
        this.statusName === "invalid";
      } else if (this.purchased) {
        this.statusLabel === "購入済み";
        this.statusName === "purchased";
      } else {
        this.statusLabel === "当日払い";
        this.statusName === "sameDayPayment";
      }
    },
    selectItem(value) {
      if (value) {
        this.$emit("select-item", this.item.menuNo);
      } else {
        this.$emit("remove-item", this.item.menuNo);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.thumbnail {
  width: 120px;
  height: 120px;
  min-width: 120px;
  min-height: 120px;
}

.box-shadow {
  box-shadow: #00000029 0 0 8px;
}

.text-gray {
  color: #73767A;
}

.text-red {
  color: $Red;
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
