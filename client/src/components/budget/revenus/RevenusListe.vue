<template>
  <div class="revenus" id="revenusListe">
    <div class="title">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1>Revenus</h1>
          </div>
        <div class="level-item">
          <button class="button is-small is-link">Ajouter</button>
        </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="field">
              <p class="control">
                <span class="select">
                  <select v-model="idBudget" @change="updateRevenus()">
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
    <div v-if="idBudget != 0" class="columns">
      <div class="column is-10">
        <div class="box">
            <revenus
            v-for="revenu in revenus"
             :key="revenu.IdRevenu"
             :revenu="revenu"
            />
        </div>
      </div>
      <div class="column is-2">
        <div class="box">
          Statisitques en temps reel sur le budget,
          soit le revenu actuel annuel et les depenses
          actuels et le taux depargne actuel
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
      idBudget: this.$route.params.IdBudget,
    };
  },
  computed: {
    budgets() {
      return this.$store.state.budget.budgets;
    },
    revenus() {
      return this.$store.state.revenu.revenusBudget;
    },
  },
  methods: {
    updateRevenus() {
      this.$store.dispatch('revenu/getRevenusBudget', this.idBudget);
    },
  },
  created() {
    this.$store.dispatch('budget/getBudgets');
    // this.$store.dispatch('revenu/getRevenus');
  },

};
</script>

<style lang="scss">
.container {
  height: 100%;
}
</style>
