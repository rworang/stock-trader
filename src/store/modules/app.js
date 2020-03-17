const state = {
  rapport: false,
  mini: true,
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
  ]
};

const mutations = {
  TOGGLE_RAPPORT(state) {
    state.rapport = !state.rapport;
  },
  TOGGLE_MINI(state) {
    state.mini = !state.mini;
  }
};

const actions = {
  toggleRapport({ commit }) {
    commit("TOGGLE_RAPPORT");
  },
  toggleMini({ commit }) {
    commit("TOGGLE_MINI");
  }
};

const getters = {
  rapport: state => {
    return state.rapport;
  },
  mini: state => {
    return state.mini;
  },
  drawerItems: state => {
    return state.drawerItems;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
