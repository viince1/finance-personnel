<template>
  <div class="budget box" id="budget">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="title is-3">Budget</p>
        </div>
        <div class="level-item">
          <button class="button is-link is-small" v-on:click="openBudgetAdd" >Ajouter</button>
        </div>
      </div>
    </div>
    <budget-card :budget="budget" v-for="budget in budgets" :key="budget.IdBudget"/>
  </div>
</template>

<script>
import BudgetCard from './BudgetCard.vue';
import BudgetCreateModal from './BudgetCreateModal.vue';

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
    openBudgetAdd() {
      this.$buefy.modal.open({
        parent: this,
        component: BudgetCreateModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
  },
  async created() {
    await this.$store.dispatch('budget/getBudgets');
  },
};
</script>
