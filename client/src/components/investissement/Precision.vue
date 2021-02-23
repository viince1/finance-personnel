<template>
  <div id="precision">
    <div class="container has-text-centered">
      <h1 class="title is-5">Profits et Pertes</h1>
      <div class="profitandloss">
        <span v-if="profitsAndLoss >= 0"
          style="color:green">{{profitsAndLoss}} $ &uarr;</span>
        <span v-if="profitsAndLoss <= 0"
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

</style>
