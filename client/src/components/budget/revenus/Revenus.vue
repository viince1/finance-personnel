<template>
  <div class="mb-3" id="revenus">
    <div class="columns">
      <div class="column is-3 has-text-centered">
        <input
          type="text"
          class="input has-text-centered"
          placeholder="Titre du revenu"
          v-model="revenu.titre"
        />
      </div>
      <div class="column is-2 field has-addons">
        <div class="control">
          <input
            type="number"
            min="0.01"
            step="any"
            class="input has-text-centered"
            placeholder="Montant"
            v-model="revenu.montant">
          </div>
          <div class="control">
            <button class="button is-static">$</button>
          </div>
        </div>
      <div class="column is-3 has-text-centered">
        <div class="select">
          <select class="select" v-model="revenu.idCategorieRevenu">
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
      categories: this.$store.state.categoriesrevenus.categories,
      error: false,
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
    async save() {
      this.error = false;
      let message = '<h2 style="font-weight:bold">Modification non reussie</h2>';
      if (this.revenu.titre === '') {
        this.error = true;
        message += '<p>Le Titre est vide </p>';
      }
      if (this.revenu.montant <= 0.0) {
        this.error = true;
        message += '<p>Le champ Montant est vide </p>';
      }
      if (this.error === true) {
        return this.$buefy.notification.open({
          duration: 5000,
          message,
          position: 'is-top-right',
          type: 'is-danger',
        });
      }
      this.$store.dispatch('revenu/update', { revenu: this.revenu });
      return this.$buefy.notification.open({
        message: 'Modification completée',
        type: 'is-success',
      });
    },
    async remove() {
      this.$store.dispatch('revenu/delete', this.revenu.idRevenu);
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

#revenus {
  margin: 5px 0px 5px 5px;
}

</style>
