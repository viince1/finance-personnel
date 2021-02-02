<template>
  <div class="home container">
    <div class="columns">
      <div class="column is-5">
        <objectif/>
      </div>
      <div class="column is-7">
        <div class="columns">
          <div class="column">
            <bonjour />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <comptes />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Objectif from '../components/home/objectifs/ObjectifsListe.vue';
import Bonjour from '../components/home/bonjour/Bonjour.vue';
import Comptes from '../components/home/compte/CompteListe.vue';

export default {
  name: 'Home',
  components: {
    Objectif,
    Bonjour,
    Comptes,
  },
  computed: {
    getuserdata() {
      return this.$store.state.user.user.data;
    },
  },
};
</script>

<style scoped lang="scss">

</style>
