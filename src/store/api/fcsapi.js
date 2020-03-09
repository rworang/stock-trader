import axios from "axios";
import countries from "@/data/countries";
import stocksList from "@/data/stocksList";

const base_url = "https://fcsapi.com/api-v2/stock";
const api_key = "&access_key=lCkUeANtGkhqy801AwWz0RiBNy6W9OROG0LrJAFECXaAez";

const state = {
  loading: 0,
  currentPage: 1,
  pageAmount: 20,
  countries: countries,
  stocksList: stocksList,
  stocks: []
};

const mutations = {
  START_LOAD(state, payload) {
    console.log("Start load: " + payload);
    state.loading += 1;
  },
  STOP_LOAD(state, payload) {
    console.log("Stop load: " + payload);
    state.loading -= 1;
  },
  SET_ALL_STOCKS(state, payload) {
    state.stocks.allStocksList = payload;
    console.log("SET_ALL_STOCKS", state.stocks);
  }
};

const actions = {
  async getAllStocks({ commit, getters }) {
    commit("START_LOAD", "getAllStocks");
    return axios
      .get(base_url + "/list?country=" + getters.countryQuery + api_key)
      .then(r => {
        console.log("API message :", r.data.msg);
        commit("SET_ALL_STOCKS", r.data.response);
        commit("STOP_LOAD", "SUCCESS: getAllStocks");
      })
      .catch(error => {
        console.log("prices error: /n", error);
        commit("STOP_LOAD", "ERROR: getAllStocks");
      });
  }
};

const getters = {
  symbolQuery: state => {
    let a = state.pageAmount;
    let query = "";
    for (let n in state.symbols.slice(a - a, a)) {
      query += state.symbols[n].short_name;
      if (parseInt(n) !== a - 1) {
        query += ",";
      }
      console.log(n);
    }
    console.log(query);
    return query;
  },
  countryQuery: state => {
    let q = "";
    for (let n in state.countries) {
      q += state.countries[n] + ",";
    }
    console.log("countryQuery: ", q);
    return q;
  },
  stocks: state => {
    return state.stocks;
  },
  allStocksList: state => {
    return state.allStocksList;
  },
  pageCount: state => {
    return state.pageCount;
  },
  symbols: state => {
    return state.symbols.slice(
      state.pageAmount - state.pageAmount,
      state.pageAmount
    );
  },
  prices: state => {
    return state.prices;
  },
  profile: state => {
    return state.profile;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
