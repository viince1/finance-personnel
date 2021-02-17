import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    stocks: [],
  },
  actions: {
    async getStocks({ commit, rootState }) {
      return axios.get('http://localhost:3000/investissement/stocks', {
        params: {
          idCompte: rootState.compte.compteCurrId,
        },
      }).then((response) => {
        commit('SET_STOCKS', response.data);
      });
    },
    async addStock({ commit, rootState }, { stock }) {
      return axios.post('http://localhost:3000/investissement/stocks', {
        stock,
        idCompte: rootState.compte.compteCurrId,
      }).then((response) => {
        commit('ADD_STOCK', { stock, data: response.data });
      });
    },
    async deleteStock({ commit }, { IdTitreBoursier }) {
      return axios.delete('http://localhost:3000/investissement/stocks', {
        data: {
          IdTitreBoursier,
        },
      }).then(() => {
        console.log(IdTitreBoursier);
        commit('DELETE_STOCK', { IdTitreBoursier });
      });
    },
  },
  mutations: {
    SET_STOCKS(state, data) {
      state.stocks = data;
    },
    ADD_STOCK(state, { stock, data }) {
      const newStock = {
        ...stock,
        IdTitreBoursier: data.insertId,
      };
      console.log(stock);
      state.stocks.push(newStock);
    },
    DELETE_STOCK(state, IdTitreBoursier) {
      const index = state.stocks.findIndex((s) => s.IdTitreBoursier === IdTitreBoursier);
      state.stocks.splice(index, 1);
    },
  },
});
