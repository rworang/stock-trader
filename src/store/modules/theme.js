export default {
  state: {
    dark: false
  },
  mutations: {
    TOGGLE_THEME(state, payload) {
      state.dark = payload;
    }
  },
  actions: {
    toggleTheme: ({ commit }, payload) => {
      commit("TOGGLE_THEME", payload);
    }
  },
  getters: {
    dark() {
      return this.state.dark;
    }
  }
};
