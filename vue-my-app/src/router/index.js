import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutMe from '../views/AboutMe.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Register.vue'),
  },
  {
    path: '/AboutMe',
    name: 'AboutMe',
    component: AboutMe, // Register the AboutMe route
  },
  {
    path: '',
    name: 'ToolBar',
    component: () => import(/* webpackChunkName: "toolbar" */ '../views/ToolBar.vue'),
    children: [
      {
        path: '/me',
        name: 'me',
        component: () => import(/* webpackChunkName: "me" */ '../views/Me.vue'),
      },
      {
        path: '/',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/Simple',
        name: 'Simple',
        component: () => import(/* webpackChunkName: "simple" */ '../views/Simple.vue'), 
      },
      {
        path: '/gradeCal',
        name: 'GradeCalculator',
        component: () => import(/* webpackChunkName: "grade-calculator" */ '../views/GradeCalculator.vue'),
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "about" */ '../views/store/Dashboard.vue'),
      },
      {
        path: '/orders',
        name: 'Orders',
        component: () => import(/* webpackChunkName: "about" */ '../views/store/Orders.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
