/* ----- DEPENDENCIES -----*/
const mongoService = require('./mongoService')
const ObjectId = require('mongodb').ObjectId;

/* ----- CONSTANTS -----*/
const COUNTRIES_COLLECTION = 'countries';

FillDB();

async function FillDB() {
    let db = await mongoService.connect();
    let countries = db.collection(COUNTRIES_COLLECTION).find({}).toArray();

    let resCountries = await countries;
    if (resCountries.length === 0) addMany(countriesDB, COUNTRIES_COLLECTION);
}

function addMany(arr, key) {
    return mongoService.connect().then(db => db.collection(key).insert(arr))
    // .then(res => {
    //     res._id = res.insertedId;
    //     return res;
    // })
}


var countriesDB = [
    { "name": "Thailand", },
    { "name": "England" },
    { "name": "Spain" }
]





module.exports = {
    // query,
    // queryTopDests
}