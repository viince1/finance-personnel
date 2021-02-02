<template>
  <div class="box container" id="piechart">
    <div class="title">
      <p class="title is-3">Visualisation</p>
    </div>
    <div class="relative">
      <canvas id="myChart"></canvas>
      <div class="absolute-center text-center">
        <p class="has-text-link">Taux epargne <br> {{savingsRate.toFixed(2)}}%</p>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'PieChart',
  computed: {
    savingsRate() {
      if (this.revenusYTD === 0) return 0;
      return ((this.revenusYTD - this.depensesYTD) / this.revenusYTD) * 100;
    },
    revenusYTD() {
      return this.$store.getters['revenu/yeartodate'];
    },
    depensesYTD() {
      return this.$store.getters['depense/yeartodate'];
    },
  },
  methods: {
    makeChart() {
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
        options: {
          elements: {
            center: {
              text: '99 %',
            },
          },
        },
      });
    },
  },
  mounted() {
    this.makeChart();
  },
};
</script>

<style lang="scss">
.relative {
  position: relative;
}

.absolute-center {
  position:absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.text-center{
  text-align: center;
}

p {
  font-size: 1rem;
  font-weight: bold;
}

#myChart {
  width:50%;
}

#piechart {
  padding: 10px;
  margin: 10px 0px 10px 10px;
}
</style>
