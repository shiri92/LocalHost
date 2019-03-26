/* ----- DEPEND -----*/
const userService = require("../services/userService.js");
const cloudinaryService = require("../services/cloudinaryService");

/* ----- CONST -----*/
const BASE = "/user";

function addRoutes(app) {
  // Logged User Check (Session Only)
  app.put(`${BASE}/checkLogged`, (req, res) => {
    return res.json(req.session.user);
  });

  // Login User
  app.put(`${BASE}/login`, (req, res) => {
    const credentials = req.body;
    userService.login(credentials).then(user => {
      if (!user) res.status(401).send("Something broke!");
      req.session.user = user;
      res.json(user);
    });
  });

  // Logout User (Session Only)
  app.put(`${BASE}/logout`, (req, res) => {
    req.session.destroy();
    return res.json();
  });

  // GET Users
  app.get(BASE, (req, res) => {
    const { country, city } = req.query;
    userService.query(country, city).then(users => res.json(users));
  });

  // GET User By Id
  app.get(`${BASE}/:id`, (req, res) => {
    const userId = req.params.id;
    userService.getById(userId).then(user => res.json(user));
  });

  // ADD User
  app.post(BASE, (req, res) => {
    const credentials = req.body;
    userService.add(credentials).then(user => res.json(user));
  });

  // ADD Guest Request
  app.put(`${BASE}/request`, (req, res) => {
    let { request } = req.body;
    userService.addRequest(request).then(() => res.json());
  });

  //ADD review to user
  app.put(`${BASE}/:id`, (req, res) => {
    const review = req.body;
    userService.update(review).then(() => res.json());
  });

  // UPDATE User
  // app.put(`${BASE}/:id`, (req, res) => {
  //   const credentials = req.body;
  //   userService.update(credentials).then(() => res.json());
  // })

  // UPDATE Profile Image
  app.post(`${BASE}/:id/img`, (req, res) => {
    let formData = req.files;
    cloudinaryService.doUploadImg(formData, url => {
      console.log("success!", url);
    });
    // userService.updateProfileImg(imgFile, userId).then(imgUrl => res.json(imgUrl))
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
