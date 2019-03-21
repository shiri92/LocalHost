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
        "imgUrl": '/img/profile-images/profile1.png',
    };
    let info2 = {
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
        "guests": [{
            "guestId": "a2"
        }]
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