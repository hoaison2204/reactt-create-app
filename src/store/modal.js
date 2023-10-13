const namespaced = true;

const state = {
  modals: [],
  inert: false
};

const getters = {
  modals: (state) => {
    return state.modals;
  },
  inert: (state) => {
    return state.inert;
  }
};

const actions = {
  ['OPEN_MODAL']({commit}, params) {
    commit('OPEN_MODAL', params);
  },

  ['CLOSE_MODAL']({commit}) {
    commit('CLOSE_MODAL');
  },
};

const mutations = {
  ['OPEN_MODAL'](state, modal) {
    state.modals.push(modal);
  },
  ['CLOSE_MODAL'](state) {
    state.modals.pop();
  },
  inert(state, flg) {
    state.inert = flg;
  }
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
