import Vue from 'vue';
import Vuex from 'vuex';
import user from './users';
import objectif from './objectifs';
import compte from './comptes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    objectif,
    compte,
  },
});
