<template>
<div class="modal-card">
   <header class="modal-card-head">
      <p class="modal-card-title">Ajouter un titre</p>
      <button
         type="button"
         class="delete"
         @click="$emit('close')"/>
   </header>
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
       <div class="control">
         <label for="" class="label">Titre (ex. : APPL)</label>
         <input type="text" class="input" v-model="stock.TitreCours">
       </div>
     </div>
     <div class="field">
       <div class="control">
         <label for="" class="label">Nom du titre (ex. : Apple Inc.)</label>
         <input type="text" class="input" v-model="stock.TitreLong">
       </div>
     </div>
     <div class="field">
       <div class="control">
         <label for="" class="label">Poids ( % )</label>
         <input type="number" class="input" v-model="stock.Poids">
       </div>
     </div>
     <div class="field">
       <div class="control">
         <label for="" class="label">Region ( ex: US )</label>
         <input type="text" class="input" v-model="stock.Region" disabled>
       </div>
     </div>
     <div class="field">
       <div class="control">
         <label for="" class="label">Devise ( ex: USD )</label>
         <input type="text" class="input" v-model="stock.Devise" disabled>
       </div>
     </div>
   </div>
   <footer class="modal-card-foot">
    <button class="button" @click="addSecurity()">Ajouter</button>
   </footer>
</div>
</template>

<script>
export default {
  name: 'AddSecurity',
  data() {
    return {
      stock: {
        TitreCours: '',
        TitreLong: '',
        Poids: 0,
        Region: 'US',
        Devise: 'USD',
      },
      errorMessage: [],
    };
  },
  methods: {
    async addSecurity() {
      this.errorMessage = [];
      if (this.stock.TitreCours === '') this.errorMessage.push('Le champ TitreCours est requis');
      if (this.stock.TitreLong === '') this.errorMessage.push('Le champ TitreLong est requis');
      if (this.stock.Poids <= 0 || this.stock.Poids > 100) this.errorMessage.push('Le champ poids doit se situe entre 0.01 et 100');
      if (this.errorMessage.length > 0) return;
      this.stock.Poids /= 100;
      if (this.errorMessage.length === 0) {
        await this.$store.dispatch('investissement/addStock', { stock: this.stock });
        this.$emit('close');
        this.$buefy.notification.open({
          message: 'Ajout completée',
          type: 'is-success',
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">

</style>
