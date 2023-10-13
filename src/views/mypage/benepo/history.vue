<template>
  <section class="p-mypage-benepo">
    <div class="right-content">
      <!-- ベネポに戻るボタン -->
      <div class="p-mypage-benepo__textLink__left text-sm sm:mb-4">
        <router-link
          to="/mypage/benepo?currentID=0"
          class="c-text-button c-text-button--left text-sp-base"
        >
          <Icon name="arrow_left" :color="$colors.brand.red" />
          ベネポに戻る
        </router-link>
      </div>
      <div class="c-card sm:shadow-none">
        <!-- ページヘッダー -->
        <div class="p-mypage-benepo__contentHead sm:px-0 sm:pb-2">
          <!-- 表示期間選択 -->
          <div class="p-mypage-benepo__select__month mb-3 flex sm:mb-2">
            <p class="text-sm whitespace-nowrap lg:mr-3">表示期間</p>
            <!-- 開始年月 -->
            <div class="select__month__from selectWithIcon_container">
              <select
                class="selectWithIcon text-sp-base"
                v-model="fromDateSelected"
                @change="dateCheck"
              >
                <option v-for="item in dateList" :key="item.id">
                  {{ item }}
                </option>
              </select>
              <Icon
                class="absolute top-1/2 right-0  transform -translate-x-1/2 -translate-y-1/2"
                name="contents_calender2"
                width="17"
                height="17"
              />
            </div>
            <span class="text-sp-base">〜</span>
            <!-- 終了年月 -->
            <div class="select__month__for selectWithIcon_container">
              <select
                class="selectWithIcon text-sp-base"
                v-model="toDateSelected"
                @change="dateCheck"
              >
                <option v-for="item in dateList" :key="item.id">
                  {{ item }}
                </option>
              </select>
              <Icon
                class="absolute top-1/2 right-0  transform -translate-x-1/2 -translate-y-1/2"
                name="contents_calender2"
                width="17"
                height="17"
              />
            </div>
          </div>
          <!-- コメント -->
          <div class="p-mypage-benepo__select__month__message mb-3 text-xs text-sp-sm sm:mb-5">
            <p v-if="dateValid === false" class="font-bold">
              終了日が開始日よりも過去を選択しています。
            </p>
            ※ 過去3年分までの表示となります。<br />
            ※ 表示期間の範囲は1年以内を選択してください。
          </div>
          <div class="flex justify-between items-end">
            <div class="w-36">
              <!-- ページネーション -->
              <Paginator
                class="sm:w-full flex justify-center sm:-mb-3"
                :total="totalChangedPoint"
                :size="itemNumPerPage"
                @pageChange="pageChange"
                :paginatorAvailable="false"
                :totalFontSizePC="14"
                :totalFontSizeSP="13"
              />
            </div>
            <!-- 絞り込むボタン -->
            <button
              class="select__month__button c-button c-button__tertiary text-sm py-3.5 px-11 whitespace-nowrap text-pc-base text-sp-base sm:py-2.5 sm:px-8"
              @click="listChange"
            >
              絞り込む
            </button>
          </div>
        </div>

        <!-- ページコンテンツ -->
        <div class="c-card__inner2 sm:px-2.5">
          <ul class="p-mypage-benepo__contentList">
            <li v-for="item in displayItems" :key="item.id" class="items-start">
              <!-- ベネポ履歴左側要素（日付、ラベル、ポイント履歴名） -->
              <div class="contentList__head li-left block">
                <div class="li-left-status mb-4 sm:mb-2">
                  <!-- 日付 -->
                  <span class="text-sm mr-2 text-sp-base sm:mr-1">{{
                    $moment(item.date).format("YYYY/M/D")
                  }}</span>
                  <!-- ステータスラベル -->
                  <span
                    class="status__text m-0 text-xs text-white rounded text-sp-sm sm:py-0.5"
                    v-if="item.commandType === 1"
                    :class="{ pointLabelColor__blue: item.commandType === 1 }"
                    >{{ item.statusText }}</span
                  >
                  <span
                    class="status__text m-0 text-xs text-white rounded text-sp-sm sm:py-0.5"
                    v-if="item.commandType === 2"
                    :class="{ pointLabelColor__yellow: item.commandType === 2 }"
                    >{{ item.statusText }}</span
                  >
                  <span
                    class="status__text m-0 text-xs text-white rounded text-sp-sm sm:py-0.5"
                    v-if="item.commandType === 3"
                    :class="{ pointLabelColor__red: item.commandType === 3 }"
                    >{{ item.statusText }}</span
                  >
                  <span
                    class="status__text m-0 text-xs text-white rounded text-sp-sm sm:py-0.5"
                    v-if="item.commandType === 4"
                    :class="{ pointLabelColor__blue: item.commandType === 4 }"
                    >{{ item.statusText }}</span
                  >
                  <span
                    class="status__text m-0 text-xs text-white rounded text-sp-sm sm:py-0.5"
                    v-if="item.commandType === 5"
                    :class="{ pointLabelColor__red: item.commandType === 5 }"
                    >{{ item.statusText }}</span
                  >
                </div>
                <!-- ポイント履歴名 -->
                <p
                  class="text-pc-base text-sp-base"
                  :class="
                    getContentBenepo(item.content).length > 45
                      ? 'flex flex-col'
                      : ''
                  "
                >
                  <span>
                    <!-- ポイント履歴名 -->
                    {{ getContentBenepo(item.content) }}
                  </span>
                </p>
              </div>

              <!-- ベネポ履歴右側要素（ポイント情報） -->
              <div class="contentList__point li-right text-xl text-sp-base  sm:mt-2">
                <span
                  v-if="item.commandType === 1"
                  :class="{ pointTextColor__blue: item.commandType === 1 }"
                  >{{ item.point <= 0 ? item.point : `+${item.point}` }}P</span
                >
                <span
                  v-if="item.commandType === 2"
                  :class="{ pointTextColor__yellow: item.commandType === 2 }"
                  >{{ item.point <= 0 ? item.point : `+${item.point}` }}P</span
                >
                <span
                  v-if="item.commandType === 3"
                  :class="{ pointTextColor__red: item.commandType === 3 }"
                  >{{ item.point <= 0 ? item.point : `+${item.point}` }}P</span
                >
                <span
                  v-if="item.commandType === 4"
                  :class="{ pointTextColor__blue: item.commandType === 4 }"
                  >{{ item.point <= 0 ? item.point : `+${item.point}` }}P</span
                >
                <span
                  v-if="item.commandType === 5"
                  :class="{ pointTextColor__red: item.commandType === 5 }"
                  >{{ item.point <= 0 ? item.point : `+${item.point}` }}P</span
                >
              </div>
            </li>
          </ul>
        </div>

        <!-- ページフッター -->
        <div class="p-mypage-benepo__paginator__bottom">
          <Paginator
            class="sm:w-full flex justify-center flex-col"
            :total="totalChangedPoint"
            :size="itemNumPerPage"
            @pageChange="pageChange"
            :positionCenter="true"
            :paginatorFontSize="20"
            :totalFontSizePC="14"
            :totalFontSizeSP="13"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import { get } from "lodash";

