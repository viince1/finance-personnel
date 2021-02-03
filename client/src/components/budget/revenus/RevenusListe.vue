<template>
  <div class="revenus" id="revenusListe">
    <div class="title">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1>Revenus</h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="field">
              <p class="control">
                <span class="select">
                  <select v-model="idBudget" @change="updateRevenus()">
                    <option value="0" disabled>Selectionnez un budget</option>
                    <option
                      :value="budget.IdBudget"
                      v-for="budget in budgets"
                      :key="budget.IdBudget"
                    >
                      {{ budget.Nom }}
                    </option>
                  </select>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <h3 class="has-text-centered" v-if="idBudget === 0">
        Veuillez selectionner un budget
      </h3>
    </div>
    <div v-if="idBudget != 0" class="columns">
      <div class="column is-10">
        <div class="liste box">
          <revenus
            v-for="revenu in revenus"
            :key="revenu.IdRevenu"
            :revenu="revenu"
          />
        </div>
        <div class="ajout box">
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
            <div class="column is-3 has-text-centered">
              <button
                class="button is-success"
                @click="addRevenus"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-2">
        <div class="stats box">STATISTIQUE 1</div>
        <div class="stats box">STATISIQUE 2</div>
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
      idBudget: 0,
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
    this.$store.dispatch('budget/getBudgets');
    this.$store.dispatch('revenu/getCategoriesRevenus');
    // this.$store.dispatch('revenu/getRevenus');
  },
};
</script>

<style scoped lang="scss">
#revenusListe {
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
