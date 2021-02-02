<template>
  <div class="resume" id="resume">
    <div class="box">
      <moyenne />
    </div>
    <div class="">
      <div class="columns">
        <div class="column">
          <pie-chart />
        </div>
        <div class="column">
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
