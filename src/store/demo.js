const namespaced = true;


const state = {
  ids: [],
  header: '',
  footer: '',
  css: '',
  js: ''
};


const getters = {
  ids: (state) => {
    return state.ids || [];
  },
  header: (state) => {
    return state.header || '';
  },
  footer: (state) => {
    return state.footer || '';
  },
  css: (state) => {
    return state.css || '';
  },
  js: (state) => {
    return state.js || '';
  }
};


const mutations = {
  UPDATE_ITEM(state, { key, value }) {
    state[key] = value;
  }
};


const actions = {
  updateItem({ commit, getters }, { key, value }) {
    if (key === 'header' || key === 'footer') {
      // CMSから取得した特定の文字列へ対する処理
      const regex = {
        brackets: /(<%%\s* | \s*%%>)/g,
        components: {
          component1: /<%% component1 %%>/g
        },
        menuIds: /(<%%)\s*menu_ids=.*?(%%>)/g,
      };

      // コンポーネント置換
      if (value.search(regex.components.component1 > -1)) {
        value = value.replaceAll(
          regex.components.component1,
          '<Icon name="action_circle_plus_fill" />'
        );
      }

      // 所定の値が含まれたときの処理
      if (value.search(regex.menuIds) > -1) {
        const matches = value.match(regex.menuIds);
        matches.forEach(matchItem => {
          const options = (matchItem.replace(regex.brackets, '').split('='));
          value = value.replaceAll(
            matchItem,
            `<DemoCmsString option-key=${options[0]} option-values = ${options[1]} />`
          );
        });
      }
    }
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