/* ----- DEPENDENCIES -----*/
const userService = require("../services/userService.js");

/* ----- CONSTANTS -----*/
const BASE = "/user";

// function checkAdmin(req, res, next) {
//     console.log('INSIDE MIDDLEWARE: ', req.session.user);
//     if (!req.session.user || !req.session.user.isAdmin) {
//         res.status(401).end('Unauthorized');
//         return;
//     }
//     next();
// }

function addRoutes(app) {
    // GET USERS
    app.get(BASE, (req, res) => {
        const { city } = req.query;
        userService.query(city).then(users => res.json(users));
    });

    // GET USER
    app.get(`${BASE}/:id`, (req, res) => {
        const userId = req.params.id;
        userService.getById(userId).then(user => res.json(user));
    });

    app.post(BASE, (req, res) => {
        const credentials = req.body;
        userService.add(credentials).then(user => res.json(user));
    });

    app.put(`${BASE}/login`, (req, res) => {
        const credentials = req.body;
        userService.login(credentials).then(user => {
            if (!user) res.status(401).send('Something broke!');
            req.session.user = user;
            res.json(user)
        });
    });
}

module.exports = addRoutes;