<template>
  <div class="depenses">
      <depenses-liste />
  </div>
</template>

<script>

import DepensesListe from '../../components/budget/depenses/DepensesListe.vue';

export default {
  name: 'Depenses',
  components: {
    DepensesListe,
  },
};
</script>
