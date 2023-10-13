export default async (context, inject) => {
  inject("page", {
    get routes() {
      return context.store.state.page.routes || [];
    },
    set routes(value) {
      context.store.commit("page/set", { routes: value });
    },
    get name() {
      if (this.routes.length === 0) return;
      return ([...this.routes].reverse().find((x) => x.name) || {}).name;
    },
    get path() {
      return (this.routes.slice(-1)[0] || context.$route).path;
    },
    get number() {
      return Number.parseInt(context.$route.query.page) || 1;
    },

    get isPageHeader() {
      return context.store.state.page.isPageHeader;
    },
    set isPageHeader(value) {
      context.store.commit("page/isPageHeader", value);
    },

    get isBreadcrumb() {
      return context.store.state.page.isBreadcrumb;
    },
    set isBreadcrumb(value) {
      context.store.commit("page/isBreadcrumb", value);
    },

    get isHeader() {
      return context.store.state.page.isHeader;
    },
    set isHeader(value) {
      context.store.commit("page/isHeader", value);
    },

    get isPageTop() {
      return context.store.state.page.isPageTop;
    },
    set isPageTop(value) {
      context.store.commit("page/isPageTop", value);
    },

    get isMaintenance() {
      return context.store.state.page.isMaintenance;
    },
    set isMaintenance(value) {
      context.store.commit("page/isMaintenance", value);
    },

    get isTitle() {
      return context.store.state.page.isTitle;
    },
    set isTitle(value) {
      context.store.commit("page/isTitle", value);
    },

    get isSubHeader() {
      return context.store.state.page.isSubHeader;
    },
    set isSubHeader(value) {
      context.store.commit("page/isSubHeader", value);
    },

    get isFooterText() {
      return context.store.state.page.isFooterText;
    },
    set isFooterText(value) {
      context.store.commit("page/isFooterText", value);
    },

    get showFooterMenu() {
      return context.store.state.page.showFooterMenu;
    },
    set showFooterMenu(value) {
      context.store.commit("page/showFooterMenu", value);
    },

    get showSideMenu() {
      return context.store.state.page.showSideMenu;
    },
    set showSideMenu(value) {
      context.store.commit("page/showSideMenu", value);
    },

    // CRM汎用の未認証時直たたきURL対応
    get crmHeaderFlag() {
      return context.store.state.page.crmHeaderFlag;
    },
    set crmHeaderFlag(value) {
      context.store.commit("page/crmHeaderFlag", value);
    },

    get orderStepChecked() {
      return context.store.state.page.orderStepChecked;
    },
    set orderStepChecked(value) {
      context.store.commit("page/orderStepChecked", value);
    },

    /**
     * パンくずリストの設定オブジェクトフォーマット
     */
    formatBreadcrumb(name, path = "") {
      return {
        name: name,
        path: path,
      };
    },
    /**
     * パンくずリスト設定
     */
    setBreadcrumb(item) {
      let checkDuplicate = "";
      if (this.routes && this.routes.length > 0) {
        checkDuplicate = this.routes.find((i) => i.name == item.name);
      }
      if (checkDuplicate) {
        return;
      } else {
        this.routes.push(item);
      }
    },
  });
};
