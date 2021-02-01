import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    objectifs: [],
    lstStatus: [],
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
    async getStatusObjectifs({ commit }) {
      await axios.get('http://localhost:3000/objectifs/objectifstatus', {
      }).then((response) => {
        console.log('here store');
        commit('SET_STATUS', response.data);
      });
    },

    async create({ commit, rootState }, { data }) {
      console.log(data);
      return axios.post('http://localhost:3000/objectifs/create', {
        params: {
          objectif: data,
          IdUtilisateur: rootState.user.user.data.uid.data[0].IdUtilisateur,
        },
      }).then((response) => {
        console.log(response.data);
        commit('ADD_OBJECTIF', { data, response: response.data });
      });
    },
    async update({ commit }, objectif) {
      return axios.post('http://localhost:3000/objectifs/update', objectif).then((response) => {
        console.log(response);
        commit('UPDATE_OBJECTIFS', objectif);
      });
    },
    async delete({ commit }, IdObjectif) {
      console.log(IdObjectif);
      return axios.post('http://localhost:3000/objectifs/delete', {
        params: {
          IdObjectif,
        },
      })
        .then((response) => {
          console.log(response);
          commit('DELETE_OBJECTIF', IdObjectif);
        });
    },
  },
  mutations: {
    SET_OBJECTIFS(state, value) {
      state.objectifs = value;
    },
    SET_STATUS(state, value) {
      state.lstStatus = value;
    },
    ADD_OBJECTIF(state, { data, response }) {
      state.objectifs.push({
        IdObjectif: response.insertId,
        ...data,
      });
    },
    UPDATE_OBJECTIFS(state, objectif) {
      const index = state.objectifs.findIndex((o) => o.IdObjectif === objectif.IdObjectif);
      if (index >= 0) state.objectifs.splice(index, 1, objectif);
    },
    DELETE_OBJECTIF(state, IdObjectif) {
      const index = state.objectifs.findIndex((o) => o.IdObjectif === IdObjectif);
      state.objectifs.splice(index, 1);
    },

  },
});
