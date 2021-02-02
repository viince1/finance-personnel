<template>
  <div class="depenses" id="depenses">
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
    <div v-if="idBudget != 0" class="columns">
      <div class="column is-10">
        <div class="box">
            <depense-card
            v-for="depense in depenses"
             :key="depense.IdDepense"
              :depense="depense"
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
import DepenseCard from './DepenseCard.vue';

export default {
  name: 'Depenses',
  components: {
    DepenseCard,
  },
  data() {
    return {
      idBudget: 0,
    };
  },
  computed: {
    budgets() {
      return this.$store.state.budget.budgets;
    },
    depenses() {
      return this.$store.state.depense.depensesBudget;
    },
  },
  methods: {
    updateDepenses() {
      this.$store.dispatch('depense/getDepensesBudget', this.idBudget);
    },
  },
  created() {
    this.$store.dispatch('depense/getDepensesBudget', this.idBudget);
    this.$store.dispatch('budget/getBudgets');
  },
};
</script>

<style lang="scss">
#depenses {
  padding: 7px;
  margin: 10px 0px 10px 10px;
}
</style>
