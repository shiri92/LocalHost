/* ----- DEPENDENCIES -----*/
import cityService from "../services/cityService.js";

export default {
  state: {
    cities: []
  },
  mutations: {
    setCities(state, { cities }) {
      state.cities = cities;
    }
  },
  getters: {
    cities(state) {
      return state.cities;
    }
  },
  actions: {
    async loadCities(context, { searchWord }) {
      let cities = await cityService.queryCities(searchWord);
      context.commit({ type: "setCities", cities });
      return cities;
    }
  }
};
