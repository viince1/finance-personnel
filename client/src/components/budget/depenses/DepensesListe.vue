<template>
  <div class="depenses" id="depenses">
    {{idBudget}}
  </div>
</template>

<script>
export default {
  name: 'Depenses',
  data() {
    return {
      idBudget: this.$route.params.IdBudget,
    };
  },
};
</script>

<style lang="scss">
.container {
  height: 100%;
}
</style>
