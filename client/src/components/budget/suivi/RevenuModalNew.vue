<template>
  <div class="modal-card" id="revenuSuivi">
    <div class="modal-card-head">
      <h4 class="title is-4">Ajout d'un revenu</h4>
    </div>
    <div class="modal-card-body">
      <div class="message is-danger" v-if="errorMessage.length !== 0">
        <div v-for="(m, index) in errorMessage"
            :key="index" class="message-body has-icons-left" style="padding:6px;">
            Erreur : {{m}}
        </div>
      </div>
      <div class="field">
        <label class="label">Date</label>
        <div class="control">
          <input class="input" type="date" v-model="revenuSuivi.DateEntree">
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="input" rows="10" placeholder="Entrez une description"
          v-model="revenuSuivi.Description">
          </textarea>
        </div>
      </div>
      <label class="label">Montant</label>
      <div class="field has-addons">
        <div class="control">
          <input
            type="number"
            min="0.01"
            step="any"
            class="input has-text-centered"
            placeholder="$"
            v-model="revenuSuivi.Montant">
        </div>
        <div class="control">
            <button class="button is-static">$</button>
        </div>
      </div>
      <div class="field">
        <label class="label">Revenu</label>
        <div class="select">
         <select class="select" v-model="revenuSuivi.IdRevenu">
           <option value="0" selected>Choisir un revenu</option>
          <option
          v-for="r in revenusPlanifies"
          :key="r.idRevenu"
          v-bind:value="r.idRevenu"
          >
          {{ r.titre }}
          </option>
      </select>
        </div>
      </div>
    </div>
    <footer class="modal-card-foot">
      <button
        class="button is-success"
        @click="ajout"
        >Ajouter</button>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'ModalRevenuNew',
  data() {
    return {
      revenuSuivi: {
        Montant: 0,
        DateEntree: '',
        IdRevenu: 0,
        IdBudget: this.$store.state.budget.budgetIdCurr,
        Description: '',
      },
      revenusPlanifies: this.$store.state.revenu.revenusBudget,
      errorMessage: [],
    };
  },

  methods: {
    async ajout() {
      this.errorMessage = [];
      this.revenuSuivi.Montant = parseFloat(this.revenuSuivi.Montant, 10);
      if (this.revenuSuivi.DateEntree === '') this.errorMessage.push('Vous n\' pas entrer de Date');
      if (this.revenuSuivi.Montant <= 0) this.errorMessage.push('Vous n\'avez pas entrer un montant valide');
      if (this.revenuSuivi.IdRevenu === 0) this.errorMessage.push('Vous n\'avez pas entrer de revenu');
      if (this.errorMessage.length !== 0) return;
      await this.$store.dispatch('revenu/createRevenuSuivi', this.revenuSuivi);
      this.$emit('close');
    },
  },
};
</script>
