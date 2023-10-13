export default {
  state() {
    return {
      name: undefined,
      routes: undefined,
      isPageHeader: true,
      isBreadcrumb: true,
      isHeader: true,
      isPageTop: true,
      isMaintenance: false,
      isTitle: true,
      isSubHeader: false,
      isFooterText: false,
      showFooterMenu: true,
      showSideMenu: true,
      crmHeaderFlag: true,
      isPageHeader: true,
      orderStepChecked: [],
    };
  },
  mutations: {
    set(state, { name, routes }) {
      if (name) state.name = name;
      if (routes) state.routes = routes;
    },
    isPageHeader(state, flg) {
      state.isPageHeader = flg;
    },
    isBreadcrumb(state, flg) {
      state.isBreadcrumb = flg;
    },
    isHeader(state, flg) {
      state.isHeader = flg;
    },
    isPageTop(state, flg) {
      state.isPageTop = flg;
    },
    isMaintenance(state, flg) {
      state.isMaintenance = flg;
    },
    isTitle(state, flg) {
      state.isTitle = flg;
    },
    isSubHeader(state, flg) {
      state.isSubHeader = flg;
    },
    isFooterText(state, flg) {
      state.isFooterText = flg;
    },
    showFooterMenu(state, flg) {
      state.showFooterMenu = flg;
    },
    showSideMenu(state, flg) {
      state.showSideMenu = flg;
    },
    crmHeaderFlag(state, flg) {
      state.crmHeaderFlag = flg;
    },
    isPageHeader(state, flg) {
      state.isPageHeader = flg;
    },
    orderStepChecked(state, list) {
      state.orderStepChecked = list;
    },
  },
};
