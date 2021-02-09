<template>
  <div class="resume" id="resume">
    <div class="box">
      <moyenne />
    </div>
    <div class="columns">
      <div class="column is-7">
        <budget />
      </div>
      <div class="column is-5">
        <progress-comp />
      </div>
    </div>
  </div>
</template>

<script>

import Moyenne from '../../components/budget/resume/Moyenne.vue';
import Budget from '../../components/budget/resume/Budget.vue';
import ProgressComp from '../../components/budget/resume/Progress.vue';

export default {
  name: 'Resume',
  components: {
    Moyenne,
    Budget,
    ProgressComp,
  },
};
</script>

<style lang="scss" scoped>
#resume {
  padding: 10px;
  margin: 10px 0px 10px 10px;
}
</style>
