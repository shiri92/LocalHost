/* ----- DEPENDENCIES -----*/
import countryService from '../services/countryService.js';

export default {
    state: {
        countries: [],
    },
    mutations: {
        setCountries(state, { countries }) {
            state.countries = countries;
        },
    },
    getters: {
        countries(state) {
            return state.countries;
        },
    },
    actions: {
        async loadCountries(context, { searchWord }) {
            let countries = await countryService.queryCountries(searchWord);
            context.commit({ type: 'setCountries', countries })
        },
    }
}