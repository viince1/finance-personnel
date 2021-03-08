<template>
  <div id="interetCompose">
    <div class="columns">
      <div class="column is-4">
        <form class="box">
          <label class="label">Prix de la maison</label>
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="number" v-model="prixMaison">
              </div>
              <div class="control">
                <button class="button is-static">$</button>
              </div>
            </div>
            <label class="label">Mise de fond</label>
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="number" v-model="miseFond">
              </div>
              <div class="control">
                <button class="button is-static">$</button>
              </div>
            </div>
            <label class="label">Taux hypothécaire</label>
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="number" v-model="tauxHypothecaire">
              </div>
              <div class="control">
                <button class="button is-static">%</button>
              </div>
            </div>
            <label class="label">Nombre d'années du terme</label>
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="number" v-model="terme">
              </div>
            </div>
            <div class="field">
              <label class="label">Type de versement</label>
               <div class="select">
                 <select class="select" v-model="nombreVersements"
                 @change="calculVersementHypothecaire">
                   <option value="0" selected>Choisir une type de versement</option>
                   <option
                    v-for="t in types"
                    :key="t.nom"
                    v-bind:value="t.nbVersements"
                    >
                    {{ t.nom }}
                  </option>
                  </select>
              </div>
            </div>
        </form>
      </div>
      <div class="column is-5">
        <div class="box has-background-info has-text-centered has-text-white">
              <h1 class="title is-4 has-text-white">
                Fréquence de versements hypothécaires et total des emprunts
              </h1>
              <div class="card-content">
                <div class="amount is-size-4" v-if="nombreVersements===1 && versement>0">
                  {{versement}} $ par an
                </div>
                <div class="amount is-size-4" v-if="nombreVersements===12 && versement>0">
                  {{versement}} $ par mois
                </div>
                <div class="amount is-size-4" v-if="nombreVersements===52 && versement>0">
                  {{versement}} $ par semaine
                </div>
                <div class="amount is-size-4" v-if="nombreVersements===26 && versement>0">
                  {{versement}} $ à chaque 2 semaines
                </div>
                <p v-if="versement>0">
                  Durant cette période de {{terme}} ans, vous aurez un emprunt total de
                  {{empruntTotalPeriode}} $ dont le montant total des intérêts
                  s'élève à {{interetTotalPeriode}} $
                </p>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
const types = [
  { nom: 'Annuel', nbVersements: 1 },
  { nom: 'Mensuel', nbVersements: 12 },
  { nom: 'Aux 2 semaines', nbVersements: 26 },
  { nom: 'Hebdomadaire', nbVersements: 52 },
];

export default {
  name: 'pretHypothecaire',
  data() {
    return {
      prixMaison: 0,
      miseFond: 0,
      tauxHypothecaire: 0,
      terme: 0,
      types,
      nombreVersements: 0,
      versement: 0,
      error: false,
    };
  },
  computed: {
    empruntTotalPeriode() {
      return (this.versement * this.nombreVersements * this.terme).toFixed(2);
    },
    interetTotalPeriode() {
      return (this.empruntTotalPeriode - this.prixMaison + parseFloat(this.miseFond));
    },
  },
  methods: {
    calculVersementHypothecaire() {
      this.error = false;
      let message = '<h2 style="font-weight:bold">Erreur détectée</h2>';
      if (this.miseFond === 0) {
        this.error = true;
        message = `<p>La mise de fonds doit correspondre à un minimum de 5 % de la valeur
        de la résidence pour les résidences de 500 000 $ ou moins. Pour les résidences de plus de 
        500 000 $, la mise de fonds minimale est de 10 % pour la partie du prix qui dépasse 500 000 $ et 
        de 5 % pour la partie inférieure à 500 000 $. </p>`;
      }
      if (this.prixMaison <= 500000 && this.miseFond < (0.05 * this.prixMaison)) {
        this.error = true;
        message = `La mise de fonds doit correspondre à un minimum de 5 % de la valeur
        de la résidence pour les résidences de 500 000 $ ou moins.`;
      }
      if (this.prixMaison > 500000
      && this.miseFond < (0.10 * (this.prixMaison - 500000))
      + (0.05 * (500000 - (this.prixMaison - 500000)))) {
        this.error = true;
        message = `Pour les résidences de plus de 
        500 000 $, la mise de fonds minimale est de 10 % pour la partie du prix qui dépasse 500 000 $ et 
        de 5 % pour la partie inférieure à 500 000 $`;
      }
      if (this.error === true) {
        return this.$buefy.notification.open({
          duration: 5000,
          message,
          position: 'is-top-right',
          type: 'is-danger',
        });
      }
      this.versement = (((this.prixMaison - this.miseFond)
      * ((this.tauxHypothecaire / 100) / this.nombreVersements))
      / (1 - (1 + (this.tauxHypothecaire / 100) / this.nombreVersements)
      ** (-this.nombreVersements * this.terme))).toFixed(2);
      return this.$buefy.notification.open({
        message: 'Calcul réussi',
        type: 'is-success',
      });
    },
  },
};
</script>
