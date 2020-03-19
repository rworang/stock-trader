export default {
  state: {
    errorsMessage: null,
    successMessage: null,
    loading: false
  },
  mutations: {
    SET_ERRORS(state, value) {
      state.errorsMessage = value;
    },
    SET_SUCCESS_MESSAGE(state, value) {
      state.successMessage = value;
    },
    SET_LOADING(state, value) {
      console.log(value);
      state.loading = value;
    }
  },
  actions: {
    setLoading({ commit }, value) {
      commit("SET_LOADING", value);
    }
  },
  getters: {
    rapport: state => {
      return state.rapport;
    }
  }
};
