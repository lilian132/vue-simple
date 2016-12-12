import Home from './views/index.vue'
// import Gift from './views/gift.vue'
// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
// const Home = resolve => {
//     require.ensure(['./views/index.vue'], () => {
//         resolve(require('./views/index.vue'));
//     });
// };

// const List = resolve => {
//     require.ensure(['./views/list.vue'], () => {
//         resolve(require('./views/list.vue'));
//     });
// };

const routers = [{
    path: '/',
    name: 'home',
    component: Home
}, {
    path: '/cnodevue',
    name: 'cnodevue',
    component: Home
}, {
    path: '/gift',
    name: 'gift',
    //component: Gift
    component(resolve) {
        require.ensure(['./views/gift.vue'], () => {
            resolve(require('./views/gift.vue'));
        });
    }
}, {
    path: '*',
    component: Home
}];

export default routers;