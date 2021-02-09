import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    budgets: [],
    budgetIdCurr: 1,
    sommeParCategories: [],
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
    async createBudget({ commit, rootState }, { budget }) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      return axios.post('http://localhost:3000/budgets/create', {
        params: {
          budget,
          uid,
        },
      }).then((response) => {
        const data = {
          IdUtilisateur: uid,
          IdBudget: response.data.insertId,
          ...budget,
        };
        commit('ADD_BUDGET', { data });
      });
    },
    async deleteBudget({ commit }, idBudget) {
      return axios.delete('http://localhost:3000/budgets/delete', {
        data: {
          idBudget,
        },
      }).then(() => {
        commit('DELETE_BUDGET', idBudget);
      });
    },
    async updateBudget({ commit }, budget) {
      return axios.put('http://localhost:3000/budgets/update', budget)
        .then(() => {
          commit('UPDATE_BUDGETS', budget.budget);
        });
    },
    async getSommeParCategories({ commit }, idBudget) {
      return axios.get('http://localhost:3000/budgets/sommeParCategories', {
        params: {
          idBudget,
        },
      }).then((response) => {
        commit('SET_SOMME_PAR_CATEGORIES', response.data);
      });
    },
    setCurrentBudget({ commit }, id) {
      commit('SET_CURRENT_BUDGET', id);
    },
  },
  mutations: {
    SET_BUDGETS(state, data) {
      state.budgets = data;
    },
    SET_CURRENT_BUDGET(state, data) {
      state.budgetIdCurr = data;
    },
    ADD_BUDGET(state, { data }) {
      state.budgets.push(data);
    },
    DELETE_BUDGET(state, idBudget) {
      const index = state.budgets.findIndex((budget) => budget.IdBudget === idBudget);
      if (index >= 0) state.budgets.splice(index, 1);
    },
    UPDATE_BUDGETS(state, budget) {
      const index = state.budgets.findIndex((b) => b.IdBudget === budget.IdBudget);
      if (index >= 0) state.budgets.splice(index, 1, budget);
    },
    SET_SOMME_PAR_CATEGORIES(state, data) {
      state.sommeParCategories = data;
    },
    SET_SOMME_SUIVI_CATEGORIES(state, data) {
      state.sommeSuiviParCategories = data;
    },
  },
});
