const namespaced = true;


const state = {};


const getters = {
  data: (state) => {
    return state.data || [];
  },
  dataItem: (state) => (name) => {
    return state[name] || {};
  }
};


const mutations = {
  UPDATE_ITEM(state, { key, value }) {
    state[key] = value;
  }
};


const actions = {
  updateItem({ commit, getters }, { key, value }) {
    commit('UPDATE_ITEM', { key: key, value: value });
  }
};


export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
};