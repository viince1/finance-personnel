<template>
   <div class="revenus" id="revenusListe">
      <div>
         <div class="box">
            <div class="title">
               <div class="level">
                  <div class="level-left">
                     <div class="level-item">
                        <h1 class="title is-5">Liste des revenus</h1>
                     </div>
                  </div>
                  <div class="level-right">
                     <div class="level-item">
                        <div class="field">
                           <p class="control">
                              <span class="select">
                                 <select
                                  v-model="revenu.idBudget"
                                  v-on:change.prevent="updateRevenus" >
                                    <option :value="0" disabled>Selectionnez un budget</option>
                                    <option
                                       :value="budget.IdBudget"
                                       v-for="budget in budgets"
                                       :key="budget.IdBudget">{{budget.Nom}}
                                    </option>
                                 </select>
                              </span>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="liste" v-if="revenu.idBudget != 0">
               <revenus
                class="box"
                  v-for="rev in revenus"
                  :key="rev.idRevenu"
                  :revenu="rev"
                  />
            </div>
         </div>
         <div class="ajout box" v-if="revenu.idBudget != 0">
            <div class="title">
               <h1 class="title is-5">Ajout d'un revenu</h1>
            </div>
            <div class="columns">
               <div class="column is-3 has-text-centered">
                  <input
                     type="text"
                     class="input has-text-centered"
                     placeholder="Titre du revenu"
                     v-model="revenu.titre"
                     />
               </div>
               <div class="column is-2 has-text-centered">
                <div class="field has-addons">
                  <div class="control">
                    <input
                    type="number"
                    min="0.01"
                    step="any"
                    class="input has-text-centered"
                    placeholder="Montant de la depense Ex: 1.99"
                      v-model="revenu.montant">
                  </div>
                  <div class="control">
                    <button class="button is-static">$</button>
                  </div>
                </div>
              </div>
               <div class="column is-3 has-text-centered">
                  <div class="select">
                     <select class="select" v-model="revenu.idCategorieRevenu">
                        <option :value="0" selected>Choisir une categorie</option>
                        <option v-for="c in categories"
                           :key="c.IdCategorieRevenu"
                           v-bind:value="c.IdCategorieRevenu">
                           {{ c.Nom }}
                        </option>
                     </select>
                  </div>
               </div>
               <div class="column is-4 has-text-centered">
                  <button
                     class="button is-link"
                     @click="addRevenus"
                     >
                  Ajouter
                  </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import Revenus from './Revenus.vue';

export default {
  name: 'RevenusListe',
  components: {
    Revenus,
  },
  data() {
    return {
      revenu: {
        idBudget: this.$store.state.budget.budgetIdCurr,
        titre: '',
        montant: null,
        idCategorieRevenu: 0,
      },
      error: false,
    };
  },
  computed: {
    budgets() {
      return this.$store.state.budget.budgets;
    },
    revenus() {
      return this.$store.state.revenu.revenusBudget;
    },
    categories() {
      return this.$store.state.categoriesrevenus.categories;
    },
  },
  methods: {
    updateRevenus() {
      this.$store.dispatch('revenu/getRevenusBudget', this.revenu.idBudget);
    },
    async addRevenus() {
      this.error = false;
      let message = '<h2 style="font-weight:bold">Modification non reussie</h2>';
      if (this.revenu.titre === '') {
        this.error = true;
        message += '<p>Le Titre est vide </p>';
      }
      if (this.revenu.montant <= 0.0) {
        this.error = true;
        message += '<p>Le champ Montant est vide ou invalide</p>';
      }
      if (this.revenu.idCategorieRevenu === 0) {
        this.error = true;
        message += '<p>Le champ Categorie est vide</p>';
      }
      if (this.error === true) {
        return this.$buefy.notification.open({
          duration: 5000,
          message,
          position: 'is-top-right',
          type: 'is-danger',
        });
      }
      await this.$store.dispatch('revenu/create', this.revenu);
      this.revenu.titre = '';
      this.revenu.montant = null;
      this.revenu.idCategorieRevenu = 0;
      return this.$buefy.notification.open({
        message: 'Modification completée',
        type: 'is-success',
      });
    },
  },
  created() {
    this.$store.dispatch('categoriesrevenus/getCategoriesRevenus');
    this.$store.dispatch('revenu/getRevenusBudget', this.revenu.idBudget);
    this.$store.dispatch('budget/getBudgets');
  },
};
</script>

<style scoped lang="scss">
#revenusListe {
  padding: 7px;
  margin: 10px 0px 10px 10px;
}

.liste {
  max-height: 60vh;
  min-height: 60vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.ajout {
  min-height: 10vh;
}

.stats {
  min-height:40vh;
}

</style>
