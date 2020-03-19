import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import axios from "axios";
import router from "./router";
import store from "./store";

import "./plugins/auth";
import vuetify from "./plugins/vuetify";
import VueDayJs from "vue-dayjs-plugin";
Vue.use(VueDayJs);

import vco from "v-click-outside";
Vue.use(vco);

Vue.config.productionTip = false;
Vue.prototype.$appName = "Stock Trader";
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
