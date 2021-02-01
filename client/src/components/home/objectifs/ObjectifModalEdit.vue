<template>
  <div class="modal-card" id="objectif">
    <div class="modal-card-head">
      <!--CHANGER LES THIS.$ATTRS-->
      <input class="input title is-3"  type="text" v-model="this.$attrs.Titre">
      <button
        type="button"
        class="delete"
        @click="$emit('close')"/>
    </div>
    <div class="modal-card-body">
      <div class="field">
        <label class="label">Date buttoir</label>
        <div class="control">
          <input class="input" type="date" v-model="this.$attrs.DateButoir">
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="input" rows="10" placeholder="Entrez une description"
          v-model="this.$attrs.Description">
          </textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Statut</label>
        <div class="select">
         <select class="select">
          <option
          v-for="s in statuts"
          :key="s.id">
            {{ s.label }}
          </option>
      </select>
        </div>
      </div>
    </div>
    <footer class="modal-card-foot">
      <button
        class="button"
        >Modifier</button>
        <button
        class="button is-danger"
        @click="deleteIt"
        >Supprimer</button>
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
  name: 'ModalObjectifEdit',
  data() {
    return {
      // objectif: this.$attrs.data,
      statuts,
    };
  },
  methods: {
    edit() {
      this.$store.dispatch('objectif/update', { data: this.objectif });
    },
    deleteIt() {
      this.$store.dispatch('objectif/delete', { id: this.$attrs.IdObjectif });
    },
  },
};
</script>
