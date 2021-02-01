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
    update({ commit }, { data }) {
      console.log(data);
      return axios.put(`http://localhost:3000/objectifs/update'/${data.id}`, data).then((response) => {
        console.log(response.data);
        commit('UPDATE_COLLECTION', { data, response: response.data });
      });
    },
    async delete({ commit }, objectifId) {
      await axios.delete(`http://localhost:3000/objectifs/delete/'${objectifId}`);
      commit('REMOVE_OBJECTIF', objectifId);
    },

  },
  mutations: {
    SET_OBJECTIFS(state, value) {
      state.objectifs = value;
    },
    ADD_OBJECTIF(state, { data, response }) {
      state.objectifs.push({
        IdObjectif: response.insertId,
        ...data,
      });
    },
    UPDATE_OBJECTIFS(state, { items }) {
      items.forEach((item) => {
        const index = state.objectifs.findIndex((x) => x.IdObjectif === item.IdObjectif);
        if (index < 0) {
          state.objectifs.push(item);
        } else {
          state.objectifs.splice(index, 1, {
            ...state.objectifs[index],
            ...item,
          });
        }
      });
    },
    REMOVE_OBJECTIF(state, objectif) {
      const index = state.find((o) => o.id === objectif.IdObjectif);
      state.splice(index, 1);
    },
  },
});
