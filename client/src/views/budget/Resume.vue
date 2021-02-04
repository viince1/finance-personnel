<template>
  <div class="resume" id="resume">
    <div class="box">
      <moyenne />
    </div>
    <div class="columns">
      <div class="column is-12">
        <budget />
      </div>
    </div>
  </div>
</template>

<script>

import Moyenne from '../../components/budget/resume/Moyenne.vue';
import Budget from '../../components/budget/resume/Budget.vue';

export default {
  name: 'Resume',
  components: {
    Moyenne,
    Budget,
  },
  async mounted() {
    await this.$store.dispatch('depense/getDepenses');
    await this.$store.dispatch('revenu/getRevenus');
  },
};
</script>

<style lang="scss" scoped>
#resume {
  padding: 10px;
  margin: 10px 0px 10px 10px;
}
</style>
