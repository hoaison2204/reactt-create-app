import CONST_DATA from "@/mixins/const/constData";

export default {
  state() {
    return {
      availableDataList: null
    };
  },
  getters: {
    get(state) {
      return Array.isArray(state.availableDataList)
        ? state.availableDataList
        : [];
    }
  },
  mutations: {
    set(state, value) {
      state.availableDataList = value;
    },
    setSubsidy(state, value) {
      state.availableDataList = value.availableDataList;
      localStorage.subsidy = JSON.stringify(value.availableDataList);
    },
    remove(state) {
      state.availableDataList = null;
      delete localStorage.subsidy;
    }
  },
  actions: {
    async getSubsidy(context) {
      console.log("getSubsidy actions start");
      if (context.state.availableDataList) {
        console.log("exists availableDataList");
        // 既に保持している場合は何もしない
        return;
      }

      const userInfo = localStorage.benefitstationFront
        ? JSON.parse(localStorage.benefitstationFront)
        : null;

      console.log("userInfo");
      console.log(userInfo);
      if (userInfo && userInfo.auth && userInfo.auth.user) {
        // ログイン情報あり
        console.log("exists login");
        console.log(localStorage.subsidy);
        const subsidyData = localStorage.subsidy
          ? JSON.parse(localStorage.subsidy)
          : null;
        console.log("aaaa");
        console.log(subsidyData);
        if (subsidyData && Array.isArray(subsidyData)) {
          // 既に利用可能補助金の取得済
          await context.commit("set", subsidyData);
          console.log("exists subsidyData");
        } else {
          console.log("no subsidyData");
          try {
            const toDoubleDigits = function(num) {
              num += "";
              if (num.length === 1) {
                num = "0" + num;
              }
              return num;
            };
            const today = new Date(),
              dateStr = `${today.getFullYear()}-${toDoubleDigits(
                today.getMonth() + 1
              )}-${toDoubleDigits(today.getDate())}`;

            // 利用可能補助金の取得
            const subsidy = await this._vm
              .$repositories("subsidy")
              .getSubsidyAvailableLogin({
                customerNo: userInfo.auth.user.ssoCustomerNo,
                displayDiv: CONST_DATA.DISPLAY_DIV.MYPAGE,
                subscription_id: userInfo.auth.user.ssoSubscriptionId,
                reserveDateFrom: dateStr,
                reserveDateTo: dateStr
              });
            console.log("subsidy");

            console.log(subsidy);
            await context.commit("setSubsidy", subsidy.data);
          } catch (e) {
            console.error(e);
          } finally {
          }
        }
      }
    }
  }
};
