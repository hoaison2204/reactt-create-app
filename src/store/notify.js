const namespaced = true;

const state = {
  notify: []
};

const getters = {
  notify: (state) => {
    return state.notify;
  }
};

const actions = {
  ['SHOW_NOTIFY']({commit}, params) {
    commit('SHOW_NOTIFY', params);
  },

  ['HIDE_NOTIFY']({commit}) {
    commit('HIDE_NOTIFY');
  },
};

const mutations = {
  ['SHOW_NOTIFY'](state, notify) {
    state.notify.push(notify);
  },
  ['HIDE_NOTIFY'](state) {
    state.notify.pop();
  },
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
