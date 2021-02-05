<template>
  <div class="depenses" id="depenses">
    <div class="box">
        <div class="title">
          <div class="level">
              <div class="level-left">
                <div class="level-item">
                    <h1 class="title is-5">Liste des depenses</h1>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                    <div class="field">
                      <p class="control">
                          <span class="select">
                            <select
                              v-model="depense.idBudget"
                               v-on:change.prevent="updateDepenses" >
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
        <div class="liste" v-if="depense.idBudget != 0">
          <depense-card
              v-for="(depense, index) in depenses"
              :key="index"
              :depense="depense"
              :categories="categories"
              :frequences="frequences"
              />
        </div>
    </div>
    <!-- Input pour ajouter -->
    <div class="ajout box" v-if="depense.idBudget != 0">
        <div class="title">
          <h1 class="title is-5">Ajout d'un depense</h1>
        </div>
        <div class="columns">
          <div class="column is-2 has-text-centered">
              <span class="select">
                <select name="" id="" class="select" v-model="depense.idCategorieDepense">
                    <option value="0">Categories</option>
                    <option :value="c.IdCategorieDepense"
                      v-for="(c, index) in categories" :key="index">
                      {{c.Nom}}
                    </option>
                </select>
              </span>
          </div>
          <div class="column is-3 has-text-centered">
              <input
                type="text"
                class="input has-text-centered"
                placeholder="Nom de la depense"
                v-model="depense.nom">
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
                  v-model="depense.montant">
              </div>
              <div class="control">
                <button class="button is-static">$</button>
              </div>
            </div>
          </div>
          <div class="column is-2 has-text-centered">
              <span class="select">
                <select name="" id="" class="select" v-model="depense.idDepenseFrequence">
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
              <button
                class="button is-link"
                v-on:click.prevent="ajouterDepense()">
                Ajouter
              </button>
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
      depense: {
        idBudget: this.$store.state.budget.budgetIdCurr,
        idCategorieDepense: 0,
        idDepenseFrequence: 0,
        nom: '',
        montant: null,
      },
      error: false,
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
      this.$store.dispatch('depense/getDepensesBudget', this.depense.idBudget);
    },
    async ajouterDepense() {
      this.error = false;
      let message = '<h2 style="font-weight:bold">Insertion incomplete</h2>';
      if (this.depense.nom === '') {
        this.error = true;
        message += '<p>Le champ nom est vide </p>';
      }
      if (this.depense.idCategorieDepense === 0) {
        this.error = true;
        message += '<p>Le champ categorie est vide </p>';
      }
      if (this.depense.idDepenseFrequence === 0) {
        this.error = true;
        message += '<p>Le champ frequence est vide </p>';
      }
      if (this.depense.montant <= 0.0) {
        this.error = true;
        message += '<p>Le champ montant est vide </p>';
      }
      if (this.error === true) {
        return this.$buefy.notification.open({
          duration: 5000,
          message,
          position: 'is-top-right',
          type: 'is-danger',
        });
      }
      await this.$store.dispatch('depense/ajouterDepense', this.depense);
      this.depense.idCategorieDepense = 0;
      this.depense.idDepenseFrequence = 0;
      this.depense.nom = '';
      this.depense.montant = null;
      return this.$buefy.notification.open({
        message: '<h2 style="font-weight:bold">Insertion completee</h2>',
        type: 'is-success',
      });
    },
  },
  async created() {
    await this.$store.dispatch('depense/getFrequencesDepense');
    await this.$store.dispatch('depense/getCategoriesDepense');
    await this.$store.dispatch('depense/getDepensesBudget', this.depense.idBudget);
    await this.$store.dispatch('budget/getBudgets');
  },
};
</script>

<style scoped lang="scss">
#depenses {
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
