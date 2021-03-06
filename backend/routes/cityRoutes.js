/* ----- DEPEND -----*/
const cityService = require("../services/cityService.js");

/* ----- CONST -----*/
const BASE = "/city";

function addRoutes(app) {
  // GET Cities
  app.get(BASE, async (req, res) => {
    const { searchWord } = req.query;
    let users = await cityService.query(searchWord);
    return res.json(users);
  });

  // GET TOP CITIES
  app.get(BASE + "/top", (req, res) => {
    cityService.queryTopDests().then(topDests => res.json(topDests));
  });
}

module.exports = addRoutes;
