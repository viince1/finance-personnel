<template>
  <div class="container" id="objectif">
    <!-- Rajouter javascript pour  ouvrir les modales verifier si anchor tag est le meilleur-->
    <a href="" v-on:click.prevent="openModalEdit">
      <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-5">{{objectif.Titre}}</p>
              </div>
            </div>
            <div class="content">
              {{objectif.Description}}
              <br>
              <div class="level">
                <div class="level-left">
                  <time class="level-item" datetime="2016-1-1">
                    {{objectif.DateButoir}}
                  </time>
                </div>
                <div class="level-right">
                  <span class="tag is-primary level-item" v-bind:class="status">
                    {{objectif.Nom}}
                  </span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </a>
  </div>
</template>

<script>
import ModalObjectifEdit from './ObjectifModalEdit.vue';

export default {
  name: 'Objectif',
  props: {
    objectif: Object,
  },
  computed: {
    status() {
      if (this.objectif.NoStatus === 49) return 'is-warning';
      if (this.objectif.NoStatus === 99) return 'is-primary';
      if (this.objectif.NoStatus === 1) return 'is-secondary';
      return '';
    },
  },
  methods: {
    openModalEdit() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalObjectifEdit,
        props: this.objectif,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
  },
};
</script>

<style scoped land="scss">
#objectif {
  margin-bottom: 10px;
}
</style>
