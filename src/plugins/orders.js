export default async (context, inject) => {
  inject("orders", {
    /**
     * デジチケデジポン支払いなしの場合の完了画面用データ
     */
    get digiticketNoPayValue() {
      return context.store.state.orders.digiticketNoPayValue;
    },
    set digiticketNoPayValue(value) {
      context.store.commit("orders/digiticketNoPayValue", value);
    },
    /**
     * デジチケデジポン申込み
     */
    get digiticketPostValue() {
      return context.store.state.orders.digiticketPostValue;
    },
    set digiticketPostValue(value) {
      context.store.commit("orders/digiticketPostValue", value);
    },
    /**
     * デジチケデジポンページ復元用データ
     */
    get digiticketPageData() {
      return context.store.state.orders.digiticketPageData;
    },
    set digiticketPageData(value) {
      context.store.commit("orders/digiticketPageData", value);
    },

    get cancelNo() {
      return context.store.state.orders.cancelNo;
    },
    set cancelNo(value) {
      context.store.commit("orders/cancelNo", value);
    },
    set orderCancelInfo(value) {
      context.store.commit("orders/orderCancelInfo", value)
    }
    // ,
    // get orderCancelInfo() {
    //   return context.store.state.order.orderCancelInfo
    // }
  });
};
