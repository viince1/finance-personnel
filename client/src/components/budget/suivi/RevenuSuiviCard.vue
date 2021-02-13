<template>
  <tr>
    <td>{{revenuSuivi.RevenuNom}}</td>
    <td class="has-text-right">{{revenuSuivi.Montant.toFixed(2)}} $</td>
    <td class="has-text-right">{{revenuSuivi.DateEntree}}</td>
    <td class="has-text-centered">{{revenuSuivi.Description}}</td>
    <td><a href="" v-on:click.prevent="openModalEdit">Modifier / Voir plus </a></td>
  </tr>
</template>

<script>
import RevenuModalEdit from './RevenuModalEdit.vue';

export default {
  name: 'RevenuSuiviCard',
  props: {
    revenuSuivi: Object,
  },
  methods: {
    openModalEdit() {
      this.$buefy.modal.open({
        parent: this,
        component: RevenuModalEdit,
        props: this.revenuSuivi,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
  },
};
</script>
