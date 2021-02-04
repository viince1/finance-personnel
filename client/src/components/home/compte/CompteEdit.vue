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
      <div class="message is-danger" v-if="errorMessage.length !== 0">
        <div v-for="(m, index) in errorMessage"
            :key="index"
              class="message-body has-icons-left"
                style="padding:6px;">
            Erreur : {{m}}
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="" class="label">Nom du compte</label>
          <input type="text" class="input" placeholder="Nom du compte" v-model="compte.NomCompte">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="" class="label">Description du compte</label>
          <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="input"
          v-model="compte.Description"></textarea>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="" class="label">Type de compte</label>
          <select name="" id="" class="select input" v-model="compte.IdTypeCompte">
            <option
            v-bind:value="type.IdTypeCompte"
            v-for="type in typesComptes"
            :key="type.IdTypeCompte">
              {{type.Nom}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="modal-card-foot">
      <div class="level">
        <div class="level-right">
          <div class="level-item">
            <button class="button is-primary" v-on:click.prevent="updateCompte">Save</button>
          </div>
          <div class="level-item">
            <button class="button is-danger" v-on:click.prevent="deleteCompte">Delete</button>
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
        Description: this.$attrs.Description,
      },
      typesComptes: this.$store.state.compte.typescomptes,
      errorMessage: [],
    };
  },
  methods: {
    async deleteCompte() {
      await this.$store.dispatch('compte/deleteCompte', this.compte.IdCompte);
      this.$emit('close');
    },
    async updateCompte() {
      this.errorMessage = [];
      if (this.compte.NomCompte === '') this.errorMessage.push('Le champ Nom Compte est requis');
      if (this.compte.IdTypeCompte === 0) this.errorMessage.push('Le champ Type de compte est requis');
      if (this.errorMessage.length !== 0) return;
      await this.$store.dispatch('compte/updateCompte', this.compte);
      this.$emit('close');
    },
  },
};
</script>
