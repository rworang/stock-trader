const state = {
  rapport: false,
  mini: true
};

const mutations = {
  TOGGLE_RAPPORT(state) {
    console.log("FROM: " + state.rapport + " TO: " + !state.rapport);
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
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
