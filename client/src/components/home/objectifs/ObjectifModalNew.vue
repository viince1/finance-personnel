<template>
  <div class="modal-card" id="objectif">
    <div class="modal-card-head">
      <input class="input title is-3" placeholder="Entrez le titre de l'objectif"
      type="text" v-model="newObj.Titre">
      <button
        type="button"
        class="delete"
        @click="$emit('close')"/>
    </div>
    <div class="modal-card-body">
      <div class="field">
        <label class="label">Date buttoir</label>
        <div class="control">
          <input class="input" type="date" v-model="newObj.DateButoir">
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="input" rows="10" placeholder="Entrez une description"
          v-model="newObj.Description">
          </textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Numéro de priorité</label>
        <div class="control">
          <input class="input" type="number" v-model="newObj.NoPriorite">
        </div>
      </div>
      <div class="field">
        <label class="label">Statut</label>
        <div class="select">
         <select class="select" v-model="newObj.IdObjectifStatus">
          <option
          v-for="s in statuts"
          :key="s.id"
          :value="s.id">
            {{ s.label }}
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
const statuts = [
  { label: 'Succès', id: 1 },
  { label: 'En cours', id: 2 },
  { label: 'À faire', id: 3 },
];
export default {
  name: 'ModalObjectifNew',
  data() {
    return {
      statuts,
      newObj: {},
    };
  },
  methods: {
    ajout() {
      this.$store.dispatch('objectif/create', { data: this.newObj });
    },
  },
};
</script>
