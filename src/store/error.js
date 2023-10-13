export default {
  state() {
    return {
      code: null,
      url: null,
      data: null
    };
  },
  mutations: {
    code(state, value) {
      state.code = value;
    },
    url(state, value) {
      state.url = value;
    },
    data(state, value) {
      state.data = value;
    },
    reset(state) {
      state.code = null;
      state.url = null;
      state.data = null;
    }
  },
};
