
/* ----- DEPENDENCIES -----*/
const mongoService = require('./mongoService')

import cloudinaryService from './cloudinaryService.js';
const ObjectId = require('mongodb').ObjectId;

/* ----- CONSTANTS -----*/
const USERS_COLLECTION = 'users';


FillDB();

async function FillDB() {
    let db = await mongoService.connect();
    let res = await db.collection(USERS_COLLECTION).find({}).toArray();
    if (res.length === 0) addMany(_createUsers());
}

async function addMany(users) {
    let db = await mongoService.connect();
    let res = await db.collection(USERS_COLLECTION).insert(users);
    res._id = res.insertedId;
    return res;
}

async function query() {
    let db = await mongoService.connect();
    return db.collection(USERS_COLLECTION).find({}).toArray();
}

async function getById(id) {
    const _id = new ObjectId(id)
    let db = await mongoService.connect();
    return db.collection(USERS_COLLECTION).findOne({ _id });
}

function _createUsers() {
    let users = [];
    let info1 = {
        "username": "puki1",
        "password": "123",
        "firstName": "Rachel",
        "lastName": "Green",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        // "imgUrl": cloudinaryService.saveToCloudinary('/img/profile-images/profile1.png', 'profile_1'),
    };
    let info2 = {
        "username": "puki2",
        "password": "123",
        "firstName": "Jessica",
        "lastName": "Ben David",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        // "imgUrl": cloudinaryService.saveToCloudinary('/img/profile-images/profile2.png', 'profile_2'),
    };
    let host1 = null;
    let surf1 = null;
    users.push(_createUser(info1, host1, surf1));
    users.push(_createUser(info2, host1, surf1));
    return users;
}

function _createUser(info, host, surf) {
    return {
        "info": info,
        "host": host,
        "surf": surf,
    }
}

// function checkLogin({ nickname }) {
//     return mongoService.connect()
//         .then(db => db.collection(USERS_COLLECTION).findOne({ nickname }))
// }


// todo  - add user only if nickname is not taken
// function addUser(credentials) {
//     console.log(credentials);
//     let user = {
//         nickname: credentials.nickname,
//         password: credentials.password
//     }
//     return mongoService.connect()
//         .then(db => db.collection(USERS_COLLECTION).insertOne(user))
//         .then(res => {
//             user._id = res.insertedId
//             return user;
//         })
// }

module.exports = {
    query,
    getById
}