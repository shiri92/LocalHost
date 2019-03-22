/* ----- DEPENDENCIES -----*/
const countryService = require('../services/countryService.js');
const cityService = require('../services/cityService.js');

/* ----- CONSTANTS -----*/
const BASE = '/country';


function addRoutes(app) {

    // GET LIST
    app.get(BASE, (req, res) => {
        const { cityName } = req.query;
        countryService.query(cityName)
            .then(countries => {
                // console.log(countries)
                return res.json(countries);
            })
    })


    // app.get(BASE + '/top', (req, res) => {
    //     console.log('here');
    //     cityService.queryTopDests()
    //         .then(topDests => {
    //             return res.json(topDests)
    //         })
    // })



    app.get(`${BASE}/:id`, (req, res) => {
        const locId = req.params.id
        countryService.getById(locId)
            .then(loc => {
                return res.json(loc)
            });
    })



}

module.exports = addRoutes;