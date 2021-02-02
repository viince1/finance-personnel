<template>
  <div class="modal-card" id="ajout-compte">
    <div class="modal-card-head">
      <p class="modal-card-title">Creation d'un budget</p>
      <button
        type="button"
        class="delete"
        @click="$emit('close')"/>
    </div>
    <div class="modal-card-body">
    <div class="field">
      <label class="label">Nom du budget</label>
      <div class="control">
        <input class="input"
        type="text"
        placeholder="Donnez un nom descriptif a votre budget Ex: Budget AAAA"
        v-model="nom">
      </div>
    </div>
<div class="field is-grouped">
  <div class="control">
    <button class="button is-link" @click="addBudget">Ajouter</button>
  </div>
</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BudgetCreateModal',
  data() {
    return {
      nom: null,
    };
  },
  methods: {
    addBudget() {
      this.$store.dispatch('budget/createBudget', this.nom);
      this.$emit('close');
    },
  },
};
</script>
