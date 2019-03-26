import Vue from 'vue';
import Vuex from 'vuex';
import userStore from './userStore.js';
import cityStore from './cityStore.js';
import countryStore from './countryStore.js';
import cloudStore from './cloudStore.js';


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userStore,
        cityStore,
        countryStore,
        cloudStore,
    }
})