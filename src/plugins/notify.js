export default async (context, inject) => {
  inject('notifyToast', {
    get notify() {
      return context.store.getters['notify/notify'];
    },
    show ({group="error", type="error", title="", text="", duration=1000}) {
      context.store.dispatch('notify/SHOW_NOTIFY', {
        group: group,
        type: type,
        title: title,
        text: text,
        duration: duration
      });
    },
    hide () {
      context.store.dispatch('notify/HIDE_NOTIFY');
    }
  })
}
