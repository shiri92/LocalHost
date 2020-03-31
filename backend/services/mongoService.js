
//DEPEND
const mongodb = require('mongodb');

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;


var dbConn = null;

function connect() {
    return new Promise(resolve => {
        if (dbConn) resolve(dbConn);
        const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0-lartw.mongodb.net/test?retryWrites=true`;
        // const url = `mongodb+srv://${KEYS.MONGO.USERNAME}:${KEYS.MONGO.PASSWORD}@cluster0-lartw.mongodb.net/test?retryWrites=true`;
        const client = new mongodb.MongoClient(url, { useNewUrlParser: true })

        client.connect().then(client => {
            console.log('Connected to MongoDB!');
            // If we get disconnected (e.g. db is down)

            client.on('close', () => {
                console.log('Disconnected from MongoDB!');
                dbConn = null;
            });
            dbConn = client.db('localhostDB');
            resolve(dbConn);
        })

    })
}

// function connectToMongo() {
//     // Reuse existing connection if exist
//     if (dbConn) return Promise.resolve(dbConn);
//     const MongoClient = require('mongodb').MongoClient;

//     /* ----- MONGO ROBO3T -----*/
//     // const url = (!process.env.PORT) ? 'mongodb://localhost:27017' : 'mlab url'

//     /* ----- MONGO ATLAS -----*/
//     const url = `mongodb+srv://${KEYS.MONGO.USERNAME}:${KEYS.MONGO.PASSWORD}@cluster0-lartw.mongodb.net/test?retryWrites=true`;
//     const client = new MongoClient(url, { useNewUrlParser: true });

//     return client.connect().then(client => {
//         console.log('Connected to MongoDB!');
//         // If we get disconnected (e.g. db is down)
//         client.on('close', () => {
//             console.log('Disconnected from MongoDB!');
//             dbConn = null;
//         });
//         dbConn = client.db('localhostDB');
//         return dbConn;
//     })
// }



module.exports = {
    connect,
}