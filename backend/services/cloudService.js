
/* ----- DEPEND -----*/
const cloudinary = require('cloudinary');

const cloud_name = process.env.CLOUDINARY_NAME;
const api_key = process.env.CLOUDINARY_KEY;
const api_secret = process.env.CLOUDINARY_SECRET;

cloudinary.config({
    cloud_name,
    api_key,
    api_secret
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





