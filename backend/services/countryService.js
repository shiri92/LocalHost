/* ----- DEPENDENCIES -----*/
const mongoService = require('./mongoService')
const ObjectId = require('mongodb').ObjectId;

/* ----- CONSTANTS -----*/
const COUNTRIES_COLLECTION = 'countries';

FillDB();

async function FillDB() {
    let db = await mongoService.connect();
    let res = await db.collection(COUNTRIES_COLLECTION).find({}).toArray();
    if (res.length === 0) addMany(countriesDB);
}

function addMany(countries) {
    return mongoService.connect()
        .then(db => db.collection(COUNTRIES_COLLECTION).insert(countries))
        .then(res => {
            res._id = res.insertedId;
            return res;
        })
}

function query(searchWord) {
    let queryToMongo = {}
    if (searchWord.name) {
        queryToMongo.name = { '$regex': searchWord.name.toLowerCase() }
    }
    return mongoService.connect()
        .then(db => db.collection(COUNTRIES_COLLECTION).find(queryToMongo).toArray())
}


var countriesDB = [{
        "country": "Thailand",
        "cities": [{
            "name": "Bangkok",
            "info": { "imgUrl": "", "users": ["5c927ccc152b366470070c0f", "5c927ccc152b366470070c0c"] }
        }],
    },
    {
        "country": "England",
        "cities": [{
            "name": "London",
            "info": { "imgUrl": "", "users": ["5c927ccc152b366470070c10", "5c927ccc152b366470070c12"] }
        }],
    }, {
        "country": "Spain",
        "cities": [{
                "name": "Madrid",
                "info": { "imgUrl": "", "users": ["5c927ccc152b366470070c0c", "5c927ccc152b366470070c15"] }
            },
            {
                "name": "Barcelona",
                "info": { "imgUrl": "", "users": ["5c927ccc152b366470070c11", "5c927ccc152b366470070c0b"] }
            }
        ],
    },
]


module.exports = {
    query
}