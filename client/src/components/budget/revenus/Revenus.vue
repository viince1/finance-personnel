<template>
  <div class="box mb-3" id="revenus">
    <div class="columns">
      <div class="column is-3 has-text-centered">
        <label v-if="showInputs === false" for="" class="">{{ revenu.Titre }}</label>
        <input
          v-if="showInputs === true"
          type="text"
          class="input has-text-centered"
          placeholder="Titre du revenu"
          v-model="revenu.Titre"
        />
      </div>
      <div class="column is-3 has-text-centered">
        <label v-if="showInputs === false" for="">{{ revenu.Montant }} $</label>
        <input
          v-if="showInputs === true"
          type="text"
          class="input has-text-centered"
          placeholder="Montant"
          v-model="revenu.Montant"
        />
      </div>
      <div class="column is-3 has-text-centered">
        <label v-if="showInputs === false" for="">{{ nomCategorie }}</label>
         <select class="select" v-if="showInputs === true" v-model="revenu.IdCategorieRevenu">
          <option
          v-for="categorie in categories"
          :key="categorie.IdCategorieRevenu"
          v-bind:value="categorie.IdCategorieRevenu">
            {{ categorie.Nom }}
          </option>
        </select>
      </div>
      <div class="column is-3 has-text-right">
        <button
          v-if="showInputs === false"
          class="button is-warning mr-3"
          v-on:click.prevent="updateForm"
        >
          Modifier
        </button>
        <button
          v-if="showInputs === true"
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
      showInputs: false,
      dynamicButton: 'Modifier',
      categories: this.$store.state.revenu.categoriesRevenus,
    };
  },
  props: {
    revenu: Object,
  },
  computed: {
    nomCategorie() {
      if (this.revenu.IdCategorieRevenu === 1) return 'Salaire horaire';
      if (this.revenu.IdCategorieRevenu === 2) return 'Salaire annuel';
      if (this.revenu.IdCategorieRevenu === 3) return 'Comission';
      if (this.revenu.IdCategorieRevenu === 4) return 'Versement unique';
      if (this.revenu.IdCategorieRevenu === 5) return 'Bonus';
      return 'Categorie';
    },
  },
  methods: {
    updateForm() {
      this.showInputs = true;
      console.log('update form');
    },
    async save() {
      await this.$store.dispatch('revenu/update', this.revenu);
      this.showInputs = false;
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
