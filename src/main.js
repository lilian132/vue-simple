import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex'
import routes from './routers'
import './assets/css/base.css'
import './assets/css/common.css'

import appFooter from './components/footer'
// require('./assets/css/base.css');

Vue.use(VueRouter)


// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
// router.beforeEach((to, from, next) => {    
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (store.state.userInfo.userId) {
//             next();
//         } else {
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }
//             });
//         }
//     } else {
//         next();
//     }
// });

// 实例化VueRouter
const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
  el: '#app',
  router,
  store,
  components: { appFooter }
})