/* ----- DEPENDENCIES -----*/
import countryService from '../services/countryService.js';

export default {
    state: {
        countries: [],
        currUser: null,
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
            let countries = await countryService.query(searchWord);
            context.commit({ type: 'setCountries', countries })

        },
    }
}