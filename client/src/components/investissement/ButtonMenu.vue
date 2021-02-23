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

export default {
  name: 'ButtonMenu',
  data() {
    return {
      idCompte: this.$store.state.compte.compteCurrId,
      ordreAchatActif: false,
    };
  },
  computed: {
    comptes() {
      return this.$store.state.compte.comptes;
    },
  },
  methods: {
    async updateCurrCompte() {
      await this.$store.dispatch('compte/setCurrCompteId', this.idCompte);
      await this.$store.dispatch('investissement/getStocks');
      await this.$store.dispatch('ordreAchat/getOrdresAchat');
      await this.$store.dispatch('investissement/getSum', this.$store.state.compte.compteCurrId);
    },
    showOrdreAchat() {
      this.$emit('show-ordre-achat');
      this.ordreAchatActif = !this.ordreAchatActif;
    },
  },
  async created() {
    await this.$store.dispatch('compte/getComptes');
    await this.$store.dispatch('ordreAchat/getOrdresAchat');
  },
};
</script>

<style scoped lang="scss">

</style>
