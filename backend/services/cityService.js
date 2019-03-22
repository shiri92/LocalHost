/* ----- DEPENDENCIES -----*/
const mongoService = require('./mongoService')
const ObjectId = require('mongodb').ObjectId;

/* ----- CONSTANTS -----*/
const CITIES_COLLECTION = 'cities';
const TOP_DESTS_COLLECTION = 'topDests';

FillDB();

async function FillDB() {
    let db = await mongoService.connect();
    let cities = db.collection(CITIES_COLLECTION).find({}).toArray();
    let topDests = db.collection(TOP_DESTS_COLLECTION).find({}).toArray();

    let resCities = await cities;
    if (resCities.length === 0) addMany(citiesDB, CITIES_COLLECTION);

    let resTopDests = await topDests;
    if (resTopDests.length === 0) addMany(topDestsDB, TOP_DESTS_COLLECTION);
}

function addMany(arr, key) {
    return mongoService.connect().then(db => db.collection(key).insert(arr))
}

async function query(searchWord) {
    let queryRegex = { '$regex': searchWord, $options: '-i' };
    let db = await mongoService.connect();
    return db.collection(CITIES_COLLECTION).find({ $or: [{ "name": queryRegex }, { "country": queryRegex }] }).toArray();
}

async function queryTopDests() {
    let db = await mongoService.connect();
    return db.collection('topDests').find({}).toArray();
}

var citiesDB = [
    {
        "name": "Bangkok",
        "country": "Thailand",
        "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553173600/ons/cities/bangkok.jpg"
    },
    {
        "name": "Madrid",
        "country": "Spain",
        "imgUrl": "",
    },
    {
        "name": "Barcelona",
        "country": "Spain",
        "imgUrl": "",
    }
]


var topDestsDB = [{
    "name": "Bangkok",
    "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553173600/ons/cities/bangkok.jpg"
},
{
    "name": "London",
    "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553173600/ons/cities/london.jpg"
},
{
    "name": "Paris",
    "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553173592/ons/cities/paris.jpg"
},
{
    "name": "Buenos-Aires",
    "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553173589/ons/cities/buenos-aires.jpg"
},
{
    "name": "Rome",
    "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553173596/ons/cities/rome.jpg"
},
{
    "name": "Tokyo",
    "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553173596/ons/cities/tokyo.jpg"
},
{
    "name": "Berlin",
    "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553173596/ons/cities/berlin.jpg"
},
{
    "name": "Barcelona",
    "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553173587/ons/cities/barcelona.jpg"
},
{
    "name": "New-York",
    "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553173606/ons/cities/new-york.jpg"
},
{
    "name": "Rio",
    "imgUrl": "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553173600/ons/cities/rio.jpg"
},
{
    "name": "All Top Destinations...",
    "imgUrl": ""
},
]


module.exports = {
    query,
    queryTopDests
}