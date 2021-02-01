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
        console.log('here store');
        commit('SET_TYPESCOMPTE', response.data);
      });
    },
    async addCompte({ commit, rootState }, { data }) {
      console.log(data);
      return axios.post('http://localhost:3000/comptes/add', {
        params: {
          compte: data,
          IdUtilisateur: rootState.user.user.data.uid.data[0].IdUtilisateur,
        },
      })
        .then((response) => {
          console.log(response.data);
          commit('ADD_COMPTE', { data, response: response.data });
        });
    },

    async deleteCompte({ commit }, idCompte) {
      console.log(idCompte);
      return axios.post('http://localhost:3000/comptes/delete', {
        params: {
          idCompte,
        },
      })
        .then((response) => {
          console.log(response);
          commit('DELETE_COMPTE', idCompte);
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
    ADD_COMPTE(state, { data, response }) {
      state.comptes.push({
        IdCompte: response.insertId,
        ...data,
      });
    },
    DELETE_COMPTE(state, idCompte) {
      const index = state.comptes.findIndex((compte) => compte.IdCompte === idCompte);
      state.comptes.splice(index, 1);
    },
  },
});
