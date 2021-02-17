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
         <input type="text" class="input" v-model="stock.Devise">
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
        Poids: 0.0,
        Region: 'US',
        Devise: 'USD',
      },
    };
  },
  methods: {
    addSecurity() {
      this.$store.dispatch('investissement/addStock', { stock: this.stock });
    },
  },
};
</script>

<style scoped lang="scss">

</style>
