import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    ordreAchats: [],
    valeurTotale: 0,
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
    setValeurTotale({ commit }, valeurTotale) {
      commit('SET_VALEUR_TOTALE', valeurTotale);
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
    SET_VALEUR_TOTALE(state, valeurTotale) {
      state.valeurTotale = valeurTotale;
    },
  },
});
