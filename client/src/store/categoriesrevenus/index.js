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
    async ajouterCategorieRevenu({ commit, rootState }, { categorierevenu }) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      return axios.post('http://localhost:3000/categoriesrevenus/add', {
        data: {
          categorierevenu,
          uid,
        },
      })
        .then((response) => {
          const data = {
            IdUtilisateur: uid,
            IdCategorieRevenu: response.data.insertId,
            ...categorierevenu,
          };
          commit('ADD_CATEGORIE_REVENUS', { data });
        });
    },
    async deleteCategorieRevenu({ commit }, IdCategorieRevenu) {
      return axios.delete('http://localhost:3000/categoriesrevenus/delete', {
        data: {
          idCategorieRevenu: IdCategorieRevenu,
        },
      }).then((response) => {
        commit('DELETE_CATEGORIE_REVENU', { response, IdCategorieRevenu });
      });
    },
    async updateСategorieRevenu({ commit }, categorierevenu) {
      console.log(categorierevenu);
      return axios.put('http://localhost:3000/categoriesrevenus/update', {
        data: {
          Nom: categorierevenu.Nom,
          IdCategorieRevenu: categorierevenu.IdCategorieRevenu,
        },
      })
        .then((response) => {
          commit('UPDATE_CATEGORIE_REVENUS', { response, categorierevenu });
        });
    },
    async getCategoriesRevenus({ commit, rootState }) {
      const uid = rootState.user.user.data.uid.data[0].IdUtilisateur;
      return axios.get('http://localhost:3000/categoriesrevenus', {
        params: {
          uid,
        },
      })
        .then((response) => {
          commit('SET_CATEGORIES_REVENUS', response.data);
        });
    },
  },
  mutations: {
    SET_CATEGORIES_REVENUS(state, data) {
      state.categories = data;
    },
    ADD_CATEGORIE_REVENUS(state, { data }) {
      state.categories.push(data);
    },
    DELETE_CATEGORIE_REVENU(state, { IdCategorieRevenu }) {
      const index = state.categories.findIndex(
        (d) => d.IdCategorieRevenu === IdCategorieRevenu,
      );
      if (index >= 0) state.categories.splice(index, 1);
    },
    UPDATE_CATEGORIE_REVENUS(state, { categorierevenu }) {
      const index = state.categories.findIndex(
        (d) => d.IdCategorieRevenu === categorierevenu.IdCategorieRevenu,
      );
      if (index >= 0) state.categories.splice(index, 1, categorierevenu);
    },
  },
});
