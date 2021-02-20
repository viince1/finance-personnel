<template>
    <tr class="has-text-centered">
    <td class="has-text-center" v-if="editActif === false">{{ ordreAchat.DateAcquisition }}</td>
    <td v-if="editActif === true">
      <input class="input" type="date" v-model="ordreAchat.DateAcquisition"/>
    </td>
    <td class="has-text-center" v-if="editActif === false">{{ ordreAchat.Titre }}</td>
    <td v-if="editActif === true">
      <div class="select">
        <select class="select" v-model="ordreAchat.Titre">
          <option
          v-for="t in titres"
          :key="t.IdTitreBoursier"
          v-bind:value="t.TitreCours">
              {{ t.TitreCours }}
          </option>
        </select>
      </div>
    </td>
    <td class="has-text-center" v-if="editActif === false">{{ ordreAchat.Prix }} $</td>
    <td v-if="editActif === true">
      <input
        type="number"
        min="0.01"
        step="any"
        class="input has-text-centered"
        v-model="ordreAchat.Prix">
    </td>
    <td class="has-text-center" v-if="editActif === false">{{ ordreAchat.Quantite }}</td>
    <td v-if="editActif === true">
      <input
        type="number"
        min="0"
        step="any"
        class="input has-text-centered"
        v-model="ordreAchat.Quantite">
    </td>
    <td class="has-text-center">{{ total.toFixed(2) }} $</td>
    <td>
      <button class="button is-small"
      v-on:click="changeValue"
      v-if="editActif === false">
      Modifier
      </button>
      <button class="button is-small is-success"
      @click="editOrdreAchat"
      v-if="editActif === true">
      Sauvegarder
      </button>
      <button class="button is-small is-danger"
      @click="deleteOrdreAchat"
      v-if="editActif === true">Supprimer</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'OrdreAchatCard',
  props: {
    ordreAchat: Object,
  },
  data() {
    return {
      editActif: false,
    };
  },
  computed: {
    total() {
      return this.ordreAchat.Prix * this.ordreAchat.Quantite;
    },
    titres() {
      return this.$store.state.investissement.stocks;
    },
  },
  methods: {
    changeValue() {
      this.editActif = !this.editActif;
    },
    async editOrdreAchat() {
      this.error = false;
      let message = '<h2 style="font-weight:bold">Modification non reussie</h2>';
      if (this.ordreAchat.DateAcquisition === '') {
        this.error = true;
        message += '<p>La date est vide </p>';
      }
      if (this.ordreAchat.Prix <= 0.0) {
        this.error = true;
        message += '<p>Le champ Prix est vide ou invalide</p>';
      }
      if (this.ordreAchat.Titre === '') {
        this.error = true;
        message += '<p>Le champ Titre est vide</p>';
      }
      if (this.ordreAchat.Quantite <= 0) {
        this.error = true;
        message += '<p>Le champ quantite est vide ou invalide</p>';
      }
      if (this.error === true) {
        return this.$buefy.notification.open({
          duration: 5000,
          message,
          position: 'is-top-right',
          type: 'is-danger',
        });
      }
      await this.$store.dispatch('ordreAchat/updateOrdreAchat', { ordreAchat: this.ordreAchat });
      this.editActif = !this.editActif;
      return this.$buefy.notification.open({
        message: 'Modification réussie',
        type: 'is-success',
      });
    },
    async deleteOrdreAchat() {
      await this.$store.dispatch('ordreAchat/deleteOrdreAchat', { IdOrdreAchat: this.ordreAchat.IdOrdreAchat });
    },
  },
};
</script>
