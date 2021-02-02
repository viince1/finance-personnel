import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    depenses: [],
  },
  actions: {
    async getDepenses({ commit, rootState }) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      return axios.get('http://localhost:3000/depenses', {
        params: {
          uid,
        },
      }).then((response) => {
        console.log(response);
        commit('SET_DEPENSES', response.data);
      });
    },
  },
  mutations: {
    SET_DEPENSES(state, data) {
      state.depenses = data;
    },
  },
});
