<template>
  <div id="buttonMenu">
    <div class="level">
      <div class="level-item">
        <div class="select is-fullwidth">
          <select name="" id="" v-model="idCompte" v-on:change="updateCurrCompte()">
            <option :value="0" disabled>Choisir un compte</option>
            <!-- Rajouter un champ dans BD pour compte (Investissement) -->
            <!-- Get seulement les comptes marquer du boolean Investissement -->
            <!-- A faire plus tard -->
            <option v-for="(c, index) in comptes"
             :key="index" :value="c.IdCompte">{{c.NomCompte}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="level">
      <div class="level-item">
        <div class="field">
          <div class="control">
            <button class="button is-primary"
            v-if="this.ordreAchatActif === false"
            @click="showOrdreAchat">
            Ajouter des ordres d'achats
          </button>
          <button class="button is-primary"
            v-if="this.ordreAchatActif === true"
            @click="showOrdreAchat">
            Ajouter des cibles au portefeuille
          </button>
          </div>
        </div>
      </div>
      <div class="level-item">
        <div class="field">
          <div class="control">
            <button class="button is-info">Afficher les recommendations</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ButtonMenu',
  data() {
    return {
      idCompte: this.$store.state.compte.compteCurrId,
      ordreAchatActif: false,
      valeurTotale: 0,
    };
  },
  computed: {
    ordreAchats() {
      return this.$store.state.ordreAchat.ordreAchats;
    },
    comptes() {
      return this.$store.state.compte.comptes;
    },
  },
  methods: {
    async updateCurrCompte() {
      await this.$store.dispatch('compte/setCurrCompteId', this.idCompte);
      await this.$store.dispatch('investissement/getStocks');
      await this.$store.dispatch('ordreAchat/getOrdresAchat');
      await this.ordreAchats.forEach((element) => {
        axios.get(`https://api.polygon.io/v1/open-close/${element.Titre}/2020-10-14?unadjusted=true&apiKey=JkL0mUMgX8PpLRpMcQAdMAcByBI3ykOT&fbclid=IwAR1xk2VUM9fJiCsN6_9g4h8AjhUc0RdkXXdp7zqbWQ4dETY74wjaA4f7Nhc`)
          .then((response) => {
            if (this.ordreAchats.length > 0) {
              this.valeurTotale += (response.data.close * element.Quantite);
            }
          });
      });
    },
    showOrdreAchat() {
      this.$emit('show-ordre-achat');
      this.ordreAchatActif = !this.ordreAchatActif;
    },
  },
  async created() {
    await this.$store.dispatch('compte/getComptes');
  },
};
</script>

<style scoped lang="scss">

</style>
