/* ----- DEPEND -----*/
import Axios from 'axios';
var axios = Axios.create({ withCredentials: true }); // save the session cookies

/* ----- CONST -----*/
const BASE_API = process.env.NODE_ENV !== "development" ? "/user" : "//localhost:3003/user";


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

// Send Pending Request
async function sendRequest(request, targetId) {
  let res = await axios.put(`${BASE_API}/${targetId}/pendingRequest`, request);
  return res.data;
}

// Accept Pending Request
async function acceptRequest(request, targetId) {
  await axios.delete(`${BASE_API}/${targetId}/pendingRequest/${request._id}`);
  await axios.put(`${BASE_API}/${targetId}/acceptedRequest`, request);
}

// Decline Pending Request
async function declineRequest(requestId, targetId) {
  await axios.delete(`${BASE_API}/${targetId}/pendingRequest/${requestId}`);
}

// Send Response
async function sendResponse(response, targetId) {
  let res = await axios.put(`${BASE_API}/${targetId}/acceptedResponse`, response);
  return res.data;
}

// ADD User Review
async function postReview(review, targetId) {
  let res = await axios.put(`${BASE_API}/${targetId}/review`, review);
  return res.data;
}

// DELETE User Review
async function unpostReview(currUserId, reviewId) {
  await axios.delete(`${BASE_API}/${currUserId}/review/${reviewId}`);
}

// EDIT User Review
async function editReview(currUserId, review) {
  await axios.put(`${BASE_API}/${currUserId}/review/${review._id}`, review);
}

// UPDATE User
async function update(user) {
  let res = await axios.put(`${BASE_API}/${user._id}`, user);
  return res.data;
}

// UPDATE Profile Image Url
async function updatePortrait(imgUrl, userId) {
  console.log('here', imgUrl, userId);
  await axios.put(`${BASE_API}/${userId}/img`, { imgUrl });
}


export default {
  checkLogged,
  login,
  logout,
  query,
  getById,
  add,
  sendRequest,
  postReview,
  unpostReview,
  editReview,
  update,
  updatePortrait,
  acceptRequest,
  declineRequest,
  sendResponse
};
