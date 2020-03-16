import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import fcsapi from "./api/fcsapi";

import theme from "./modules/theme";
// import stocks from "./modules/stocks";
import portfolio from "./modules/portfolio";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ portfolio: state.portfolio })
});

// console.log(vuexLocal.storage);

export default new Vuex.Store({
  modules: {
    theme,
    portfolio,
    fcsapi
  },
  plugins: [vuexLocal.plugin]
});
