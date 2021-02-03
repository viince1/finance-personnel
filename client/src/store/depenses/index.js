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
  },
  getters: {
    yeartodate(state) {
      let sum = 0;
      state.depenses.forEach((depense) => {
        const current = new Date().getFullYear();
        const entered = new Date(depense.DateEntree).getFullYear();
        if (entered >= current) sum += depense.Montant;
      });
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
        console.log(response);
        commit('SET_DEPENSES', response.data);
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
      return axios.get('http://localhost:3000/depenses/categories')
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
  },
});
