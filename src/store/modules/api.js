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
      state.loading = value;
    }
  }
};
