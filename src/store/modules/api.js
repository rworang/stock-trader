export default {
  state: {
    errorsMessage: null,
    successMessage: null,
    loading: false
  },
  mutations: {
    SET_ERRORS(state, value) {
      // console.log("err: ", value);
      state.errorsMessage = value;
    },
    SET_SUCCESS_MESSAGE(state, value) {
      // console.log("succ: ", value);
      state.successMessage = value;
    },
    SET_LOADING(state, value) {
      // console.log("load: ", value);
      state.loading = value;
    }
  },
  actions: {
    setLoading({ commit }, value) {
      commit("SET_LOADING", value);
    }
  },
  getters: {
    loading: state => {
      return state.loading;
    }
  }
};
