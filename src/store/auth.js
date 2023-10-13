export default {
  state() {
    return {
      user: undefined,
      authenticate: false,
      lastUserOperationDate: null,
      subscriptions: null
    };
  },
  getters: {
    get(state) {
      return state;
    },
    isLoggedIn(state) {
      return Boolean(state.user);
    }
  },
  mutations: {
    set(
      state,
      { user, authenticate, subscriptions }
    ) {
      if (user) {
        state.user = user;
      }
      if (authenticate) {
        state.authenticate = authenticate;
      } else {
        state.authenticate = false;
      }
      if (subscriptions) {
        state.subscriptions = subscriptions;
      }
    },
    removeUser(state) {
      state.user = undefined;
    },
    remove(state) {
      state.user = undefined;
    },
    setLastUserOperationDate(state, value) {
      state.lastUserOperationDate = value;
    }
  }
};
