export default async (context, inject) => {
  inject("wovn", {
    get getLang() {
      return context.store.getters["wovn/getLang"];
    },
    set setLang(value) {
      context.store.commit("wovn/changeLang", value);
    }
  });
};
