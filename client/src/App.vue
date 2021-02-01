<template>
  <div id="app">
    <div class="nav">
      <Menu />
    </div>
    <div class="views">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Menu from './components/menu/Menu.vue';

export default {
  name: 'App',
  components: {
    Menu,
  },
};
</script>

<style lang="scss">
</style>
