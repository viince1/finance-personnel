<template>
  <div>
    <div class="box mt-3">
      <h4 class="title is-4">Choisir une plage de date</h4>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field">
            <label for="" class="label">Du : </label>
            <div class="control">
              <input class="input" type="date" v-model="dateDebut">
            </div>
          </div>
        </div>
        <div class="level-item">
          <div class="field">
            <label for="" class="label">Au : </label>
            <div class="control">
              <input class="input" type="date" v-model="dateFin">
            </div>
          </div>
        </div>
        <div class="level-item">
          <div class="field">
            <div class="control">
              <label for="" class="label"></label>
              <button class="button is-link" @click="affiche">Afficher</button>
            </div>
          </div>
        </div>
      </div>
      <div class="level-right">
        <span class="select">
            <select
              v-model="idBudget"
              v-on:change.prevent="updateBudget" >
              <option :value="0" disabled>S&eacute;lectionnez un budget</option>
              <option
                :value="budget.IdBudget"
                v-for="budget in budgets"
                :key="budget.IdBudget">{{budget.Nom}}
              </option>
            </select>
          </span>
      </div>
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
        <div class="revenuListe">
          <table class="table is-fullwidth">
            <thead>
              <tr class="has-text-centered">
                <th>Revenu</th>
                <th>Montant</th>
                <th>Date</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <revenu-suivi-card v-for="r in revenus" :key="r.IdRevenuSuivi" :revenuSuivi="r"/>
            </tbody>
          </table>
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
        <div class="depenseListe">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>D&eacute;pense</th>
                <th>Montant</th>
                <th>Date</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <depense-suivi-card v-for="d in depenses" :key="d.nom" :depenseSuivi="d"/>
            </tbody>
          </table>
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
      dateDebut: this.$store.state.user.suivi.dateDebut,
      dateFin: this.$store.state.user.suivi.dateFin,
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
    budgets() {
      return this.$store.state.budget.budgets;
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
    async updateBudget() {
      this.$store.dispatch('revenu/resetRevenusSuivi');
      this.$store.dispatch('depense/resetDepensesSuivi');
      this.$store.dispatch('budget/setCurrentBudget', this.idBudget);
      this.$store.dispatch('user/setDateDebut', this.dateDebut);
      this.$store.dispatch('user/setDateFin', this.dateFin);
      await this.$store.dispatch('revenu/getRevenusBudget', this.idBudget);
      await this.$store.dispatch('depense/getDepensesBudget', this.idBudget);
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
  async created() {
    await this.$store.dispatch('budget/getBudgets');
    await this.$store.dispatch('revenu/getRevenusBudget', this.idBudget);
    await this.$store.dispatch('depense/getDepensesBudget', this.idBudget);
  },
};
</script>

<style lang="scss">

#suivi {
  padding: 10px;
  margin: 10px 10px 10px 0px;
}
.revenuListe {
  min-height: 90vh;
  max-height: 90vh;
  overflow-y: scroll;
}
.depenseListe {
  min-height: 90vh;
  max-height: 90vh;
  overflow-y: scroll;
}
</style>
