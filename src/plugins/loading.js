export default async (context, inject) => {
  inject('loading', {
    get isLoading() {
      return context.store.getters['loading/isLoading'];
    },
    get isProcessing() {
      return context.store.getters['loading/isProcessing'];
    },
    startLoading () {
      context.store.dispatch('loading/START_LOADING', true);
    },
    finishLoading () {
      context.store.dispatch('loading/FINISH_LOADING');
    },
    startProcessing () {
      context.store.dispatch('loading/START_PROCESSING', true);
    },
    finishProcessing () {
      context.store.dispatch('loading/FINISH_PROCESSING');
    }
  })
}
