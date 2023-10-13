import "@/assets/css/style.scss";
import "@/assets/css/tailwind.css";
import "@/main.components";
import App from "@/App.vue";
import Vue from "vue";
import plugins from "@/plugins";
import router from "@/router";
import store from "@/store";
import VueHead from "vue-head";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueNotifications from "vue-notification";
import "swiper/css/swiper.css";
import "wicg-inert";
import VueGtag from "vue-gtag";

import 'slick-carousel';
import jQuery from 'jquery';
global.jquery = jQuery;
global.$ = jQuery;
window.$ = window.jQuery = require('jquery');

// Filters
import "@/filters";

import Clipboard from "v-clipboard";
// import Clipboard from "vue-clipboard2";
Vue.use(Clipboard);

import "@/assets/css/toastr.css";
import Toasted from "vue-toasted";

import Const from "@/mixins/const/setMixins";
import FromSite from "@/mixins/fromSite";
import Device from "@/mixins/device";

Vue.use(Toasted, {
  position: "top-right",
  duration: 3000
});
Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GOOGLE_CODE }
});

Vue.config.productionTip = false;
Vue.prototype.$filters = Vue.options.filters;

const context = {
  router,
  store
};

for (const plugin of plugins) {
  function inject(name, value) {
    const prop = "$" + name.replace(/^\$+/g, "");
    Vue.prototype[prop] = Vue.observable(value);
    context[prop] = Vue.prototype[prop];
  }
  Vue.use({
    install(Vue, options) {
      plugin(context, inject);
    }
  });
}
Vue.use(VueHead);
Vue.use(VueAwesomeSwiper);
Vue.use(VueNotifications);
Vue.use(VueNotifications);

Vue.mixin(Const);
Vue.mixin(FromSite);
Vue.mixin(Device);

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    context.$route = this.$route;
  },
  mixins: []
}).$mount("#app");
