var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;

    /* ----- MONGO LOCAL -----*/
    // const url = (!process.env.PORT)? 'mongodb://localhost:27017' : 'mlab url'

    /* ----- MONGO ATLAS -----*/
    const url = 'mongodb+srv://niv:13243545@cluster0-lartw.mongodb.net/test?retryWrites=true';
    const dbName = 'ontDB';
    const client = new MongoClient(url, { useNewUrlParser: true });

    return client.connect()
        .then(client => {
            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', () => {
                console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db(dbName);
            return dbConn;
        })
}

module.exports = {
    connect: connectToMongo
}

