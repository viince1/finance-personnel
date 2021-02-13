<template>
  <div class="modal-card" id="ajout-compte">
      <div class="modal-card-head">
        <p class="modal-card-title">Creation d'une categorie revenu</p>
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
        <label class="label">Nom de la categorie de revenu</label>
        <div class="control">
          <input class="input"
          type="text"
          placeholder="Donnez un nom descriptif a la categorie de revenu"
          v-model="categorieRevenu.Nom">
        </div>
      </div>
    </div>
    <div class="modal-card-foot">
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" @click="addCategorieDepense">Ajouter</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AddCategoryRevenuModal',
  data() {
    return {
      categorieRevenu: {
        Nom: '',
      },
      errorMessage: [],
    };
  },
  methods: {
    async addCategorieDepense() {
      this.errorMessage = [];
      if (this.categorieRevenu.Nom === '') this.errorMessage.push('Le champ Nom est requis');
      if (this.errorMessage.length !== 0) return;
      await this.$store.dispatch('categoriesrevenus/ajouterCategorieRevenu', this.categorieRevenu);
      this.$emit('close');
    },
  },
};
</script>
