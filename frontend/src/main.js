import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import css from '../src/assets/css/main.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// var Vue = require('vue');
var VueScrollTo = require('vue-scrollto');
 
Vue.use(VueScrollTo)

Vue.use(VueScrollTo, {
    container: "body",
    duration: 500,
    easing: "ease",
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
})

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    css,
    render: h => h(App)
}).$mount('#app')