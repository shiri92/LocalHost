/* ----- DEPEND -----*/
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const app = express();

/* ----- ROUTES -----*/
const addUserRoutes = require('./routes/userRoutes');
const addCityRoutes = require('./routes/cityRoutes');
const addCountryRoutes = require('./routes/countryRoutes');
const addCloudRoutes = require('./routes/cloudRoutes');


/* ----- SERVER -----*/

/* ----- SERVER PORT -----*/
const PORT = process.env.PORT || 3003;

/* ----- ENABLE APP ON LOCALHOST SERVER -----*/
app.use(cors({ origin: ['http://localhost:8080'], credentials: true /* enable set cookie*/ }));

/* ----- ENABLE APP ON WEBHOST SERVER -----*/
app.use(express.static('public'));

app.use(bodyParser.json())
app.use(cookieParser());
app.use(fileUpload());
app.use(session({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.get('/', (req, res) => res.send('Hello From Server'))

addUserRoutes(app)
addCityRoutes(app);
addCountryRoutes(app)
addCloudRoutes(app);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})