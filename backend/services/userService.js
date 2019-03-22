/* ----- DEPENDENCIES -----*/
const mongoService = require('./mongoService');
const cloudinaryService = require('./cloudinaryService');
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
    let user = await db.collection(USERS_COLLECTION).findOne({ _id });
    let img = await cloudinaryService.loadFromCloudinary(user.info.imgUrl);
    user.img = img;
    return user;
}

function _createUsers() {
    let users = [];
    let info1 = {
        "username": "puki1",
        "password": "123",
        "firstName": "Rachel",
        "lastName": "Green",
        "birthdate": 1553069493,
        "address": { "country": "Thailand", "city": "Bangkok" },
        "language": "english",
        "imgUrl": 'https://res.cloudinary.com/dcl4oabi3/image/upload/v1553174118/ons/profiles_sample/profile1.jpg',
    };
    let info2 = {
        "username": "puki2",
        "password": "123",
        "firstName": "Jessica",
        "lastName": "Ben David",
        "birthdate": 1553069493,
        "address": { "country": "Spain", "city": "Madrid" },
        "language": "english",
        "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553174121/ons/profiles_sample/profile2.jpg",
    };
    let info3 = {
        "username": "puki2",
        "password": "123",
        "firstName": "Monica",
        "lastName": "Geller",
        "birthdate": 1553069493,
        "address": { "country": "Spain", "city": "Madrid" },
        "language": "english",
        "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553174121/ons/profiles_sample/profile3.jpg",
    };
    let info4 = {
        "username": "puki2",
        "password": "123",
        "firstName": "Chandler",
        "lastName": "Bing",
        "birthdate": 1553069493,
        "address": { "country": "France", "city": "Paris" },
        "language": "english",
        "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553174121/ons/profiles_sample/profile4.jpg",
    };
    let info5 = {
        "username": "puki2",
        "password": "123",
        "firstName": "Ross",
        "lastName": "Geller",
        "birthdate": 1553069493,
        "address": { "country": "Argentina", "city": "Buenos Aires" },
        "language": "english",
        "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553174121/ons/profiles_sample/profile5.jpg",
    };
    let info6 = {
        "username": "puki2",
        "password": "123",
        "firstName": "Joey",
        "lastName": "Tribbiani",
        "birthdate": 1553069493,
        "address": { "country": "Argentina", "city": "Buenos Aires" },
        "language": "english",
        "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553174121/ons/profiles_sample/profile6.jpg",
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
    let surf2 = { hosterId: "a2" }
    users.push(_createUser(info1, host1, surf1));
    users.push(_createUser(info2, host2, surf2));
    users.push(_createUser(info3, host1, surf1));
    users.push(_createUser(info4, host2, surf2));
    users.push(_createUser(info5, host1, surf1));
    users.push(_createUser(info6, host1, surf1));
    return users;

    //dirname
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