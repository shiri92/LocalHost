/* ----- DEPEND -----*/
const cityService = require('../services/cityService.js');

/* ----- CONST -----*/
const BASE = '/city';


function addRoutes(app) {
    // GET Cities
    app.get(BASE, async (req, res) => {
        const { searchWord } = req.query;
        let users = await cityService.query(searchWord);
        return res.json(users);
    });

    // GET Top Destinations
    app.get(BASE + '/top', async (req, res) => {
        let topDests = await cityService.queryTopDests();
        return res.json(topDests);
    })
}

module.exports = addRoutes;