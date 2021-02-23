<template>
  <div id="portfolio">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h4 class="title is-4">Portefeuille visé pour ce compte</h4>
        </div>
        <div class="level-item">
          <button v-if="idCompte !== 0"
          class="button is-info is-small" @click="addSecurity()">Ajouter</button>
        </div>
      </div>
    </div>
    <div class="level">
    </div>
    <div class="element">
      <stock :stock="s" v-for="s in stocks" :key="s.IdTitreBoursier" />
    </div>
  </div>
</template>

<script>
import AddSecurity from './AddSecurity.vue';
import Stock from './Stock.vue';

export default {
  name: 'Portfolio',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AddSecurity,
    Stock,
  },
  computed: {
    stocks() {
      return this.$store.state.investissement.stocks;
    },
    idCompte() {
      return this.$store.state.compte.compteCurrId;
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
    this.$store.dispatch('investissement/getSum', this.$store.state.compte.compteCurrId);
  },
};
</script>

<style scoped lang="scss">
.element {
  min-height: 60vh;
  max-height:60vh;
}
</style>
