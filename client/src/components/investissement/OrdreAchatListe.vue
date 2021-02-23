<template>
    <div class="container" id="ordreAchat">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="title is-4">Ordres d'achat</p>
            </div>
          </div>
        </div>
        <div class="ordreAchatListe">
          <table class="table is-fullwidth">
            <thead>
              <tr class="has-text-centered">
                <th>Date</th>
                <th>Titre</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <ordre-achat-card v-for="o in ordresAchat" :key="o.IdOrdreAchat" :ordreAchat="o"/>
            </tbody>
            <tfoot>
              <tr>
                <th>
                  <input class="input" type="date" v-model="newOrdreAchat.DateAcquisition"/>
                </th>
                <th>
                  <div class="select">
                    <select class="select" v-model="newOrdreAchat.Titre">
                      <option
                      v-for="t in titres"
                      :key="t.IdTitreBoursier"
                      v-bind:value="t.TitreCours">
                          {{ t.TitreCours }}
                      </option>
                    </select>
                  </div>
                </th>
                <th>
                  <input
                    type="number"
                    min="0.01"
                    step="any"
                    class="input has-text-centered"
                    placeholder="Prix"
                    v-model="newOrdreAchat.Prix">
                </th>
                <th>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    class="input has-text-centered"
                    placeholder="Quantité"
                    v-model="newOrdreAchat.Quantite">
                </th>
                <th></th>
                <th>
                  <button class="button is-small is-link" @click="ajoutOrdreAchat">Ajouter</button>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
</template>

<script>
import OrdreAchatCard from './OrdreAchatCard.vue';

export default {
  name: 'OrdreAchatListe',
  components: {
    OrdreAchatCard,
  },
  data() {
    return {
      newOrdreAchat: {
        DateAcquisition: '',
        Titre: '',
        Prix: 0,
        Quantite: 0,
      },
      error: false,
    };
  },
  computed: {
    titres() {
      return this.$store.state.investissement.stocks;
    },
    ordresAchat() {
      return this.$store.state.ordreAchat.ordreAchats;
    },
  },
  methods: {
    async ajoutOrdreAchat() {
      this.error = false;
      let message = '<h2 style="font-weight:bold">Modification non reussie</h2>';
      if (this.newOrdreAchat.DateAcquisition === '') {
        this.error = true;
        message += '<p>La date est vide </p>';
      }
      if (this.newOrdreAchat.Prix <= 0.0) {
        this.error = true;
        message += '<p>Le champ Prix est vide ou invalide</p>';
      }
      if (this.newOrdreAchat.Titre === '') {
        this.error = true;
        message += '<p>Le champ Titre est vide</p>';
      }
      if (this.newOrdreAchat.Quantite <= 0) {
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
      await this.$store.dispatch('ordreAchat/addOrdreAchat', { ordreAchat: this.newOrdreAchat });
      this.newOrdreAchat.DateAcquisition = '';
      this.newOrdreAchat.Titre = '';
      this.newOrdreAchat.Quantite = 0;
      this.newOrdreAchat.Prix = 0;
      return this.$buefy.notification.open({
        message: 'Ajout réussi',
        type: 'is-success',
      });
    },
  },
  created() {
    this.$store.dispatch('investissement/getStocks');
  },
};
</script>

<style lang="scss">
.ordreAchatListe {
  min-height: 90vh;
  max-height: 90vh;
  overflow-y: scroll;
}

</style>
