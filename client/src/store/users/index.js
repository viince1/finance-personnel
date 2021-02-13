import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    suivi: {
      dateDebut: '',
      dateFin: '',
    },
  },
  actions: {
    async fetchUser({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null);
      if (user) {
        const uid = await axios.post('http://localhost:3000/users/identifier', user);
        commit('SET_USER', {
          displayName: user.displayName,
          email: user.email,
          uid,
        });
      } else {
        commit('SET_USER', null);
      }
    },
    setDateDebut({ commit }, date) {
      commit('SET_DATE_DEBUT', date);
    },
    setDateFin({ commit }, date) {
      commit('SET_DATE_FIN', date);
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_DATE_DEBUT(state, data) {
      state.suivi.dateDebut = data;
    },
    SET_DATE_FIN(state, data) {
      state.suivi.dateFin = data;
    },
  },
});
