<template>
  <div class="container box" id="objectifs">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="title is-3">Objectifs</p>
        </div>
        <div class="level-item">
          <button class="button is-small is-link">Ajouter</button>
        </div>
      </div>
    </div>
    <div class="objectifsListe">
        <objectif v-for="obj in objectifs" :key="obj.IdObjectif" :objectif="obj"/>
    </div>
  </div>
</template>

<script>
import Objectif from './Objectif.vue';

export default {
  name: 'Objectifs',
  components: {
    Objectif,
  },
  computed: {
    objectifs() {
      return this.$store.state.objectif.objectifs;
    },
  },
  created() {
    this.$store.dispatch('objectif/getObjectifs');
  },
};
</script>

<style lang="scss">
#objectifs {
  padding: 10px;
  margin: 10px 0px 10px 10px;
  min-height: 90vh;
  max-height: 90vh;
  overflow-y: scroll;
}
</style>
