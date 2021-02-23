import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    stocks: [],
    sum: 0,
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
    async updateStock({ commit }, { stock }) {
      return axios.put('http://localhost:3000/investissement/stocks', stock)
        .then(() => {
          commit('UPDATE_STOCK', stock);
        });
    },
    async getSum({ commit }, idCompte) {
      return axios.get('http://localhost:3000/investissement/stocks/getSum', {
        params: {
          idCompte,
        },
      }).then((response) => {
        commit('SET_SUM', response.data[0].MontantPourChaqueTitre);
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
    DELETE_STOCK(state, { IdTitreBoursier }) {
      const index = state.stocks.findIndex((s) => s.IdTitreBoursier === IdTitreBoursier);
      state.stocks.splice(index, 1);
    },
    UPDATE_STOCK(state, stock) {
      console.log(stock);
      const index = state.stocks.findIndex((s) => s.IdTitreBoursier === stock.IdTitreBoursier);
      console.log(index);
      if (index >= 0) state.stocks.splice(index, 1, stock);
    },
    SET_SUM(state, data) {
      state.sum = data;
    },
  },
});
