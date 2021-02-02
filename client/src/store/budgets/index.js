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
    async createBudget({ commit, rootState }, nom) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      return axios.post('http://localhost:3000/budgets/create', {
        params: {
          uid,
          nom,
        },
      }).then((response) => {
        const budget = {
          IdUtilisateur: uid,
          Nom: nom,
        };
        commit('ADD_BUDGET', { budget, data: response.data });
      });
    },
    async deleteBudget({ commit }, idBudget) {
      return axios.post('http://localhost:3000/budgets/delete', {
        params: {
          idBudget,
        },
      }).then(() => {
        commit('DELETE_BUDGET', idBudget);
      });
    },
  },
  mutations: {
    SET_BUDGETS(state, data) {
      state.budgets = data;
    },
    ADD_BUDGET(state, { budget, data }) {
      console.log(data);
      state.bugets.push({
        IdBudget: data.insertId,
        ...budget,
      });
    },
    DELETE_BUDGET(state, idBudget) {
      const index = state.budgets.findIndex((budget) => budget.IdBudget === idBudget);
      if (index >= 0) state.budgets.splice(index, 1);
    },
  },
});
