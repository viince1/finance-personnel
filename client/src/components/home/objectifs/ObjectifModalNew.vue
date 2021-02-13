<template>
  <div class="modal-card" id="objectif">
    <div class="modal-card-head">
      <input class="input is-5 mr-4 is-size-5" placeholder="Entrez le titre de l'objectif"
      type="text" v-model="objectif.Titre">
      <button
        type="button"
        class="delete"
        @click="$emit('close')"/>
    </div>
    <div class="modal-card-body">
      <div class="message is-danger" v-if="errorMessage.length !== 0">
        <div v-for="(m, index) in errorMessage"
            :key="index" class="message-body has-icons-left" style="padding:6px;">
            Erreur : {{m}}
        </div>
      </div>
      <div class="field">
        <label class="label">Date butoir</label>
        <div class="control">
          <input class="input" type="date" v-model="objectif.DateButoir">
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="input" rows="10" placeholder="Entrez une description"
          v-model="objectif.Description">
          </textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Statut</label>
        <div class="select">
         <select class="select" v-model="objectif.IdObjectifStatus">
           <option value="0" selected>Choisir un statut</option>
          <option
          v-for="s in status"
          :key="s.IdObjectifStatus"
          v-bind:value="s.IdObjectifStatus">
            {{ s.Nom }}
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
  name: 'ModalObjectifNew',
  data() {
    return {
      objectif: {
        Titre: '',
        Description: '',
        DateButoir: '',
        IdObjectifStatus: 0,
      },
      status: this.$store.state.objectif.lstStatus,
      errorMessage: [],
    };
  },

  methods: {
    async ajout() {
      this.errorMessage = [];
      if (this.objectif.DateButoir === '') this.errorMessage.push('Vous n\' pas entrer de Date Butoir');
      if (this.objectif.Titre === '') this.errorMessage.push('Vous n\'avez pas entrer de Titre');
      if (this.objectif.IdObjectifStatus === 0) this.errorMessage.push('Vous devez specifier un status');
      if (this.errorMessage.length !== 0) return;
      await this.$store.dispatch('objectif/create', { data: this.objectif });
      this.$emit('close');
    },
  },
};
</script>
