<template>
  <div id="portfolio">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h4 class="title is-4">Portefeuille visé pour ce compte</h4>
        </div>
        <div class="level-item">
          <button class="button is-info is-small" @click="addSecurity()">Ajouter</button>
        </div>
      </div>
    </div>
    <div class="element">
      <progress class="progress is-info" value="45" max="100">45%</progress>
      <p class="titre">VCN - Vanguard Investments Canada Inc</p>
    </div>
  </div>
</template>

<script>
import AddSecurity from './AddSecurity.vue';

export default {
  name: 'Portfolio',
  data() {
    return {
      stonks: [],
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AddSecurity,
  },
  methods: {
    addSecurity() {
      this.$buefy.modal.open({
        parent: this,
        component: AddSecurity,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
    getStonks() {
    },
  },
};
</script>

<style scoped lang="scss">

</style>
