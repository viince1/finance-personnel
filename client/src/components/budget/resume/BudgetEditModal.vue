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
    <div class="field">
      <label class="label">Nom du budget</label>
      <div class="control">
        <input class="input"
        type="text"
        placeholder="Donnez un nom descriptif a votre budget Ex: Budget AAAA"
        v-model="Nom">
      </div>
    </div>
<div class="field is-grouped">
  <div class="control">
    <button class="button is-link" @click="addBudget">Modifier</button>
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
      Nom: this.$attrs.Nom,
      IdUtilisateur: this.$attrs.IdUtilisateur,
      IdBudget: this.$attrs.IdBudget,
    };
  },
  methods: {
    addBudget() {
      this.$store.dispatch('budget/updateBudget', { budget: { Nom: this.Nom, IdUtilisateur: this.IdUtilisateur, IdBudget: this.IdBudget } });
      this.$emit('close');
    },
  },
};
</script>
