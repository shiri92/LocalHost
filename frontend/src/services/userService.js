
/* ----- DEPENDENCIES -----*/
import Axios from 'axios';
import utilService from './utilService';
var axios = Axios.create({
    withCredentials: true
}); // save the session cookies





/* ----- CONSTANTS -----*/
const BASE_URL = process.env.NODE_ENV !== 'development' ? '' : '//localhost:3003/user';

// function query() {
//     return axios.get(`${BASE_URL}/user`)
//         .then(res => res.data)
// }

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



var users = [];
const USERS_KEY = 'USERS';
query();

function query() {
    if (utilService.loadFromStorage(USERS_KEY))
        users = utilService.loadFromStorage(USERS_KEY);
    else
        users = _createUsers();
    utilService.saveToStorage(USERS_KEY, users);
    return Promise.resolve(users);
}

function _createUsers() {
    let users = [];
    let info1 = {
        "_id": "a1",
        "username": "puki1",
        "password": "123",
        "firstName": "puki",
        "lastName": "ben tsruya",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "img": '',
    };
    let info2 = {
        "_id": "a2",
        "username": "puki2",
        "password": "123",
        "firstName": "puki",
        "lastName": "ben david",
        "birthdate": 1553069493,
        "address": {},
        "language": "english"
    };
    let host1 = {
        "date": {
            "from": 1553069493,
            "to": 1553069493
        },
        "capacity": 3,
        "description": "have 3 couches",
        "guests": [
            {
                "guestId": "a2"
            }
        ]
    };
    let host2 = null;
    let surf1 = null;
    let surf2 = { "hosterId": "a2" }
    users.push(_createUser(info1, host1, surf1));
    users.push(_createUser(info2, host2, surf2));
    return users;
}

function _createUser(info, host, surf) {
    return {
        "info": info,
        "host": host,
        "surf": surf,
    }
}

export default {
    query,
}