<template>
  <div class="" id="moyenne">
    <div class="columns flex">
      <div class="column is-4">
        <div class="box revenus has-background-success-dark has-text-white">
          <h1 class="is-size-4">Revenus</h1>
          <div class="card-content">
            <div class="amount is-size-5">55$</div>
            <div class="description is-size-7">Revenus mensuels moyens</div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="box depenses has-text-white has-background-danger-dark">
          <h1 class="is-size-4">Depenses</h1>
          <div class="card-content">
            <div class="amount is-size-5">55$</div>
            <div class="description is-size-7">Depenses mensuelles moyennes</div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="box is-fullheight epargne has-background-link-dark has-text-white">
          <h1 class="is-size-4">Taux epargne</h1>
          <div class="card-content">
            <div class="amount is-size-5">688.99$</div>
            <div class="description is-size-7">Depenses mensuelles moyennes</div>
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
  },
  created() {
    this.$store.dispatch('depense/getDepenses');
    this.$store.dispatch('revenu/getRevenus');
  },
};
</script>

<style lang="scss">
#moyenne {
  max-height: 30vh;
  min-height: 30vh;
}

#moyenne.columns {
  display: flex;
  min-height: 100%;
  align-items: stretch;
}

</style>
