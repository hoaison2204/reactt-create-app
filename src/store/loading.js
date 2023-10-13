const namespaced = true;

const state = {
  isLoading: [],
  isProcessing: []
};

const getters = {
  isLoading: (state) => {
    return state.isLoading;
  },
  isProcessing: (state) => {
    return state.isProcessing;
  }
};

const actions = {
  ['START_LOADING']({commit}, params) {
    commit('START_LOADING', params);
  },
  ['FINISH_LOADING']({commit}) {
    commit('FINISH_LOADING');
  },
  ['START_PROCESSING']({commit}, params) {
    commit('START_PROCESSING', params);
  },
  ['FINISH_PROCESSING']({commit}) {
    commit('FINISH_PROCESSING');
  },
};

const mutations = {
  ['START_LOADING'](state, isLoading) {
    state.isLoading.push(isLoading);
  },
  ['FINISH_LOADING'](state) {
    state.isLoading.pop();
  },
  ['START_PROCESSING'](state, isProcessing) {
    state.isProcessing.push(isProcessing);
  },
  ['FINISH_PROCESSING'](state) {
    state.isProcessing.pop();
  },
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
