/* ----- DEPEND -----*/
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");


/* ----- CORS -----*/
app.use(cors({
  origin: ["http://localhost:8080"],
  credentials: true /* enable set cookie*/
}));

/* ----- CORS CROSS-ORIGIN -----*/
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
//     return res.status(200).json({});
//   }
//   next();
// })

/* ----- ON PRODUCTION MODE SERVE THE BUNDLE VERSION -----*/
app.use(express.static("public"));

/* ----- USE SESSION -----*/
app.use(session({
  secret: "this is a secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

/* ----- USE PARSERS -----*/
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());




/* ----- USE ROUTES -----*/
app.get("/", (req, res) => res.send("Hello From Server"));

const addUserRoutes = require("./routes/userRoutes");
const addCityRoutes = require("./routes/cityRoutes");
const addCloudRoutes = require("./routes/cloudRoutes");
const addSocketRoutes = require("./routes/socketRoutes");
addUserRoutes(app);
addCityRoutes(app);
addCloudRoutes(app);
addSocketRoutes(io);


const PORT = process.env.PORT || 3003;
http.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
