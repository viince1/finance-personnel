<template>
  <div class="login container">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div>
          <h1 class="title has-text-centered">Connexion à votre compte</h1>
          <div class="message is-danger" v-if="error !== null">
            <div class="message-body has-icons-left" style="padding:6px;">
              Erreur : {{error}}
            </div>
          </div>
          <div class="container login-form">
            <div class="field">
              <div class="control">
                <input
                type="email"
                placeholder="Courriel"
                class="input"
                v-model="email"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  type="password"
                  class="input"
                  placeholder="Mot de passe"
                  v-model="password"
                />
              </div>
            </div>
            <div class="field level-right" v-on:click.prevent="login">
              <button class="button is-link">Se connecter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    login() {
      this.error = null;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.$store.dispatch('user/fetchUser', userCredential.user)
            .then(() => {
              this.$router.push({ name: 'Dashboard' });
            });
        })
        .catch((err) => {
          this.error = err.message;
          this.password = null;
        });
    },
  },
};
</script>
