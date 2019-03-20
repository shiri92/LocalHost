
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
    if (utilService.loadFromStorage(USERS_KEY)) users = utilService.loadFromStorage(USERS_KEY);
    else users = _createUsers();
    utilService.saveToStorage(USERS_KEY, users);
    return Promise.resolve(users);
}

function add(user) {
    users.push(user);
    utilService.saveToStorage(USERS_KEY, users);
}

function remove() {

}

function update() {

}

function getById() {

}

function _createUsers() {
    let users = [];
    let info1 = {
        "_id": "a1",
        "username": "puki1",
        "password": "123",
        "firstName": "Rachel",
        "lastName": "Green",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": '/img/profile-images/profile1.png',
    };
    let info2 = {
        "_id": "a2",
        "username": "puki2",
        "password": "123",
        "firstName": "Jessica",
        "lastName": "Ben David",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": '/img/profile-images/profile2.png'
    };
    let info3 = {
        "_id": "a3",
        "username": "puki2",
        "password": "123",
        "firstName": "Monica",
        "lastName": "Geller",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": '/img/profile-images/profile3.png'
    };
    let info4 = {
        "_id": "a4",
        "username": "puki2",
        "password": "123",
        "firstName": "Chandler",
        "lastName": "Bing",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": '/img/profile-images/profile4.png'
    };
    let info5 = {
        "_id": "a5",
        "username": "puki2",
        "password": "123",
        "firstName": "Ross",
        "lastName": "Geller",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": '/img/profile-images/profile5.png'
    };
    let info6 = {
        "_id": "a6",
        "username": "puki2",
        "password": "123",
        "firstName": "Joey",
        "lastName": "Tribbiani",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": '/img/profile-images/profile6.png'
    };
    let info7 = {
        "_id": "a7",
        "username": "puki2",
        "password": "123",
        "firstName": "Rachel",
        "lastName": "Green",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": '/img/profile-images/profile7.png'
    };
    let info8 = {
        "_id": "a8",
        "username": "puki2",
        "password": "123",
        "firstName": "Chandler",
        "lastName": "Bing",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": '/img/profile-images/profile8.png'
    };
    let info9 = {
        "_id": "a9",
        "username": "puki2",
        "password": "123",
        "firstName": "Ross",
        "lastName": "Geller",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": '/img/profile-images/profile9.png'
    };
    let info10 = {
        "_id": "a10",
        "username": "puki2",
        "password": "123",
        "firstName": "Monica",
        "lastName": "Geller",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": '/img/profile-images/profile10.png'
    };
    let info11 = {
        "_id": "a11",
        "username": "puki2",
        "password": "123",
        "firstName": "Phoebe",
        "lastName": "Buffay",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": '/img/profile-images/profile11.png'
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
    users.push(_createUser(info3, host1, surf1));
    users.push(_createUser(info4, host2, surf2));
    users.push(_createUser(info5, host1, surf1));
    users.push(_createUser(info6, host1, surf1));
    users.push(_createUser(info7, host1, surf1));
    users.push(_createUser(info8, host1, surf1));
    users.push(_createUser(info9, host1, surf1));
    users.push(_createUser(info10, host1, surf1));
    users.push(_createUser(info11, host1, surf1));
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
    getById,
}