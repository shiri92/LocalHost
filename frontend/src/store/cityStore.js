/* ----- DEPENDENCIES -----*/
import cityService from "../services/cityService.js";

export default {
    state: {
        cities: [],
        topDests: []
    },
    mutations: {
        setCities(state, { cities }) {
            state.cities = cities;
        },
        setTopDests(state, { topDests }) {
            state.topDests = topDests;
        }
    },
    getters: {
        cities(state) {
            return state.cities;
        },
        topDests(state) {
            return state.topDests;
        }
    },
    actions: {
        async loadCities(context, { searchWord }) {
            let cities = await cityService.queryCities(searchWord);
            context.commit({ type: "setCities", cities });
            return cities;
        },
        async loadTopDests(context) {
            let topDests = await cityService.queryTopDests();
            context.commit({ type: "setTopDests", topDests });
        }
    }
};