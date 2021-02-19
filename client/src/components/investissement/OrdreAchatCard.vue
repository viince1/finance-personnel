<template>
    <tr>
    <td>{{ ordreAchat.DateAcquisition }}</td>
    <td class="has-text-right">{{ ordreAchat.Titre }}</td>
    <td class="has-text-right">{{ ordreAchat.Prix }} $</td>
    <td class="has-text-right">{{ ordreAchat.Quantite }}</td>
    <td class="has-text-right">{{ total }} $</td>
    <td><a href="">Modifier / Voir plus </a></td>
  </tr>
</template>

<script>
export default {
  name: 'OrdreAchatCard',
  props: {
    ordreAchat: Object,
  },
  computed: {
    total() {
      return Math.round(this.ordreAchat.Prix * this.ordreAchat.Quantite);
    },
  },
};
</script>
