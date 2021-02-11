<template>
<div>
    <p class="title is-5">Dates</p>
    <div class="level">
      <div class="level-item">
        <p>Du</p>
        <input class="input" type="date" v-model="dateDebut">
      </div>
      <div class="level-item">
        <p class="">Au</p>
        <input class="input" type="date" v-model="dateFin">
      </div>
      <div class="level-item">
        <button class="button is-link" @click="affiche">Afficher</button>
      </div>
    </div>
<div class="columns">
  <div class="column is-6">
    <div class="container box" id="revenu">
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
    <div class="container box" id="depense">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="title is-3">Dépenses</p>
          </div>
          <div class="level-item">
            <button class="button is-small is-link" @click="openModalNewDepense">Ajouter</button>
          </div>
        </div>
      </div>
      <div>
          <depense-suivi-card v-for="d in depenses" :key="d.nom" :depenseSuivi="d"/>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import RevenuSuiviCard from './RevenuSuiviCard.vue';
import DepenseSuiviCard from './DepenseSuiviCard.vue';
import RevenuModalNew from './RevenuModalNew.vue';
import DepenseModalNew from './DepenseModalNew.vue';

export default {
  name: 'Suivi',
  components: {
    RevenuSuiviCard,
    DepenseSuiviCard,
  },
  data() {
    return {
      idBudget: this.$store.state.budget.budgetIdCurr,
      dateDebut: '',
      dateFin: '',
      error: false,
    };
  },
  computed: {
    revenus() {
      return this.$store.state.revenu.revenuSuivis;
    },
    depenses() {
      return this.$store.state.depense.depensesSuivis;
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
    openModalNewDepense() {
      this.$buefy.modal.open({
        parent: this,
        component: DepenseModalNew,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
    affiche() {
      this.error = false;
      let message = '<h2 style="font-weight:bold">Affichage non reussie</h2>';
      if (this.dateDebut === '') {
        this.error = true;
        message += '<p>Aucune date de début entrée </p>';
      }
      if (this.dateFin === '') {
        this.error = true;
        message += '<p>Aucune date de fin entrée</p>';
      }
      if (this.dateDebut > this.dateFin) {
        this.error = true;
        message += '<p>La date de fin doit être supérieur à la date du début</p>';
      }
      if (this.error === true) {
        this.$buefy.notification.open({
          duration: 5000,
          message,
          position: 'is-top-right',
          type: 'is-danger',
        });
      }
      if (this.dateDebut !== '' && this.dateFin !== '' && this.dateDebut < this.dateFin) {
        this.$store.dispatch('revenu/getRevenusSuivi', {
          idBudget: this.idBudget,
          dateDebut: this.dateDebut,
          dateFin: this.dateFin,
        });
        this.$store.dispatch('depense/getDepensesSuivi', {
          idBudget: this.idBudget,
          dateDebut: this.dateDebut,
          dateFin: this.dateFin,
        });
      }
    },
  },
  created() {
    this.$store.dispatch('revenu/getRevenusBudget', this.idBudget);
    this.$store.dispatch('depense/getDepensesBudget', this.idBudget);
  },
};
</script>

<style lang="scss">

#suivi {
  padding: 10px;
  margin: 10px 10px 10px 0px;
}
</style>
