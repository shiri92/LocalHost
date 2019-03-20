
/* ----- DEPENDENCIES -----*/
import Axios from 'axios';
import utilService from './utilService';
var axios = Axios.create({
    withCredentials: true
}); // save the session cookies


/* ----- CONSTANTS -----*/
const BASE_API = process.env.NODE_ENV !== 'development' ? '' : '//localhost:3003/user';

function query() {
    return axios.get(`${BASE_API}`).then(res => res.data);
}

// function addUser(credentials) {
//     console.log(credentials);
//     return axios.post(`${BASE_URL}/user`, credentials)
//         .then(res => res.data)
// }

// function getById(id) {
//     return axios.get(`${BASE_URL}/user/${id}`)
//         .then(res => res.data)
// }


// function login(credentials) {
//     console.log(credentials);
//     return axios.put(`${BASE_URL}/login`, credentials)
//         .then(res => res.data)
// }


export default {
    query,
}