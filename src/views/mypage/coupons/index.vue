<template>
  <section>
    <div>
    <div
      v-for="item in subsidyCouponsList"
      :key="item.id"
      :class="item.nearExpriry ? 'p-8 border-b-1 shadow last:border-b-0 first:rounded-t-lg last:rounded-b-lg before-reserve-date' : 'p-8 border-b-1 shadow last:border-b-0 first:rounded-t-lg last:rounded-b-lg'"
    >
      <div class="font-bold text-xl mb-4 break-words">
        {{ item.subsidyName }}
      </div>
      <dl class="flex w-full flex-wrap gap-y-3">
        <template v-if="item.subsidCoupon === 'LIFE'">
          <!-- #43486 ライフの場合は限定適用期間を表示する -->
          <dl
            class="flex w-full flex-wrap gap-y-2"
          >
            <dt class="w-2/12 md:w-3/12 md:text-xs">
              <span class="bg-gray-200 inline-block py-0.5 px-2">申込期間</span>
            </dt>
            <dd class="w-10/12 md:w-9/12 md:text-xs">
              {{ getLifeApplicationDate(item.priceList) }}
            </dd>
          </dl>
        </template>
        <template v-else>
          <dt class="w-2/12 md:w-3/12 md:text-xs">
            <span class="bg-gray-200 inline-block py-0.5 px-2">申込期間</span>
          </dt>
          <dd class="w-10/12 md:w-9/12 md:text-xs">
            {{ $moment(item.receptionDateFrom).format('YYYY/MM/DD') }}
              ~
            {{ $moment(item.receptionDateTo).format('YYYY/MM/DD') }}
          </dd>
        </template>

        <template v-if="item.subsidCoupon !== 'STAY_HEALTH'">
          <template
            v-if="
              (item.parsonalUsedMaxCnt && item.remainingCount) ||
                (item.remainingCount === 0 && item.parsonalUsedMaxCnt)
            "
          >
            <dt class="w-2/12 md:w-3/12 md:text-xs">
              <span class="bg-gray-200 inline-block py-0.5 px-2">保有枚数</span>
            </dt>
            <dd class="w-10/12 md:w-9/12 md:text-xs">
              {{ item.remainingCount | formatInteger }}/{{ item.parsonalUsedMaxCnt | formatInteger }}枚
            </dd>
          </template>
          <template
            v-if="
              (item.parsonalUsedMaxTotalAmt && item.remainingAmount) ||
                (item.parsonalUsedMaxTotalAmt && item.remainingAmount === 0)
            "
          >
            <dt class="w-3/12 md:w-6/12 md:text-xs">
              <span class="bg-gray-200 inline-block py-0.5 px-2"
                >利用可能残金額</span
              >
            </dt>
            <dd class="w-9/12 md:w-6/12 md:text-xs">
              {{ item.remainingAmount | formatInteger }}/{{ item.parsonalUsedMaxTotalAmt | formatInteger }}円
            </dd>
          </template>
        </template>

        <template v-if=" item.subsidCoupon === 'STAY_HEALTH' && item.remainingCountLabel && item.remainingCountLabel.length > 0">
          <dt class="w-2/12 md:w-3/12 md:text-xs">
            <span class="bg-gray-200 inline-block py-0.5 px-2">保有枚数</span>
          </dt>
          <dd class="w-10/12 md:w-9/12 md:text-xs">
            <span class="inline-block" style="margin-right: 15px;" v-for="(value,idx) in item.remainingCountLabel" :key="idx">{{ value }}枚</span>
          </dd>
        </template>

        <template v-if=" item.subsidCoupon === 'STAY_HEALTH' && item.remainingAmountLabel && item.remainingAmountLabel.length > 0">
          <dt class="w-2/12 md:w-3/12 md:text-xs">
            <span class="bg-gray-200 inline-block py-0.5 px-2">保有金額</span>
          </dt>
          <dd class="w-10/12 md:w-9/12 md:text-xs">
            <span class="inline-block" style="margin-right: 15px;" v-for="(value,idx) in item.remainingAmountLabel" :key="idx">{{ value }}円</span>
          </dd>
        </template>
        <dl
          class="flex w-full flex-wrap gap-y-2"
          v-for="(price, index) in item.priceList"
          :key="price.id"
        >
          <dt class="w-2/12 md:w-3/12 md:text-xs">
            <span
              class="bg-gray-200 inline-block py-0.5 px-2"
              v-if="index === 0"
              >補助単価</span
            >
          </dt>
          <div class="w-10/12 md:w-9/12 md:text-xs flex flex-wrap"> 
            <dd class="w-4/12 md:text-xs flex flex-wrap " :class="price.priceType === '一律' && price.ageType === '一律' ?   'md:w-3/12' : 'md:w-full'">
              <template v-if="item.subsidCoupon === 'STAY_CORPORATE'">
               
                <div class="w-6/12 md:w-3/12 flex flex-wrap ">
                  <div v-if="price.priceType !== '一律'" class="w-6/12 md:w-6/12">
                    {{ price.priceType }}
                  </div>
                  <div v-if="price.ageType !== '一律'" class="w-6/12 md:w-6/12">
                    {{ price.ageType }}
                  </div>
                </div>
                {{ price.price | formatInteger }}円
              </template>
              <template v-else>
                  {{
                  price.priceType !== '一律' && item.subsidCoupon !== 'LIFE'
                    ? `${price.priceType}（${price.ageType}）：`
                    : ''
                }}
                {{ price.price | formatInteger }}円
              </template>
            </dd>
            <div class="w-8/12 md:text-xs flex flex-wrap" :class="price.priceType === '一律' && price.ageType === '一律' ?   'md:w-9/12' : 'md:w-full'">
              <template
                v-if="isShowLimApplicableDate(item) && price.limApplicableDateFrom && price.limApplicableDateTo "
              >
                <dt class="w-4/12 md:hidden">
                  <span v-if="item.subsidCoupon !== 'LIFE'" class="bg-gray-200 py-0.5 px-2">有効期限</span>
                  <span v-if="item.subsidCoupon === 'LIFE'" class="bg-gray-200 py-0.5 px-2">利用期限</span>
                </dt>
                <dd class="w-8/12 md:w-full md:text-xs">
                  {{ $moment(price.limApplicableDateFrom).format('YYYY/MM/DD') }}
                  ~
                  {{ $moment(price.limApplicableDateTo).format('YYYY/MM/DD') }}
                </dd>
              </template>
            </div>
          </div>
        </dl>
      </dl>
      <div class="mt-4 md:text-sm">
      <div v-if="item.infoTexts" v-html="item.infoTexts" />

        <template v-if="item.subsidCoupon === 'STAY_HEALTH'">
          <div
            v-if="item.applicableDegreeCntText"
            v-html="item.applicableDegreeCntText"
          />
          <div
            v-if="item.remainingAmountLabelText"
            v-html="item.remainingAmountLabelText"
          />
        </template>
      </div>
      <!--
        補助金表示仕様の変更により一度コメントアウトします
      -->
      <!-- <div class="mt-4 md:text-sm">
        本人同行要否：
        {{
          item.personAccompanyFlg === CONST.PERSON_ACCOMPANY_FLG.NEED
            ? '必要'
            : '不要'
        }}
      </div>
      <div class="mt-4 md:text-sm">
        {{
          item.usedLimTerm === '01'
            ? '上記適用期間内での制限適用となります'
            : '月の利用制限となります'
        }}
      </div> -->
    </div>
    <Paginator
      v-if="subsidyCouponsList.length > 0"
      class="sm:w-full flex justify-center"
      :total="totalResults"
      :size="10"
      @pageChange="changePage"
    />
    </div>
  </section>
