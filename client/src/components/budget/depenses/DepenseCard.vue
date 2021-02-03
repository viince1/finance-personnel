<template>
  <div class="box mb-3" id="depenses">
      <div class="columns">
        <div class="column is-2 has-text-centered">
          <span class="select">
            <select name="" id="" class="select" v-model="idCategorieDepense">
              <option :value="c.IdCategorieDepense"
              v-for="(c, index) in categories" :key="index">
              {{c.Nom}}
              </option>
            </select>
          </span>
        </div>
        <div class="column is-4 has-text-centered">
          <input
            type="text"
             class="input has-text-centered"
              placeholder="Nom de la depense"
                v-model="nom">
        </div>
        <div class="column is-1 has-text-centered">
          <input
           type="text"
            class="input has-text-centered"
            placeholder="Montant de la depense Ex: 1.99"
              v-model="montant">
        </div>
        <div class="column is-2 has-text-centered">
          <span class="select">
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
      // isDisabled: true,
      nom: this.depense.nom,
      montant: this.depense.montant,
      idCategorieDepense: this.depense.idCategorieDepense,
      idDepenseFrequence: this.depense.idDepenseFrequence,
    };
  },
  props: {
    depense: Object,
    categories: null,
    frequences: null,
  },
  methods: {
    save() {
      this.$store.dispatch('depense/updateDepense', {
        nom: this.nom,
        montant: this.montant,
        idCategorieDepense: this.idCategorieDepense,
        idDepenseFrequence: this.idDepenseFrequence,
        IdDepense: this.depense.IdDepense,
      });
    },
    remove() {
      this.$store.dispatch('depense/deleteDepense', this.depense.IdDepense);
    },
  },
  // watch: {
  //   nom(newValue) {
  //     if (newValue === this.depense.nom) {
  //       this.isDisabled = true;
  //     } else {
  //       this.isDisabled = false;
  //     }
  //   },
  //   montant(newValue) {
  //     if (newValue === this.depense.montant) {
  //       this.isDisabled = true;
  //     } else {
  //       this.isDisabled = false;
  //     }
  //   },
  // },
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
