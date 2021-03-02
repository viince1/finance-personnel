<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>
    <a role="button"
     class="navbar-burger"
      aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start" v-if="userLogged == true">
      <router-link to="/dashboard" class="navbar-item">Accueil</router-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <router-link to="/budget/resume" class="navbar-link">Budget</router-link>
          <div class="navbar-dropdown">
            <router-link to="/budget/resume" class="navbar-item">Resume</router-link>
            <router-link
            :to="{ name: 'Revenus', params: { idBudget: 0 } }"
            class="navbar-item">Revenus</router-link>
            <router-link
            :to="{ name: 'Depenses', params: { idBudget: 0 } }"
            class="navbar-item">Depenses</router-link>
            <router-link to="/budget/suivi" class="navbar-item">Suivi</router-link>
          </div>
        </div>
        <router-link to="/investissement" class="navbar-item">Investissement</router-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <router-link to="/" class="navbar-link">Calculatrices</router-link>
          <div class="navbar-dropdown">
            <router-link to="/calculatrice/interetCompose" class="navbar-item">
              Calculatrice d'intérêts composés
            </router-link>
            <router-link to="/" class="navbar-item">Calculatrice 2</router-link>
          </div>
        </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item" v-if="userLogged !== true">
        <router-link to="/signup" class="navbar-item button" >
          Inscription
        </router-link>
      </div>
      <div class="navbar-item" v-if="userLogged !== true">
        <router-link to="/login" class="navbar-item button" >
          Connexion
        </router-link>
      </div>
      <div class="navbar-item" v-if="userLogged !== false">
        <router-link to="/profil" class="navbar-item button" >
          Profil
        </router-link>
      </div>
      <div class="navbar-item" v-on:click="logout" v-if="userLogged !== false">
        <button class="navbar-item button" >
          Deconnexion
        </button>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Home',
  computed: {
    userLogged() {
      return this.$store.state.user.user.loggedIn;
    },
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        console.log('Deconnexion reussie');
        this.$router.push({ name: 'Home' });
      }).catch((error) => {
        console.log(`Erreur lors de la deconnexion: ${error}`);
      });
    },
  },
};
</script>

<style scoped lang="scss">

</style>
