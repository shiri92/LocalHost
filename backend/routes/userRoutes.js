/* ----- DEPEND -----*/
const userService = require("../services/userService.js");

/* ----- CONST -----*/
const BASE = "/user";

function addRoutes(app) {
  // Logged User Check (Session Only)
  app.put(`${BASE}/checkLogged`, (req, res) => {
    return res.json(req.session.user);
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

  // ADD Guest Request
  app.put(`${BASE}/request`, async (req, res) => {
    const request = req.body;
    await userService.addRequest(request);
    return res.json();
  });

  //ADD Review
  app.put(`${BASE}/review`, async (req, res) => {
    const review = req.body;
    await userService.addReview(review);
    return res.json();
  });

  // UPDATE User
  // app.put(`${BASE}/:id`, (req, res) => {
  //   const credentials = req.body;
  //   userService.update(credentials).then(() => res.json());
  // })

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
  });

  // (UPDATE GUEST USER) Book Host
  app.put(`${BASE}/:id/bookHost`, async (req, res) => {
    const { id } = req.params;
    const recipient = req.body;
    // await userService.bookHost(id, recipient);
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
