/* ----- DEPEND -----*/
const mongoService = require("./mongoService");
const cloudService = require("./cloudService");
const ObjectId = require("mongodb").ObjectId;

/* ----- CONST -----*/
const USERS_COLLECTION = "usersTEST";
const MALE_IMG =
  "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566744/profile-imgs/default-male.png";
const FEMALE_IMG =
  "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566744/profile-imgs/default-female.png";

module.exports = {
  login,
  query,
  getById,
  add,
  addPendingRequest,
  addAcceptedRequest,
  addAcceptedResponse,
  addReview,
  removeReview,
  updateReview,
  updateUserImg,
  update,
  deletePendingRequest
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
    .find({ "address.city": currCity, "address.country": currCountry })
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
  console.log(credentials);
  let db = await mongoService.connect();
  let res = await db
    .collection(USERS_COLLECTION)
    .insertOne(
      _createUser(
        credentials.email,
        credentials.password,
        credentials.fName,
        credentials.lName,
        credentials.gender,
        credentials.birthdate,
        credentials.address
      )
    );
  credentials._id = res.insertedId;
  return credentials;
}

// ADD Pending Request
async function addPendingRequest(targetId, request) {
  request._id = new ObjectId();
  request.source.id = new ObjectId(request.source.id);

  let db = await mongoService.connect();
  await db
    .collection(USERS_COLLECTION)
    .updateOne(
      { _id: new ObjectId(targetId) },
      { $push: { pendingRequests: request } }
    );
  return request;
}

// ADD Accepted Request
async function addAcceptedRequest(targetId, request) {
  request._id = new ObjectId(request._id);
  request.source.id = new ObjectId(request.source.id);

  let db = await mongoService.connect();
  await db
    .collection(USERS_COLLECTION)
    .updateOne(
      { _id: new ObjectId(targetId) },
      { $push: { acceptedRequests: request } }
    );
}

// ADD Accepted Response
async function addAcceptedResponse(targetId, response) {
  response._id = new ObjectId(response._id);
  response.source.id = new ObjectId(response.source.id);
  let db = await mongoService.connect();
  await db
    .collection(USERS_COLLECTION)
    .updateOne(
      { _id: new ObjectId(targetId) },
      { $push: { acceptedResponses: response } }
    );
  return response;
}

// ADD User Review
async function addReview(review) {
  review._id = ObjectId();
  let db = await mongoService.connect();
  await db
    .collection(USERS_COLLECTION)
    .updateOne(
      { _id: new ObjectId(review.recipient.id) },
      { $push: { references: review } }
    );
  return review;
}

// DELETE Pending Request
async function deletePendingRequest(targetId, requestId) {
  console.log(targetId, requestId, 'hereee');
  let db = await mongoService.connect();
  return await db.collection(USERS_COLLECTION).updateOne(
    { _id: new ObjectId(targetId) },
    { $pull: { pendingRequests: { _id: new ObjectId(requestId) } } }
  );
}

// DELETE User Review
async function removeReview(currUserId, reviewId) {
  let db = await mongoService.connect();
  await db
    .collection(USERS_COLLECTION)
    .updateOne(
      { _id: new ObjectId(currUserId) },
      { $pull: { references: { _id: new ObjectId(reviewId) } } }
    );
}

// UPDATE User Review
async function updateReview(currUserId, review) {
  let db = await mongoService.connect();
  await db.collection(USERS_COLLECTION).updateOne(
    {
      _id: new ObjectId(currUserId),
      references: { $elemMatch: { _id: new ObjectId(review._id) } }
    },
    { $set: { "references.$": review } }
  );
  return review;
}

// UPDATE User
async function update(user) {
  user._id = new ObjectId(user._id);
  let db = await mongoService.connect();
  db.collection(USERS_COLLECTION).updateOne({ _id: user._id }, { $set: user });
  return user;
}

// UPDATE Profile Image Url
async function updateUserImg(imgUrl, userId) {
  let db = await mongoService.connect();
  await db
    .collection(USERS_COLLECTION)
    .updateOne({ _id: new ObjectId(userId) }, { $set: { imgUrl: imgUrl } });
}


// CREATE User
function _createUser(email, password, firstName, lastName, gender, birthdate, address, imgurl) {
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
    imgUrl: imgurl ? imgurl : gender === "Male" ? MALE_IMG : FEMALE_IMG,
    /* ----- Location Details -----*/
    address,
    /* ----- Surfing Details -----*/
    isHosting: false,
    isSurfing: false,
    pendingRequests: [],
    acceptedRequests: [],
    acceptedResponses: [],
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
    references: []
  };
}

