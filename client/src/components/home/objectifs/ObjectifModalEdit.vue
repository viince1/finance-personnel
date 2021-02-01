<template>
  <div class="modal-card" id="objectif">
    <div class="modal-card-head">
      <!--CHANGER LES THIS.$ATTRS-->
      <input class="input title is-3"  type="text" v-model="objectif.Titre">
      <button
        type="button"
        class="delete"
        @click="$emit('close')"/>
    </div>
    <div class="modal-card-body">
      <div class="field">
        <label class="label">Date buttoir</label>
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
          <option
          v-for="s in statuts"
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
      statuts: this.$store.state.objectif.lstStatus,
    };
  },
  methods: {
    async edit() {
      await this.$store.dispatch('objectif/update', this.objectif);
      this.$emit('close');
    },
    async deleteIt() {
      this.$store.dispatch('objectif/delete', this.objectif.IdObjectif);
      this.$emit('close');
    },
  },
};
</script>
