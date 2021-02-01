<template>
  <div class="signin container">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div>
          <h1 class="title has-text-centered">Cr&eacute;ation d'un compte</h1>
        <div class="container signin-form">
          <div class="message is-danger" v-if="error !== null">
            <div class="message-body has-icons-left" style="padding:6px;">
              Erreur : {{error}}
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input type="name" placeholder="Nom" class="input" v-model="name">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input type="fname" class="input" placeholder="Prenom" v-model="fname">
            </div>
          </div>
          <div class="field">
              <div class="control">
                <input type="email" placeholder="Courriel" class="input" v-model="email">
              </div>
          </div>
          <div class="field">
            <div class="control">
              <input type="telephone"
              placeholder="Numero de telephone" class="input" v-model="telephone">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input type="password" placeholder="Mot de passe" class="input" v-model="password">
            </div>
          </div>
          <div class="field level">
              <router-link to="/login" href="">
                D&eacute;ja inscrit ? Connectez-vous
              </router-link>
              <button class="button is-link" v-on:click.prevent="signup">S'inscrire</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      fname: '',
      telephone: '',
      error: null,
    };
  },
  methods: {
    signup() {
      this.error = null;
      const user = {
        name: this.name,
        fname: this.fname,
        email: this.email,
        telephone: this.telephone,
      };
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.updateProfile({
            displayName: `${this.name} , ${this.fname}`,
            phoneNumber: this.telephone,
          });
          axios.post('http://localhost:3000/users/signup', user)
            .catch((error) => {
              console.log(error);
            });
          this.$store.dispatch('user/fetchUser', data.user)
            .then(() => {
              this.$router.push({ name: 'Dashboard' });
            });
        })
        .catch((error) => {
          this.error = error.message;
          this.password = '';
        });
    },
  },
};
</script>

<style scoped lang="scss">
figure {
  margin-bottom: 1%;
}
</style>
