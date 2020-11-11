import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import Welcome from '../components/Welcome.vue';
import Users from '../components/Users.vue';
import Rules from '../components/Rules.vue';

Vue.use(VueRouter);

// eslint-disable-next-line no-undef
const vueRouter = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rules', component: Rules }]
    }
  ]
});

// 挂载路由导航守卫
vueRouter.beforeEach((to, from, next) => {
  const tokenStr = window.sessionStorage.getItem('token');
  if (to.path === '/login') {
    return next();
  } else if (!tokenStr) {
    return next('/login');
  } else {
    return next();
  }
});

export default vueRouter;
