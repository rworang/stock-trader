import axios from "axios";
import countries from "@/data/countries";

const base_url = "https://fcsapi.com/api-v2/stock";
const api_key =
  "&access_key=" + "lCkUeANtGkhqy801AwWz0RiBNy6W9OROG0LrJAFECXaAez";

const state = {
  loading: 0,
  indicesId: 1,
  pageList: [],
  pagePrices: [],
  countries: countries,
  stocks: []
};

const mutations = {
  START_LOAD(state, payload) {
    let m = payload;
    m;
    // console.log("<-##-- Start load: " + payload + " --##->");
    state.loading += 1;
  },
  STOP_LOAD(state, payload) {
    let m = payload;
    m;
    // console.log("<-##-- Stop load: " + payload + " --##->");
    state.loading -= 1;
  },
  SET_PAGE_STOCKS(state, payload) {
    // console.log("SET_PAGE_STOCKS: Setting initial page stocks \n", payload);
    state.pageList = payload;
  },
  SET_PAGE_PRICES(state, payload) {
    // console.log(
    //   "SET_PAGE_PRICES: Setting initial page stock prices \n",
    //   payload
    // );
    state.pagePrices = payload;
  },
  MERGE_STOCKS(state) {
    // console.log(
    //   "MERGE_STOCKS: Merging pageList & pagePrices into stocks object."
    // );
    let merged = [];
    for (let i = 0; i < state.pageList.length; i++) {
      merged.push({
        ...state.pageList[i],
        ...state.pagePrices.find(
          itmInner => itmInner.id === state.pageList[i].stock_id
        )
      });
    }
    console.log(merged);
    state.stocks = merged;
  }
};

const actions = {
  async initStocks({ commit, dispatch }) {
    commit("START_LOAD", "getAllStocks");

    let stocks = await dispatch("loadPageStocks");
    let prices = await dispatch("loadPagePrices");

    return Promise.all([stocks, prices])
      .then(() => {
        commit("MERGE_STOCKS");
        commit("STOP_LOAD", "SUCCESS: initStocks");
      })
      .catch(err => {
        console.log("prices error: /n", err);
        commit("STOP_LOAD", "ERROR: initStocks");
      });
  },
  loadPageStocks({ commit }) {
    commit("START_LOAD", "loadPageStocks");
    return axios
      .get(base_url + "/list?indices_id=" + state.indicesId + api_key)
      .then(r => {
        console.warn("API message :", r.data.msg);
        commit("SET_PAGE_STOCKS", r.data.response);
        commit("STOP_LOAD", "SUCCESS: loadPageStocks");
      })
      .catch(err => {
        console.log("prices error: /n", err);
        commit("STOP_LOAD", "ERROR: loadPageStocks");
      });
  },
  loadPagePrices({ commit, getters }) {
    commit("START_LOAD", "loadPagePrices");
    return axios
      .get(base_url + "/latest?id=" + getters.pageIdQuery + api_key)
      .then(r => {
        console.warn("API message :", r.data.msg);
        commit("SET_PAGE_PRICES", r.data.response);
        commit("STOP_LOAD", "SUCCESS: loadPagePrices");
      })
      .catch(err => {
        console.log("prices error: /n", err);
        commit("STOP_LOAD", "ERROR: loadPagePrices");
      });
  }
};

const getters = {
  stocks: state => {
    return state.stocks;
  },
  pageIdQuery: state => {
    let q = "";
    for (let i in state.pageList) {
      q += parseInt(i) + 1 + ",";
    }
    return q;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
