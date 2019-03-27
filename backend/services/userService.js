/* ----- DEPEND -----*/
const mongoService = require("./mongoService");
const cloudService = require("./cloudService");
const ObjectId = require("mongodb").ObjectId;

/* ----- CONST -----*/
const USERS_COLLECTION = "users";
const MALE_IMG =
  "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553430377/male-profile.png";
const FEMALE_IMG =
  "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553430382/female-profile.png";

module.exports = {
  login,
  query, getById,
  add, addRequest, addReview,
  updateUserImg,
  bookGuest, bookHost,
  // update
};

FillDB();

// Fill Mongo Data Base (will be on mongo service)
async function FillDB() {
  let db = await mongoService.connect();
  let res = await db
    .collection(USERS_COLLECTION)
    .find({})
    .toArray();
  if (res.length === 0) addMany(_createUsers());
}
// Fill Mongo Data Base (will be on mongo service)
async function addMany(users) {
  let db = await mongoService.connect();
  let res = await db.collection(USERS_COLLECTION).insert(users);
  res._id = res.insertedId;
  return res;
}

// Login User
async function login(credentials) {
  let db = await mongoService.connect();
  let res = await db.collection(USERS_COLLECTION).findOne(credentials);
  return res;
}

// GET Users By Address
async function query(currCountry, currCity) {
  let db = await mongoService.connect();
  let res = await db
    .collection(USERS_COLLECTION)
    .find({ country: currCountry, city: currCity })
    .toArray();
  return res;
}

// GET User By Id
async function getById(id) {
  const _id = new ObjectId(id);
  let db = await mongoService.connect();
  let user = await db.collection(USERS_COLLECTION).findOne({ _id });
  let img = await cloudService.loadImg(user.imgUrl);
  user.img = img;
  return user;
}

// ADD User
async function add(credentials) {
  let db = await mongoService.connect();
  let res = await db.collection(USERS_COLLECTION).insertOne(credentials);
  credentials._id = res.insertedId;
  return credentials;
}

// ADD User Request
async function addRequest(request) {
  request._id = new ObjectId();
  let db = await mongoService.connect();
  let res = await db.collection(USERS_COLLECTION).updateOne
    (
      { _id: new ObjectId(request.recipient.id) },
      { $push: { requests: request } }
    );
  // db.collection(tripsCollection).findOneAndUpdate
  // console.log(res);
  // res._id = res.insertedId;
  // request._id = insertedId (id with no Object)
}

// ADD User Review
async function addReview(review) {
  let db = await mongoService.connect();
  db.collection(USERS_COLLECTION).updateOne
    (
      { _id: new ObjectId(review.givenToId) },
      { $push: { references: review } }
    );
}

// UPDATE User
// async function update(credentials) {
// let db = await mongoService.connect();
// db.collection(USERS_COLLECTION).updateOne({ _id: toy._id }, { $set: toy });
// }

// UPDATE Profile Image Url
async function updateUserImg(imgUrl, userId) {
  let db = await mongoService.connect();
  db.collection(USERS_COLLECTION).updateOne(
    { _id: new ObjectId(userId) },
    { $set: { imgUrl: imgUrl } }
  );
}

// (UPDATE HOST USER) Book Guest
async function bookGuest(hostId, newGuest) {
  let db = await mongoService.connect();
  db.collection(USERS_COLLECTION).updateOne
    (
      { _id: new ObjectId(hostId) },
      { $push: { guests: newGuest } }
    );
}

// (UPDATE GUEST USER) Book Host
async function bookHost(guestId, host) {
  let db = await mongoService.connect();
  db.collection(USERS_COLLECTION).updateOne
    (
      { _id: new ObjectId(guestId) },
      { $push: { hosts: host } }
    );
}

// Create User
function _createUser(
  email,
  password,
  firstName,
  lastName,
  gender,
  birthdate,
  city,
  country
) {
  return {
    /* ----- Personal Details -----*/
    email,
    password,
    firstName,
    lastName,
    gender,
    birthdate,
    languages: [],
    occupation: "",
    education: "",
    imgUrl: gender === "Male" ? MALE_IMG : FEMALE_IMG,
    /* ----- Location Details -----*/
    city,
    country,
    /* ----- Surfing Details -----*/
    isHosting: false,
    isSurfing: false,
    guests: [],
    hosts: [],
    requests: [],
    messages: [],
    placeDetails: {
      guestCapacity: 0,
      guestGenderPref: "Any",
      isKidFriendly: false,
      isPetFriendly: false,
      isSmokingAllowed: false,
      isDisabledAccessible: false,
      pets: 0,
      children: 0
    },
    /* ----- Social Details -----*/
    pictures: [],
    references: [],
  };
}

// Generate Users Sample
function _createUsers() {
  let users = [];
  users.push(
    _createUser(
      "nivordsar@gmail.com",
      "123",
      "Niv",
      "Saar",
      "Male",
      { day: 24, month: 09, year: 1997 },
      "Bangkok",
      "Thailand"
    )
  );
  users.push(
    _createUser(
      "shiriron92@gmail.com",
      "123",
      "Shiri",
      "Ron",
      "Female",
      { day: 09, month: 11, year: 1992 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "taniratz@hotmail.com",
      "123",
      "Yehonatan",
      "Ratzon",
      "Male",
      { day: 19, month: 02, year: 1993 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "jessica@gmail.com",
      "1111",
      "Jessica",
      "Turner",
      "Female",
      { day: 08, month: 09, year: 1990 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "riley@gmail.com",
      "1111",
      "Riley",
      "County",
      "Female",
      { day: 30, month: 10, year: 1992 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "chloe@gmail.com",
      "1111",
      "Chloe",
      "Edwards",
      "Female",
      { day: 11, month: 07, year: 1994 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "rob@gmail.com",
      "1111",
      "Rob",
      "Nelson",
      "Male",
      { day: 14, month: 06, year: 1988 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "rickey@gmail.com",
      "1111",
      "Rickey",
      "Powell",
      "Male",
      { day: 05, month: 02, year: 1980 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "kory@gmail.com",
      "1111",
      "Kory",
      "Turner",
      "Male",
      { day: 08, month: 09, year: 1985 },
      "Bangkok",
      "Thailand"
    )
  );
  users.push(
    _createUser(
      "karl@gmail.com",
      "1111",
      "Karl",
      "Smith",
      "Male",
      { day: 12, month: 09, year: 1989 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "penelope@gmail.com",
      "1111",
      "Penelope",
      "Harrison",
      "Female",
      { day: 18, month: 09, year: 1980 },
      "Bangkok",
      "Thailand"
    )
  );

  return users;
}
