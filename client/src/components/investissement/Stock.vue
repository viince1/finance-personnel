<template>
  <div class="stock" >
        <div class="level">
          <div class="level-left">
            <span class="titre">
              {{stock.TitreCours}} - {{stock.TitreLong}}</span>
          </div>
          <div class="level-right">
            <div class="level-item">
              <button class="button is-primary" v-on:click="updateStock">Modifier</button>
            </div>
            <div class="level-item">
              <button class="button is-danger" v-on:click="deleteStock">Supprimer</button>
            </div>
            <div class="level-item">
              {{stock.Poids * 100}} %
            </div>
          </div>
        </div>
        <progress class="progress is-info" :value="stock.Poids" max="1">{{stock.Poids}}</progress>
      </div>
</template>

<script>
import EditSecurity from './EditSecurity.vue';

export default {
  name: 'Stock',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    EditSecurity,
  },
  props: {
    stock: Object,
  },
  methods: {
    async deleteStock() {
      await this.$store.dispatch('investissement/deleteStock', { IdTitreBoursier: this.stock.IdTitreBoursier });
    },
    updateStock() {
      this.$buefy.modal.open({
        parent: this,
        component: EditSecurity,
        props: this.stock,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
  },
};
</script>

<style scoped>
.stock {
  margin-bottom: 15px;
}
</style>
