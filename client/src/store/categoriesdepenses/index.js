import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    categories: [],
  },
  actions: {
    async ajouterCategorieDepense({ commit, rootState }, categoriedepense) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      return axios.post('http://localhost:3000/categoriesdepenses/add', {
        data: {
          Nom: categoriedepense,
          uid,
        },
      })
        .then((response) => {
          commit('ADD_CATEGORIE_DEPENSE', { data: response.data, categoriedepense });
        });
    },
    async deleteCategorieDepense({ commit }, IdCategorieDepense) {
      return axios.delete('http://localhost:3000/categoriesdepenses/delete', {
        data: {
          idCategorieDepense: IdCategorieDepense,
        },
      }).then((response) => {
        commit('DELETE_CATEGORIE_DEPENSE', { response, IdCategorieDepense });
      });
    },
    async updateСategorieDepense({ commit }, categoriedepense) {
      console.log(categoriedepense);
      return axios.put('http://localhost:3000/categoriesdepenses/update', categoriedepense)
        .then((response) => {
          commit('UPDATE_CATEGORIE_DEPENSE', { response, categoriedepense });
        });
    },
    async getCategoriesDepenses({ commit, rootState }) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      return axios.get('http://localhost:3000/categoriesdepenses', {
        params: {
          uid,
        },
      })
        .then((response) => {
          commit('SET_CATEGORIES_DEPENSES', response.data);
        });
    },
  },
  mutations: {
    SET_CATEGORIES_DEPENSES(state, data) {
      state.categories = data;
    },
    ADD_CATEGORIE_DEPENSE(state, { data, categoriedepense }) {
      state.categories.push({
        ...categoriedepense,
        IdDepense: data.insertId,
      });
    },
    DELETE_CATEGORIE_DEPENSE(state, { IdCategorieDepense }) {
      const index = state.categories.findIndex(
        (d) => d.IdCategorieDepense === IdCategorieDepense,
      );
      if (index >= 0) state.categories.splice(index, 1);
    },
    UPDATE_CATEGORIE_DEPENSE(state, { categoriedepense }) {
      const index = state.categories.findIndex(
        (d) => d.IdCategorieDepense === categoriedepense.IdCategorieDepense,
      );
      if (index >= 0) state.categories.splice(index, 1, categoriedepense);
    },
  },
});