export default {
  props: {
    mypageBoCode: {
      type: String
    },
    mypageDisplayCode: {
      type: String,
    },
  },
  data() {
    return {
      currentPage: 1,
      points: {},
      dateList: [],
      fromDateSelected: "",
      toDateSelected: "",
      dateValid: true,
      lostPointList: [],
      totalRecordPoint: 0,
      listPointHistory: [],
      listChangedHistory: [],
      totalChangedPoint: 0,
      curPage: 1,
      pageNum: 0,
      itemNumPerPage: 10,
    };
  },
  async created() {
    this.calcPageNum();
  },
  async mounted() {
      this.$page.showSideMenu = true;
    this.$page.isTitle = true;
    const points = await this.$repositories("mypage").getMyBenepo({
      pointFrom: this.$moment()
        .subtract(3, "years")
        .format("YYYYMMDDTHHmmss+0900"),
      pointTo: this.$moment().format("YYYYMMDDTHHmmss+0900")
    });
    this.points = points.data;
    this.setBreadcrumb();
    this.dateListGen();
    if (this.points) {
      await this.getListPointNearExpDateInThreeMonth(
        this.points.historyDataList
      );
      await this.getListPointHistory(this.points.historyDataList);
    }
    this.listChange();
    this.curPage = this.$route.query.page
      ? this.$route.query.page
      : this.curPage;
  },
  computed: {
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    displayItems() {
      const startIdx = (this.curPage - 1) * this.itemNumPerPage;
      const endIdx = startIdx + this.itemNumPerPage;
      return this.listChangedHistory.slice(startIdx, endIdx);
    }
  },
  methods: {
    getContentBenepo(content) {
      if (content && content.length <= 50) {
        return content;
      } else if (content && content.length > 50) {
        return content.slice(0, 50).concat("...");
      }
      return "";
    },
    async getMenuName(menuNo) {
      const menuNm = await this.$repositories("orders")
        .getMenuBasicInfo(menuNo)
        .then((data) => {
          return get(data, "menuNm", "");
        });
      return menuNm;
    },
    pageChange(page) {
      this.curPage = page;
    },
    dateListGen() {
      const startMonth = this.$moment().subtract(3, "years");
      const endMonth = this.$moment();
      const diff = endMonth.diff(startMonth, "month");

      const result = [];
      for (let d = 0; d <= diff; d++) {
        const m = this.$moment(startMonth)
          .add(d, "month")
          .format("YYYY年MM月");
        result.push(m);
      }
      this.toDateSelected = endMonth.format("YYYY年MM月");
      this.fromDateSelected = startMonth.format("YYYY年MM月");
      this.dateList = result;
    },
    checkValidTimePointInThreeMonths(timeStr) {
      const dateOfPoint = this.formatDatePoint(timeStr);
      const dateFuture = this.$moment().subtract(-3, "months");
      const dateCurrent = this.$moment();
      return this.$moment(dateOfPoint, "YYYY/MM/DD").isBetween(
        dateCurrent,
        dateFuture
      );
    },
    formatDatePoint(timeStr) {
      const yearOfPointHist = timeStr.substr(0, 4);
      const monthOfPointHist = timeStr.substr(4, 2);
      const dayOfPointHist = timeStr.substr(6, 2);
      return `${yearOfPointHist}/${monthOfPointHist}/${dayOfPointHist}`;
    },
    getListPointNearExpDateInThreeMonth(obj) {
      let commandTypelist = obj.filter((item) => {
        item.commandType === 4;
      });
      const threeMonthList = commandTypelist.filter((item) =>
        this.checkValidTimePointInThreeMonths(item.validTo)
      );
      threeMonthList.forEach((validItem) => {
        validItem.validToFormated = this.$moment(validItem.validTo).format(
          "YYYY/MM/DD"
        );
      });

      const descObjects = [...threeMonthList].sort(
        (a, b) => new Date(a.validToFormated) - new Date(b.validToFormated)
      );
      this.lostPointList = descObjects;
    },
    async getListPointHistory(obj) {
      this.listPointHistory = [];
      this.totalRecordPoint = obj.length;
      const objects = [];
      for (let i = 0; i < obj.length; i++) {
        const pointHistory = [];
        pointHistory.point = obj[i].point;
        // pointHistory.content = (obj[i].commandType != 1 && obj[i].reasonInternal) || obj[i].reasonCustomer;
        pointHistory.content =obj[i].reasonCustomer || obj[i].reasonInternal;
        pointHistory.menuNo = obj[i].menuNo;
        if (obj[i].menuNo) {
          pointHistory.menuNm = await this.getMenuName(obj[i].menuNo);
        }
        const statusPoint = obj[i].commandType;
        switch (statusPoint) {
          case 1:
            pointHistory.commandType = 1;
            pointHistory.statusText = "獲得";
            break;
          case 2:
            pointHistory.commandType = 2;
            pointHistory.statusText = "利用";
            break;
          case 3:
            pointHistory.commandType = 3;
            pointHistory.statusText = "取消";
            break;
          case 4:
            pointHistory.commandType = 4;
            pointHistory.statusText = "ポイント獲得予定";
            break;
            case 5:
            pointHistory.commandType = 5;
            pointHistory.statusText = "有効期限切れ";
            break;
          default:
            break;
        }

        if(pointHistory.commandType == 5){
          pointHistory.date = this.$moment(obj[i].validTo).format(
            "YYYY/MM/DD"
          );
        } else {
          pointHistory.date = this.$moment(obj[i].historyDate).format(
            "YYYY/MM/DD"
          );
        }
        objects.push(pointHistory);
      }

      const descObjects = [...objects].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      this.listPointHistory = descObjects;
    },
    dateCheck() {
      const fromDate = this.$moment(this.fromDateSelected, "YYYY年MM月");
      const toDate = this.$moment(this.toDateSelected, "YYYY年MM月");
      this.dateValid = !!fromDate.isSameOrBefore(toDate, "month");
    },
    listChangeValid(timeStr) {
      const fromDate = this.$moment(this.fromDateSelected, "YYYY年MM月").format(
        "YYYY/MM/DD"
      );
      const toDate = this.$moment(this.toDateSelected, "YYYY年MM月")
        .add(1, "M")
        .format("YYYY/MM/DD");
      timeStr = this.$moment(timeStr).format("YYYY/MM/DD");
      const dayTimeStr = moment(timeStr).format("DD");
      if (dayTimeStr === "01") {
        timeStr = moment(timeStr).add(1, "days");
      }
      return this.$moment(this.$moment(timeStr).format("YYYY/MM/DD")).isBetween(
        fromDate,
        toDate
      );
    },
    listChange() {
      const changedList = this.listPointHistory.filter((item) =>
        this.listChangeValid(item.date)
      );
      this.listChangedHistory = changedList;
      this.totalChangedPoint = changedList.length;
      this.curPage = 1;
      this.pageNum = 0;
    },
    calcPageNum() {
      this.pageNum = Math.ceil(
        this.listChangedHistory.length / this.itemNumPerPage
      );
    },
    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("ベネポ", "/mypage/benepo")
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("保有ベネポ詳細"));
    }
  },
  watch: {
    $route() {
      this.setBreadcrumb();
      this.currentId = this.$route.query.currentID;
    }
  }
};
</script>

