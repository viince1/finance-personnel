<template>
  <div id="precision" class="has-text-centered">
    <div class="">
      <h1 class="title is-4">Précision</h1>
      <div class="card-content">
        <span v-if="profitsAndLoss >= 0" class="is-size-4"
          style="color:green">{{profitsAndLoss}} $ &uarr;</span>
        <span v-if="profitsAndLoss <= 0" class="is-size-4"
          style="color:red">{{profitsAndLoss}} $ &darr;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Precision',
  computed: {
    profitsAndLoss() {
      const { valeurTotale } = this.$store.state.ordreAchat;
      const { sum } = this.$store.state.investissement;
      return (valeurTotale - sum).toFixed(2);
    },
  },
};
</script>

<style scoped lang="scss">
#precision {
  min-height: 15vh;
  max-height: 15vh;
}
</style>
