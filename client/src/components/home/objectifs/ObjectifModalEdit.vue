<template>
  <div class="modal-card" id="objectif">
    <div class="modal-card-head">
      <input class="input is-5 mr-4 is-size-5"  type="text" v-model="objectif.Titre"
        placeholder="Entrez le titre de l'objectif">
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
        <label class="label">Date buttoir</label>
        <div class="control">
          <input class="input"
          type="date" v-model="objectif.DateButoir">
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
        class="button"
        v-on:click.prevent="edit"
        >Modifier</button>
        <button
        class="button is-danger"
        @click="deleteIt"
        >Supprimer</button>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'ModalObjectifEdit',
  data() {
    return {
      objectif: {
        IdObjectif: this.$attrs.IdObjectif,
        Titre: this.$attrs.Titre,
        Description: this.$attrs.Description,
        DateButoir: this.$attrs.DateButoir,
        IdObjectifStatus: this.$attrs.IdObjectifStatus,
      },
      status: this.$store.state.objectif.lstStatus,
      errorMessage: [],
    };
  },
  methods: {
    async edit() {
      this.errorMessage = [];
      if (this.objectif.DateButoir === '') this.errorMessage.push('Le champ date butoir est requis');
      if (this.objectif.Titre === '') this.errorMessage.push('Le champ titre est requis');
      if (this.objectif.IdObjectifStatus === 0) this.errorMessage.push('Le numero de status est requis');
      if (this.errorMessage.length !== 0) return;
      await this.$store.dispatch('objectif/update', this.objectif);
      this.$emit('close');
    },
    async deleteIt() {
      await this.$store.dispatch('objectif/delete', this.objectif.IdObjectif);
      this.$emit('close');
    },
  },
};
</script>
