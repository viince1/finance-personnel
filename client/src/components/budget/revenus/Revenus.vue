<template>
  <div class="box mb-3" id="revenus">
    <div class="columns">
      <div class="column is-3 has-text-centered">
        <input
          type="text"
          class="input has-text-centered"
          placeholder="Titre du revenu"
          v-model="revenu.Titre"
        />
      </div>
      <div class="column is-2 has-text-centered">
        <input
          type="text"
          class="input has-text-centered"
          placeholder="Montant"
          v-model="revenu.Montant"
        />
      </div>
      <div class="column is-3 has-text-centered">
        <div class="select">
          <select class="select" v-model="revenu.IdCategorieRevenu">
            <option
            v-for="categorie in categories"
            :key="categorie.IdCategorieRevenu"
            v-bind:value="categorie.IdCategorieRevenu">
              {{ categorie.Nom }}
            </option>
          </select>
        </div>
      </div>
      <div class="column is-3 has-text-right">
        <button
          class="button is-primary mr-3"
          v-on:click.prevent="save"
        >
          Save
        </button>
        <button class="button is-danger" v-on:click.prevent="remove">
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Revenus',
  data() {
    return {
      categories: this.$store.state.revenu.categoriesRevenus,
    };
  },
  props: {
    revenu: Object,
  },
  computed: {
    nomCateg() {
      return this.categories.find((c) => c.IdCategorieRevenu === this.revenu.IdCategorieRevenu);
    },
  },
  methods: {
    updateForm() {
      console.log('update form');
    },
    async save() {
      await this.$store.dispatch('revenu/update', this.revenu);
    },
    async remove() {
      this.$store.dispatch('revenu/delete', this.revenu.IdRevenu);
    },
  },
};
</script>
<style lang="scss">
.container {
  height: 100%;
}

#revenus {
  margin: 5px 0px 5px 5px;
}

</style>
