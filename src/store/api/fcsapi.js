import axios from "axios";
import countries from "@/data/countries";
import stocks from "@/data/stocks";

const base_url = "https://fcsapi.com/api-v2/stock";
// const api_key = "&access_key=" + "lCkUeANtGkhqy801AwWz0RiBNy6W9OROG0LrJAFECXaAez";
const api_key =
  "&access_key=" + "XvmL2QYjfPLCLLMqldUxWA6RsBFxCmxLR7I5W6sAtapQKbltGg";

const state = {
  loading: false,
  indicesId: 2,
  pageAmount: 16,
  pageList: [],
  pagePrices: [],
  pageProfiles: [],
  countries: countries,
  stocks: stocks
};

const mutations = {
  START_LOAD(state) {
    console.log("START_LOAD");
    state.loading = true;
  },
  STOP_LOAD(state) {
    console.log("STOP_LOAD");
    state.loading = false;
  },
  SET_API_MSG(state, payload) {
    state.apiMsg = payload;
  },
  SET_PAGE_STOCKS(state, payload) {
    state.pageList = payload;
    console.log(state.pageList);
  },
  SET_PAGE_PRICES(state, payload) {
    state.pagePrices = payload;
    console.log(state.pagePrices);
  },
  SET_PAGE_PROFILES(state, payload) {
    state.pageProfiles = payload;
    console.log(state.pageProfiles);
  },
  LOAD_NEXT_PAGE(state) {
    console.log("Loading next page");
    state.indicesId++;
  },
  LOAD_PREV_PAGE(state) {
    console.log("Loading prev page");
    state.indicesId--;
  },
  MERGE_STOCKS(state) {
    let merged = [];
    for (let i = 0; i < state.pageList.length; i++) {
      merged.push({
        ...state.pageList[i],
        ...state.pagePrices.find(
          itmInner => itmInner.id === state.pageList[i].stock_id
        ),
        ...state.pageProfiles.find(
          itmInner => itmInner.id === state.pageList[i].stock_id
        )
      });
    }
    console.log("Merged responses:", merged);
    state.stocks = merged;
  }
};

const actions = {
  async initStocks({ commit, dispatch }) {
    commit("START_LOAD", "getAllStocks");

    let stocks = await dispatch("loadPageStocks");
    let prices = await dispatch("loadPagePrices");
    let profiles = await dispatch("loadPageProfiles");

    return Promise.all([stocks, prices, profiles])
      .then(() => {
        commit("MERGE_STOCKS");
        commit("STOP_LOAD", "SUCCESS: initStocks");
      })
      .catch(() => {
        // console.log("prices error: /n", err);
        commit("STOP_LOAD", "ERROR: initStocks");
      });
  },
  loadPageStocks({ commit }) {
    commit("START_LOAD", "loadPageStocks");
    return axios
      .get(base_url + "/list?indices_id=" + state.indicesId + api_key)
      .then(r => {
        // console.log(r);
        console.warn("API message :", r.data.msg);
        commit("SET_PAGE_STOCKS", r.data.response);
        commit("STOP_LOAD", "SUCCESS: loadPageStocks");
      })
      .catch(() => {
        // console.log("prices error: /n", err);
        commit("STOP_LOAD", "ERROR: loadPageStocks");
      });
  },
  loadPagePrices({ commit, getters }) {
    commit("START_LOAD", "loadPagePrices");
    return axios
      .get(base_url + "/latest?id=" + getters.pageIdQuery + api_key)
      .then(r => {
        // console.log(r);
        console.warn("API message :", r.data.msg);
        commit("SET_PAGE_PRICES", r.data.response);
        commit("STOP_LOAD", "SUCCESS: loadPagePrices");
      })
      .catch(() => {
        // console.log("prices error: /n", err);
        commit("STOP_LOAD", "ERROR: loadPagePrices");
      });
  },
  loadPageProfiles({ commit, getters }) {
    commit("START_LOAD", "loadPageProfiles");
    return axios
      .get(base_url + "/profile?id=" + getters.pageIdQuery + api_key)
      .then(r => {
        // console.log(r);
        console.warn("API message :", r.data.msg);
        commit("SET_PAGE_PROFILES", r.data.response);
        commit("STOP_LOAD", "SUCCESS: loadPageProfiles");
      })
      .catch(() => {
        // console.log("prices error: /n", err);
        commit("STOP_LOAD", "ERROR: loadPageProfiles");
      });
  },
  async nextStocksPage({ commit, dispatch }) {
    commit("START_LOAD", "nextStocksPage");
    if (state.indicesId >= 1) {
      commit("LOAD_NEXT_PAGE");
      await dispatch("initStocks");
      commit("STOP_LOAD", "nextStocksPage");
    }
  },
  async prevStocksPage({ commit, dispatch }) {
    commit("START_LOAD", "prevStocksPage");
    if (state.indicesId <= 1) {
      commit("LOAD_PREV_PAGE");
      await dispatch("initStocks");
      commit("STOP_LOAD", "prevStocksPage");
    }
  }
};

const getters = {
  stocks: state => {
    return state.stocks.slice(0, state.pageAmount);
  },
  pageAmount: state => {
    return state.pageAmount;
  },
  loading: state => {
    return state.loading;
  },
  pageIdQuery: state => {
    let q = "";
    for (let i in state.pageList) {
      q += state.pageList[i].stock_id + ",";
    }
    // console.log(q);
    return q;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
