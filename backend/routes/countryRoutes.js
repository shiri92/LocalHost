/* ----- DEPENDENCIES -----*/
const countryService = require('../services/countryService.js');

/* ----- CONSTANTS -----*/
const BASE = '/country';


function addRoutes(app) {

    // GET LIST
    app.get(BASE, (req, res) => {
        const query = req.query;
        countryService.query(query)
            .then(countries => res.json(countries))
    })



    app.get(`${BASE}/:id`, (req, res) => {
        const locId = req.params.id
        countryService.getById(locId)
            .then(loc => {
                return res.json(loc)
            });
    })



}

module.exports = addRoutes;