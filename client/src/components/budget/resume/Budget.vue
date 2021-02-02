<template>
  <div class="budget box container" id="piechart">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="title is-3">Budget</p>
        </div>
        <div class="level-item">
          <button class="button is-link is-small" v-on:click="addBudget" >Ajouter</button>
        </div>
      </div>
    </div>
    <budget-card :budget="b" v-for="b in budgets" :key="b.IdBudget"/>
  </div>
</template>

<script>
import BudgetCard from './BudgetCard.vue';

export default {
  name: 'Budget',
  components: {
    BudgetCard,
  },
  computed: {
    budgets() {
      return this.$store.state.budget.budgets;
    },
  },
  methods: {
    addBudget() {
      console.log('add budget');
    },
  },
  created() {
    this.$store.dispatch('budget/getBudgets');
  },
};
</script>

<style lang="scss">

</style>
