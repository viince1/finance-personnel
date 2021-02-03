import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './users';
import objectif from './objectifs';
import compte from './comptes';
import depense from './depenses';
import revenu from './revenus';
import budget from './budgets';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    objectif,
    compte,
    depense,
    revenu,
    budget,
  },
  plugins: [createPersistedState({
    paths: ['user'],
    key: 'user',
    storage: window.localStorage,
  })],
});
