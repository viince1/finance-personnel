<template>
  <div class="" id="moyenne">
    <p class="title is-3">Resume</p>
    <div class="columns flex">
      <div class="column is-4">
        <div class="revenus box has-background-success-dark has-text-white has-text-centered">
          <h1 class="title is-4 has-text-white">Revenus</h1>
          <div class="card-content">
            <div class="amount is-size-4">{{revenusYTD.toFixed(2)}} $</div>
            <div class="description is-size-6">Cummul annuel des revenus</div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="box depenses has-text-white has-background-danger-dark has-text-centered">
          <h1 class=" title is-4 has-text-white">Depenses</h1>
          <div class="card-content">
            <div class="amount is-size-4">{{depensesYTD.toFixed(2)}} $</div>
            <div class="description is-size-6">Cummul annuel des depenses</div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="box is-fullheight has-background-link-dark has-text-white has-text-centered">
          <h1 class="title is-4 has-text-white">Taux epargne</h1>
          <div class="card-content">
            <div class="amount is-size-4">{{savingRateYTD}} %</div>
            <div class="description is-size-6">Taux d'epargne pour l'ann&eacute;e 2021</div>
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
    };
  },
  computed: {
    depenses() {
      return this.$store.state.depense.depenses;
    },
    revenus() {
      return this.$store.state.revenu.revenus;
    },
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
  },
  created() {
    this.$store.dispatch('depense/getDepenses');
    this.$store.dispatch('revenu/getRevenus');
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
