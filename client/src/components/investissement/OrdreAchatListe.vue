<template>
    <div class="container box" id="ordreAchat">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="title is-3">Ordres d'achats</p>
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
                      <option>Choisir un titre</option>
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
              </tr>
            </tfoot>
          </table>
          <button class="button is-link" @click="ajoutOrdreAchat">Ajouter</button>
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
        Prix: null,
        Quantite: null,
      },
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
      await this.$store.dispatch('ordreAchat/addOrdreAchat', { ordreAchat: this.newOrdreAchat });
      this.$buefy.notification.open({
        message: 'Ajout completée',
        type: 'is-success',
      });
    },
  },
  created() {
    this.$store.dispatch('investissement/getStocks');
    this.$store.dispatch('ordreAchat/getOrdresAchat');
  },
};
</script>
