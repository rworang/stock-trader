import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import vuetify from "./plugins/vuetify";
import VueDayJs from "vue-dayjs-plugin";

import router from "./router";
import store from "./store";

import vco from "v-click-outside";
import VueScrollTo from "vue-scrollto";

Vue.use(VueDayJs);
Vue.use(vco);
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});

Vue.config.productionTip = false;
Vue.prototype.$appName = "Stock Trader";

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#default");
