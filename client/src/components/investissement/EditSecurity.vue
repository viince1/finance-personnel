<template>
<div class="modal-card">
   <header class="modal-card-head">
      <p class="modal-card-title">Modifier un titre</p>
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
         <label for="" class="label">Titre (ex. : AAPL)</label>
         <b-autocomplete
                v-model="query"
                placeholder="ex. : AAPL"
                :data="suggestions"
                field="symbol"
                @select="option => (selected = option)"
                @input="getSuggestions"
            >
              <template slot-scope="props">
                {{props.option.symbol}} - {{props.option.name}}
              </template>
            </b-autocomplete>
       </div>
     </div>
     <div class="field">
       <div class="control">
         <label for="" class="label">Nom du titre (ex. : Apple Inc.)</label>
         <input type="text" class="input" v-model="stock.TitreLong" disabled>
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
         <label for="" class="label">Region</label>
         <div class="select">
           <select name="" id="" class="input" v-model="stock.Region">
             <option value="">Choisir une region</option>
             <option value="CA">Canada</option>
             <option value="US">Etats-Unis</option>
             <option value="EMG">Pays emergents</option>
             <option value="EU">Europe</option>
             <option value="AS">Asie</option>
           </select>
         </div>
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
    <button class="button is-info" @click="updateSecurity()">Modifier</button>
   </footer>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddSecurity',
  data() {
    return {
      stock: {
        TitreCours: this.$attrs.TitreCours,
        TitreLong: this.$attrs.TitreLong,
        Poids: this.$attrs.Poids * 100,
        Region: this.$attrs.Region,
        Devise: this.$attrs.Devise,
        IdTitreBoursier: this.$attrs.IdTitreBoursier,
      },
      errorMessage: [],
      suggestions: [],
      query: this.$attrs.TitreCours,
      selected: null,
    };
  },
  methods: {
    async updateSecurity() {
      this.errorMessage = [];
      console.log(this.stock);
      if (this.query === '') this.errorMessage.push('Le champ TitreCours est requis');
      if (this.stock.TitreLong === '') this.errorMessage.push('Le champ TitreLong est requis');
      if (this.stock.Poids <= 0 || this.stock.Poids > 100) this.errorMessage.push('Le champ poids doit se situe entre 0.01 et 100');
      if (this.stock.Region === '') this.errorMessage.push('Vous devez specifier une region');
      if (this.errorMessage.length > 0) return;
      this.stock.Poids /= 100;
      if (this.errorMessage.length === 0) {
        await this.$store.dispatch('investissement/updateStock', { stock: this.stock })
          .then(() => {
            this.$emit('close');
            this.$buefy.notification.open({
              message: 'Modification completée',
              type: 'is-success',
            });
          });
      }
    },
    async getSuggestions() {
      if (this.query !== '') {
        return axios.get(`https://ticker-2e1ica8b9.now.sh//keyword/${this.query}`)
          .then((response) => {
            this.suggestions = response.data;
          });
      }
      return [];
    },
  },
  watch: {
    selected(newValue) {
      this.stock.TitreCours = newValue.symbol;
      this.stock.TitreLong = newValue.name;
      console.log(newValue);
    },
  },
};
</script>

<style scoped lang="scss">

</style>
