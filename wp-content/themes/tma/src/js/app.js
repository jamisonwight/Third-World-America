import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vue2Filters from 'vue2-filters'


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vue2Filters)


// Route components
import App from './modules/App.vue'


// Create router
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', component: App, name: 'Home' },
    ]
 });


// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
    el: '#app',
    router: router,
});