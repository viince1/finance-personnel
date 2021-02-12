<template>
  <div class="container box" id="objectifs">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="title is-3">Objectifs</p>
        </div>
        <div class="level-item">
          <button class="button is-small is-link" @click="openModalNew">Ajouter</button>
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
import ModalObjectifNew from './ObjectifModalNew.vue';

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
  methods: {
    openModalNew() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalObjectifNew,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
  },
  created() {
    this.$store.dispatch('objectif/getObjectifs');
    this.$store.dispatch('objectif/getStatusObjectifs');
  },
};
</script>

<style lang="scss">
#objectifs {
  padding: 10px;
  margin: 10px 0px 10px 10px;
}
.objectifsListe {
  min-height: 90vh;
  max-height: 90vh;
  overflow-y: scroll;
}
</style>
