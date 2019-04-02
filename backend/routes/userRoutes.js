/* ----- DEPEND -----*/
const userService = require("../services/userService.js");

/* ----- CONST -----*/
const BASE = "/user";

function addRoutes(app) {
  // Logged User Check (Session Only)
  app.put(`${BASE}/checkLogged`, async (req, res) => {
    if (req.session.user) {
      let user = await userService.getById(req.session.user._id);
      return res.json(user);
    }
    return res.json();
  });

  // Login User
  app.put(`${BASE}/login`, async (req, res) => {
    const credentials = req.body;
    let user = await userService.login(credentials);
    if (!user) res.status(401).send('User Not Found');
    req.session.user = user;
    res.json(user);
  });

  // Logout User (Session Only)
  app.put(`${BASE}/logout`, (req, res) => {
    req.session.destroy();
    return res.json();
  });

  // GET Users
  app.get(BASE, async (req, res) => {
    const { country, city } = req.query;
    let users = await userService.query(country, city);
    return res.json(users);
  });

  // GET User By Id
  app.get(`${BASE}/:id`, async (req, res) => {
    const userId = req.params.id;
    let user = await userService.getById(userId);
    return res.json(user);
  });

  // ADD User, GET User + id
  app.post(BASE, async (req, res) => {
    const credentials = req.body;
    let user = await userService.add(credentials);
    return res.json(user);
  });

  // ADD Pending Request
  app.put(`${BASE}/:id/pendingRequest`, async (req, res) => {
    const request = req.body;
    const { id } = req.params;
    let result = await userService.addPendingRequest(id, request);
    return res.json(result);
  });

  // ADD Accepted Request
  app.put(`${BASE}/:id/acceptedRequest`, async (req, res) => {
    const request = req.body;
    const { id } = req.params;
    await userService.addAcceptedRequest(id, request);
    return res.json();
  });

  // ADD Accepted Response
  app.put(`${BASE}/:id/acceptedResponse`, async (req, res) => {
    const response = req.body;
    const { id } = req.params;
    let result = await userService.addAcceptedResponse(id, response);
    return res.json(result);
  });

  // ADD User Review
  app.put(`${BASE}/review`, async (req, res) => {
    const review = req.body;
    let result = await userService.addReview(review);
    return res.json(result);
  });

  // DELETE Pending Request
  app.delete(`${BASE}/:id/pendingRequest/:requestId`, async (req, res) => {
    const targetId = req.params.id;
    const requestId = req.params.requestId;
    await userService.deletePendingRequest(targetId, requestId);
    return res.end();
  });


  // DELETE User Review
  app.delete(`${BASE}/:currUserId/review/:reviewId`, async (req, res) => {
    const currUserId = req.params.currUserId;
    const reviewId = req.params.reviewId;
    await userService.removeReview(currUserId, reviewId);
    return res.end();
  });

  // UPDATE User Review
  app.put(`${BASE}/:currUserId/review/:reviewId`, async (req, res) => {
    const currUserId = req.params.currUserId;
    const reviewId = req.params.reviewId;
    const review = req.body;
    await userService.updateReview(currUserId, review);
    return res.end();
  });

  // UPDATE User
  app.put(`${BASE}/:id`, async (req, res) => {
    const user = req.body;
    await userService.update(user);
    return res.json();
  });

  // UPDATE Profile Img
  app.put(`${BASE}/:id/img`, async (req, res) => {
    let { id } = req.params;
    let { imgUrl } = req.body;
    await userService.updateUserImg(imgUrl, id);
    return res.json();
  });

}

module.exports = addRoutes;