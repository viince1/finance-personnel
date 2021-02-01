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
  },
  mutations: {
    SET_COMPTES(state, value) {
      state.comptes = value;
    },
    SET_TYPESCOMPTE(state, value) {
      state.typescomptes = value;
    },
  },
});
