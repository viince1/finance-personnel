<template>
  <div id="investissement">
    <div class="columns">
      <div class="column is-4">
        <div class="box">
          <precision class="precision"/>
        </div>
      </div>
      <div class="column is-4">
        <div class="box">
          <valeur-total />
        </div>
      </div>
      <div class="column is-4">
        <div class="box">
          <button-menu @show-ordre-achat="afficheOrdreAchat()" />
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-8">
        <div class="box">
          <portfolio v-if="showOrdreAchat === false" />
          <ordre-achat-liste v-if="showOrdreAchat === true" />
        </div>
      </div>
      <div class="column is-4">
        <div class="box">
          <recommendation />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Precision from '../components/investissement/Precision.vue';
import ValeurTotal from '../components/investissement/ValeurTotal.vue';
import ButtonMenu from '../components/investissement/ButtonMenu.vue';
import Portfolio from '../components/investissement/Portfolio.vue';
import Recommendation from '../components/investissement/Recommendation.vue';
import OrdreAchatListe from '../components/investissement/OrdreAchatListe.vue';

export default {
  name: 'Investissement',
  components: {
    Precision,
    ValeurTotal,
    ButtonMenu,
    Portfolio,
    Recommendation,
    OrdreAchatListe,
  },
  data() {
    return {
      showOrdreAchat: false,
    };
  },
  methods: {
    afficheOrdreAchat() {
      this.showOrdreAchat = !this.showOrdreAchat;
    },
  },
};
</script>

<style scoped lang="scss">
.columns {
  margin: 10px 10px 10px 10px;
}
#investissement.columns {
  min-height: 100%;
}
</style>
