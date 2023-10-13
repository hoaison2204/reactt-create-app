export default async ({ store }, inject) => {
  inject("demo", {
    async init(data) {
      Object.keys(data).forEach((key) => {
        store.dispatch("demo/updateItem", { key: key, value: data[key] });
      });
    },

    get ids() {
      return store.getters["demo/ids"];
    },
    set ids(value) {
      return store.dispatch("demo/updateItem", {
        key: "ids",
        value: data["ids"],
      });
    },

    get header() {
      return store.getters["demo/header"];
    },
    set header(value) {
      return store.dispatch("demo/updateItem", {
        key: "header",
        value: data["header"],
      });
    },

    get footer() {
      return store.getters["demo/footer"];
    },
    set footer(value) {
      return store.dispatch("demo/updateItem", {
        key: "footer",
        value: data["footer"],
      });
    },

    get css() {
      return store.getters["demo/css"];
    },
    set css(value) {
      return store.dispatch("demo/updateItem", {
        key: "css",
        value: data["css"],
      });
    },

    get js() {
      return store.getters["demo/js"];
    },
    set js(value) {
      return store.dispatch("demo/updateItem", {
        key: "js",
        value: data["js"],
      });
    },
  });
};
