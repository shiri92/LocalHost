/* ----- DEPEND -----*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./registerServiceWorker";
import css from "../src/assets/css/main.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import BootstrapVue from "bootstrap-vue";
import AnimateCSS from "animate.css";
import VueCarousel from "vue-carousel";
// import VueBootstrap from 'bootstrap-vue';
import VueScrollTo from "vue-scrollto";
import VueSweetalert2 from "vue-sweetalert2";
import * as VueGoogleMaps from "vue2-google-maps";
// import './filters.js';

// import 'custom.scss'

const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674"
  // popup: 'animated tada'
};

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDMJmYLMFI-0rNvWoZ7KrGpryIsUXOivms",
    libraries: "places"
  }
});

Vue.use(ElementUI);
Vue.use(AnimateCSS);
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2, options);
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
});

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faJs, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faVenusMars } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// library.add(faCoffee);
library.add(faCoffee, faJs, faVuejs);
library.add(faCouch);
library.add(faEnvelope);
library.add(faSortDown);
library.add(faComment);
library.add(faVenusMars);
library.add(faWindowClose);
library.add(faQuoteLeft);
library.add(faBriefcase);
library.add(faBook);
library.add(faMapMarkerAlt);
library.add(faLock);
library.add(faUser);
library.add(faSearch);
library.add(faFacebook);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(ElementUI);
Vue.use(AnimateCSS);
Vue.use(require("vue-moment"));
Vue.use(VueCarousel);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  css,
  render: h => h(App)
}).$mount("#app");
