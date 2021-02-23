<template>
  <div id="recommendation">
    <div class="field">
      <div class="control">
        <label for="" class="label">Montant d'argent periodique a investir</label>
        <input
          type="number"
          min="0.01"
          step="any"
          class="input has-text-centered"
          placeholder="00.00 $"
          v-model="montant"
          v-on:change="recommend()"
        >
        <div class="recommendations">
          <div class="card" v-for="(reco, index) in recommendations" :key="index">
            <div class="card-content">
              <div class="level">
                <div class="level-left">
                  <div class="level-item title is-4">
                    {{reco.TitreCours}}
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <span>{{reco.Quantite}} action(s)</span>
                  </div>
                  <div class="level-item">
                    <span class="">{{reco.Montant.toFixed(2)}} $</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recommendation',
  data() {
    return {
      montant: null,
      recommendations: [],
    };
  },
  computed: {
    stocks() {
      return this.$store.state.investissement.stocks;
    },
  },
  methods: {
    recommend() {
      this.recommendations.length = 0;
      for (let i = 0; i < this.stocks.length; i += 1) {
        const poids = this.stocks[i].Poids;
        const prixAction = 30.00;
        const result = Math.floor((poids * this.montant) / prixAction);
        this.recommendations.push({
          TitreCours: this.stocks[i].TitreCours,
          Quantite: result,
          Montant: result * prixAction,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.recommendations {
  margin-top: 10px;
}

#recommendation {
  min-height: 68vh;
  max-height: 68vh;
}
</style>
