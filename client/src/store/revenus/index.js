import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    revenus: [],
    revenuSuivis: [],
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
    async getRevenus({ commit }, idBudget) {
      return axios.get('http://localhost:3000/revenus', {
        params: {
          idBudget,
        },
      }).then((response) => {
        commit('SET_REVENUS', response.data);
      });
    },
    async getRevenusSuivi({ commit }, { idBudget, dateDebut, dateFin }) {
      return axios.get('http://localhost:3000/revenus/revenuSuivi', {
        params: {
          idBudget,
          dateDebut,
          dateFin,
        },
      }).then((response) => {
        console.log(response.data);
        commit('SET_REVENUS_SUIVI', response.data);
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
    async createRevenuSuivi({ commit }, revenuSuivi) {
      return axios.post('http://localhost:3000/revenus/addRevenuSuivi', revenuSuivi)
        .then((response) => {
          commit('ADD_REVENU_SUIVI', { data: response.data, revenuSuivi });
        });
    },
    async update({ commit }, { revenu }) {
      return axios.put('http://localhost:3000/revenus/update', revenu).then(() => {
        commit('UPDATE_REVENUS', { revenu });
      });
    },
    async updateRevenuSuivi({ commit }, revenuSuivi) {
      return axios.put('http://localhost:3000/revenus/updateRevenuSuivi', revenuSuivi).then(() => {
        commit('UPDATE_REVENUS_SUIVI', revenuSuivi);
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
    async deleteRevenuSuivi({ commit }, idRevenuSuivi) {
      return axios.delete('http://localhost:3000/revenus/deleteRevenuSuivi', {
        data: {
          idRevenuSuivi,
        },
      })
        .then(() => {
          commit('DELETE_REVENU_SUIVI', idRevenuSuivi);
        });
    },
  },
  mutations: {
    SET_REVENUS(state, data) {
      state.revenus = data;
    },
    SET_REVENUS_SUIVI(state, data) {
      state.revenuSuivis = data;
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
    ADD_REVENU_SUIVI(state, { data, revenuSuivi }) {
      state.revenuSuivis.push({
        ...revenuSuivi,
        IdRevenuSuivi: data.insertId,
      });
    },
    UPDATE_REVENUS(state, { revenu }) {
      console.log(revenu);
      const index = state.revenusBudget.findIndex((r) => r.idRevenu === revenu.idRevenu);
      if (index >= 0) state.revenusBudget.splice(index, 1, revenu);
    },
    UPDATE_REVENUS_SUIVI(state, revenuSuivi) {
      const index = state.revenuSuivis.findIndex(
        (r) => r.IdRevenuSuivi === revenuSuivi.IdRevenuSuivi,
      );
      if (index >= 0) state.revenuSuivis.splice(index, 1, revenuSuivi);
    },
    DELETE_REVENU(state, idRevenu) {
      const index = state.revenusBudget.findIndex((r) => r.idRevenu === idRevenu);
      state.revenusBudget.splice(index, 1);
    },
    DELETE_REVENU_SUIVI(state, idRevenuSuivi) {
      const index = state.revenuSuivis.findIndex((r) => r.idRevenuSuivi === idRevenuSuivi);
      state.revenuSuivis.splice(index, 1);
    },
  },
});
