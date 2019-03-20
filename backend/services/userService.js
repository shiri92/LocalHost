
/* ----- DEPENDENCIES -----*/
const mongoService = require('./mongoService')
const ObjectId = require('mongodb').ObjectId;

/* ----- CONSTANTS -----*/
const USERS_COLLECTION = 'users';

FillDB();

async function FillDB() {
    let db = await mongoService.connect();
    let res = await db.collection(USERS_COLLECTION).find({}).toArray();
    if (res.length === 0) addMany(_createUsers());
}

function addMany(users) {
    return mongoService.connect()
        .then(db => db.collection(USERS_COLLECTION).insert(users))
        .then(res => {
            res._id = res.insertedId;
            return res;
        })
}

function query() {
    return mongoService.connect().then(db => db.collection(USERS_COLLECTION).find({}).toArray())
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

// function checkLogin({ nickname }) {
//     return mongoService.connect()
//         .then(db => db.collection(USERS_COLLECTION).findOne({ nickname }))
// }


// function getById(id) {
//     const _id = new ObjectId(id)
//     return mongoService.connect()
//         .then(db => db.collection(USERS_COLLECTION).findOne({ _id }))
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
}