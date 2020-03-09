import axios from "axios";
import symbols from "@/data/symbols";

const base_url = "https://fcsapi.com/api-v2/forex";
const api_key = "&access_key=lCkUeANtGkhqy801AwWz0RiBNy6W9OROG0LrJAFECXaAez";

const state = {
  loading: 0,
  currentPage: 1,
  pageCount: 200,
  symbols: symbols,
  page: [],
  pagePrices: [],
  pageProfile: []
};

const mutations = {
  START_LOAD(state) {
    console.log("Start load");
    state.loading += 1;
  },
  STOP_LOAD(state) {
    console.log("Stop load");
    state.loading -= 1;
  },
  STOCKS_PAGE_DATA(state) {
    console.log("Setting stocks page data for page " + state.currentPage);
    let pc = state.pageCount;
    state.page = state.symbols.slice(pc - pc, pc);
  }
};

const actions = {
  async getStocks({ commit, getters, dispatch }) {
    commit("START_LOAD");
    let data = [];
    return axios
      .get(base_url + "/latest?symbol=" + getters.symbolQuery + api_key)
      .then(r => {
        data = r.data.response;
        state.pagePrices = data.slice(0, state.pageCount);
        // state.prices = prices;
        console.log(state.pagePrices);

        dispatch("getProfile");
      })
      .catch(error => {
        console.log("prices error: /n", error);
      });
  },
  async getProfile({ commit, getters }) {
    let data = [];

    return axios
      .get(base_url + "/profile?symbol=" + getters.symbolQuery + api_key)
      .then(r => {
        data = r.data.response;
        state.pageProfile = data.slice(
          state.pageCount - state.pageCount,
          state.pageCount
        );
        console.log(state.pageProfile);

        commit("STOP_LOAD");
      })
      .catch(error => {
        console.log("profile error: /n", error);
      });
  }
};

const getters = {
  symbolQuery: state => {
    let a = state.pageCount;
    let query = "";
    for (let n in state.symbols.slice(a - a, a)) {
      query += state.symbols[n].symbol;
      if (parseInt(n) !== a - 1) {
        query += ",";
      }
    }
    console.log(query);
    return query;
  },
  pageCount: state => {
    return state.pageCount;
  },
  symbols: state => {
    return state.symbols.slice(0, state.pageCount);
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