// CREATE Users
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
      { city: "Berlin", country: "Germany" }
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
      { city: "Barcelona", country: "Spain" }
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
      { city: "Barcelona", country: "Spain" }
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
      { city: "Barcelona", country: "Spain" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553612551/profile-imgs/jessica-turner/jessica-turner.jpg"
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
      { city: "Barcelona", country: "Spain" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553612506/profile-imgs/riley-county/riley-county.jpg"
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
      { city: "Paris", country: "France" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553717922/profile-imgs/chloe-edwards/chloe-edwards.jpg"
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
      { city: "Rome", country: "Italy" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718495/profile-imgs/rob-nelson/rob-nelson.jpg"
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
      { city: "Paris", country: "France" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718458/profile-imgs/rickey-powell/rickey-powell.jpg"
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
      { city: "Rome", country: "Italy" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718169/profile-imgs/kory-turner/kory-turner.jpg"
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
      { city: "Barcelona", country: "Spain" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718146/profile-imgs/karl-smith/karl-smith.jpg"
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
      { city: "Berlin", country: "Germany" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718438/profile-imgs/penelope-harrison/penelope-harrison.jpg"
    )
  );
  users.push(
    _createUser(
      "nora@gmail.com",
      "1111",
      "Nora",
      "Gray",
      "Female",
      { day: 19, month: 10, year: 1980 },
      { city: "Berlin", country: "Germany" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718390/profile-imgs/nora-gray/nora-gray.jpg"
    )
  );
  users.push(
    _createUser(
      "oscar@gmail.com",
      "1111",
      "Oscar",
      "Brooks",
      "Male",
      { day: 15, month: 07, year: 1985 },
      { city: "Rome", country: "Italy" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718410/profile-imgs/oscar-brooks/oscar-brooks.jpg"
    )
  );
  users.push(
    _createUser(
      "audrey@gmail.com",
      "1111",
      "Audrey",
      "Collins",
      "Female",
      { day: 09, month: 05, year: 1982 },
      { city: "Paris", country: "France" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553717869/profile-imgs/audrey-collins/audrey-collins.jpg"
    )
  );
  users.push(
    _createUser(
      "walton@gmail.com",
      "1111",
      "Walton",
      "Rice",
      "Male",
      { day: 09, month: 09, year: 1975 },
      { city: "Madrid", country: "Spain" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718539/profile-imgs/walton-rice/walton-rice.jpg"
    )
  );
  users.push(
    _createUser(
      "neil@gmail.com",
      "1111",
      "Neil",
      "Hayes",
      "Male",
      { day: 21, month: 09, year: 1988 },
      { city: "Madrid", country: "Spain" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718305/profile-imgs/neil-hayes/neil-hayes.jpg"
    )
  );
  users.push(
    _createUser(
      "larry@gmail.com",
      "1111",
      "Larry",
      "Shaw",
      "Male",
      { day: 23, month: 01, year: 1989 },
      { city: "Madrid", country: "Spain" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718198/profile-imgs/larry-shaw/larry-shaw.jpg"
    )
  );
  users.push(
    _createUser(
      "louis@gmail.com",
      "1111",
      "Louis",
      "Page",
      "Male",
      { day: 30, month: 02, year: 1993 },
      { city: "New York", country: "NY, USA" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718217/profile-imgs/louis-page/louis-page.jpg"
    )
  );
  users.push(
    _createUser(
      "robie@gmail.com",
      "1111",
      "Robie",
      "Lee",
      "Female",
      { day: 25, month: 02, year: 1994 },
      { city: "New York", country: "NY, USA" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718516/profile-imgs/robie-lee/robie-lee.jpg"
    )
  );
  users.push(
    _createUser(
      "claire@gmail.com",
      "1111",
      "Claire",
      "Fisher",
      "Female",
      { day: 27, month: 03, year: 1990 },
      { city: "New York", country: "NY, USA" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718067/profile-imgs/claire-fisher/claire-fisher.jpg"
    )
  );
  users.push(
    _createUser(
      "aurora@gmail.com",
      "1111",
      "Aurora",
      "Reed",
      "Female",
      { day: 16, month: 11, year: 1992 },
      { city: "New York", country: "NY, USA" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553717888/profile-imgs/aurora-reed/aurora-reed.jpg"
    )
  );
  users.push(
    _createUser(
      "anna@gmail.com",
      "1111",
      "Anna",
      "Howard",
      "Female",
      { day: 07, month: 12, year: 1981 },
      { city: "London", country: "England" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553612474/profile-imgs/anna-howard/anna-howard.jpg"
    )
  );
  users.push(
    _createUser(
      "loyd@gmail.com",
      "1111",
      "Loyd",
      "Jackson",
      "Male",
      { day: 13, month: 10, year: 1991 },
      { city: "London", country: "England" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718246/profile-imgs/loyd-jackson/loyd-jackson.png"
    )
  );
  users.push(
    _createUser(
      "lucy@gmail.com",
      "1111",
      "Lucy",
      "Arnolds",
      "Male",
      { day: 17, month: 10, year: 1992 },
      { city: "London", country: "England" },
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553718289/profile-imgs/lucy-arnolds/lucy-arnolds.png"
    )
  );

  return users;
}
