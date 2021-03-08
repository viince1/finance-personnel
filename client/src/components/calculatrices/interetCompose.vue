<template>
  <div id="interetCompose">
    <div class="columns">
      <div class="column">
        <form class="box">
          <label class="label">Montant du placement</label>
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="number" v-model="montantPlacement">
              </div>
              <div class="control">
                <button class="button is-static">$</button>
              </div>
            </div>
            <label class="label">Taux d'intérêts annuel</label>
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="number" v-model="tauxInteret">
              </div>
              <div class="control">
                <button class="button is-static">%</button>
              </div>
            </div>
            <label class="label">Terme (années)</label>
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="number" v-model="terme">
              </div>
            </div>
            <div class="field">
              <label class="label">Période d'intérêt</label>
               <div class="select">
                 <select class="select" v-model="periodeInteret">
                   <option value="0" selected>Choisir une periode</option>
                  <option
                  v-for="p in periodes"
                  :key="p.nom"
                  v-bind:value="p.periodeInt"
                  >
                  {{ p.nom }}
                  </option>
                  </select>
              </div>
            </div>
        </form>
        <div class="box has-background-info has-text-centered has-text-white">
              <h1 class="title is-4 has-text-white">Montant épargné</h1>
              <div class="card-content">
                <div class="amount is-size-4">{{montantEpargne}} $</div>
                <p>Vous avez généré un revenu de {{revenu}} $</p>
              </div>
          </div>
      </div>
      </div>
  </div>
</template>

<script>
const periodes = [
  { nom: 'Annuel', periodeInt: 1 },
  { nom: 'Trimestriel', periodeInt: 4 },
  { nom: 'Mensuel', periodeInt: 12 },
  { nom: 'Bi-Mensuel', periodeInt: 24 },
  { nom: 'Aux 2 semaines', periodeInt: 26 },
  { nom: 'Hebdomadaire', periodeInt: 52 },
  { nom: 'Quotidien', periodeInt: 365 },
];
export default {
  name: 'interetCompose',
  data() {
    return {
      montantPlacement: 0,
      tauxInteret: 0,
      periodeInteret: 0,
      terme: 0,
      periodes,
    };
  },
  computed: {
    montantEpargne() {
      return (
        this.montantPlacement * ((1 + this.tauxInteret / this.periodeInteret / 100)
        ** (this.terme * this.periodeInteret))).toFixed(2);
    },
    revenu() {
      return (this.montantEpargne - this.montantPlacement).toFixed(2);
    },
  },
};
</script>

<style scoped>
</style>
