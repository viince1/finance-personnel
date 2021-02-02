<template>
  <div class="piechart box container" id="piechart">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'PieChart',
  data() {
    return {
      revenusYTD: this.$store.getters['revenu/yeartodate'],
      depensesYTD: this.$store.getters['depense/yeartodate'],
    };
  },
  mounted() {
    const canvas = document.getElementById('myChart');
    // eslint-disable-next-line no-unused-vars
    const myDoughnutChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [this.revenusYTD, this.depensesYTD],
            backgroundColor: ['rgb(45, 197, 116)', 'rgb(242, 73, 130)'],
          },
        ],
        labels: ['Revenus', 'Depenses'],
      },
    });
  },
};
</script>

<style lang="scss">

</style>
