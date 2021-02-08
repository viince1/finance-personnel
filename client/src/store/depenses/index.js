import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    depenses: [],
    depensesBudget: [],
    categories: [],
    frequences: [],
    yeartodate: Number,
  },
  getters: {
    yeartodate(state) {
      let sum = 0;
      state.depenses.forEach((depense) => {
        const current = new Date().getFullYear();
        const entered = new Date(depense.DateEntree).getFullYear();
        if (entered >= current) sum += depense.Montant;
      });
      state.yeartodate = sum;
      return sum;
    },
  },
  actions: {
    async getDepenses({ commit, rootState }) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      return axios.get('http://localhost:3000/depenses', {
        params: {
          uid,
        },
      }).then((response) => {
        commit('SET_DEPENSES', response.data);
      });
    },
    async ajouterDepense({ commit }, depense) {
      return axios.post('http://localhost:3000/depenses/add', depense)
        .then((response) => {
          commit('ADD_DEPENSE', { data: response.data, depense });
        });
    },
    async deleteDepense({ commit }, IdDepense) {
      return axios.delete('http://localhost:3000/depenses/delete', {
        data: {
          idDepense: IdDepense,
        },
      }).then((response) => {
        commit('DELETE_DEPENSE', { response, IdDepense });
      });
    },
    async updateDepense({ commit }, depense) {
      return axios.put('http://localhost:3000/depenses/update', depense)
        .then((response) => {
          commit('UPDATE_DEPENSE', { response, depense });
        });
    },
    async getDepensesBudget({ commit }, idBudget) {
      return axios.get('http://localhost:3000/depenses/budget', {
        params: {
          idBudget,
        },
      }).then((response) => {
        commit('SET_DEPENSES_BUDGET', response.data);
      });
    },
    async getCategoriesDepense({ commit }) {
      return axios.get('http://localhost:3000/categoriesdepences')
        .then((response) => {
          commit('SET_CATEGORIES', response.data);
        });
    },
    async getFrequencesDepense({ commit }) {
      return axios.get('http://localhost:3000/depenses/frequences')
        .then((response) => {
          commit('SET_FREQUENCES', response.data);
        });
    },
  },
  mutations: {
    SET_DEPENSES(state, data) {
      state.depenses = data;
    },
    SET_DEPENSES_BUDGET(state, data) {
      state.depensesBudget = data;
    },
    SET_CATEGORIES(state, data) {
      state.categories = data;
    },
    SET_FREQUENCES(state, data) {
      state.frequences = data;
    },
    ADD_DEPENSE(state, { data, depense }) {
      state.depensesBudget.push({
        ...depense,
        IdDepense: data.insertId,
      });
    },
    DELETE_DEPENSE(state, { IdDepense }) {
      const index = state.depensesBudget.findIndex((d) => d.IdDepense === IdDepense);
      if (index >= 0) state.depensesBudget.splice(index, 1);
    },
    UPDATE_DEPENSE(state, { depense }) {
      const index = state.depensesBudget.findIndex((d) => d.IdDepense === depense.IdDepense);
      if (index >= 0) state.depensesBudget.splice(index, 1, depense);
    },
  },
});
