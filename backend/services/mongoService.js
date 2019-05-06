
//DEPEND
const KEYS = require('../config_keys');

var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;

    /* ----- MONGO ROBO3T -----*/
    // const url = (!process.env.PORT) ? 'mongodb://localhost:27017' : 'mlab url'

    /* ----- MONGO ATLAS -----*/
    const url = `mongodb+srv://${KEYS.MONGO.USERNAME}:${KEYS.MONGO.PASSWORD}@cluster0-lartw.mongodb.net/test?retryWrites=true`;
    const dbName = 'ontDB';
    const client = new MongoClient(url, { useNewUrlParser: true });

    return client.connect().then(client => {
        console.log('Connected to MongoDB!');
        // If we get disconnected (e.g. db is down)
        client.on('close', () => {
            console.log('Disconnected from MongoDB!');
            dbConn = null;
        });
        dbConn = client.db(dbName);
        return dbConn;
    })
}

async function getCollection(COLLECTION_KEY) {
    let db = await mongoService.connect();
    return db.collection(COLLECTION_KEY)
}

module.exports = {
    connect: connectToMongo,
    collection: getCollection
}