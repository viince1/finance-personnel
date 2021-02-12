<template>
  <div class="modal-card" id="depenseSuivi">
    <div class="modal-card-head">
      <h4 class="title is-4">Ajout d'une depense</h4>
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
          <input class="input" type="date" v-model="depenseSuivi.DateEntree">
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="input" rows="10" placeholder="Entrez une description"
          v-model="depenseSuivi.Description">
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
            placeholder="Montant de la depense Ex: 1.99"
            v-model="depenseSuivi.Montant">
        </div>
        <div class="control">
            <button class="button is-static">$</button>
        </div>
      </div>
      <div class="field">
        <label class="label">Dépense</label>
        <div class="select">
         <select class="select" v-model="depenseSuivi.IdDepense">
           <option value="0" selected>Choisir une dépense</option>
          <option
          v-for="d in depensesPlanifies"
          :key="d.IdDepense"
          v-bind:value="d.IdDepense"
          >
          {{ d.nom }}
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
  name: 'ModalDepenseNew',
  data() {
    return {
      depenseSuivi: {
        Montant: 0,
        DateEntree: '',
        IdDepense: 0,
        IdBudget: this.$store.state.budget.budgetIdCurr,
        Description: '',
      },
      depensesPlanifies: this.$store.state.depense.depensesBudget,
      errorMessage: [],
    };
  },

  methods: {
    async ajout() {
      this.errorMessage = [];
      if (this.depenseSuivi.DateEntree === '') this.errorMessage.push('Vous n\' pas entrer de Date');
      if (this.depenseSuivi.Montant <= 0) this.errorMessage.push('Vous n\'avez pas entrer de Montant');
      if (this.depenseSuivi.IdDepense === 0) this.errorMessage.push('Vous n\'avez pas entrer de depense');
      if (this.errorMessage.length !== 0) return;
      await this.$store.dispatch('depense/createDepenseSuivi', this.depenseSuivi);
      this.$emit('close');
    },
  },
};
</script>
