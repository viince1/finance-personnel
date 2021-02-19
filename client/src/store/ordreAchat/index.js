import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    ordreAchats: [],
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
        ordreAchat,
        idCompte: rootState.compte.compteCurrId,
      }).then((response) => {
        commit('ADD_ORDRE_ACHAT', { ordreAchat, data: response.data });
      });
    },
    async deleteStock({ commit }, { IdOrdreAchat }) {
      return axios.delete('http://localhost:3000/ordreachat/ordreAchat', {
        data: {
          IdOrdreAchat,
        },
      }).then(() => {
        console.log(IdOrdreAchat);
        commit('DELETE_ORDRE_ACHAT', { IdOrdreAchat });
      });
    },
    async updateStock({ commit }, { ordreAchat }) {
      return axios.put('http://localhost:3000/ordreachat/ordreAchat', ordreAchat)
        .then(() => {
          commit('UPDATE_ORDRE_ACHAT', ordreAchat);
        });
    },
  },
  mutations: {
    SET_ORDRE_ACHAT(state, data) {
      state.ordreAchats = data;
    },
    ADD_ORDRE_ACHAT(state, { ordreAchat, data }) {
      const newOrdreAchat = {
        ...ordreAchat,
        IdOrdreAchat: data.insertId,
      };
      console.log(ordreAchat);
      state.ordreAchats.push(newOrdreAchat);
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
  },
});
