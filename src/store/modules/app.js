export default {
  state: {
    rapport: false,
    mini: false,
    drawerItems: [
      {
        id: 0,
        type: "title",
        value: "Stock Trader",
        icon: "mdi-chevron-double-right"
      },
      {
        id: 1,
        type: "link",
        value: "Stocks",
        icon: "mdi-cash-multiple",
        to: "/"
      },
      {
        id: 2,
        type: "link",
        value: "Portfolio",
        icon: "mdi-briefcase",
        to: "/portfolio"
      },
      {
        id: 3,
        type: "link",
        value: "End Day",
        icon: "mdi-stop-circle-outline",
        to: ""
      }
    ],
    tabs: [
      {
        value: "stocks",
        to: "/"
      },
      {
        value: "portfolio",
        to: "/portfolio"
      }
    ]
  },

  mutations: {
    TOGGLE_RAPPORT(state) {
      state.rapport = !state.rapport;
    },
    SET_RAPPORT(state, payload) {
      state.rapport = payload;
    },
    TOGGLE_MINI(state) {
      state.mini = !state.mini;
    },
    SET_MINI(state, payload) {
      state.mini = payload;
    }
  },

  actions: {
    toggleRapport({ commit }) {
      commit("TOGGLE_RAPPORT");
    },
    setRapport({ commit }, payload) {
      commit("SET_RAPPORT", payload);
    },
    toggleMini({ commit }) {
      commit("TOGGLE_MINI");
    },
    setMini({ commit }, payload) {
      commit("SET_MINI", payload);
    }
  },

  getters: {
    rapport: state => {
      return state.rapport;
    },
    mini: state => {
      return state.mini;
    },
    drawerItems: state => {
      return state.drawerItems;
    },
    tabs: state => {
      return state.tabs;
    }
  }
};
