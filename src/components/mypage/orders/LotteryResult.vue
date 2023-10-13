<!-- 抽選結果 -->
<template>
  <div v-if="lottery" class="font-bold">
    <p v-if="result == CONST.LOTTERY_RESULT.WIN">抽選状況：当選しました！</p>
    <p v-else-if="result == CONST.LOTTERY_RESULT.LOSE">抽選状況：落選しました。</p>
    <p v-else>
      抽選状況：抽選前
      <br class="hidden md:block" />
      <span class="font-normal text-sm md:text-xs ml-3 md:ml-0">当選が確定したらお支払いが発生します。</span>
    </p>
    <!-- <p>抽選状況：当選者の辞退が発生したため、繰り上げ当選しました！</p> -->
  </div>
</template>

<script>
export default {
  name: "LotteryResult",
  props: ["acptNo", "lotteryObj"],
  data() {
    return {
      lottery: null,
      result: null
    };
  },
  mounted() {
  },
  computed: {},
  watch: {
    lotteryObj: {
      deep: true,
      handler(val) {
        this.getLotteryResult(val);
      }
    }
  },
  methods: {
    getLotteryResult(lotteryObj) {
      this.result = null;
      this.lottery = null;
      this.lottery = _.get(lotteryObj, 'lotteryInfo', null);
      this.result = _.get(lotteryObj, 'lotteryResult', null);
    }
  }
};
</script>
