<template>
  <div class="box mb-3" id="depenses">
      <div class="columns">
        <div class="column is-2 has-text-centered">
          <label v-if="showInputs === false" for="">{{depense.CategorieDepenseNom}}</label>
          <span v-if="showInputs === true" class="select">
            <select name="" id="" class="select" v-model="idCategorieDepense">
              <option :value="c.IdCategorieDepense"
              v-for="(c, index) in categories" :key="index">
              {{c.Nom}}
              </option>
            </select>
          </span>
        </div>
        <div class="column is-4 has-text-centered">
          <label v-if="showInputs === false" for="" class="">{{depense.DepenseTitre}}</label>
          <input
           v-if="showInputs === true"
            type="text"
             class="input has-text-centered"
              placeholder="Nom de la depense"
                v-model="nom">
        </div>
        <div class="column is-1 has-text-centered">
          <label v-if="showInputs === false" for="">{{depense.Montant.toFixed(2)}} $</label>
          <input
          v-if="showInputs === true"
           type="text"
            class="input has-text-centered"
            placeholder="Montant de la depense Ex: 1.99"
              v-model="montant">
        </div>
        <div class="column is-2 has-text-centered">
          <label v-if="showInputs === false" for="">{{depense.DepenseFrequenceNom}}</label>
          <span v-if="showInputs === true" class="select">
            <select name="" id="" class="select" v-model="idDepenseFrequence">
              <option
              v-for="(f, index) in frequences"
                :key="index"
                  :value="f.IdDepenseFrequence">
                  {{f.Nom}}
              </option>
            </select>
          </span>
        </div>
        <div class="column is-3 has-text-right">
          <button
          v-if="showInputs === false"
           class="button is-warning mr-3"
            v-on:click.prevent="updateForm">
            Modifier
          </button>
          <button
           v-if="showInputs === true"
            class="button is-primary mr-3"
            v-on:click.prevent="save">
            Save
          </button>
          <button class="button is-danger" v-on:click.prevent="remove">Supprimer</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Depenses',
  data() {
    return {
      showInputs: false,
      dynamicButton: 'Modifier',
      nom: this.depense.DepenseTitre,
      montant: this.depense.Montant,
      frequence: this.depense.IdDepenseFrequence,
      idCategorieDepense: this.depense.IdCategorieDepense,
      idDepenseFrequence: this.depense.IdDepenseFrequence,
    };
  },
  props: {
    depense: Object,
  },
  computed: {
    categories() {
      return this.$store.state.depense.categories;
    },
    frequences() {
      return this.$store.state.depense.frequences;
    },
  },
  methods: {
    updateForm() {
      this.showInputs = true;
      console.log('update form');
    },
    save() {
      this.showInputs = false;
      console.log('update depense');
    },
    remove() {
      console.log('remove depense');
    },
  },
  created() {
    this.$store.dispatch('depense/getFrequencesDepense');
    this.$store.dispatch('depense/getCategoriesDepense');
  },
};
</script>

<style lang="scss">
.container {
  height: 100%;
}

#depenses {
  margin: 5px 0px 5px 5px;
}

</style>
