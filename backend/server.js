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

const addUserRoutes = require("./routes/userRoutes");
const addCityRoutes = require("./routes/cityRoutes");
const addCloudRoutes = require("./routes/cloudRoutes");
const addSocketRoutes = require("./routes/socketRoutes");

/* ----- ENABLE APP ON LOCAL MACHINE SERVER -----*/
app.use(cors({
  origin: ["http://localhost:8080"],
  credentials: true /* enable set cookie*/
}));

/* ----- ENABLE APP ON WEBHOST SERVER (HEROKU) -----*/
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
addUserRoutes(app);
addCityRoutes(app);
addCloudRoutes(app);
addSocketRoutes(io);

/* ----- DEFAULT ROUTE RESPONSE -----*/
app.get("/", (req, res) => res.send("Hello From Server"));

/* ----- SERVER PORT -----*/
const PORT = process.env.PORT || 3003;
http.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
