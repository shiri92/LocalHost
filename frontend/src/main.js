// Vue
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

// Plugins
import './plugins/element-ui'
import './plugins/vue-bootstrap'
import './plugins/vue-google-maps'
import './plugins/vue-libs'
import './plugins/font-awesome'
import './plugins/animate-css'

// Services
import "./registerServiceWorker";

// Styles
import "../src/assets/css/main.scss";


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

