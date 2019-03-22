import Vue from 'vue';
import Vuex from 'vuex';
import userStore from './userStore.js';
import countryStore from './countryStore.js';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        userStore,
        countryStore
    }
})