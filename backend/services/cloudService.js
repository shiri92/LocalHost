
/* ----- DEPEND -----*/
const cloudinary = require('cloudinary');
const KEYS = require('../config_keys');

cloudinary.config({
    cloud_name: KEYS.CLOUDINARY.CLOUD_NAME,
    api_key: KEYS.CLOUDINARY.API_KEY,
    api_secret: KEYS.CLOUDINARY.API_SECRET
});

function uploadImg(imgFile, imgPath) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream({
            public_id: imgPath,
            resource_type: 'image'
        },
            (error, result) => resolve(result.secure_url))
            .end(imgFile.data)
    });
}

function loadImg(imgUrl) {
    let img = cloudinary.image(`${imgUrl}`, { type: "fetch" });
    return Promise.resolve(img);
}


module.exports = {
    uploadImg,
    loadImg,
}





