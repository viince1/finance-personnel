import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    ordreAchats: [],
    stockPrices: [],
    valeurTotale: Number,
  },
  getters: {
    valeurTotale(state) {
      let valTotal = 0;
      if (state.ordreAchats.length === 0) {
        valTotal = 0;
        state.valeurTotale = valTotal;
      }
      if (state.ordreAchats.length > 0) {
        state.ordreAchats.forEach((element) => {
          const result = state.stockPrices.find((stock) => stock.symbol === element.Titre);
          if (result === undefined) return;
          valTotal += result.close * element.Quantite;
          state.valeurTotale = valTotal;
          console.log(valTotal);
        });
      }
      console.log(valTotal);
      return state.valeurTotale;
    },
  },
  actions: {
    async getOrdresAchat({ commit, rootState }) {
      return axios.get('http://localhost:3000/ordreachat/ordreAchat', {
        params: {
          idCompte: rootState.compte.compteCurrId,
        },
      }).then((response) => {
        commit('SET_ORDRE_ACHAT', response.data);
      });
    },
    async addOrdreAchat({ commit, rootState }, { ordreAchat }) {
      return axios.post('http://localhost:3000/ordreachat/ordreAchat', {
        params: {
          OrdreAchat: ordreAchat,
          idCompte: rootState.compte.compteCurrId,
        },
      }).then((response) => {
        commit('ADD_ORDRE_ACHAT', { ordreAchat, response: response.data });
      });
    },
    async deleteOrdreAchat({ commit }, { IdOrdreAchat }) {
      return axios.delete('http://localhost:3000/ordreachat/ordreAchat', {
        data: {
          IdOrdreAchat,
        },
      }).then(() => {
        console.log(IdOrdreAchat);
        commit('DELETE_ORDRE_ACHAT', { IdOrdreAchat });
      });
    },
    async updateOrdreAchat({ commit }, { ordreAchat }) {
      return axios.put('http://localhost:3000/ordreachat/ordreAchat', ordreAchat)
        .then(() => {
          commit('UPDATE_ORDRE_ACHAT', ordreAchat);
        });
    },
    async getPrices({ commit, rootState }) {
      const { stocks } = rootState.investissement;
      stocks.forEach((stock) => {
        axios.get(`https://api.polygon.io/v1/open-close/${stock.TitreCours}/2020-10-14?unadjusted=true&apiKey=JkL0mUMgX8PpLRpMcQAdMAcByBI3ykOT&fbclid=IwAR1xk2VUM9fJiCsN6_9g4h8AjhUc0RdkXXdp7zqbWQ4dETY74wjaA4f7Nhc`)
          .then((response) => {
            commit('SET_STOCK_PRICES', response.data);
          });
      });
    },
  },
  mutations: {
    SET_ORDRE_ACHAT(state, data) {
      state.ordreAchats = data;
    },
    ADD_ORDRE_ACHAT(state, { ordreAchat, response }) {
      state.ordreAchats.push({
        IdOrdreAchat: response.insertId,
        ...ordreAchat,
      });
    },
    DELETE_ORDRE_ACHAT(state, { IdOrdreAchat }) {
      const index = state.ordreAchats.findIndex((o) => o.IdOrdreAchat === IdOrdreAchat);
      state.ordreAchats.splice(index, 1);
    },
    UPDATE_ORDRE_ACHAT(state, ordreAchat) {
      console.log(ordreAchat);
      const index = state.ordreAchats.findIndex((o) => o.IdOrdreAchat === ordreAchat.IdOrdreAchat);
      console.log(index);
      if (index >= 0) state.ordreAchats.splice(index, 1, ordreAchat);
    },
    SET_STOCK_PRICES(state, data) {
      state.stockPrices.push(data);
    },
  },
});
