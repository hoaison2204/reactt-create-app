<template>
  <!-- 「補助クーポン」非対応ICサイトからマイページに遷移した場合は、非表示 -->
  <div v-if="mypageDisplayCode  && !fromSiteUnsupported(mypageDisplayCode, 'hitaikou')"
      class="p-mypage__outline"
      :class="{ 'p-mypage__outline--no-contents': $route.query.no_result }"
  >
    <div class="c-card">
      <div class="c-card__content">
        <div class="c-card__inner2">
          <div class="p-mypage-outline__summary">
            <div class="p-mypage-outline__summary__title">
              <h2 class="c-title5">補助クーポン</h2>
              <div class="p-mypage-outline__summary__arrow">
                <a :href="domainMypage + '/mypage/coupons'">
                  <Icon name="arrow_right" />
                </a>
              </div>
            </div>

            <div class="p-mypage-outline__summary__content">
              <div class="" v-for="(item, index) in subsidies" :key="index" >
                <SubsidyItem :subsidy="item" :isLast="subsidies.length == index + 1"/>
              </div>
            </div>

          </div>
        </div>
        <p v-if="mypageDisplayCode && !fromSiteUnsupported(mypageDisplayCode,'family')" class="outline__info">※ ベネポを統合している方は、統合された補助クーポン数を表示しています。</p>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import SubsidyItem from "@/components/itemBox/SubsidyItem";
export default {
  name: "OutlineInfo",
  props: {
    data: {
      type: [Object, Array]
    },
    mypageBoCode: {
      type: String
    },
    mypageDisplayCode: {
      type: String
    }
  },
  components: {
    SubsidyItem
  },
  data() {
    return {
      subsidies: [],
      subsidiesDatas: [],
      subsidiess: [
        {
          availableData: {
            dispSubsidyNm: "補助クーポン",
            receptionDateTo: "2021/01/01",
          },
          remainingCount: 6,
          subText: "総保有ベネポ総保有ベネポ総保有ベネポ総保有ベネポ"
        },
        {
          availableData: {
            dispSubsidyNm: "補助クーポン",
            receptionDateTo: "2021/01/01",
          },
          remainingCount: 7,
          subText: "総保有ベネポ総保有ベネポ総保有ベネポ総保有ベネポ"
        },
        {
          availableData: {
            dispSubsidyNm: "補助クーポン",
            receptionDateTo: "2021/01/01",
          },
          subText: "総保有ベネポ総保有ベネポ総保有ベネポ総保有ベネポ",
          members: ["総保", "ベネ", "ポ総"]
        },
      ],
    }
  },
  async created() {
    this.subsidiesDataGen();
  },
  async beforeMount() {
    // await this.$store.dispatch("subsidy/getSubsidy");
    // const subsidyData = this.$store.state.subsidy.availableDataList;
    // this.subsidies = subsidyData;
    // console.log('this.subsidies', this.subsidies)
  },
  computed: {
    domainMypage() {
      return this.getMypageDomain(this.mypageDisplayCode);
    },
  },
  methods: {
    subsidiesDataGen(){
      this.subsidiesDatas = this.$props;
      this.$props.forEach((item) => {
        console.log('item',item);
      });
      // const remainingCount = this.subsidiesDatas.data.remainingCount;
      console.log('availableDataList', availableDataList);
      // console.log('remainingCount', remainingCount);
      // this.subsidiesDatas.availableDataList.forEach( (item) => {
      // })
    }
  },
}
</script>
<style></style>
