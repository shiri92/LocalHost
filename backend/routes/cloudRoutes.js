/* ----- DEPEND -----*/
const cloudService = require('../services/cloudService');

/* ----- CONST -----*/
const BASE = '/cloud';

function addRoutes(app) {

    // Upload Img
    app.post(BASE, (req, res) => {
        const { file } = req.files;
        cloudService.uploadImg(file).then(imgUrl => res.json(imgUrl))
    });

}

module.exports = addRoutes;
