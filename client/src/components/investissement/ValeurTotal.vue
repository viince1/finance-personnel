<template>
  <div id="valeurTotal" class="valeurTotal has-text-centered">
      <div class="box">
          <h1 class="title is-4">Valeur totale</h1>
          <div class="card-content">
            <div class="amount is-size-4">{{valeurTotale}} $</div>
          </div>
        </div>
  </div>
</template>

<script>

export default {
  name: 'ValeurTotal',
  computed: {
    valeurTotale() {
      return this.$store.getters['ordreAchat/valeurTotale'];
    },
  },
  created() {
    this.$store.dispatch('ordreAchat/getOrdresAchat');
  },
};
</script>

<style scoped lang="scss">

</style>
