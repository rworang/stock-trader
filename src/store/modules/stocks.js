// // import stocks from "@/data/stocks";
//
// const state = {
//   loading: true
// };
//
// const mutations = {
//   SET_STOCKS(state, stocks) {
//     state.stocks.sort(function(a, b) {
//       let nameA = a.name.toUpperCase();
//       let nameB = b.name.toUpperCase();
//       if (nameA > nameB) {
//         return 1;
//       }
//       if (nameA < nameB) {
//         return 0;
//       }
//     });
//     state.stocks = stocks;
//     state.loading = false;
//   },
//   RND_STOCKS(state) {
//     state.stocks.forEach(stock => {
//       stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
//     });
//   }
// };
//
// const actions = {
//   buyStock: ({ commit }, order) => {
//     commit("BUY_STOCK", order);
//   },
//   initStocks: ({ commit }) => {
//     commit("SET_STOCKS", stocks);
//   },
//   randStocks: ({ commit }) => {
//     commit("RND_STOCKS");
//   }
// };
//
// const getters = {
//   stocks: state => {
//     return state.stocks;
//   },
//   loading: state => {
//     return state.loading;
//   }
// };
//
// export default {
//   state,
//   mutations,
//   actions,
//   getters
// };
