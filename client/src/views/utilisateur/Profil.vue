<template>
   <div class="conteneur">
      <div class="columns">
         <div class="column is-8">
               <form class="box">
                 <h1 class="title is-4">Modification de mot de passe</h1>
                 <div class="overflow">
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
                  <div class="field">
                     <label class="label">New Password</label>
                     <div class="control">
                        <input
                           class="input"
                           v-model="profile.password"
                           type="password"
                           placeholder="********">
                     </div>
                  </div>
                  <div class="field">
                     <label class="label">Confrim New Password</label>
                     <div class="control">
                        <input
                           class="input"
                           v-model="profile.confirmpassword"
                           type="password"
                           placeholder="********">
                     </div>
                  </div>
                  <div>
                     <button type="submit" class="button is-info is-rounded"
                        v-on:click.prevent="updatePassword()">
                     Modifier
                     </button>
                  </div>
                  <div class="message is-danger" v-if="errormdp !== null">
                     <div class="message-body has-icons-left" style="padding:6px;">
                        Erreur : {{errormdp}}
                     </div>
                  </div>
                  </div>
               </form>
               <div class="">
                  <form class="box">
                    <div class="title is-4">Modification de courriel</div>
                    <div class="overflow">
                     <div class="field">
                        <label class="label">Old Email</label>
                        <div class="control">
                           <input class="input" v-model="profile.email"
                              type="email" placeholder="e.g. alex@example.com">
                        </div>
                     </div>
                     <div class="field">
                        <label class="label">New Email</label>
                        <div class="control">
                           <input class="input" v-model="profile.newEmail"
                              type="email" placeholder="e.g. alex@example.com">
                        </div>
                     </div>
                     <div>
                        <div class="message is-danger" v-if="erroremail !== null">
                           <div class="message-body has-icons-left" style="padding:6px;">
                              Erreur : {{erroremail}}
                           </div>
                        </div>
                        <button type="submit" class="button is-info is-rounded"
                           v-on:click.prevent="updateEmail()">
                        Modifier
                        </button>
                     </div>
                     </div>
                  </form>
               </div>
         </div>
         <div class="column is-4">
               <form class="box">
                 <h1 class="title is-4">Ajout de categories de revenus</h1>
                 <div class="overflow">
                  <table v-if="categoriesRevenu.length!=0"
                     class="table is-fullwidth is-bordered">
                     <label  class="label">Categories</label>
                     <tbody>
                        <tr v-for="(c, index) in categoriesRevenu" :key="index">
                           <td :key="index"> {{c.Nom}} </td>
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
                     <label class="label">Ajouter une categorie</label>
                     <div class="columns">
                        <div class="column is-two-thirds">
                           <div class="control">
                              <input class="input"
                                 type="text" placeholder="Nom de la categorie revenu"
                                 v-model="categorieRevenuNom">
                           </div>
                        </div>
                        <div class="column">
                           <button v-on:click.prevent="addCategorieRevenu()"
                              class="button is-success">
                           <span class="icon is-small">
                           <i class="fas fa-check"></i>
                           </span>
                           <span>Ajouter</span>
                           </button>
                        </div>
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
                  </div>
               </form>
                  <form class="box">
                    <h1 class="title is-4">Ajout de categories de depenses</h1>
                    <div class="overflow">
                     <table v-if="categoriesDepenses.length!=0"
                        class="table is-fullwidth is-bordered">
                        <label  class="label">Categories</label>
                        <tbody>
                           <tr v-for="(c, index) in categoriesDepenses" :key="index" >
                              <td :key="index"> {{c.Nom}} </td>
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
                        <label class="label">Ajouter une categorie</label>
                        <div class="columns">
                           <div class="column is-two-thirds">
                              <div class="control">
                                 <input class="input"
                                    type="text" placeholder="Nom de la categorie Depense"
                                    v-model="categorieDepenseNom">
                              </div>
                           </div>
                           <div class="column">
                              <div>
                                 <button v-on:click.prevent="addCategorieDepense()"
                                    class="button is-success">
                                 <span class="icon is-small">
                                 <i class="fas fa-check"></i>
                                 </span>
                                 <span>Ajouter</span>
                                 </button>
                              </div>
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
                     </div>
                     </div>
                  </form>
         </div>
      </div>
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
        newEmail: null,
        password: null,
        confirmpassword: null,
        oldPassword: null,
      },
      categorieDepenseNom: '',
      categorieRevenuNom: '',
      errorMessage: [],
      errormdp: null,
      erroremail: null,
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
      if (id !== null) {
        await this.$store.dispatch('categoriesdepenses/deleteCategorieDepense', id);
      }
    },
    async deleteCategorieRevenu(id) {
      if (id !== null) {
        await this.$store.dispatch('categoriesrevenus/deleteCategorieRevenu', id);
      }
    },
    async addCategorieDepense() {
      const categoriedepense = {
        Nom: this.categorieDepenseNom,
      };
      this.errorMessage = [];
      if (this.categorieDepenseNom === '') this.errorMessage.push('Le champ Nom est requis');
      if (this.errorMessage.length !== 0) return;
      await this.$store.dispatch('categoriesdepenses/ajouterCategorieDepense', { categoriedepense });
      this.$emit('close');
    },
    async addCategorieRevenu() {
      const categorierevenu = {
        Nom: this.categorieRevenuNom,
      };
      this.errorMessage = [];
      if (this.categorieRevenuNom === '') this.errorMessage.push('Le champ Nom est requis');
      if (this.errorMessage.length !== 0) return;
      await this.$store.dispatch('categoriesrevenus/ajouterCategorieRevenu', { categorierevenu });
      this.$emit('close');
    },
    validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    updateEmail() {
      if (this.validateEmail(this.profile.newEmail)) {
        const user = firebase.auth().currentUser;
        user.updateEmail(this.profile.newEmail).then(() => {
        // Update successful.
        }).catch((error) => {
          console.log(error);
        });
      } else {
        this.erroremail = 'email is invalid';
      }
    },
    updatePassword() {
      this.error = null;
      if (this.profile.password === this.profile.confirmpassword) {
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
        this.profile.oldPassword = null;
        this.profile.password = null;
      } else {
        this.errormdp = 'les mots de passes differe';
      }
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

<style scoped>
.conteneur {
  margin: 10px 10px 10px 10px;
}
.overflow {
  min-height: 35vh;
  max-height: 35vh;
  overflow-y: scroll;
}
</style>
