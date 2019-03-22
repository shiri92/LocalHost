/* ----- DEPENDENCIES -----*/
const countryService = require('../services/countryService.js');

/* ----- CONSTANTS -----*/
const BASE = '/country';


function addRoutes(app) {

    // GET COUNTRIES
    app.get(BASE, (req, res) => {
        const { cityName } = req.query;
        countryService.query(cityName)
            .then(countries => {
                // console.log(countries)
                return res.json(countries);
            })
    })

    // app.get(`${BASE}/:id`, (req, res) => {
    //     const locId = req.params.id
    //     countryService.getById(locId)
    //         .then(loc => {
    //             return res.json(loc)
    //         });
    // })



}

module.exports = addRoutes;