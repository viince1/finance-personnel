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
    async addCompte({ commit }, { data }) {
      console.log(data);
      return axios.post('http://localhost:3000/comptes/add', data).then((response) => {
        commit('ADD_COMPTE', { items: [response.data] });
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
    ADD_COMPTE(state, { items }) {
      items.forEach((item) => {
        const index = state.comptes.findIndex((x) => x.IdCompte === item.IdCompte);
        if (index < 0) {
          state.comptes.push(item);
        } else {
          state.comptes.splice(index, 1, {
            ...state.comptes[index],
            ...item,
          });
        }
      });
    },
  },
});
