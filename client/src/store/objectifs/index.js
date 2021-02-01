import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    objectifs: [],
  },
  actions: {
    async getObjectifs({ commit, rootState }) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      await axios.get('http://localhost:3000/objectifs', {
        params: {
          uid,
        },
      }).then((response) => {
        commit('SET_OBJECTIFS', response.data);
      });
    },
  },
  mutations: {
    SET_OBJECTIFS(state, value) {
      state.objectifs = value;
    },
  },
});
