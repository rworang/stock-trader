const state = {
  dark: true
};

const mutations = {
  TOGGLE_THEME(state, payload) {
    state.dark = payload;
    // console.log("TOGGLE_THEME:", state.dark);
  }
};

const actions = {
  toggleTheme: ({ commit }, payload) => {
    commit("TOGGLE_THEME", payload);
  }
};

const getters = {
  dark() {
    return state.dark;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
