/* ----- DEPENDENCIES -----*/
const countryService = require('../services/cityService.js');

/* ----- CONSTANTS -----*/
const BASE = '/city';


function addRoutes(app) {

    // GET ALL CITIES
    app.get(BASE, (req, res) => {
        const query = req.query;
        userService.query(query).then(users => {
            console.log(users);
            res.json(users)
        })
    })

    // GET CITY BY COUNTRY
    app.get(`${BASE}/:country`, (req, res) => {
        const { country } = req.query;
        userService.getById(userId).then(user => res.json(user));
    })


}

module.exports = addRoutes;