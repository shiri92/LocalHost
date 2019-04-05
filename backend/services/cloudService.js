
/* ----- DEPEND -----*/
const cloudinary = require('cloudinary');

/* ----- CONST -----*/
const CLOUD_NAME = 'dcl4oabi3';
// const UPLOAD_PRESET = 'jhqr9o4c';
const API_KEY = '835468792983949'
const API_SECRET = 'djgVO14O1DSteDPTimrKaq7E1Bo'

cloudinary.config(
    {
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        api_secret: API_SECRET
    });

function uploadImg(imgFile) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
            {
                // public_id: "my_picture",
                resource_type: 'image'
            },
            (error, result) => resolve(result.secure_url))
            .end(imgFile.data)
    })
}

function loadImg(imgUrl) {
    let img = cloudinary.image(`${imgUrl}`, { type: "fetch" });
    return Promise.resolve(img);
}


module.exports = {
    uploadImg,
    loadImg,
}





