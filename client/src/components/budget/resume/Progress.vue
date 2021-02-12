<template>
  <div class="box stats">
    <h4 class="title is-4">Resume budgetaire</h4>
    <div class="mb-4" v-for="(categorie, index) in categories" :key="index">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h4 class="title is-6">{{categorie.Nom}}</h4>
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
       :class="progressStyle(categorie)"
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
  methods: {
    progressStyle(categorie) {
      const ratio = ((categorie.SommeDepenseSuivi / categorie.SommeParCategorie) * 100).toFixed(2);
      if (ratio >= 90) return 'progress is-danger';
      if (ratio >= 80) return 'progress is-warning';
      return 'progress is-primary';
    },
  },
};
</script>

<style scoped>
.box {
  min-height: 40vh;
  max-height: 50vh;
  overflow-y: scroll;
}
</style>
