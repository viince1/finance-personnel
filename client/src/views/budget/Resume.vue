<template>
  <div class="resume" id="resume">
    <div class="box">
      <moyenne />
    </div>
    <div class="">
      <div class="columns">
        <div class="column is-4">
          <pie-chart />
        </div>
        <div class="column is-8">
          <budget />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Moyenne from '../../components/budget/resume/Moyenne.vue';
import PieChart from '../../components/budget/resume/PieChart.vue';
import Budget from '../../components/budget/resume/Budget.vue';

export default {
  name: 'Resume',
  components: {
    Moyenne,
    PieChart,
    Budget,
  },
};
</script>

<style lang="scss" scoped>
#resume {
  padding: 10px;
  margin: 10px 0px 10px 10px;
}
</style>
