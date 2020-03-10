import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import router from "./router";
import store from "./store";

import vuetify from "./plugins/vuetify";
import VueDayJs from "vue-dayjs-plugin";
import vco from "v-click-outside";

Vue.use(VueDayJs);
Vue.use(vco);

Vue.config.productionTip = false;
Vue.prototype.$appName = "Stock Trader";

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
