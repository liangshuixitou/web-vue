import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import './assets/css/global.css';
import './assets/icon/iconfont.css';
import axios from 'axios';
import qs from 'qs';
import TreeTable from 'vue-table-with-tree-grid';

Vue.config.productionTip = false;

axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
});
Vue.prototype.$http = axios;
axios.defaults.baseURL = '/api';
Vue.prototype.$qs = qs;

Vue.component('tree-table', TreeTable);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
