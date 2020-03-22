import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import axios from "axios";
import router from "./router";
import store from "./store";

import vuetify from "./plugins/vuetify";
import "./plugins/auth";
import "./plugins/click-outside";
import "./plugins/dayjs";
import "./plugins/page-transitions";

Vue.config.productionTip = false;
Vue.prototype.$appName = "Stock Trader";
Vue.prototype.$axios = axios;

import PageTransition from "./components/PageTransition";
Vue.component("app-page-transition", PageTransition);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
