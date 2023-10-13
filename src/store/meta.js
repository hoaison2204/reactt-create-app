export default {
  state() {
    return {
      data: []
    };
  },
  mutations: {
    set(state, value) {
      state.data = value;
    }
  },
};