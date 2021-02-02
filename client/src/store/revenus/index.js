import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    revenus: [],
  },
  getters: {
    yeartodate(state) {
      let sum = 0;
      state.revenus.forEach((revenu) => {
        const current = new Date().getFullYear();
        const entered = new Date(revenu.DateEntree).getFullYear();
        if (entered >= current) sum += revenu.Montant;
      });
      return sum;
    },
  },
  actions: {
    async getRevenus({ commit, rootState }) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      return axios.get('http://localhost:3000/revenus', {
        params: {
          uid,
        },
      }).then((response) => {
        console.log(response);
        commit('SET_REVENUS', response.data);
      });
    },
  },
  mutations: {
    SET_REVENUS(state, data) {
      state.revenus = data;
    },
  },
});
