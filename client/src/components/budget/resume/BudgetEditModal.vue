<template>
  <div class="modal-card" id="ajout-compte">
    <div class="modal-card-head">
      <p class="modal-card-title">Modification d'un budget</p>
      <button
        type="button"
        class="delete"
        @click="$emit('close')"/>
    </div>
    <div class="modal-card-body">
      <div class="message is-danger" v-if="errorMessage.length !== 0">
        <div v-for="(m, index) in errorMessage"
            :key="index"
              class="message-body has-icons-left"
                style="padding:6px;">
            Erreur : {{m}}
        </div>
      </div>
      <div class="field">
        <label class="label">Nom du budget</label>
        <div class="control">
          <input class="input"
          type="text"
          placeholder="Donnez un nom descriptif a votre budget Ex: Budget AAAA"
          v-model="budget.Nom">
        </div>
      </div>
    </div>
    <div class="modal-card-foot">
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary" @click="addBudget">Modifier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BudgetEditModal',
  data() {
    return {
      budget: {
        Nom: this.$attrs.Nom,
        IdBudget: this.$attrs.IdBudget,
      },
      errorMessage: [],
    };
  },
  methods: {
    async addBudget() {
      this.errorMessage = [];
      if (this.budget.Nom === '') this.errorMessage.push('Le champ Nom est requis');
      if (this.errorMessage.length !== 0) return;
      await this.$store.dispatch('budget/updateBudget', { budget: this.budget });
      this.$emit('close');
    },
  },
};
</script>
