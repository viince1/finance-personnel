<template>
  <div class="budget">
    <moyenne />
    <pie-chart />
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
