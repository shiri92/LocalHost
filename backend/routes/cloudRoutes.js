/* ----- DEPEND -----*/
const cloudService = require('../services/cloudService');

/* ----- CONST -----*/
const BASE = '/cloud';

function addRoutes(app) {

    // UPLOAD IMG
    app.post(`${BASE}`, async (req, res) => {
        const { imgPath } = req.query;
        const { file } = req.files;
        let imgUrl = await cloudService.uploadImg(file, imgPath);
        return res.json(imgUrl);
    });

}

module.exports = addRoutes;
