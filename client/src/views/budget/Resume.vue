<template>
  <div class="budget">
    <div class="container box">
      <moyenne />
    </div>
    <div class="container box">
      <pie-chart />
    </div>
  </div>
</template>

<script>

import Moyenne from '../../components/budget/resume/Moyenne.vue';
import PieChart from '../../components/budget/resume/PieChart.vue';

export default {
  name: 'Budget',
  components: {
    Moyenne,
    PieChart,
  },
};
</script>
