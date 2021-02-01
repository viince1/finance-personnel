import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Home from '@/views/Home.vue';
import Budget from '@/views/budget/Resume.vue';
import Revenus from '@/views/budget/Revenus.vue';
import Depenses from '@/views/budget/Depenses.vue';
import Suivi from '@/views/budget/Suivi.vue';
import SignUp from '@/views/authentication/SignUp.vue';
import Login from '@/views/Login.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/budget/resume',
    name: 'Budget',
    component: Budget,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/budget/revenus',
    name: 'Revenus',
    component: Revenus,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/budget/depenses',
    name: 'Depenses',
    component: Depenses,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/budget/suivi',
    name: 'Suivi',
    component: Suivi,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const authenticatedUser = store.state.user.user.loggedIn;
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  if (requiresAuth && !authenticatedUser) return next({ name: 'Login' });
  return next();
});

export default router;
