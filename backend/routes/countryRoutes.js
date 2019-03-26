/* ----- DEPEND -----*/
const countryService = require('../services/countryService.js');

/* ----- CONST -----*/
const BASE = '/country';


function addRoutes(app) {

    // GET Countries
    app.get(BASE, async (req, res) => {
        const { cityName } = req.query;
        let countries = await countryService.query(cityName);
        return res.json(countries);
    });

}

module.exports = addRoutes;