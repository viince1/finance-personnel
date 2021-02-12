<template>
  <tr>
    <td>{{depensesTitre}}</td>
    <td class="has-text-right">{{depenseSuivi.Montant.toFixed(2)}} $</td>
    <td class="has-text-right">{{depenseSuivi.DateEntree}}</td>
    <td class="has-text-centered">{{depenseSuivi.Description}}</td>
    <td><a href="" v-on:click.prevent="openModalEdit">Voir plus </a></td>
  </tr>
</template>

<script>
import DepenseModalEdit from './DepenseModalEdit.vue';

export default {
  name: 'DepenseSuiviCard',
  props: {
    depenseSuivi: Object,
  },
  computed: {
    depensesTitre() {
      const depensesTitre = this.$store.state.depense.depensesBudget;
      return depensesTitre.find((depense) => depense.IdDepense === this.depenseSuivi.IdDepense).nom;
    },
  },
  methods: {
    openModalEdit() {
      this.$buefy.modal.open({
        parent: this,
        component: DepenseModalEdit,
        props: this.depenseSuivi,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
  },
};
</script>
