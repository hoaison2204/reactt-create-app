<template>
  <section class="p-mypage-benepo sm:mb-0">
    <div class="right-content">
      <p class="text-warning mb-4 sm:mb-5">※本ページに記載されているベネポは、ベネ通販、海外旅行、パッケージツアー・旅行代理店、航空券・交通・その他旅行関連ではご利用いただけません。</p>

      <!-- 総保有ベネポ・獲得予定ベネポ -->
      <div class="c-card sm:mb-2.5">
        <div class="c-card__content">
          <div class="p-mypage-benepo__points pt-8 px-10 pb-7 sm:py-5 sm:px-3">
            <!-- 総保有ベネポ -->
            <router-link
              to="/mypage/benepo/history"
              class="flex justify-between items-center gap-8 pb-1 hover:text-black hover:no-underline sm:px-2 sm:pb-1 sm:gap-5"
            >
              <div class="p-mypage-benepo__points__total c-card__inner w-full p-0 border-0">
                <div class="p-mypage-benepo__points__totalPoint mb-0">
                  <p class="text-xl sm:text-base">総保有ベネポ</p>
                  <p v-if="this.points" class="text-2xl sm:text-base">
                    {{ points.totalPoint ? points.totalPoint : 0 | formatInteger }}P
                  </p>
                </div>

                <!-- TODO: 次回フェーズで使用予定のため一旦コメントアウト : 通常ベネポ・利用制限ベネポ -->
                <!-- <div class="p-mypage-benepo__points__normalPoint mb-4">
                  <p class="p-mypage-benepo__points__normalPoint__title">通常ベネポ</p>
                  <p v-if="this.points" class="p-mypage-benepo__points__normalPoint__num font-bold">
                    {{ points.noUseLimitPoint | formatInteger }}P
                  </p>
                </div>
                <div class="p-mypage-benepo__points__salonPoint">
                  <div>
                    <p class="p-mypage-benepo__points__salonPoint__title">利用制限ベネポ</p>
                    <p class="p-mypage-benepo__points__salonPoint__subTitle ml-4">リラクサロン限定</p>
                  </div>
                  <p v-if="this.points" class="p-mypage-benepo__points__salonPoint__num font-bold">
                    {{ points.useLimitPoint | formatInteger }}P
                  </p>
                  <p v-else></p>
                </div> -->
              </div>
              <div>
                <Icon name="arrow_right" :color="$colors.brand.red" :width="20" :height="20"/>
              </div>
            </router-link>

            <!-- TODO: 次回フェーズで使用する可能性があるためコメントアウト : 獲得予定ベネポ -->
            <!-- <router-link 
              to="/mypage/benepo/collect"
              class="flex justify-between items-center gap-8  hover:text-black hover:no-underline sm:px-2 sm:gap-5"
            >
              <div class="w-full flex justify-between items-center">
                  <p class="text-xl font-bold sm:text-base">獲得予定ベネポ</p>
                  <p v-if="this.points" class="text-2xl font-bold sm:text-base">
                    {{ points.grantedPoint ? points.grantedPoint : 0 | formatInteger }}P
                  </p>
              </div>
              <div>
                <Icon name="arrow_right" :color="$colors.brand.red" :width="20" :height="20"/>
              </div>
            </router-link> -->
          </div>
        </div>
      </div>

      <!-- TODO:次回フェーズで使用する可能性があるためコメントアウト : 3ヶ月以内に無効になるベネポ -->
      <div class="box-shadow rounded-lg py-8 px-10 sm:pt-6 sm:px-3 sm:pb-5">
        <div class="mb-8 flex justify-between items-center sm:mb-4">
          <p class="font-bold text-xl sm:text-base">3カ月以内に無効になるベネポ</p>
        </div>
        <ul v-if="lostPointList.length != 0">
          <li v-for="item in lostPointList" :key="index" class="content-threeMonth_item">
            <p class="p-mypage-benepo__contentItem__left sm:text-sm">
              {{ $moment(item.validTo).format("YYYY/M/D/") }}に<br
                class="c-displaySp"
              />失効するベネポ
            </p>
            <div class="flex items-center">
              <span class="p-mypage-benepo__contentItem__right font-bold sm:text-sm">{{ Math.abs(item.validPoint) | formatInteger }}P</span>
            </div>
          </li>
        </ul>
        <p v-if="lostPointList.length == 0" class="text-pc-base text-sp-base">ベネポがありません。</p>
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
      type: String
    },
  },
  data() {
    return {
      currentId: 0,
      tabList: [
        {
          id: 0,
          label: "有効期限が近いベネポ"
        },
        {
          id: 1,
          label: "ベネポ獲得・利用履歴"
        }
      ],
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
      totalLostPoint: 0,
      curPage: 1,
      pageNum: 0,
      itemNumPerPage: 10
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
    this.switchTab(Number(this.$route.query.currentID));
    this.dateListGen();
    if (this.points) {
      //await this.getListPointNearExpDateInThreeMonth(
      //  this.points.historyDataList
      //);
      const lostpoints = await this.$repositories("mypage").getMyexpiryPoints({months: "3"});
      this.lostPointList = lostpoints.data.ExpiryPointsList;

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
    async getMenuName(menuNo){
      const menuNm = await this.$repositories("orders")
        .getMenuBasicInfo(menuNo)
        .then(
          (data) => {
            return get(data, "menuNm", "");
          }
        );
      return menuNm
    },
    pageChange(page) {
      this.curPage = page;
    },
    switchTab(id) {
      this.currentId = isNaN(id) ? this.currentId : id;
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
        return item.commandType === 4;
      });
      const threeMonthList = commandTypelist.filter((item) =>
        this.checkValidTimePointInThreeMonths(item.validTo)
      );
      threeMonthList.forEach((validItem) => {
        validItem.validToFormated = this.$moment(validItem.validTo).format(
          "YYYY/MM/DD"
        );
      });

      let  descObjects = [...threeMonthList].sort(
        (a, b) => new Date(a.validToFormated) - new Date(b.validToFormated)
      );
      for (let i=0;i<descObjects.length;i++) {
        this.totalLostPoint += descObjects[i].point
      }
      this.lostPointList = descObjects;
    },
    async getListPointHistory(obj) {
      this.listPointHistory = [];
      this.totalRecordPoint = obj.length;
      const objects = [];
      for(let i = 0; i < obj.length; i++){
        const pointHistory = [];
        pointHistory.point = obj[i].point;
        // pointHistory.content = obj[i].commandType != 1 && obj[i].reasonInternal || obj[i].reasonCustomer;
        pointHistory.content = obj[i].reasonCustomer || obj[i].reasonInternal;
        pointHistory.menuNo = obj[i].menuNo;
        if(obj[i].menuNo){
          pointHistory.menuNm = await this.getMenuName(obj[i].menuNo)
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
            pointHistory.statusText = "有効期限切れ";
            break;
          case 4:
            pointHistory.commandType = 4;
            pointHistory.statusText = "取消";
            break;
          default:
            break;
        }
        pointHistory.date = this.$moment(obj[i].historyDate).format(
          "YYYY/MM/DD"
        );
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
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("ベネポ"));
    }
  },
  watch: {
    $route() {
      this.setBreadcrumb();
      this.switchTab(Number(this.$route.query.currentID));
    }
  }
};
</script>
<style lang="scss" scoped>
.li-left {
  width: 90%;
}
.li-left-status {
  width: 25%;
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

.text-warning {
  color: #DD0000;
  font-size: 12px;
}

.box-shadow {
  box-shadow: 0 0px 8px #1f20213d;
}

.content {
  &-threeMonth_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:not(:last-of-type) {
      border-bottom: 1px solid #CACCCF;
      margin-bottom: 20px;
      padding-bottom: 12px;
    }
  }
}

@media only screen and (min-width: 640px) {
  .text-pc-base {
    font-size: 15px;
  }
}

@media only screen and (max-width: 640px) {
  .text-sp-base {
    font-size: 13px;
  }
  .text-warning {
    font-size: 10px;
  }
  .content {
    &-threeMonth_item {
      &:not(:last-of-type) {
        padding-bottom: 20px;
        margin-bottom: 20px;
      }
    }
  }
}

@media only screen and (max-width: 380px) {
  .p-mypage-benepo .p-mypage-benepo__contentHead {
    padding: 1rem 1rem;
  }
  .c-tab__label{
    font-size: 11px;
  }
  .c-tab c-tab--lg is-active{
    font-size: 11px;
  }
  .text-warning {
    font-size: 10px;
  }
}

@media only screen and (max-width: 349px) {
  .p-mypage-benepo .p-mypage-benepo__contentHead {
    padding: 1rem 0rem;
  }
}
</style>
