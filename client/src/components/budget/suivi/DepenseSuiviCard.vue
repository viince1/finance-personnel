<template>
  <div class="container" id="revenuSuivi">
    <a href="" v-on:click.prevent="openModalEdit">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-5">{{ depenseSuivi.Nom }}</p>
            </div>
          </div>
          <div class="content">
              Montant: {{depenseSuivi.Montant}} $
              <br>
              <div class="level">
                <div class="level-left">
                  <time class="level-item" datetime="2016-1-1">
                    {{depenseSuivi.DateEntree}}
                  </time>
                </div>
              </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import DepenseModalEdit from './DepenseModalEdit.vue';

export default {
  name: 'DepenseSuiviCard',
  props: {
    depenseSuivi: Object,
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
};
</script>
