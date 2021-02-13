import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    depenses: [],
    depensesSuivis: [],
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
    async getDepenses({ commit }, idBudget) {
      return axios.get('http://localhost:3000/depenses', {
        params: {
          idBudget,
        },
      }).then((response) => {
        commit('SET_DEPENSES', response.data);
      });
    },
    async getDepensesSuivi({ commit }, { idBudget, dateDebut, dateFin }) {
      return axios.get('http://localhost:3000/depenses/depenseSuivi', {
        params: {
          idBudget,
          dateDebut,
          dateFin,
        },
      }).then((response) => {
        console.log(response.data);
        commit('SET_DEPENSE_SUIVI', response.data);
      });
    },
    async ajouterDepense({ commit }, depense) {
      return axios.post('http://localhost:3000/depenses/add', depense)
        .then((response) => {
          commit('ADD_DEPENSE', { data: response.data, depense });
        });
    },
    async createDepenseSuivi({ commit }, depenseSuivi) {
      return axios.post('http://localhost:3000/depenses/addDepenseSuivi', depenseSuivi)
        .then((response) => {
          commit('ADD_DEPENSE_SUIVI', { data: response.data, depenseSuivi });
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
    async updateDepenseSuivi({ commit }, depenseSuivi) {
      return axios.put('http://localhost:3000/depenses/updateDepenseSuivi', depenseSuivi).then(() => {
        commit('UPDATE_DEPENSES_SUIVI', depenseSuivi);
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
    async deleteDepenseSuivi({ commit }, idDepenseSuivi) {
      return axios.delete('http://localhost:3000/depenses/deleteDepenseSuivi', {
        data: {
          idDepenseSuivi,
        },
      })
        .then(() => {
          commit('DELETE_DEPENSE_SUIVI', idDepenseSuivi);
        });
    },
    resetDepensesSuivi({ commit }) {
      commit('RESET_DEPENSES_SUIVIS');
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
    SET_DEPENSE_SUIVI(state, data) {
      state.depensesSuivis = data;
    },
    ADD_DEPENSE(state, { data, depense }) {
      state.depensesBudget.push({
        ...depense,
        IdDepense: data.insertId,
      });
    },
    ADD_DEPENSE_SUIVI(state, { data, depenseSuivi }) {
      state.depensesSuivis.push({
        ...depenseSuivi,
        IdDepenseSuivi: data.insertId,
      });
    },
    UPDATE_DEPENSES_SUIVI(state, depenseSuivi) {
      console.log(depenseSuivi);
      const index = state.depensesSuivis.findIndex(
        (r) => r.idDepenseSuivi === depenseSuivi.depenseSuivi,
      );
      if (index >= 0) state.depensesSuivis.splice(index, 1, depenseSuivi);
    },
    DELETE_DEPENSE(state, { IdDepense }) {
      const index = state.depensesBudget.findIndex((d) => d.IdDepense === IdDepense);
      if (index >= 0) state.depensesBudget.splice(index, 1);
    },
    UPDATE_DEPENSE(state, { depense }) {
      const index = state.depensesBudget.findIndex((d) => d.IdDepense === depense.IdDepense);
      if (index >= 0) state.depensesBudget.splice(index, 1, depense);
    },
    DELETE_DEPENSE_SUIVI(state, idDepenseSuivi) {
      const index = state.depensesSuivis.findIndex((r) => r.idDepenseSuivi === idDepenseSuivi);
      state.depensesSuivis.splice(index, 1);
    },
    RESET_DEPENSES_SUIVIS(state) {
      state.depensesSuivis.length = 0;
    },
  },
});
