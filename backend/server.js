/* ----- DEPEND -----*/
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

/* ----- ROUTES -----*/
const addUserRoutes = require('./routes/userRoutes');
const addCityRoutes = require('./routes/cityRoutes');
const addCountryRoutes = require('./routes/countryRoutes');
const addCloudRoutes = require('./routes/cloudRoutes');
const addSocketRoutes = require('./routes/socketRoutes');


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
addSocketRoutes(io);


app.get('/', (req, res) => res.send('Hello From Server'))

/* ----- SOCKET -----*/



/* ----- SERVER PORT -----*/
const PORT = process.env.PORT || 3003;
http.listen(PORT, () => console.log(`App listening on port ${PORT}!`))