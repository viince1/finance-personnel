<template>
  <div class="modal-card" id="ajout-compte">
    <div class="modal-card-head">
      <p class="modal-card-title">Modification d'un categorie revenu</p>
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
        <label class="label">Nom de la categorie Revenu</label>
        <div class="control">
          <input class="input"
          type="text"
          placeholder="Donnez un nom descriptif a votre categorie depense"
          v-model="data.Nom">
        </div>
      </div>
    </div>
    <div class="modal-card-foot">
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary" @click="editCategorieRevenu">Modifier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditCategoryRevenuModal',
  data() {
    return {
      data: {
        Nom: this.$attrs.Nom,
        IdCategorieRevenu: this.$attrs.IdCategorieRevenu,
      },
      errorMessage: [],
    };
  },
  methods: {
    async editCategorieRevenu() {
      console.log(this.$attrs);
      this.errorMessage = [];
      console.log(this.data.IdCategorieRevenu);
      if (this.data.Nom === '') this.errorMessage.push('Le champ Nom est requis');
      if (this.errorMessage.length !== 0) return;
      this.$store.dispatch('categoriesrevenus/updateСategorieRevenu', this.data);
      this.$emit('close');
    },
  },
};
</script>
