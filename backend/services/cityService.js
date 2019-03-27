/* ----- DEPEND -----*/
const mongoService = require("./mongoService");
const ObjectId = require("mongodb").ObjectId;

/* ----- CONST -----*/
const CITIES_COLLECTION = "cities";
const TOP_DESTS_COLLECTION = "topDests";

FillDB();

async function FillDB() {
  let db = await mongoService.connect();
  let cities = await db
    .collection(CITIES_COLLECTION)
    .find({})
    .toArray();
  let topDests = await db
    .collection(TOP_DESTS_COLLECTION)
    .find({})
    .toArray();
  if (cities.length === 0) addMany(citiesDB, CITIES_COLLECTION);
  if (topDests.length === 0) addMany(topDestsDB, TOP_DESTS_COLLECTION);
}

async function addMany(arr, key) {
  let db = await mongoService.connect();
  let res = await db.collection(key).insert(arr);
  return res;
}

async function query(searchWord) {
  let queryRegex = { $regex: searchWord, $options: "-i" };
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
    .collection("topDests")
    .find({})
    .toArray();
  return res;
}

var citiesDB = [
  {
    name: "Bangkok",
    country: "Thailand",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566355/city-imgs/bangkok.jpg"
  },
  {
    name: "London",
    country: "England",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566358/city-imgs/london.jpg"
  },
  {
    name: "Paris",
    country: "France",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566352/city-imgs/paris.jpg"
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566351/city-imgs/buenos%20aires.jpg"
  },
  {
    name: "Rome",
    country: "Italy",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566354/city-imgs/rome.jpg"
  },
  {
    name: "Tokyo",
    country: "Japan",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566355/city-imgs/tokyo.jpg"
  },
  {
    name: "Berlin",
    country: "Germany",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566353/city-imgs/berlin.jpg"
  },
  {
    name: "Barcelona",
    country: "Spain",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566351/city-imgs/barcelona.jpg"
  },
  {
    name: "New York",
    country: "NY, USA",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566360/city-imgs/new%20york.jpg"
  },
  {
    name: "Rio",
    country: "Brazil",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566358/city-imgs/rio%20de%20janeiro.jpg"
  },
  {
    name: "Madrid",
    country: "Spain",
    imgUrl: ""
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    imgUrl: ""
  },
  {
    name: "Mexico City",
    country: "Mexico",
    imgUrl: ""
  }
];

var topDestsDB = [
  {
    name: "Bangkok",
    country: "Thailand",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566355/city-imgs/bangkok.jpg"
  },
  {
    name: "London",
    country: "England",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566358/city-imgs/london.jpg"
  },
  {
    name: "Paris",
    country: "France",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566352/city-imgs/paris.jpg"
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566351/city-imgs/buenos%20aires.jpg"
  },
  {
    name: "Rome",
    country: "Italy",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566354/city-imgs/rome.jpg"
  },
  {
    name: "Tokyo",
    country: "Japan",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566355/city-imgs/tokyo.jpg"
  },
  {
    name: "Berlin",
    country: "Germany",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566353/city-imgs/berlin.jpg"
  },
  {
    name: "Barcelona",
    country: "Spain",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566351/city-imgs/barcelona.jpg"
  },
  {
    name: "New York",
    country: "NY, USA",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566360/city-imgs/new%20york.jpg"
  },
  {
    name: "Rio De Janeiro",
    country: "Brazil",
    imgUrl:
      "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553566358/city-imgs/rio%20de%20janeiro.jpg"
  },
  {
    name: "All Top Destinations...",
    imgUrl: ""
  }
];

module.exports = {
  query,
  queryTopDests
};
