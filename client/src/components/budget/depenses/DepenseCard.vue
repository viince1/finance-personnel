<template>
  <div class="box mb-3" id="depenses">
      <div class="columns">
        <div class="column is-2 has-text-centered">
          <span class="select">
            <select name="" id="" class="select" v-model="depense.idCategorieDepense">
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
                v-model="depense.nom">
        </div>
        <div class="column is-1 has-text-centered">
          <div class="field has-addons">
            <div class="control">
              <input
              type="number"
              min="0.01"
              step="any"
              class="input has-text-centered"
              placeholder="Montant de la depense Ex: 1.99"
                v-model="depense.montant">
            </div>
            <div class="control">
              <button class="button is-static">$</button>
            </div>
          </div>

        </div>
        <div class="column is-2 has-text-centered">
          <span class="select">
            <select name="" id="" class="select" v-model="depense.idDepenseFrequence">
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
      error: false,
    };
  },
  props: {
    depense: Object,
    categories: null,
    frequences: null,
  },
  methods: {
    async save() {
      this.error = false;
      let message = '<h2 style="font-weight:bold">Modification non reussie</h2>';
      if (this.depense.nom === '') {
        this.error = true;
        message += '<p>Le champ nom est vide </p>';
      }
      if (this.depense.montant <= 0.0) {
        this.error = true;
        message += '<p>Le champ montant est vide </p>';
      }
      if (this.error === true) {
        return this.$buefy.notification.open({
          duration: 5000,
          message,
          position: 'is-top-right',
          type: 'is-danger',
        });
      }
      await this.$store.dispatch('depense/updateDepense', this.depense);
      return this.$buefy.notification.open({
        message: 'Modification completée',
        type: 'is-success',
      });
    },
    async remove() {
      await this.$store.dispatch('depense/deleteDepense', this.depense.IdDepense);
      return this.$buefy.notification.open({
        message: 'Suppression completée',
        type: 'is-success',
      });
    },
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
