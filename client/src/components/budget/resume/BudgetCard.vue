<template>
    <div class="box">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="is-size-5">{{budget.Nom}}</p>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <a href="" class="link" v-on:click.prevent="seeRevenus()">Planifiez vos revenus</a>
          </div>
          <div class="level-item">
            <a href="" class="link" v-on:click.prevent="seeDepenses()">Planifiez vos depenses</a>
          </div>
          <div class="level-item">
            <a href="" class="link" v-on:click.prevent="modifier()">Modifier</a>
          </div>
          <div class="level-item">
            <a href=""
             class="link"
             v-on:click.prevent="deleteBudget(budget.IdBudget)">
             Supprimer
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import BudgetEditModal from './BudgetEditModal.vue';

export default {
  name: 'BudgetCard',
  props: {
    budget: Object,
  },
  methods: {
    async deleteBudget(idBudget) {
      await this.$store.dispatch('budget/deleteBudget', idBudget);
    },
    modifier() {
      this.$buefy.modal.open({
        parent: this,
        component: BudgetEditModal,
        props: this.budget,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
    seeRevenus() {
      this.$store.dispatch('budget/setCurrentBudget', this.budget.IdBudget);
      this.$router.push({ name: 'Revenus' });
    },
    seeDepenses() {
      this.$store.dispatch('budget/setCurrentBudget', this.budget.IdBudget);
      this.$router.push({ name: 'Depenses' });
    },
  },
};
</script>

<style lang="scss">
.card {
  margin-bottom: 20px;
}
</style>
