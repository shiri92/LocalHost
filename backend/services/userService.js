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

async function query(currCity) {
    let db = await mongoService.connect();
    return await db.collection(USERS_COLLECTION).find({ "city": currCity }).toArray();
}

async function getById(id) {
    const _id = new ObjectId(id)
    let db = await mongoService.connect();
    let user = await db.collection(USERS_COLLECTION).findOne({ _id });
    let img = await cloudinaryService.loadFromCloudinary(user.imgUrl);
    user.img = img;
    return user;
}

function _createUsers() {
    let users = [];
    users.push(_createUser('nivordsar@gmail.com', '123', 'Niv', 'Saar', 'Male', { day: 24, month: 09, year: 1997 }, 'Bangkok', 'Thailand'));
    users.push(_createUser('shiriron92@gmail.com', '123', 'Shiri', 'Ron', 'Female', { day: 09, month: 11, year: 1992 }, 'Barcelona', 'Spain'));
    users.push(_createUser('taniratz@hotmail.com', '123', 'Yonatan', 'Ratzon', 'Male', { day: 19, month: 02, year: 1993 }, 'Barcelona', 'Spain'));
    return users;

}

function _createUser(email, password, firstName, lastName, gender, birthdate, city, country) {
    return {
        email,
        password,
        firstName,
        lastName,
        gender,
        birthdate,
        isHosting: false,
        isSurfing: false,
        city,
        country,
        language: null,
        "imgUrl": 'https://res.cloudinary.com/dcl4oabi3/image/upload/v1553174118/ons/profiles_sample/profile1.jpg',
    };
}


module.exports = {
    query,
    getById
}