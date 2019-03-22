/* ----- DEPENDENCIES -----*/
import utilService from './utilService.js';
import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});

/* ----- CONSTANTS -----*/
const BASE_URL = process.env.NODE_ENV !== 'development' ? '' : '//localhost:3003/country'


// var countries = ['Israel', 'Thailand', 'Spain', 'Argentina']

function queryCountries(searchWord) {
    let query = searchWord ? `?cityName=${searchWord}` : '';
    return axios.get(`${BASE_URL}` + query).then(res => res.data);
    // var filtered = countries.filter(country => country.toLowerCase().includes(searchWord.toLowerCase()))
    // return Promise.resolve(filtered);
}

function queryTopDests() {
    return axios.get(`${BASE_URL}/top`)
        .then(res => res.data);
}



export default {
    queryCountries,
    queryTopDests
}