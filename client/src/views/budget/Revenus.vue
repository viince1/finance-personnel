<template>
  <div class="revenus">
    <revenus-liste />
  </div>
</template>

<script>

import RevenusListe from '../../components/budget/revenus/RevenusListe.vue';

export default {
  name: 'Revenus',
  components: {
    RevenusListe,
  },
};
</script>
