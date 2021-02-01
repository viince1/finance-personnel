<template>
  <div class="modal-card" id="transactions">
    <div class="modal-card-head">
      <p class="modal-card-title">Transactions lies a ce compte</p>
      <button
        type="button"
        class="delete"
        @click="$emit('close')"/>
    </div>
    <div class="modal-card-body">
      <!-- Il faut rajouter une description et un nom de transaction -->
      <table class="table is-bordered has-text-centered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date de la depense</th>
            <th>Montant</th>
            <th>Type de transaction</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.IdDepenseSuivi">
            <td>{{transaction.NomDepense}}</td>
            <td>{{transaction.DateDepense}}</td>
            <td>{{transaction.MontantDepense}} $</td>
            <td>{{transaction.CategorieDepense}}
            <td>{{transaction.Description}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionsCompte',
  data() {
    return {
      transactions: this.$attrs.data,
    };
  },
};
</script>
