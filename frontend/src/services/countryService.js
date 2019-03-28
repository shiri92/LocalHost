/* ----- DEPENDENCIES -----*/
import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });

/* ----- CONSTANTS -----*/
const BASE_URL = process.env.NODE_ENV !== 'development' ? '/country' : '//localhost:3003/country'


function queryCountries(searchWord) {
    let query = searchWord ? `?cityName=${searchWord}` : '';
    return axios.get(`${BASE_URL}` + query).then(res => res.data);
    // var filtered = countries.filter(country => country.toLowerCase().includes(searchWord.toLowerCase()))
    // return Promise.resolve(filtered);
}

function queryTopDests() {
    return axios.get(`${BASE_URL}/top`).then(res => res.data);
}



export default {
    queryCountries,
    queryTopDests
}