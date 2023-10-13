export default {
  state() {
    return {
      lang: "ja"
    };
  },
  getters: {
    getLang(state) {
      return state.lang;
    }
  },
  mutations: {
    changeLang(state, value) {
      state.lang = value;
    }
  }
};
