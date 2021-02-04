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
                                 <select v-model="idBudget" v-on:change.prevent="updateRevenus" >
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
            <div class="liste" v-if="idBudget != 0">
               <revenus
                  v-for="revenu in revenus"
                  :key="revenu.IdRevenu"
                  :revenu="revenu"
                  />
            </div>
         </div>
         <div class="ajout box" v-if="idBudget != 0">
            <div class="title">
               <h1 class="title is-5">Ajout d'un revenu</h1>
            </div>
            <div class="columns">
               <div class="column is-3 has-text-centered">
                  <input
                     type="text"
                     class="input has-text-centered"
                     placeholder="Titre du revenu"
                     v-model="Titre"
                     />
               </div>
               <div class="column is-2 has-text-centered">
                  <input
                     type="text"
                     class="input has-text-centered"
                     placeholder="Montant"
                     v-model="Montant"
                     />
               </div>
               <div class="column is-3 has-text-centered">
                  <div class="select">
                     <select class="select" v-model="IdCategorieRevenu">
                        <option :value="0" selected>Choisir un statut</option>
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
      idBudget: this.$store.state.budget.budgetIdCurr,
      Titre: '',
      Montant: 0,
      IdCategorieRevenu: 0,
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
      return this.$store.state.revenu.categoriesRevenus;
    },
  },
  methods: {
    updateRevenus() {
      this.$store.dispatch('revenu/getRevenusBudget', this.idBudget);
    },
    async addRevenus() {
      await this.$store.dispatch('revenu/create', {
        Titre: this.Titre,
        Montant: this.Montant,
        IdCategorieRevenu: this.IdCategorieRevenu,
        IdBudget: this.idBudget,
      });
      this.Titre = '';
      this.Montant = null;
      this.IdCategorieRevenu = 0;
    },
  },
  created() {
    this.$store.dispatch('revenu/getCategoriesRevenus');
    this.$store.dispatch('revenu/getRevenusBudget', this.idBudget);
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
