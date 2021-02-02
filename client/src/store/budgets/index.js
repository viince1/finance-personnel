import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    budgets: [],
  },
  actions: {
    async getBudgets({ commit, rootState }) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      await axios.get('http://localhost:3000/budgets', {
        params: {
          uid,
        },
      }).then((response) => {
        commit('SET_BUDGETS', response.data);
      });
    },
  },
  mutations: {
    SET_BUDGETS(state, data) {
      state.budgets = data;
    },
  },
});
