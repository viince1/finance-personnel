<template>
  <div class="box stats">
    <h4 class="title is-4">Resume budgetaire</h4>
    <div class="mb-4" v-for="(categorie, index) in categories" :key="index">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h4>{{categorie.Nom}}</h4>
          </div>
          <div class="level-item">
            <h4 class="is-size-7">{{categorie.SommeDepenseSuivi.toFixed(2)}}
               /
              {{categorie.SommeParCategorie.toFixed(2)}} $</h4>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            {{((categorie.SommeDepenseSuivi / categorie.SommeParCategorie) * 100).toFixed(2)}} %
          </div>
        </div>
      </div>
      <progress
      class="progress is-primary"
       :value="categorie.SommeDepenseSuivi"
       :max="categorie.SommeParCategorie"></progress>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Progress',
  computed: {
    categories() {
      return this.$store.state.budget.sommeParCategories;
    },
  },
};
</script>

<style scoped>
.box {
  min-height: 40vh;
  max-height: 40vh;
}
</style>
