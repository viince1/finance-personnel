<template>
  <div class="revenus" id="revenus">
    {{idBudget}}
  </div>
</template>

<script>
export default {
  name: 'Revenus',
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
