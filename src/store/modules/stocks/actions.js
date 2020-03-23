export const actions = {
  setStocksIndex: ({ state, commit }, pageSize) => {
    if (state.stocksIndex.length !== pageSize) {
      let index = [];
      for (let i = 0; i < pageSize; i++) {
        index.push(parseInt(state.stocksList[i].id));
      }
      commit("SET_STOCKS_INDEX", index);
    }
  },
  findStock: ({ getters: g }, { id, from }) => {
    const index = g.stocksIndex;
    let d = [],
      f = from.toString().toLowerCase(),
      c = function(v) {
        return g.categories[v].toString().toLowerCase();
      },
      p = function(g) {
        for (let si = 0; si < index.length; si++) {
          if (index[si] === id) {
            let st = g.find(e => parseInt(e.id) === parseInt(id));
            d.push(st);
          }
        }
      };
    for (let i = 0; i < g.categories.length; i++) {
      if (c(i) === f) {
        p(g.list[i]);
      }
    }
    const r = d.find(e => parseInt(e.id) === parseInt(id));
    if (r) {
      return r;
    }
    return false;
  },
  getTopRank: ({ getters: g }) => {
    return g.stocksPrices.sort((a, b) => b.price - a.price).slice(0, 10);
  }
};
