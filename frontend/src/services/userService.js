
/* ----- DEPENDENCIES -----*/
import Axios from 'axios';
import utilService from './utilService';
var axios = Axios.create({
    withCredentials: true
}); // save the session cookies


/* ----- CONSTANTS -----*/
const BASE_API = process.env.NODE_ENV !== 'development' ? '' : '//localhost:3003/user';

async function query() {
    let res = await axios.get(`${BASE_API}`);
    return res.data;
}

async function getById(id) {
    let res = await axios.get(`${BASE_API}/${id}`);
    return res.data;
}

// function addUser(credentials) {
//     console.log(credentials);
//     return axios.post(`${BASE_URL}/user`, credentials)
//         .then(res => res.data)
// }




// function login(credentials) {
//     console.log(credentials);
//     return axios.put(`${BASE_URL}/login`, credentials)
//         .then(res => res.data)
// }


export default {
    query,
    getById,
}