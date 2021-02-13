<template>
  <tr>
    <td>{{depenseNom.nom}}</td>
    <td class="has-text-right">{{depenseSuivi.Montant.toFixed(2)}} $</td>
    <td class="has-text-right">{{depenseSuivi.DateEntree}}</td>
    <td class="has-text-centered">{{depenseSuivi.Description}}</td>
    <td><a href="" v-on:click.prevent="openModalEdit">Modifier / Voir plus </a></td>
  </tr>
</template>

<script>
import DepenseModalEdit from './DepenseModalEdit.vue';

export default {
  name: 'DepenseSuiviCard',
  data() {
    return {
      depensesBudget: this.$store.state.depense.depensesBudget,
    };
  },
  props: {
    depenseSuivi: Object,
  },
  computed: {
    depenseNom() {
      const index = this.depensesBudget.find((d) => d.IdDepense === this.depenseSuivi.IdDepense);
      return index;
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
  async created() {
    this.depensesBudget = this.$store.state.depense.depensesBudget;
  },
};
</script>