<style lang="scss" scoped>
.li-left {
  width: 90%;
}
.li-left-status {
  width: 30%;
  min-width: 155px;
}
.text-epip {
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pointLabelColor {
  &__red {
    background-color: #e60021 !important;
  }
  &__blue {
    background-color: $Blue !important;
  }
  &__gray {
    background-color: #73767a !important;
  }
  &__yellow {
    background-color: #ffd900 !important;
  }
}
.pointTextColor {
  &__red {
    color: #e60021;
  }
  &__blue {
    color: $Blue;
  }
  &__gray {
    color: #73767a;
  }
  &__yellow {
    color: #ffd900;
  }
}

.selectWithIcon {
  width: 100%;
  font-size: 15px;
  text-indent: 0.01px;
  text-overflow: ellipsis;
  border: none;
  outline: none;
  background: transparent;
  background-image: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
  &_container {
    max-width: 150px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    outline: 1px solid $CoolGray3;
    transition: 0.3s ease-out;
    border-radius: 4px;
    padding: 6px 8px;
    &:has(> .selectWithIcon:focus) {
      outline: 2px solid #e60021;
    }
  }
}

@media only screen and (min-width: 500px) {
  .text-pc-base {
    font-size: 15px !important;
  }
}

@media only screen and (max-width: 500px) {
  .text-sp-base {
    font-size: 13px !important;
    line-height: 13px !important;
  }

  .text-sp-sm {
    font-size: 10px !important;
  }
  .selectWithIcon {
    &_container {
      width: 115px !important;
      display: flex;
      align-items: center;
    }
  }
}

@media only screen and (max-width: 380px) {
  .p-mypage-benepo .p-mypage-benepo__contentHead {
    padding: 1rem 1rem;
  }
  .c-tab__label {
    font-size: 11px;
  }
  .c-tab c-tab--lg is-active {
    font-size: 11px;
  }
}

@media only screen and (max-width: 349px) {
  .p-mypage-benepo .p-mypage-benepo__contentHead {
    padding: 1rem 0rem;
  }
}
</style>
