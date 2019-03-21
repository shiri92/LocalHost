
/* ----- DEPENDENCIES -----*/
const mongoService = require('./mongoService');
const cloudinaryService = require('./cloudinaryService');
const ObjectId = require('mongodb').ObjectId;

/* ----- CONSTANTS -----*/
const USERS_COLLECTION = 'users_test';



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
    let host = null;
    let surf = null;
    let info1 = {
        "username": "puki1",
        "password": "123",
        "firstName": "Rachel",
        "lastName": "Green",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": 'https://res.cloudinary.com/dcl4oabi3/image/upload/v1553174118/ons/profiles_sample/profile2.jpg',
    };
    let info2 = {
        "username": "puki2",
        "password": "123",
        "firstName": "Jessica",
        "lastName": "Ben David",
        "birthdate": 1553069493,
        "address": {},
        "language": "english",
        "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553174121/ons/profiles_sample/profile6.jpg",
    };
    users.push(_createUser(info1, host, surf));
    users.push(_createUser(info2, host, surf));
    return users;

    // console.log(__dirname + '../../frontend/public/img/profile-images/profile1.png')
    // return cloudinaryService.saveToCloudinary('https://res.cloudinary.com/dcl4oabi3/image/upload/v1553174118/ons/profiles_sample/profile2.jpg', 'profile_1')
    //     .then(result => {
    //         info1.imgUrl = result.url;
    //         users.push(_createUser(info1, host, surf));
    //         return users;
    //     })
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