import Vue from 'vue';
import firebase from 'firebase';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Buefy);

require('@/assets/main.scss');

Vue.config.productionTip = false;

const configOptions = {
  apiKey: 'AIzaSyCB8kUDMrd7LYHH-sP-ypcQK7nuOV2QbHU',
  authDomain: 'projetfinetudem9.firebaseapp.com',
  projectId: 'projetfinetudem9',
  storageBucket: 'projetfinetudem9.appspot.com',
  messagingSenderId: '234058706845',
  appId: '1:234058706845:web:c8fb77c7c0c28de6fe8974',
};
firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('user/fetchUser', user);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
