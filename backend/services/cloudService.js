
/* ----- DEPEND -----*/
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dcl4oabi3',
    api_key: '835468792983949',
    api_secret: 'djgVO14O1DSteDPTimrKaq7E1Bo'
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





