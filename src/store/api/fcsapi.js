import axios from "axios";

const base_url = "https://fcsapi.com/api-v2/forex";
const key = "&access_key=lCkUeANtGkhqy801AwWz0RiBNy6W9OROG0LrJAFECXaAez";

import symbols from "@/data/symbols";

const state = {
  loadAmount: 50,
  symbols: symbols,
  prices: [],
  apiStocks: []
};

const mutations = {
  GET_PRICES(state) {
    let q = "";
    for (let n in state.symbols.slice(0, state.loadAmount)) {
      q += state.symbols[n].symbol;
      if (parseInt(n) !== state.loadAmount - 1) {
        q += ",";
      }
    }
    axios
      .get(base_url + "/latest?symbol=" + q + key)
      .then(r => {
        state.prices = r.data.response.slice(0, state.loadAmount);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const actions = {
  getPrices: ({ commit }) => {
    commit("GET_PRICES");
  }
};

const getters = {
  loadAmount: state => {
    return state.loadAmount;
  },
  symbols: state => {
    return state.symbols.slice(0, state.loadAmount);
  },
  prices: state => {
    return state.prices;
  },
  apiStocks: state => {
    state.apiStocks = state.symbols.map((item, i) => {
      if (item.id === state.prices[i].id) {
        return Object.assign({}, item, state.prices[i]);
      }
    });
    console.log(state.apiStocks);
    return state.apiStocks;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
