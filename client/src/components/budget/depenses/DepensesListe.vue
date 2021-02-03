<template>
  <div class="depenses" id="depenses">
    <!-- Selection du budget -->
    <div class="title">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1>Depenses</h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="field">
              <p class="control">
                <span class="select">
                  <select v-model="idBudget" v-on:change.prevent="updateDepenses" >
                    <option value="0">Selectionnez un budget</option>
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
      <h3
      class="has-text-centered"
       v-if="idBudget === 0">
       Veuillez selectionner un budget
      </h3>
    </div>
    <!-- Liste des depenses -->
    <div v-if="idBudget != 0" class="columns">
      <div class="column is-10 ">
        <div class="liste box">
            <depense-card
            v-for="(depense, index) in depenses"
             :key="index"
              :depense="depense"
                :categories="categories"
                  :frequences="frequences"
            />
        </div>
        <!-- Input pour ajouter -->
        <div class="ajout box">
      <div class="columns">
        <div class="column is-2 has-text-centered">
          <span class="select">
            <select name="" id="" class="select" v-model="idCategorieDepense">
              <option value="0">Categories</option>
              <option :value="c.IdCategorieDepense"
              v-for="(c, index) in categories" :key="index">
              {{c.Nom}}
              </option>
            </select>
          </span>
        </div>
        <div class="column is-4 has-text-centered">
          <input
            type="text"
             class="input has-text-centered"
              placeholder="Nom de la depense"
                v-model="nom">
        </div>
        <div class="column is-1 has-text-centered">
          <input
           type="text"
            class="input has-text-centered"
            placeholder="Montant"
              v-model="montant">
        </div>
        <div class="column is-2 has-text-centered">
          <span class="select">
            <select name="" id="" class="select" v-model="idDepenseFrequence">
              <option value="0">Frequence</option>
              <option
              v-for="(f, index) in frequences"
                :key="index"
                  :value="f.IdDepenseFrequence">
                  {{f.Nom}}
              </option>
            </select>
          </span>
        </div>
        <div class="column is-4 has-text-centered">
          <button class="button is-success" v-on:click.prevent="ajouterDepense()">Ajouter</button>
        </div>
      </div>        </div>
      </div>
      <div class="column is-2">
        <div class="stats box">
          STATISTIQUE 1
        </div>
        <div class="stats box">
          STATISIQUE 2
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DepenseCard from './DepenseCard.vue';

export default {
  name: 'Depenses',
  components: {
    DepenseCard,
  },
  data() {
    return {
      idBudget: 0,
      idCategorieDepense: 0,
      idDepenseFrequence: 0,
      nom: '',
      montant: null,
    };
  },
  computed: {
    budgets() {
      return this.$store.state.budget.budgets;
    },
    depenses() {
      return this.$store.state.depense.depensesBudget;
    },
    categories() {
      return this.$store.state.depense.categories;
    },
    frequences() {
      return this.$store.state.depense.frequences;
    },
  },
  methods: {
    updateDepenses() {
      this.$store.dispatch('depense/getDepensesBudget', this.idBudget);
    },
    async ajouterDepense() {
      await this.$store.dispatch('depense/ajouterDepense', {
        idCategorieDepense: this.idCategorieDepense,
        idDepenseFrequence: this.idDepenseFrequence,
        nom: this.nom,
        montant: parseInt(this.montant, 10),
        idBudget: this.idBudget,
      });
      this.idCategorieDepense = 0;
      this.idDepenseFrequence = 0;
      this.nom = '';
      this.montant = null;
    },
  },
  created() {
    this.$store.dispatch('depense/getFrequencesDepense');
    this.$store.dispatch('depense/getCategoriesDepense');
    this.$store.dispatch('depense/getDepensesBudget', this.idBudget);
    this.$store.dispatch('budget/getBudgets');
  },
};
</script>

<style scoped lang="scss">
#depenses {
  padding: 7px;
  margin: 10px 0px 10px 10px;
}

.liste {
  max-height: 70vh;
  min-height: 70vh;
  overflow-y: scroll;
}

.ajout {
  min-height: 10vh;
}

.stats {
  min-height:40vh;
}

</style>
