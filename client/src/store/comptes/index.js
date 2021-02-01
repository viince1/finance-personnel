import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    comptes: [],
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
  },
  mutations: {
    SET_COMPTES(state, value) {
      state.comptes = value;
    },
  },
});
