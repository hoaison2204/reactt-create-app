export default async (context, inject) => {
  inject("error", {
    get code() {
      return context.store.state.error.code || null;
    },
    set code(value) {
      context.store.commit("error/code", value);
    },
    get url() {
      return context.store.state.error.url || null;
    },
    set url(value) {
      context.store.commit("error/url", value);
    },
    get data() {
      return context.store.state.error.data || null;
    },
    set data(value) {
      context.store.commit("error/data", value);
    },
    reset() {
      context.store.commit("error/reset");
    },
    handling(link = '') {
      if(this.code < 400) return;
      console.log({
        code: this.code,
        url: this.url,
        data: this.data
      });
      context.$loading.finishProcessing();
      if(link) context.router.push(link);
    }
  });
};
