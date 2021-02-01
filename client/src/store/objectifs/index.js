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
    create({ commit }, { data }) {
      return axios.post('http://localhost:3000/objectifs/create', data).then((response) => {
        commit('UPDATE_OBJECTIFS', { items: [response.data] });
      });
    },
    update({ commit }, { data }) {
      return axios.put(`/api/http://localhost:3000/objectifs/update'/${data.id}`, data).then((response) => {
        commit('UPDATE_COLLECTION', { items: [response.data] });
      });
    },

  },
  mutations: {
    SET_OBJECTIFS(state, value) {
      state.objectifs = value;
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
  },
});
