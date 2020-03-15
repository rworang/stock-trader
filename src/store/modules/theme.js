// import vue from "vue";

const state = {
  theme: true
};

const mutations = {
  TOGGLE_THEME(state, bool) {
    console.log(state, bool);
    state.theme = bool;
  }
};

const actions = {
  toggleTheme: ({ commit }, bool) => {
    commit("TOGGLE_THEME", bool);
  }
};

const getters = {
  theme() {
    return state.theme;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
