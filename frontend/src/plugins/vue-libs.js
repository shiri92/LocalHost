
// js
import Vue from 'vue';
import VueSweetalert2 from "vue-sweetalert2";
import VCalendar from "v-calendar";
import VueCarousel from "vue-carousel";
import VueScrollTo from "vue-scrollto";
import VueMoment from 'vue-moment';


const vueSwalOptions = {
    confirmButtonColor: "#41b882",
    cancelButtonColor: "#ff7674"
    // popup: 'animated tada'
};

const vueScrollOptions = {
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
}

const vueCalendarOptions = {
    firstDayOfWeek: 2 // Monday

}

Vue.use(VueSweetalert2, vueSwalOptions);
Vue.use(VueScrollTo, vueScrollOptions);
Vue.use(VCalendar, vueCalendarOptions);
Vue.use(VueCarousel);
Vue.use(VueMoment);

// styles
import "v-calendar/lib/v-calendar.min.css";


