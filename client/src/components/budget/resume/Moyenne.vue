<template>
  <div class="" id="moyenne">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="title is-4">Resume</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <span class="select">
            <select
              v-model="idBudget"
              v-on:change.prevent="updateBudget" >
              <option :value="0" disabled>Selectionnez un budget</option>
              <option
                :value="budget.IdBudget"
                v-for="budget in budgets"
                :key="budget.IdBudget">{{budget.Nom}}
              </option>
            </select>
          </span>
        </div>
      </div>
    </div>
    <div class="columns flex">
      <div class="column is-4">
        <div class="revenus box has-background-success-dark has-text-white has-text-centered">
          <h1 class="title is-4 has-text-white">Revenus</h1>
          <div class="card-content">
            <div class="amount is-size-4">{{revenusYTD.toFixed(2)}} $</div>
            <div class="description is-size-6">
              Cummul annuel des revenus <br> depuis 01 Janvier {{year}}</div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="box depenses has-text-white has-background-danger-dark has-text-centered">
          <h1 class=" title is-4 has-text-white">Depenses</h1>
          <div class="card-content">
            <div class="amount is-size-4">{{depensesYTD.toFixed(2)}} $</div>
            <div class="description is-size-6">
              Cummul annuel des depenses <br> depuis 01 Janvier {{year}}</div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="box is-fullheight has-background-link-dark has-text-white has-text-centered">
          <h1 class="title is-4 has-text-white">Taux epargne</h1>
          <div class="card-content">
            <div class="amount is-size-4">{{savingRateYTD.toFixed(0)}} %</div>
            <div class="description is-size-6">
              Taux d'epargne pour l'ann&eacute;e <br> depuis 01 Janvier {{year}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Moyenne',
  data() {
    return {
      idBudget: this.$store.state.budget.budgetIdCurr,
    };
  },
  methods: {
    async updateBudget() {
      await this.$store.dispatch('budget/setCurrentBudget', this.idBudget);
      await this.$store.dispatch('budget/getSommeParCategories', this.idBudget);
      await this.$store.dispatch('revenu/getRevenus', this.idBudget);
      await this.$store.dispatch('depense/getDepenses', this.idBudget);
    },
  },
  computed: {
    revenusYTD() {
      return this.$store.getters['revenu/yeartodate'];
    },
    depensesYTD() {
      return this.$store.getters['depense/yeartodate'];
    },
    savingRateYTD() {
      if (this.revenusYTD === 0) return 0;
      return ((this.revenusYTD - this.depensesYTD) / this.revenusYTD) * 100;
    },
    year() {
      const date = new Date();
      return date.getFullYear();
    },
    budgets() {
      return this.$store.state.budget.budgets;
    },
  },
  async created() {
    await this.$store.dispatch('budget/setCurrentBudget', this.idBudget);
    await this.$store.dispatch('budget/getSommeParCategories', this.idBudget);
    await this.$store.dispatch('revenu/getRevenus', this.idBudget);
    await this.$store.dispatch('depense/getDepenses', this.idBudget);
  },
};
</script>

<style scoped lang="scss">
#moyenne.columns {
  display: flex;
  min-height: 100%;
  align-items: stretch;
}
</style>
