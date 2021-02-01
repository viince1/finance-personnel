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
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
});
