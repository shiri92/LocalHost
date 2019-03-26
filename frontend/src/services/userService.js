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

// ADD review to user
async function addReview(review) {
  await axios.put(`${BASE_API}/${review.givenToId}`, review);
}

// UPDATE Profile Image
async function updateProfileImg(imgFile, userId) {
  let formData = new FormData();
  let UPLOAD_PRESET = "jhqr9o4c";
  formData.append("file", imgFile);
  formData.append("upload_preset", UPLOAD_PRESET);
  let res = axios.post(`${BASE_API}/${userId}/img`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  // console.log(File);
  // console.log(userId);
  // let res = axios.post(`${BASE_API}/${userId}/img`, { 'file': File });
  // let query = `imgFile=${payload.imgFile}`;
  // let res = await axios.put(`${BASE_API}/${payload.userId}/img${query}`);
  // return res.data;
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
  update,
  updateProfileImg
};
