<template>
  <div class="pretHypothecaire">
    <div class="columns is-centered">
      <div class="column is-half">
        <pret-hypothecaire />
      </div>
    </div>
  </div>
</template>

<script>

import pretHypothecaire from '../../components/calculatrices/pretHypothecaire.vue';

export default {
  name: 'pretHypotheque',
  components: {
    pretHypothecaire,
  },
};
</script>
