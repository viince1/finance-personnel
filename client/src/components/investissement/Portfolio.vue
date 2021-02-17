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
      <div class="stock" v-for="(s, index) in stocks" :key="index">
        <progress class="progress is-info" :value="s.Poids" max="1">{{s.Poids}}</progress>
        <div class="level">
          <div class="level-left">
            <span class="titre">{{s.TitreCours}} - {{s.TitreLong}}</span>
          </div>
          <div class="level-right">
            {{s.Poids * 100}} %
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddSecurity from './AddSecurity.vue';

export default {
  name: 'Portfolio',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AddSecurity,
  },
  computed: {
    stocks() {
      return this.$store.state.investissement.stocks;
    },
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
    getStocks() {
      this.$store.dispatch('investissement/getStocks');
    },
  },
  created() {
    this.getStocks();
  },
};
</script>

<style scoped lang="scss">

</style>
