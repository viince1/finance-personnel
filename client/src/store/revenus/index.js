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
    yeartodate: Number,
  },
  getters: {
    yeartodate(state) {
      let sum = 0;
      state.revenus.forEach((revenu) => {
        const current = new Date().getFullYear();
        const entered = new Date(revenu.DateEntree).getFullYear();
        if (entered >= current) sum += revenu.Montant;
      });
      state.yeartodate = sum;
      return sum;
    },
  },
  actions: {
    async getRevenus({ commit }) {
      return axios.get('http://localhost:3000/revenus', {
        params: {
          idBudget: 1,
        },
      }).then((response) => {
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
      return axios.post('http://localhost:3000/revenus/add', revenu)
        .then((response) => {
          commit('ADD_REVENU', { data: response.data, revenu });
        });
    },
    async update({ commit }, { revenu }) {
      return axios.put('http://localhost:3000/revenus/update', revenu).then(() => {
        commit('UPDATE_REVENUS', { revenu });
      });
    },
    async delete({ commit }, idRevenu) {
      return axios.delete('http://localhost:3000/revenus/delete', {
        data: {
          idRevenu,
        },
      })
        .then(() => {
          commit('DELETE_REVENU', idRevenu);
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
        idRevenu: data.insertId,
      });
    },
    UPDATE_REVENUS(state, { revenu }) {
      console.log(revenu);
      const index = state.revenusBudget.findIndex((r) => r.idRevenu === revenu.idRevenu);
      if (index >= 0) state.revenusBudget.splice(index, 1, revenu);
    },
    DELETE_REVENU(state, idRevenu) {
      const index = state.revenusBudget.findIndex((r) => r.idRevenu === idRevenu);
      state.revenusBudget.splice(index, 1);
    },
  },
});
