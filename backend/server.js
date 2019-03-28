/* ----- DEPEND -----*/
const cors = require('cors');
const express = require('express');
const app = express();

// for socket
// const http = require('http').Server(express);
// const io = require('socket.io')(http);
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

/* ----- ROUTES -----*/
const addUserRoutes = require('./routes/userRoutes');
const addCityRoutes = require('./routes/cityRoutes');
const addCountryRoutes = require('./routes/countryRoutes');
const addCloudRoutes = require('./routes/cloudRoutes');


/* ----- SERVER -----*/

/* ----- ENABLE APP ON LOCALHOST SERVER -----*/
app.use(cors({ origin: ['http://localhost:8080'], credentials: true /* enable set cookie*/ }));

/* ----- ENABLE APP ON WEBHOST SERVER -----*/
app.use(express.static('public'));

app.use(session({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(fileUpload());

addUserRoutes(app)
addCityRoutes(app);
addCountryRoutes(app)
addCloudRoutes(app);


app.get('/', (req, res) => res.send('Hello From Server'))

/* ----- SOCKET -----*/
// io.on('connect', function (socket) {
//     console.log('a user connected!');
// });

// io.on('connection', function (socket) {
//     console.log('a user connected!');
//     // connectedSockets.push(socket);
//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//     });

// socket.on('disconnect', function () {
//     console.log('user disconnected');
//     connectedSockets = connectedSockets.filter(s => s.nickName !== socket.nickName)
// });

// });

/* ----- SERVER PORT -----*/
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))