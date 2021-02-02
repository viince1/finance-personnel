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
            <a href="" class="link"
              v-on:click.prevent="seeRevenus()">
            Planifiez vos revenus
            </a>
          </div>
          <div class="level-item">
            <a href=""
             class="link"
             v-on:click.prevent="seeDepenses()">
             Planifiez vos d&eacute;penses
            </a>
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
export default {
  name: 'BudgetCard',
  props: {
    budget: Object,
  },
  methods: {
    seeRevenus() {
      this.$router.push({ name: 'Revenus', params: { IdBudget: this.budget.IdBudget } });
    },
    seeDepenses() {
      this.$router.push({ name: 'Depenses', params: { IdBudget: this.budget.IdBudget } });
    },
    deleteBudget(idBudget) {
      console.log(idBudget);
      this.$store.dispatch('budget/deleteBudget', idBudget);
    },
  },
};
</script>

<style lang="scss">
.card {
  margin-bottom: 20px;
}
</style>
