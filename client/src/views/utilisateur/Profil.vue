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
              <div class="control">
                <label for="" class="label">Old password</label>
                <div class="control">
                  <input type="password"
                  class="input"
                  placeholder="********"
                 v-model="profile.oldPassword">
                </div>
              </div>
            </div>
           <div class="message is-danger" v-if="errormdp !== null">
            <div class="message-body has-icons-left" style="padding:6px;">
              Erreur : {{errormdp}}
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
            <div>
            <button type="submit" class="button is-primary"
            v-on:click.prevent="updatePassword()">
              Modifier mot de pass
            </button>
            </div>
        </form>
    </section>
    <section class="section">
      <div class="columns">
      <div class="column">
      <form class="box">
         <table v-if="categoriesRevenu.length!=0" class="table">
           <label  class="label">Categories de revenus</label>
            <tbody>
                <tr v-for="c in categoriesRevenu" :key="c.IdCategorieRevenu" >
                    <td v-for="x in c" :key="x.IdCategorieRevenu"> {{x}} </td>
                    <td>
                        <p class="buttons">
                            <a class="button is-small is-primary"
                            @click="openCategorieRevenuUpdate(c)">
                              Edit
                            </a>
                            <a class="button is-small is-danger"
                            @click="deleteCategorieRevenu(c.IdCategorieRevenu)">
                            Delete
                            </a>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="notification is-danger">
            Warning !<strong> No Data to Show</strong>
        </div>
          <div class="field">
          <label class="label">Ajouter la categorie de revenu</label>
          <div class="control">
            <input class="input" type="text" placeholder="Nom de la categorie revenu"
            v-model="categorieRevenuNom">
          </div>
          <div class="mt-3">
            <button v-on:click.prevent="addCategorieRevenu()"
            class="button is-success">
          <span class="icon is-small">
            <i class="fas fa-check"></i>
          </span>
          <span>Ajouter</span>
        </button>
          </div>
          <div class="message is-danger" v-if="errorMessage.length !== 0">
        <div v-for="(m, index) in errorMessage"
            :key="index"
              class="message-body has-icons-left"
                style="padding:6px;">
            Erreur : {{m}}
        </div>
        </div>
       </div>
      </form>
      </div>
      <div class="column">
        <form class="box">
            <table v-if="categoriesDepenses.length!=0" class="table">
           <label  class="label">Categories de depenses</label>
            <tbody>
                <tr v-for="c in categoriesDepenses" :key="c.IdCategorieRevenu" >
                    <td v-for="x in c" :key="x.IdCategorieRevenu"> {{x}} </td>
                    <td>
                        <p class="buttons">
                            <a class="button is-small is-primary"
                            @click="openCategorieDepenseUpdate(c)">
                              Edit
                            </a>
                            <a class="button is-small is-danger"
                            @click="deleteCategorieDepense(c.IdCategorieDepense)">
                            Delete
                            </a>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="notification is-danger">
            Warning !<strong> No Data to Show</strong>
        </div>
        <div class="field">
          <label class="label">Ajouter la categorie de depense</label>
          <div class="control">
            <input class="input" type="text" placeholder="Nom de la categorie Depense"
            v-model="categorieDepenseNom">
          </div>
          <div class="mt-3">
            <button v-on:click.prevent="addCategorieDepense()"
            class="button is-success">
          <span class="icon is-small">
            <i class="fas fa-check"></i>
          </span>
          <span>Ajouter</span>
        </button>
          </div>
          <div class="message is-danger" v-if="errorMessage.length !== 0">
        <div v-for="(m, index) in errorMessage"
            :key="index"
              class="message-body has-icons-left"
                style="padding:6px;">
            Erreur : {{m}}
        </div>
        </div>
        </div>
        </form>
      </div>
      </div>
  </section>
</div>
</template>
<script>
import firebase from 'firebase';
import EditCategoryDepenseModal from '../../components/Profil/EditCategoryDepenseModal.vue';
import EditCategoryRevenuModal from '../../components/Profil/EditCategoryRevenuModal.vue';

export default {
  name: 'Profil',
  data() {
    return {
      profile: {
        email: firebase.auth().currentUser.email,
        password: null,
        oldPassword: null,
      },
      categorieDepenseNom: '',
      categorieRevenuNom: '',
      errorMessage: [],
      errormdp: null,
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
    async deleteCategorieDepense(id) {
      console.log(id);
      if (this.categorieDepense !== null) {
        await this.$store.dispatch('categoriesdepenses/deleteCategorieDepense', id);
      }
    },
    async deleteCategorieRevenu(id) {
      if (this.categorieRevenu !== null) {
        await this.$store.dispatch('categoriesrevenus/deleteCategorieRevenu', id);
      }
    },
    async addCategorieDepense() {
      this.errorMessage = [];
      if (this.categorieDepenseNom === '') this.errorMessage.push('Le champ Nom est requis');
      if (this.errorMessage.length !== 0) return;
      await this.$store.dispatch('categoriesdepenses/ajouterCategorieDepense', this.categorieDepenseNom);
      this.$emit('close');
    },
    async addCategorieRevenu() {
      this.errorMessage = [];
      if (this.categorieRevenu.Nom === '') this.errorMessage.push('Le champ Nom est requis');
      if (this.errorMessage.length !== 0) return;
      await this.$store.dispatch('categoriesrevenus/ajouterCategorieRevenu', this.categorieRevenu);
      this.$emit('close');
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
      console.log(this.profile.oldPassword);
      this.error = null;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.profile.email, this.profile.oldPassword)
        .then((userCredential) => {
          this.$store.dispatch('user/fetchUser', userCredential.user);
        })
        .catch((err) => {
          this.errormdp = err.message;
          this.profil.oldPassword = null;
        });
      const user = firebase.auth().currentUser;
      user.updatePassword(this.profile.password).then(() => {
        // Update successful.
      }).catch((error) => {
        console.log(error);
      });
    },
    openCategorieDepenseUpdate(c) {
      const data = {
        Nom: c.Nom,
        IdCategorieDepense: c.IdCategorieDepense,
      };
      this.$buefy.modal.open({
        parent: this,
        component: EditCategoryDepenseModal,
        props: data,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
    openCategorieRevenuUpdate(c) {
      const data = {
        Nom: c.Nom,
        IdCategorieRevenu: c.IdCategorieRevenu,
      };
      this.$buefy.modal.open({
        parent: this,
        component: EditCategoryRevenuModal,
        props: data,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
  },
  async created() {
    await this.$store.dispatch('categoriesdepenses/getCategoriesDepenses');
    await this.$store.dispatch('categoriesrevenus/getCategoriesRevenus');
  },
};
</script>
