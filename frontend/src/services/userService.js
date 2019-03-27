/* ----- DEPEND -----*/
import Axios from "axios";
var axios = Axios.create({ withCredentials: true }); // save the session cookies

/* ----- CONST -----*/
const BASE_API = process.env.NODE_ENV !== "development" ? "" : "//localhost:3003/user";



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

// ADD User Request
async function addRequest(request) {
  let res = await axios.put(`${BASE_API}/request`, request);
  return res.data;
}

// ADD User Review
async function addReview(review) {
  let res = await axios.put(`${BASE_API}/review`, review);
  return res.data;
}

// DELETE User Request
async function removeRequest(recipientId, requestId) {
  await axios.delete(`${BASE_API}/${recipientId}/request/${requestId}`);
}

// DELETE User Review
async function removeReview(currUserId, reviewId) {
  await axios.delete(`${BASE_API}/${currUserId}/review/${reviewId}`);
}

// UPDATE User
async function updateUser(user) {
  let res = await axios.put(`${BASE_API}/${user._id}`, user);
  return res.data;
}

// UPDATE Profile Image Url
async function updateUserImg(imgUrl, userId) {
  await axios.put(`${BASE_API}/${userId}/img`, { imgUrl });
}

// (UPDATE HOST USER) Book Guest
async function bookGuest(sender, recipient) {
  const { id } = recipient;
  await axios.put(`${BASE_API}/${id}/bookGuest`, { sender });
}
// (UPDATE GUEST USER) Book Host
async function bookHost(sender, recipient) {
  const { id } = sender;
  await axios.put(`${BASE_API}/${id}/bookHost`, { recipient });
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
  bookGuest,
  bookHost,
  removeReview,
  removeRequest,
  updateUser,
  updateUserImg
};
