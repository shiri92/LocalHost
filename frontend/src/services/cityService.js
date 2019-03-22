/* ----- DEPENDENCIES -----*/
import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });

/* ----- CONSTANTS -----*/
const BASE_URL = process.env.NODE_ENV !== 'development' ? '' : '//localhost:3003/city'

async function queryCities(city) {
    let query = city ? `?city=${city}` : '';
    let res = await axios.get(`${BASE_URL}` + query);
    return res.data;
}

async function queryTopDests() {
    let { data } = await axios.get(`${BASE_URL}/top`);
    return data;
}


export default {
    queryCities,
    queryTopDests
}