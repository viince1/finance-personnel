<template>
  <div class="container box" id="comptes">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="title is-3">Comptes</p>
        </div>
        <div class="level-item">
          <button class="button is-link is-small">Ajouter</button>
        </div>
      </div>
    </div>
    <div class="comptesListe">
      <compte v-for="co in comptes" :key="co.IdCompte" :compte="co"/>
    </div>
  </div>
</template>

<script>
import Compte from './Compte.vue';

export default {
  name: 'Comptes',
  components: {
    Compte,
  },
  computed: {
    comptes() {
      return this.$store.state.compte.comptes;
    },
  },
  created() {
    this.$store.dispatch('compte/getComptes');
  },
};
</script>

<style lang="scss">
#comptes {
  padding: 10px;
  margin: 10px 10px 10px 0px;
  min-height: 55vh;
  max-height: 55vh;
  overflow-y: scroll;
}

.comptesListe * {
  margin-bottom: 10px;
}
</style>
