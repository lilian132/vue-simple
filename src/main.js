import Vue from 'vue'
import Vuex from 'babel-polyfill'
import VueRouter from 'vue-router'
import store from './vuex'
import routes from './routers'
import tap from './componentsBase/v-tap'
import './assets/css/base.css'
import './assets/css/common.css'

import appFooter from './components/footer'
// require('./assets/css/base.css');

Vue.use(VueRouter)
Vue.use(tap)
// 实例化VueRouter
const router = new VueRouter({
    // mode: 'history',
    routes
});

new Vue({
  el: '#app',
  router,
  store,
  components: { appFooter }
})