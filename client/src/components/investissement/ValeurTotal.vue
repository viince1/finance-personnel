<template>
  <div id="valeurTotal" class="valeurTotal has-text-centered">
      <div class="box">
          <h1 class="title is-4">Valeur totale</h1>
          <div class="card-content">
            <div class="amount is-size-4">{{valeurTotal}}</div>
          </div>
          <button @click="getPrix">calculer</button>
        </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ValeurTotal',
  data() {
    return {
      valeurTotal: 0,
      liste: [],
      obj: {},
    };
  },
  computed: {
    ordresAchat() {
      return this.$store.state.ordreAchat.ordreAchats;
    },
    listee() {
      return this.liste;
    },
    val() {
      return this.valeurTotal;
    },
  },
  methods: {
    async getPrix() {
      this.$emit('getValeurTotale');
      await this.ordresAchat.forEach((element) => {
        axios.get(`https://api.polygon.io/v1/open-close/${element.Titre}/2020-10-14?unadjusted=true&apiKey=JkL0mUMgX8PpLRpMcQAdMAcByBI3ykOT&fbclid=IwAR1xk2VUM9fJiCsN6_9g4h8AjhUc0RdkXXdp7zqbWQ4dETY74wjaA4f7Nhc`)
          .then((response) => {
            this.valeurTotal += (response.data.close * element.Quantite);
            this.liste.push(response.data);
          });
      });
    },
  },
  created() {
    this.$store.dispatch('ordreAchat/getOrdresAchat');
    /* this.ordresAchat.forEach((element) => {
      axios.get(`https://api.polygon.io/v1/open-close/${element.Titre}/2020-10-14?unadjusted=true&apiKey=JkL0mUMgX8PpLRpMcQAdMAcByBI3ykOT&fbclid=IwAR1xk2VUM9fJiCsN6_9g4h8AjhUc0RdkXXdp7zqbWQ4dETY74wjaA4f7Nhc`)
        .then((response) => {
          this.valeurTotal += (response.data.close * element.Quantite);
          this.liste.push(response.data);
        });
    }); */
  },
};
</script>

<style scoped lang="scss">

</style>
