export default {
  state() {
    return {
      categoryName: null,
      categoryYear: null,
      currentPage: null,
    };
  },
  mutations: {
    categoryAll(state) {
      state.categoryName = state;
      state.categoryYear = null;
    },
    categoryName(state, value) {
      state.categoryName = value;
      state.categoryYear = null;
    },
    categoryYear(state, value) {
      state.categoryYear = value;
      state.categoryName = null;
    },
    currentPage(state, value) {
      state.currentPage = value;
    },
  },
};
