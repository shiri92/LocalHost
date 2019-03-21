/* ----- DEPENDENCIES -----*/
import utilService from './utilService.js';
import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});

/* ----- CONSTANTS -----*/
const BASE_URL = process.env.NODE_ENV !== 'development' ? '' : '//localhost:3003/country'


var countries = ['Israel', 'Thailand', 'Spain', 'Argentina']

function query(searchWord) {
    let query = searchWord ? `?name=${searchWord}` : '';
    return axios.get(`${BASE_URL}` + query).then(res => res.data);
    // var filtered = countries.filter(country => country.toLowerCase().includes(searchWord.toLowerCase()))
    // return Promise.resolve(filtered);
}



export default {
    query,
}