
import Vue from 'vue';
import * as VueGoogleMaps from "vue2-google-maps";

const vueGoogleMapsOptions = {
    load: {
        key: "AIzaSyDMJmYLMFI-0rNvWoZ7KrGpryIsUXOivms",
        libraries: "places"
    }
}

Vue.use(VueGoogleMaps, vueGoogleMapsOptions);
