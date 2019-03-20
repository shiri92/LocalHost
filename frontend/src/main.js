import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import css from '../src/assets/css/main.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  css,
  render: h => h(App)
}).$mount('#app')
