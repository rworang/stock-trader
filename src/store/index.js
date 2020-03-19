import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import fcsapi from "./api/fcsapi";

import api from "./modules/api";
import app from "./modules/app";
import theme from "./modules/theme";
import portfolio from "./modules/portfolio";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    portfolio: state.portfolio,
    theme: state.theme
  })
});

// console.log(vuexLocal.storage);

export default new Vuex.Store({
  modules: {
    api,
    app,
    theme,
    portfolio,
    fcsapi
  },
  plugins: [vuexLocal.plugin]
});
