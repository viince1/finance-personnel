<template>
<div>
  <input type="date" v-model="dateDebut">
  <input type="date" v-model="dateFin">
  <button @click="affiche">Afficher</button>
<div class="columns">
  <div class="column is-6">
    <div class="container box" id="objectifs">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="title is-3">Revenus</p>
          </div>
          <div class="level-item">
            <button class="button is-small is-link">Ajouter</button>
          </div>
        </div>
      </div>
      <div>
        <revenu-suivi-card v-for="r in revenus" :key="r.idRevenuSuivi" :revenuSuivi="r"/>
      </div>
    </div>
  </div>
    <div class="column is-6">
    <div class="container box" id="objectifs">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="title is-3">Dépenses</p>
          </div>
          <div class="level-item">
            <button class="button is-small is-link">Ajouter</button>
          </div>
        </div>
      </div>
      <div class="objectifsListe">
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import RevenuSuiviCard from './RevenuSuiviCard.vue';

export default {
  name: 'Suivi',
  components: {
    RevenuSuiviCard,
  },
  data() {
    return {
      idBudget: this.$store.state.budget.budgetIdCurr,
      dateDebut: '',
      dateFin: '',
    };
  },
  computed: {
    revenus() {
      return this.$store.state.revenu.rev;
    },
  },
  methods: {
    affiche() {
      this.$store.dispatch('revenu/getRevenusSuivi', this.idBudget, this.dateDebut, this.dateFin);
    },
  },
};
</script>

<style lang="scss">
.container {
  height: 100%;
  max-height: 60vh;
  overflow-x: hidden;
}
#suivi {
  padding: 10px;
  margin: 10px 10px 10px 0px;
}
</style>
