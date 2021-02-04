<template>
  <div class="modal-card" id="ajout-compte">
    <div class="modal-card-head">
      <p class="modal-card-title">Ajout compte</p>
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
        <label class="label">Nom du compte</label>
        <div class="control">
          <input class="input"
          type="text"
          placeholder="Nom de votre compte ex: Compte cheque"
          v-model="compte.NomCompte">
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea"
          placeholder="Description du contenu de votre compte"
          v-model="compte.Description">
          </textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Type de compte</label>
        <div class="control">
          <div class="select">
            <select v-model="compte.IdTypeCompte">
              <option value="0" selected>Choisir un type de compte</option>
              <option
                :key ="type.IdTypeCompte"
                  v-for="type in typesComptes"
                    :value="type.IdTypeCompte" >
                  {{type.Nom}}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-card-foot">
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" @click="add">Ajouter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AjoutCompte',
  data() {
    return {
      compte: {
        NomCompte: '',
        IdTypeCompte: 0,
        Description: '',
      },
      errorMessage: [],
    };
  },
  methods: {
    async add() {
      this.errorMessage = [];
      if (this.compte.NomCompte === '') this.errorMessage.push('Le champ Nom Compte est requis');
      if (this.compte.IdTypeCompte === 0) this.errorMessage.push('Le champ Type de compte est requis');
      if (this.errorMessage.length !== 0) return;
      await this.$store.dispatch('compte/addCompte', { compte: this.compte });
      this.$emit('close');
    },
  },
  computed: {
    typesComptes() {
      return this.$store.state.compte.typescomptes;
    },
  },
};
</script>
