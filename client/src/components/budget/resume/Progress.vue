<template>
  <div class="box">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="title is-4">Stats</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <span class="select">
            <select
              v-model="idBudget"
              v-on:change.prevent="updateCategories" >
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
    <div class="mb-4" v-for="(categorie, index) in categories" :key="index">
      <h4>{{categorie.Nom}}</h4>
      <progress
      class="progress is-primary"
       :value="categorie.SommeDepenseSuivi"
       :max="categorie.SommeParCategorie">15%</progress>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Progress',
  data() {
    return {
      idBudget: 0,
    };
  },
  computed: {
    categories() {
      return this.$store.state.budget.sommeParCategories;
    },
    budgets() {
      return this.$store.state.budget.budgets;
    },
  },
  methods: {
    async updateCategories() {
      await this.$store.dispatch('budget/getSommeParCategories', this.idBudget);
    },
  },
  async created() {
    await this.$store.dispatch('budget/getSommeParCategories', this.idBudget);
  },
};
</script>
