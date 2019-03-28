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
    } else return res.json();
  });

  // Login User
  app.put(`${BASE}/login`, async (req, res) => {
    const credentials = req.body;
    let user = await userService.login(credentials);
    if (!user) res.status(401).send("Something broke!");
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

  // ADD User, Return User With Id
  app.post(BASE, async (req, res) => {
    const credentials = req.body;
    let user = await userService.add(credentials);
    return res.json(user);
  });

  // ADD User Request
  app.put(`${BASE}/request`, async (req, res) => {
    const request = req.body;
    let result = await userService.addRequest(request);
    return res.json(result);
  });

  //ADD User Review
  app.put(`${BASE}/review`, async (req, res) => {
    const review = req.body;
    let result = await userService.addReview(review);
    return res.json(result);
  });

  // DELETE User Review
  app.delete(`${BASE}/:currUserId/review/:reviewId`, async (req, res) => {
    const currUserId = req.params.currUserId;
    const reviewId = req.params.reviewId;
    await userService.removeReview(currUserId, reviewId);
    return res.end(`Review ${reviewId} Deleted`);
  });

  // DELETE Guest Request
  app.delete(`${BASE}/:currUserId/request/:requestId`, async (req, res) => {
    const currUserId = req.params.currUserId;
    const requestId = req.params.requestId;
    await userService.removeRequest(currUserId, requestId);
    return res.end(`Request ${requestId} Deleted`);
  });

  // UPDATE User
  app.put(`${BASE}/:id`, (req, res) => {
    const user = req.body;
    userService.update(user).then(() => res.json());
  });

  // UPDATE Profile Image, return ImgUrl
  app.put(`${BASE}/:id/img`, async (req, res) => {
    let { id } = req.params;
    let { imgUrl } = req.body;
    await userService.updateUserImg(imgUrl, id);
    return res.json();
  });

  // (UPDATE HOST USER) Book Guest
  app.put(`${BASE}/:id/bookGuest`, async (req, res) => {
    const { id } = req.params;
    const sender = req.body;
    await userService.bookGuest(id, sender);
    return res.json();
  });

  // (UPDATE GUEST USER) Book Host
  app.put(`${BASE}/:id/bookHost`, async (req, res) => {
    const { id } = req.params;
    const recipient = req.body;
    await userService.bookHost(id, recipient);
    return res.json();
  });
}

module.exports = addRoutes;

// function checkAdmin(req, res, next) {
//     console.log('INSIDE MIDDLEWARE: ', req.session.user);
//     if (!req.session.user || !req.session.user.isAdmin) {
//         res.status(401).end('Unauthorized');
//         return;
//     }
//     next();
// }

