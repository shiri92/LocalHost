/* ----- DEPEND -----*/
import Axios from "axios";
var axios = Axios.create({ withCredentials: true }); // save the session cookies

/* ----- CONST -----*/
const BASE_API =
  process.env.NODE_ENV !== "development" ? "" : "//localhost:3003/user";

// Logged User Check (Session Only)
async function checkLogged() {
  let res = await axios.put(`${BASE_API}/checkLogged`);
  return res.data;
}

// Login User
async function login(credentials) {
  let res = await axios.put(`${BASE_API}/login`, credentials);
  return res.data;
}

// Logout User
async function logout() {
  await axios.put(`${BASE_API}/logout`);
}

// GET Users By Address
async function query(city, country) {
  let query = `?country=${country}&city=${city}`;
  let res = await axios.get(`${BASE_API}${query}`);
  return res.data;
}

// GET User By Id
async function getById(id) {
  let res = await axios.get(`${BASE_API}/${id}`);
  return res.data;
}

// ADD User
async function add(credentials) {
  let res = await axios.post(`${BASE_API}`, credentials);
  return res.data;
}

// ADD Guest Request
async function addRequest(request) {
  await axios.put(`${BASE_API}/request`, request);
}

// UPDATE User
async function update(credentials) {
  await axios.put(`${BASE_API}/${id}`, credentials);
}

// UPDATE Profile Image Url
async function updateUserImg(imgUrl, userId) {
  await axios.put(`${BASE_API}/${userId}/img`, { imgUrl });
}

async function addReview(review) {
  let res = await axios.put(`${BASE_API}/review`, review);
  return res.data;
}

async function removeReview(currUserId, reviewId) {
  await axios.delete(`${BASE_API}/${currUserId}/review/${reviewId}`);
}

export default {
  checkLogged,
  login,
  logout,
  query,
  getById,
  add,
  addRequest,
  addReview,
  removeReview,
  update,
  updateUserImg
};
