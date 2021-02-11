<template>
<div>
    <label class="label">Dates</label>
    <div class="level">
      <p>Du</p>
      <div class="level-item">
        <input class="input" type="date" v-model="dateDebut">
      </div>
      <div class="level-item">
        <p class="">Au</p>
        <input class="input" type="date" v-model="dateFin">
      </div>
    </div>
    <button class="button is-link" @click="affiche">Afficher</button>
<div class="columns">
  <div class="column is-6">
    <div class="container box" id="objectifs">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="title is-3">Revenus</p>
          </div>
          <div class="level-item">
            <button class="button is-small is-link" @click="openModalNewRevenu">Ajouter</button>
          </div>
        </div>
      </div>
      <div>
        <revenu-suivi-card v-for="r in revenus" :key="r.IdRevenuSuivi" :revenuSuivi="r"/>
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
import RevenuModalNew from './RevenuModalNew.vue';

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
      return this.$store.state.revenu.revenuSuivis;
    },
  },
  methods: {
    openModalNewRevenu() {
      this.$buefy.modal.open({
        parent: this,
        component: RevenuModalNew,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
    affiche() {
      this.$store.dispatch('revenu/getRevenusSuivi', {
        idBudget: this.idBudget,
        dateDebut: this.dateDebut,
        dateFin: this.dateFin,
      });
    },
  },
  created() {
    this.$store.dispatch('revenu/getRevenusBudget', this.idBudget);
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
