/* ----- DEPENDENCIES -----*/
import countryService from '../services/countryService.js';

export default {
    state: {
        countries: [],
        topDests: [],
    },
    mutations: {
        setCountries(state, { countries }) {
            state.countries = countries;
        },
        setTopDests(state, { topDests }) {
            state.topDests = topDests;
        }
    },
    getters: {
        countries(state) {
            return state.countries;
        },
        topDests(state) {
            return state.topDests;
        }
    },
    actions: {
        async loadCountries(context, { searchWord }) {
            let countries = await countryService.queryCountries(searchWord);
            context.commit({ type: 'setCountries', countries })
        },
        async loadTopDests(context) {
            let topDests = await countryService.queryTopDests();
            context.commit({ type: 'setTopDests', topDests })
        }
    }
}