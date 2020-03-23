import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import api from "./modules/api";
import app from "./modules/app";
import theme from "./modules/theme";
import stocks from "./modules/stocks/index";
import portfolio from "./modules/portfolio";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    portfolio: state.portfolio,
    theme: state.theme,
    stocks: state.stocks
  })
});

// console.log(vuexLocal.storage);

export default new Vuex.Store({
  modules: {
    api,
    app,
    theme,
    stocks,
    portfolio
  },
  plugins: [vuexLocal.plugin]
});
