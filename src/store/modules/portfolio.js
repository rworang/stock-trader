const state = {
  funds: 2500000,
  stocks: []
};

const mutations = {
  BUY_STOCK(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find(element => element.id === stockId);
    if (record) {
      record.quantity += quantity;
    } else {
      state.stocks.push({
        id: stockId,
        quantity: quantity,
        bought_at: stockPrice
      });
      console.log(state.stocks);
    }
    state.funds -= stockPrice * quantity;
  },
  SELL_STOCK(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find(element => element.id === stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * quantity;
  },
  SET_PORTFOLIO(state, portfolio) {
    state.funds = portfolio.funds;
    state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
  }
};

const actions = {
  buyStock: ({ commit }, order) => {
    commit("BUY_STOCK", order);
  },
  sellStock({ commit }, order) {
    commit("SELL_STOCK", order);
  }
};

const getters = {
  stockPortfolio: (state, getters) => {
    return state.stocks.map(stock => {
      console.log(state.stocks);
      const record = getters.stocks.find(element => element.id === stock.id);
      console.log(stock);
      return {
        id: stock.id,
        quantity: stock.quantity,
        bought_at: stock.bought_at,

        short_name: record.short_name,
        name: record.name,
        price: record.price,
        low: record.low,
        high: record.high,
        chg: record.chg,
        chg_percent: record.chg_percent,
        country: record.country,
        dateTime: record.dateTime,
        full_name: record.full_name,
        sector: record.sector,
        industry: record.industry,
        no_of_employee: record.no_of_employee,
        info: record.info
      };
    });
  },
  funds: state => {
    return state.funds;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
