<template>
  <div class="modal-card" id="transactions">
    <div class="modal-card-head">
      <p class="modal-card-title">Modification de compte </p>
      <button
        type="button"
        class="delete"
        @click="$emit('close')"/>
    </div>
    <div class="modal-card-body">
      <div class="field">
        <div class="control">
          <label for="" class="label">Nom du compte</label>
          <input type="text" class="input" placeholder="Nom du compte" v-model="compte.NomCompte">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="" class="label">Type de compte</label>
          <select name="" id="" class="select input" v-model="compte.IdTypeCompte">
            <option
            v-bind:value="t.IdTypeCompte"
            v-for="t in typescomptes"
            :key="t.IdTypeCompte">
              {{t.Nom}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="modal-card-foot">
      <div class="level">
        <div class="level-right">
          <div class="level-item">
            <button class="button is-primary">Save</button>
          </div>
          <div class="level-item">
            <button class="button is-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompteEdit',
  data() {
    return {
      compte: {
        NomCompte: this.$attrs.NomCompte,
        IdCompte: this.$attrs.IdCompte,
        TypeCompte: this.$attrs.TypeCompte,
        IdTypeCompte: this.$attrs.IdTypeCompte,
      },
      typescomptes: this.$store.state.compte.typescomptes,
    };
  },
};
</script>
