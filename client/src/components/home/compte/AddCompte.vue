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
      <!-- Il faut rajouter une description et un nom de transaction -->
<div class="field">
  <label class="label">Nom du compte</label>
  <div class="control">
    <input class="input" type="text" placeholder="Text input" v-model="nom">
  </div>
</div>
<div class="field">
  <label class="label">Description</label>
  <div class="control">
    <textarea class="textarea" placeholder="Textarea"  v-model="description"></textarea>
  </div>
</div>

<div class="field">
  <label class="label">Type</label>
  <div class="control">
    <div class="select">
      <select v-model="type">
        <option value="" selected>Choisir un type de compte</option>
        <option :key ="c.IdTypeCompte" v-for="c in comptes" :value="c.IdTypeCompte" >
            {{c.Nom}}</option>
      </select>
    </div>
  </div>
</div>

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
      nom: '',
      type: 0,
      description: '',
    };
  },
  methods: {
    add() {
      console.log(this.type);
      this.$store.dispatch('compte/addCompte', {
        data: {
          NomCompte: this.nom,
          TypeCompte: this.type,
          Description: this.description,
        },
      });
    },
  },
  computed: {
    comptes() {
      return this.$store.state.compte.typescomptes;
    },
  },
  created() {
    this.$store.dispatch('compte/getTypesComptes');
  },
};
</script>
