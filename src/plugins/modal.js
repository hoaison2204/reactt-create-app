export default async (context, inject) => {
  inject('modal', {
    get modals() {
      return context.store.getters['modal/modals'];
    },
    get inert() {
      return context.store.getters['modal/inert'];
    },
    set inert(value) {
      context.store.commit("modal/inert", value);
    },
    open (name, value={}) {
      context.store.dispatch('modal/OPEN_MODAL', {
        component: name,
        value: value
      });
    },
    close () {
      context.store.dispatch('modal/CLOSE_MODAL');
    }
  })
}