</template>
<script>
import _ from 'lodash';
import moment from 'moment';

export default {
  data: () => ({
    coupons: [],
    subsidyCoupons: [],
    page: 1,
    totalResults: 0,
    subsidyCouponsList: [],
  }),
  watch: {
    $route() {
      this.$meta.setDocumentTitle('補助クーポン');
      this.setBreadcrumb();
    },
  },
  created() {},
  async mounted() {
    this.$meta.setDocumentTitle('補助クーポン');
    this.$page.showSideMenu = true;
    this.$page.isTitle = true;
    this.setBreadcrumb();

    const coupons = await this.$repositories('mypage').getMyCoupons();
    if (coupons) {
      await this.getSubsidyCoupons(coupons.data.availableDataList);
    }
    this.coupons = coupons.data.availableDataList.data;
  },
  methods: {
    changePage(page) {
      this.page = page;
      this.$emit('pageChange', this.page);
      this.subsidyCouponsList = _.cloneDeep(this.subsidyCoupons).slice(
        (page - 1) * 10,
        (page - 1) * 10 + 10
      );
    },
    async getSubsidyCoupons(obj) {
      const currentPage = this.$route.query?.page || 1;
      this.subsidyCoupons = [];
      const today = moment().startOf('days'); // 日付比較のため.startOf('days')で時間設定を00:00:00にする
      if (obj.length > 0) {
        obj.forEach((content, index) => {
          const item = {};
          item.subsidyName = content.availableData.dispSubsidyNm;
          item.priceList = content.availableData.priceList;
          item.subsidyType = content.availableData.subsidyType;
          item.receptionDateFrom = content.availableData.receptionDateFrom;
          item.receptionDateTo = content.availableData.receptionDateTo;
          item.applicableDateFrom = content.availableData.applicableDateFrom;
          item.applicableDateTo = content.availableData.applicableDateTo;
          item.parsonalUsedMaxCnt = content.availableData.parsonalUsedMaxCnt;
          item.remainingCount = content.remainingCount;
          item.parsonalUsedMaxTotalAmt =
            content.availableData.parsonalUsedMaxTotalAmt;
          item.remainingAmount = content.remainingAmount;
          item.usedMaxTotalAmt = content.availableData.usedMaxTotalAmt;
          item.minChargeAmt = content.availableData.minChargeAmt;
          item.costUnderChargeableFlg =
            content.availableData.costUnderChargeableFlg;
          item.minTgtAge = content.availableData.minTgtAge;
          item.personAccompanyFlg = content.availableData.personAccompanyFlg;
          item.multipleUnusableFlg = content.availableData.multipleUnusableFlg;
          item.usedFormDiv = content.availableData.usedFormDiv;
          item.usedLimTerm = content.availableData.usedLimTerm;
          item.requestType = content.availableData.requestType;
          item.applicableDegreeCnt = content.availableData.applicableDegreeCnt;

          item.usedMaxCnt = content.availableData.usedMaxCnt;
          item.usedLimUnit = content.availableData.usedLimUnit;
          if (item.subsidyType === this.CONST.SUBSIDY_TYPE.STAY) {
            if (item.requestType == this.CONST.SUBSIDY_REQUEST_TYPE.CORPORATE) {
              item.subsidCoupon = 'STAY_CORPORATE';
            } else {
              item.subsidCoupon = 'STAY_HEALTH';
              let countLabelArr = content?.scrennDisplayItemList?.remainingCountLabel?.value?.split(',') || [];
              let countLabel = [];
              countLabelArr.forEach(val=>{
                if(!val.includes('上限回数') && !val.includes('|null')){
                  countLabel.push(val.replace('|','：'))
                }
              })
              item.remainingCountLabel = countLabel;
              let amountLabelArr = content?.scrennDisplayItemList?.remainingAmountLabel?.value?.split(',') || [];
              let amountLabel = [];
              amountLabelArr.forEach(val=>{
                if(!val.includes('上限金額') && !val.includes('|null')){
                  amountLabel.push(val.replace('|','：'))
                }
              })
              item.remainingAmountLabel = amountLabel;
            }
          } else {
            item.subsidCoupon = 'LIFE';
          }

          const itemTexts = {};
          // 利用上限総額（数）
          // usedLimUnit(利用制限単位)による条件分岐は不要。
          // usedLimUnitが01(個人)の場合は、usedMaxCnt・usedMaxTotalAmtはセットされない
          if (item.usedMaxCnt > 0 && item.usedMaxTotalAmt > 0) {
            itemTexts.usedMaxCnt = `所属団体様内で先着${this.$filters.formatInteger(
              item.usedMaxCnt
            )}枚まで/※本補助クーポンは数量限定となります。なくなり次第終了となりますのでご了承ください。`;
          } else if (item.usedMaxCnt > 0 && !item.usedMaxTotalAmt) {
            itemTexts.usedMaxCnt = `所属団体様内で先着${this.$filters.formatInteger(
              item.usedMaxCnt
            )}枚まで`;
          } else if (!item.usedMaxCnt && item.usedMaxTotalAmt > 0) {
            itemTexts.usedMaxCnt =
              '※本補助クーポンは数量限定となります。なくなり次第終了となりますのでご了承ください。';
          }

          // 会員最低負担額
          if (item.minChargeAmt) {
            if (item.minChargeAmt > 1) {
              itemTexts.minChargeAmt = `${this.$filters.formatInteger(
                item.minChargeAmt
              )}円以上のご負担が必要となります。`;
            } else if (item.minChargeAmt === 1) {
              itemTexts.minChargeAmt = '必ず自己負担が必要になります。';
            }
          }
          // 実費未満投入可否
          if (
            item.costUnderChargeableFlg ===
              this.CONST.COST_UNDER_CHARGEABLE_FLG.DISABLED &&
            !!item.minChargeAmt
          ) {
            itemTexts.costUnderChargeableFlg =
              '利用金額が補助金額に満たない場合は利用不可';
          }

          if (item.subsidCoupon !== 'LIFE') {
            // 対象最低年齢
            if (item.minTgtAge) {
              itemTexts.minTgtAge = `${this.$filters.formatInteger(
                item.minTgtAge
              )}歳以上が対象`;
            }
            // 本人同行要否
            if (item.personAccompanyFlg) {
              if (
                item.personAccompanyFlg === this.CONST.PERSON_ACCOMPANY_FLG.NEED
              ) {
                itemTexts.personAccompanyFlg = '家族会員のみでの利用不可';
              }
            }
          }

          // 複数使用不可
          if (item.multipleUnusableFlg) {
            switch (item.multipleUnusableFlg) {
              case this.CONST.MULTIPLE_UNUSABLE_FLG.USABLE:
                itemTexts.multipleUnusableFlg = '併用可';
                break;
              case this.CONST.MULTIPLE_UNUSABLE_FLG.UNUSABLE:
                itemTexts.multipleUnusableFlg = '併用不可';
                break;
              default:
                break;
            }
          }
          
          // 利用形態区分
          if (item.usedFormDiv) {
            switch (item.usedFormDiv) {
              case '01':
                itemTexts.usedFormDiv =
                  '対象メニューの申込で自動で利用できます';
                break;
              case '02':
                itemTexts.usedFormDiv = '利用申請があった場合のみ利用できます';
            }
          }

          if (item.subsidCoupon === 'STAY_HEALTH') {
            // applicableDegreeCnt 第×親等までを対象者として、1対象者あたり最大〇枚（円）まで利用可能です。
            let applicableDegreeCntNote = '';
            if (item.applicableDegreeCnt || item.applicableDegreeCnt === 0) {
              applicableDegreeCntNote = `第${this.$filters.formatInteger(
                item.applicableDegreeCnt
              )}親等までを対象者として、`;
            }
            if (item.parsonalUsedMaxCnt > 0) {
              item.applicableDegreeCntText =
                applicableDegreeCntNote +
                `1対象者あたり最大${this.$filters.formatInteger(
                  item.parsonalUsedMaxCnt
                )}枚までご利用いただけます`;
            } else if (item.parsonalUsedMaxTotalAmt > 0) {
              item.applicableDegreeCntText =
                applicableDegreeCntNote +
                `1対象者あたり最大${this.$filters.formatInteger(
                  item.parsonalUsedMaxTotalAmt
                )}円までご利用いただけます`;
            } else if (
              item.remainingAmount > 0 &&
              !item.parsonalUsedMaxToatlAmt
            ) {
              item.applicableDegreeCntText =
                applicableDegreeCntNote +
                `1対象者あたり最大${this.$filters.formatInteger(
                  item.remainingAmount
                )}円までご利用いただけます`;
            }
          }

          item.infoTexts = Object.values(itemTexts).join('/');

          if (this.checkNearExpriry(item)) {
            item.nearExpriry = true;
          }

          // 申込（受付）期間のFROMの1か月前～適用期間のTOの範囲にあるものを表示する
          let checkCouponAvaiable = [];
          const receptionDateFrom = item.receptionDateFrom;
          const receptionDateFromAvaiable = moment(receptionDateFrom)
            .subtract(1, 'months')
            .format('YYYY/MM/DD');
          const applicableDateTo = moment(item.applicableDateTo).format(
            'YYYY/MM/DD'
          );
          if (
            moment(receptionDateFromAvaiable,'YYYY/MM/DD').isSameOrBefore(today) &&
            moment(applicableDateTo,'YYYY/MM/DD').isSameOrAfter(today)
          ) {
            checkCouponAvaiable.push('true');
          }

          const isCouponAvaiable = checkCouponAvaiable.filter(
            (item) => item === 'true'
          );
          if (isCouponAvaiable.length > 0) {
            this.subsidyCoupons.push(item);
          }
        });
      }
      this.subsidyCoupons.sort((a, b) => {
        // 受付期間中と受付期間切れを比べた場合は、受付期限切れが後ろになるようにソートする
        if (this.checkNearExpriry(a) && !this.checkNearExpriry(b)) {
          return 1;
        }
        if (!this.checkNearExpriry(a) && this.checkNearExpriry(b)) {
          return -1;
        }
        // 受付期間中同士、受付期限切れ同士の場合は、受付期間のToが早い順にする
        return new Date(a.receptionDateTo) - new Date(b.receptionDateTo);
      });

      this.totalResults = this.subsidyCoupons?.length || 0;
      this.subsidyCouponsList = this.subsidyCoupons.slice(0, 10);

      if (
        currentPage >= Math.ceil(this.totalResults / 10) + 1 ||
        currentPage == 0
      ) {
        this.$router.push({ path: '/mypage/coupons' });
      }
    },
    /**
     * 受付期間切れかのチェック
     */
    checkNearExpriry(item) {
      const today = moment().startOf('days');
      return moment(item.receptionDateTo).isBefore(today);
    },
    /**
     * パンくずリスト作成
     */
    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb('マイページ', '/mypage')
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb('補助クーポン'));
    },
    getLifeApplicationDate(priceList) {
      let start = null,
        end = null;
      if (priceList && priceList.length > 0) {
        start = moment(priceList[0].limApplicableDateFrom);
        end = moment(priceList[0].limApplicableDateTo);

        const len = priceList.length;
        for (let i = 1; i < len; i++) {
          const price = priceList[i];
            
          if(price.limApplicableDateFrom) {
            const priceStart = moment(price.limApplicableDateFrom);
            if (priceStart.isBefore(start)) {
              start = priceStart;
            }
          }

          if (price.limApplicableDateTo) {
            const priceEnd = moment(price.limApplicableDateTo);
            if(priceEnd.isAfter(end)) {
              end = priceEnd;
            }
          }
        }
      }

      return `${start.format("YYYY/MM/DD")}～${end.format("YYYY/MM/DD")}`;
    },
    isShowLimApplicableDate(item) {
      if(item.subsidCoupon !== 'LIFE') {
        return true;
      } else if (item.priceList.length > 1) {
        return true;
      }
      return false;
    }
  },
};
</script>

<style scoped>

 .before-reserve-date {
  background-color: #c0c6c9;
 }

</style>>