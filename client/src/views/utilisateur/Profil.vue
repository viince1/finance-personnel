<template>
<div>
    <section class="section">
        <form class="box">
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" v-model="profile.email"
                    type="email" placeholder="e.g. alex@example.com">
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                <input
                class="input"
                v-model="profile.password"
                type="password"
                placeholder="********">
                </div>
            </div>
        </form>
    </section>
    <section class="section">
        <div class="field has-addons">
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                <select name="" id="" v-model="selectedCategorieDepense" class="select">
                    <option value="0">Categories</option>
                    <option :value="c.IdCategorieDepense"
                      v-for="(c, index) in categoriesDepenses" :key="index">
                      {{c.Nom}}
                    </option>
                </select>
                </div>
                <div class="control">
                    <input
                    class="input"
                    type="text"
                    v-model="categorieDepense.Nom"
                    placeholder="Text input">
                </div>
            </div>
        </div>
         <div class="control">
            <button type="submit" class="button is-primary"
            v-on:click.prevent="updateCategorieDepense()">
              UPDATE
            </button>
            <button type="submit" class="button is-primary"
            v-on:click.prevent="addCategorieDepense()">
              CREATE
            </button>
            <button type="submit" class="button is-primary"
             v-on:click.prevent="deleteCategorieDepense()">
              DELETE
            </button>
        </div>
    </section>
    <section class="section">
        <div class="field has-addons">
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select v-model="selectedCategorieRevenue" name="categorie de revenue">
                      <option :value="0" selected>Choisir une categorie</option>
                        <option v-for="(c, index) in categoriesRevenu"
                           :key="index"
                           v-bind:value="c.IdCategorieRevenu">
                           {{ c.Nom }}
                        </option>
                    </select>
                </div>
                <div class="control">
                    <input class="input" v-model="categorieRevenu.Nom" type="text">
                    {{ categorieRevenu.Nom }}
                </div>
            </div>
        </div>
        <div class="control">
            <button type="submit" class="button is-primary"
            v-on:click.prevent="updateCategorieRevenu()">
              UPDATE
            </button>
            <button type="submit" class="button is-primary"
            v-on:click.prevent="addCategorieRevenu()">
              CREATE
            </button>
            <button type="submit" class="button is-primary"
             v-on:click.prevent="deleteCategorieRevenu()">
              DELETE
            </button>
        </div>
    <transition name="fade">
        <p class="success">profile updated</p>
      </transition>
  </section>
</div>
</template>
<script>
import firebase from 'firebase';

export default {
  name: 'Profil',
  data() {
    return {
      profile: {
        email: null,
        password: null,
      },
      categorieDepense: {
        Nom: '',
      },
      categorieRevenu: {
        Nom: '',
      },
      selectedCategorieRevenue: 0,
      selectedCategorieDepense: 0,
      error: false,
    };
  },
  computed: {
    categoriesRevenu() {
      return this.$store.state.categoriesrevenus.categories;
    },
    categoriesDepenses() {
      return this.$store.state.categoriesdepenses.categories;
    },
  },
  methods: {
    async deleteCategorieDepense() {
      if (this.selectedCategorieDepense !== 0) {
        await this.$store.dispatch('categoriesdepenses/deleteCategorieDepense', this.selectedCategorieDepense);
      }
    },
    async deleteCategorieRevenu() {
      if (this.selectedCategorieRevenue !== 0) {
        await this.$store.dispatch('categoriesrevenus/deleteCategorieRevenu', this.selectedCategorieRevenue);
      }
    },
    async addCategorieDepense() {
      this.error = false;
      let message = '<h2 style="font-weight:bold">Insertion incomplete</h2>';
      if (this.categorieDepense.Nom === '') {
        this.error = true;
        message += '<p>Le champ nom est vide </p>';
      }
      if (this.error === true) {
        return this.$buefy.notification.open({
          duration: 5000,
          message,
          position: 'is-top-right',
          type: 'is-danger',
        });
      }
      await this.$store.dispatch('categoriesdepenses/ajouterCategorieDepense', this.categorieDepense);
      this.categorieDepense.Nom = '';
      return this.$buefy.notification.open({
        message: '<h2 style="font-weight:bold">Insertion completee</h2>',
        type: 'is-success',
      });
    },
    async addCategorieRevenu() {
      this.error = false;
      let message = '<h2 style="font-weight:bold">Insertion incomplete</h2>';
      if (this.categorieRevenu.Nom === '') {
        this.error = true;
        message += '<p>Le champ nom est vide </p>';
      }
      if (this.error === true) {
        return this.$buefy.notification.open({
          duration: 5000,
          message,
          position: 'is-top-right',
          type: 'is-danger',
        });
      }
      await this.$store.dispatch('categoriesrevenus/ajouterCategorieRevenu', this.categorieRevenu);
      this.categorieRevenu.Nom = '';
      return this.$buefy.notification.open({
        message: '<h2 style="font-weight:bold">Insertion completee</h2>',
        type: 'is-success',
      });
    },
    async updateCategorieRevenu() {
      const data = {
        Nom: this.categorieRevenu.Nom,
        IdCategorieRevenu: this.selectedCategorieRevenue,
      };
      this.$store.dispatch('categoriesrevenus/updateСategorieRevenu', data);
    },
    async updateCategorieDepense() {
      const data = {
        Nom: this.categorieDepense.Nom,
        IdCategorieDepense: this.selectedCategorieDepense,
      };
      this.$store.dispatch('categoriesdepenses/updateСategorieDepense', data);
    },
    updateEmail() {
      const user = firebase.auth().currentUser;
      user.updateEmail(this.profile.email).then(() => {
        // Update successful.
      }).catch((error) => {
        console.log(error);
      });
    },
    updatePassword() {
      const user = firebase.auth().currentUser;

      user.updatePassword(this.profile.password).then(() => {
        // Update successful.
      }).catch((error) => {
        console.log(error);
      });
    },

  },
  async created() {
    await this.$store.dispatch('categoriesdepenses/getCategoriesDepenses');
    await this.$store.dispatch('categoriesrevenus/getCategoriesRevenus');
  },
};
</script>
