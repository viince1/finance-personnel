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
          v-model="Nom"
        />
      </div>
      <div class="column is-3 has-text-centered">
        <label v-if="showInputs === false" for="">{{ revenu.Montant }} $</label>
        <input
          v-if="showInputs === true"
          type="text"
          class="input has-text-centered"
          placeholder="Montant"
          v-model="Montant"
        />
      </div>
      <div class="column is-3 has-text-centered">
        <label v-if="showInputs === false" for="">{{ revenu.Nom }}</label>
        <input
          v-if="showInputs === true"
          type="text"
          class="input has-text-centered"
          placeholder="Catégorie"
          v-model="categorieRevenue"
        />
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
      Nom: this.revenu.RevenuTitre,
      Montant: this.revenu.Montant,
      IdCategorieRevenu: this.revenu.IdCategorieRevenu,
    };
  },
  props: {
    revenu: Object,
  },
  methods: {
    updateForm() {
      this.showInputs = true;
      console.log('update form');
    },
    save() {
      this.showInputs = false;
      console.log('update revenu');
    },
    remove() {
      console.log('remove revenu');
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
