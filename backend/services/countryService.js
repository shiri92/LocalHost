/* ----- DEPENDENCIES -----*/
const mongoService = require('./mongoService')
const ObjectId = require('mongodb').ObjectId;

/* ----- CONSTANTS -----*/
const COUNTRIES_COLLECTION = 'countries';
const TOP_DESTS_COLLECTION = 'topDests';

FillDB();

async function FillDB() {
    let db = await mongoService.connect();
    let countries = db.collection(COUNTRIES_COLLECTION).find({}).toArray();
    let topDests = db.collection(TOP_DESTS_COLLECTION).find({}).toArray();

    let resCountries = await countries;
    if (resCountries.length === 0) addMany(countriesDB, COUNTRIES_COLLECTION);

    let resTopDests = await topDests;
    if (resCountries.length === 0) addMany(topDestsDB, TOP_DESTS_COLLECTION);
}

function addMany(arr, key) {
    return mongoService.connect()
        .then(db => db.collection(key).insert(arr))
        // .then(res => {
        //     res._id = res.insertedId;
        //     return res;
        // })
}

// function query(searchWord) {
//     let queryToMongo = {}
//         // if (searchWord) {
//         //     // let cityQuery = {}
//         //     // cityQuery.name = { '$regex': searchWord.toLowerCase() }
//         //     // queryToMongo.cities = queryToMongo.cities.find(cityQuery)
//         //     // console.log(queryToMongo)
//         //     return db.countries.aggregate([{
//         //         $project: {
//         //             cities: {
//         //                 $filter: {
//         //                     input: "$cities",
//         //                     as: "city",
//         //                     cond: { $gte: ["$$city.name", { '$regex': searchWord.toLowerCase() }] }
//         //                 }
//         //             }
//         //         }
//         //     }])
//         // }
//     return mongoService.connect()
//         .then(db => {
//             if (searchWord) {
//                 return db.collection(COUNTRIES_COLLECTION).aggregate([{
//                     "$lookup": {
//                         "from": "$cities",
//                         "foreignField": "name",
//                         "localField": searchWord,
//                         "as": searchWord
//                     }
//                 }])

//                 //     $where: function() {
//                 //         console.log('here')
//                 //         return this.cities.filter(city => {
//                 //             console.log('here')
//                 //             console.log(city.name)
//                 //             city.name.includes(searchWord.toLowerCase())
//                 //         });
//                 //     }
//                 // }).toArray()

//             } else {
//                 return db.collection(COUNTRIES_COLLECTION).find(queryToMongo).toArray()
//             }
//         })
// }

async function query(searchWord) {
    try {
        const db = await mongoService.connect()
        const cities = await db.collection(COUNTRIES_COLLECTION).aggregate([
            { $match: { '$regex': searchWord.toLowerCase() } },
            {
                $lookup: {
                    "from": 'cities',
                    "foreignField": "name",
                    "localField": "searchWord",
                    "as": "filteredCities",
                }
            },
            {
                $project: {
                    filteredCities: {
                        name: 0,
                        info: 0,
                    }
                }
            },
            {
                $unwind: '$filteredCities'
            },
        ]);
        return cities[0];
    } catch {
        return null;
    }

}

// async function getById(tripId) {
//     const _id = new ObjectId(tripId);
//     try {
//         const db = await mongoService.connect()
//         const trip = await db.collection(tripsCollection).aggregate([{
//                 $match: { _id }
//             },
//             {
//                 $lookup: {
//                     "from": usersCollection,
//                     "foreignField": "_id",
//                     "localField": "members",
//                     "as": "members",
//                 }
//             },
//             {
//                 $project: {
//                     members: {
//                         password: 0,
//                         email: 0,
//                         tripPreferences: 0,
//                         interestedIn: 0,
//                         proposals: 0,
//                         tripPrefs: 0,
//                         birthdate: 0,
//                     }
//                 }
//             },
//             {
//                 $lookup: {
//                     from: usersCollection,
//                     localField: 'userId',
//                     foreignField: '_id',
//                     as: 'user'

//                 }
//             },
//             {
//                 $project: {
//                     user: {
//                         _id: 0,
//                         password: 0,
//                         email: 0,
//                         tripPreferences: 0,
//                         interestedIn: 0,
//                         proposals: 0,
//                         tripPrefs: 0,
//                         birthdate: 0,
//                     },
//                 },
//             },
//             {
//                 $unwind: '$user'
//             },
//         ]).toArray()
//         return trip[0];
//     } catch {
//         return null;
//     }
// }


function queryTopDests() {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('topDests');
            return collection.find({}).toArray()
        })
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