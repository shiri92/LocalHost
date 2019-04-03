import Vue from "vue";
import Vuex from "vuex";
import userStore from "./userStore.js";
import cityStore from "./cityStore.js";
import cloudStore from "./cloudStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStore,
    cityStore,
    cloudStore
  }
});
