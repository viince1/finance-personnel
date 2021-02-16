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
   </div>
   <footer class="modal-card-foot">
    <button class="button ">Ajouter</button>
   </footer>
</div>
</template>

<script>
export default {
};
</script>

<style scoped lang="scss">

</style>
