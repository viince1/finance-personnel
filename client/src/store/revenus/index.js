import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    revenus: [],
    categoriesRevenus: [],
    revenusBudget: [],
  },
  getters: {
    yeartodate(state) {
      let sum = 0;
      state.revenus.forEach((revenu) => {
        const current = new Date().getFullYear();
        const entered = new Date(revenu.DateEntree).getFullYear();
        if (entered >= current) sum += revenu.Montant;
      });
      return sum;
    },
  },
  actions: {
    async getRevenus({ commit, rootState }) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      return axios.get('http://localhost:3000/revenus', {
        params: {
          uid,
        },
      }).then((response) => {
        console.log(response);
        commit('SET_REVENUS', response.data);
      });
    },
    async getRevenusBudget({ commit }, idBudget) {
      return axios.get('http://localhost:3000/revenus/revenusBudget', {
        params: {
          idBudget,
        },
      }).then((response) => {
        commit('SET_REVENUS_BUDGET', response.data);
      });
    },
    async getCategoriesRevenus({ commit }) {
      return axios.get('http://localhost:3000/revenus/categoriesrevenus').then((response) => {
        commit('SET_CATEGORIES_REVENUS', response.data);
      });
    },
    async create({ commit }, revenu) {
      console.log(revenu);
      return axios.post('http://localhost:3000/revenus/add', revenu)
        .then((response) => {
          commit('ADD_REVENU', { data: response.data, revenu });
        });
    },
    async update({ commit }, revenu) {
      return axios.post('http://localhost:3000/revenus/update', revenu).then((response) => {
        console.log(response);
        commit('UPDATE_REVENUS', revenu);
      });
    },
    async delete({ commit }, IdRevenu) {
      console.log(IdRevenu);
      return axios.post('http://localhost:3000/revenus/delete', {
        params: {
          IdRevenu,
        },
      })
        .then((response) => {
          console.log(response);
          commit('DELETE_REVENU', IdRevenu);
        });
    },
  },
  mutations: {
    SET_REVENUS(state, data) {
      state.revenus = data;
    },
    SET_CATEGORIES_REVENUS(state, value) {
      state.categoriesRevenus = value;
    },
    SET_REVENUS_BUDGET(state, data) {
      state.revenusBudget = data;
    },
    ADD_REVENU(state, { data, revenu }) {
      state.revenusBudget.push({
        ...revenu,
        IdRevenu: data.insertId,
      });
    },
    UPDATE_REVENUS(state, revenus) {
      const index = state.revenusBudget.findIndex((r) => r.IdRevenu === revenus.IdRevenu);
      if (index >= 0) state.revenusBudget.splice(index, 1, revenus);
    },
    DELETE_REVENU(state, IdRevenu) {
      const index = state.revenusBudget.findIndex((r) => r.IdRevenu === IdRevenu);
      state.revenusBudget.splice(index, 1);
    },
  },
});
