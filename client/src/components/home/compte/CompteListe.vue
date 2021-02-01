<template>
  <div class="container box" id="comptes">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="title is-3">Comptes</p>
        </div>
        <div class="level-item">
          <button class="button is-link is-small" v-on:click="addCompte" >Ajouter</button>
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
import AjoutCompte from './AddCompte.vue';

export default {
  name: 'Comptes',
  components: {
    Compte,
  },
  methods: {
    async addCompte() {
      console.log('here');
      this.$buefy.modal.open({
        parent: this,
        component: AjoutCompte,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
  },
  computed: {
    comptes() {
      return this.$store.state.compte.comptes;
    },
  },
  created() {
    this.$store.dispatch('compte/getComptes');
    this.$store.dispatch('compte/getTypesComptes');
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
