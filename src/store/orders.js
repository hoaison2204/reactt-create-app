export default {
  state() {
    return {
      digiticketNoPayValue: null,
      digiticketPostValue: null,
      digiticketPageData: null,
      orderInfo: null,
      orderPostValue: null,
      cancelNo: null,
      orderCancelInfo: null,
      orderRequestTransactionId: null
    };
  },
  getters: {
    get(state) {
      return state;
    }
  },
  mutations: {
    digiticketNoPayValue(state, value) {
      state.digiticketNoPayValue = value;
    },
    digiticketPostValue(state, value) {
      state.digiticketPostValue = value;
    },
    digiticketPageData(state, value) {
      state.digiticketPageData = value;
    },
    orderInfo(state, value) {
      state.orderInfo = value;
    },
    orderPostValue(state, value) {
      state.orderPostValue = value;
    },
    cancelNo(state, value) {
      state.cancelNo = value;
    },
    orderCancelInfo(state, value) {
      state.orderCancelInfo = value;
    },
    orderRequestTransactionId(state, value) {
      state.orderRequestTransactionId = value;
    }
  }
};
