
/* ----- DEPEND -----*/
const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
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





