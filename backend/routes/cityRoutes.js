/* ----- DEPENDENCIES -----*/
const cityService = require('../services/cityService.js');

/* ----- CONSTANTS -----*/
const BASE = '/city';


function addRoutes(app) {

    // GET ALL CITIES
    app.get(BASE, (req, res) => {
        const { searchWord } = req.query;
        cityService.query(searchWord).then(users => res.json(users))
    });

    // GET TOP CITIES
    app.get(BASE + '/top', (req, res) => {
        cityService.queryTopDests().then(topDests => res.json(topDests))
    })


    // GET CITY BY COUNTRY
    // app.get(`${BASE}/:country`, (req, res) => {
    //     const { country } = req.query;
    //     cityService.getById(userId).then(user => res.json(user));
    // })


}

module.exports = addRoutes;