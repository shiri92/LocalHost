/* ----- DEPEND -----*/
const mongoService = require("./mongoService");
const ObjectId = require("mongodb").ObjectId;

/* ----- CONST -----*/
const CITIES_COLLECTION = "cities";

FillDB();

async function FillDB() {
  let db = await mongoService.connect();
  let cities = await db.collection(CITIES_COLLECTION).find({}).toArray();
  if (cities.length === 0) addMany(citiesDB, CITIES_COLLECTION);
}

async function addMany(arr, key) {
  let db = await mongoService.connect();
  let res = await db.collection(key).insert(arr);
  return res;
}

async function query(searchWord) {
  let queryRegex = searchWord
    ? { $regex: searchWord, $options: "-i" }
    : { $regex: "" };
  let db = await mongoService.connect();
  let res = await db
    .collection(CITIES_COLLECTION)
    .find({ $or: [{ name: queryRegex }, { country: queryRegex }] })
    .toArray();
  return res;
}

async function queryTopDests() {
  let db = await mongoService.connect();
  let res = await db
    .collection(CITIES_COLLECTION)
    .find({ $or: [{ isTopDest: true }] })
    .toArray();
  return res;
}

var citiesDB = [
  {
    name: "Bangkok",
    country: "Thailand",
    isTopDest: true,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566355/city-imgs/bangkok.jpg"
  },
  {
    name: "London",
    country: "England",
    isTopDest: true,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566358/city-imgs/london.jpg"
  },
  {
    name: "Paris",
    country: "France",
    isTopDest: true,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566352/city-imgs/paris.jpg"
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    isTopDest: true,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566351/city-imgs/buenos%20aires.jpg"
  },
  {
    name: "Rome",
    country: "Italy",
    isTopDest: true,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566354/city-imgs/rome.jpg"
  },
  {
    name: "Tokyo",
    country: "Japan",
    isTopDest: true,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566355/city-imgs/tokyo.jpg"
  },
  {
    name: "Berlin",
    country: "Germany",
    isTopDest: true,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566353/city-imgs/berlin.jpg"
  },
  {
    name: "Barcelona",
    country: "Spain",
    isTopDest: true,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566351/city-imgs/barcelona.jpg"
  },
  {
    name: "New York",
    country: "NY, USA",
    isTopDest: true,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566360/city-imgs/new%20york.jpg"
  },
  {
    name: "Rio De Janeiro",
    country: "Brazil",
    isTopDest: true,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566358/city-imgs/rio%20de%20janeiro.jpg"
  },
  {
    name: "Madrid",
    country: "Spain",
    isTopDest: false,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553720029/city-imgs/madrid.jpg"
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    isTopDest: false,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553720030/city-imgs/amsterdam.jpg"
  },
  {
    name: "Mexico City",
    country: "Mexico",
    isTopDest: false,
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553720034/city-imgs/mexico%20city.jpg"
  }
  // {
  //   name: "All Top Destinations...",
  //   isTopDest: true,
  //   imgUrl: ""
  // }
];

module.exports = {
  query,
  queryTopDests
};
