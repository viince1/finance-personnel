<template>
  <div class="modal-card" id="ajout-compte">
    <div class="modal-card-head">
      <p class="modal-card-title">Modification d'un catégorie de dépense</p>
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
        <label class="label">Nom de la catégorie de dépense</label>
        <div class="control">
          <input class="input"
          type="text"
          placeholder="Donnez un nom descriptif a votre categorie de depense"
          v-model="categoriedepense.Nom">
        </div>
      </div>
    </div>
    <div class="modal-card-foot">
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary" @click="editCategorieDepense">Modifier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditCategoryDepenseModal',
  data() {
    return {
      categoriedepense: {
        Nom: this.$attrs.Nom,
        IdCategorieDepense: this.$attrs.IdCategorieDepense,
      },
      errorMessage: [],
    };
  },
  methods: {
    async editCategorieDepense() {
      this.errorMessage = [];
      if (this.categoriedepense.Nom === '') this.errorMessage.push('Le champ Nom est requis');
      if (this.errorMessage.length !== 0) return;
      this.$store.dispatch('categoriesdepenses/updateСategorieDepense', { categoriedepense: this.categoriedepense });
      this.$emit('close');
    },
  },
};
</script>
