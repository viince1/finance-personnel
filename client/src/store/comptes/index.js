import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    comptes: [],
    typescomptes: [],
  },
  actions: {
    async getComptes({ commit, rootState }) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      await axios.get('http://localhost:3000/comptes', {
        params: {
          uid,
        },
      }).then((response) => {
        commit('SET_COMPTES', response.data);
      });
    },
    async getTypesComptes({ commit }) {
      await axios.get('http://localhost:3000/comptes/typescompte', {
      }).then((response) => {
        commit('SET_TYPESCOMPTE', response.data);
      });
    },
    async addCompte({ commit, rootState }, { compte }) {
      return axios.post('http://localhost:3000/comptes/add', {
        params: {
          Compte: compte,
          IdUtilisateur: rootState.user.user.data.uid.data[0].IdUtilisateur,
        },
      })
        .then((response) => {
          commit('ADD_COMPTE', { compte, response: response.data });
        });
    },

    async deleteCompte({ commit }, idCompte) {
      console.log(idCompte);
      return axios.delete('http://localhost:3000/comptes/delete', {
        data: {
          idCompte,
        },
      })
        .then(() => {
          commit('DELETE_COMPTE', idCompte);
        });
    },
    async updateCompte({ commit }, compte) {
      return axios.put('http://localhost:3000/comptes/update', compte)
        .then(() => {
          commit('UPDATE_COMPTE', compte);
        });
    },
  },
  mutations: {
    SET_COMPTES(state, value) {
      state.comptes = value;
    },
    SET_TYPESCOMPTE(state, value) {
      state.typescomptes = value;
    },
    ADD_COMPTE(state, { compte, response }) {
      state.comptes.push({
        IdCompte: response.insertId,
        ...compte,
      });
    },
    DELETE_COMPTE(state, idCompte) {
      const index = state.comptes.findIndex((compte) => compte.IdCompte === idCompte);
      state.comptes.splice(index, 1);
    },
    UPDATE_COMPTE(state, compte) {
      const index = state.comptes.findIndex((c) => c.IdCompte === compte.IdCompte);
      if (index >= 0) state.comptes.splice(index, 1, compte);
    },
  },
});
