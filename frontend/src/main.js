import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Routes from "./routes.js";
import _ from "vue-lodash";
import JQuery from 'jquery';
import 'bootstrap';
import 'popper.js';
import './assets/framework/css/app.css';
import VueSession from 'vue-session';

window.$ = window.JQuery = JQuery;

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueSession, {
  persist: true
});
Vue.use(_);



const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

Vue.filter('is_available', function (value) {
  return value ? "Available" : "Not available";
});

Vue.filter('currency', function (value) {
  return "$ " + value;
});




new Vue({
  render: h => h(App),
  router
}).$mount('#app');