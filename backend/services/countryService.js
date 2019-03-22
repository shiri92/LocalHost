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
    // return mongoService.connect()
    //     .then(db => {
    //         const collection = db.collection('topDests');
    //         return collection.find({}).toArray()
    //     })
    return Promise.resolve(topDestDB);
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


var topDestDB = [{
        "name": "Bangkok",
        "imgUrl": "https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173600/b25zL2NpdGllcy9iYW5na29r/grid"
    },
    {
        "name": "London",
        "imgUrl": "https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173600/b25zL2NpdGllcy9sb25kb24=/grid"
    },
    {
        "name": "Paris",
        "imgUrl": "https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173592/b25zL2NpdGllcy9wYXJpcw==/grid"
    },
    {
        "name": "Buenos-Aires",
        "imgUrl": "https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173589/b25zL2NpdGllcy9idWVub3MtYWlyZXM=/grid"
    },
    {
        "name": "Rome",
        "imgUrl": "https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173596/b25zL2NpdGllcy9yb21l/grid"
    },
    {
        "name": "Tokyo",
        "imgUrl": "https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173596/b25zL2NpdGllcy90b2t5bw==/grid"
    },
    {
        "name": "Berlin",
        "imgUrl": "https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173596/b25zL2NpdGllcy9iZXJsaW4=/grid"
    },
    {
        "name": "Barcelona",
        "imgUrl": "https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173587/b25zL2NpdGllcy9iYXJjZWxvbmE=/grid"
    },
    {
        "name": "New-York",
        "imgUrl": "https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173606/b25zL2NpdGllcy9uZXcteW9yaw==/grid"
    },
    {
        "name": "Rio",
        "imgUrl": "https://res-console.cloudinary.com/dcl4oabi3/thumbnails/v1/image/upload/v1553173600/b25zL2NpdGllcy9yaW8=/grid"
    },
    {
        "name": "Coming-Soon...",
        "imgUrl": ""
    },
]


module.exports = {
    query,
    queryTopDests
}