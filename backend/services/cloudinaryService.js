
const cloudinary = require('cloudinary');


configCloudinary();

function configCloudinary() {
    cloudinary.config(  // niv details
        {
            cloud_name: 'dcl4oabi3',
            api_key: '835468792983949',
            api_secret: 'djgVO14O1DSteDPTimrKaq7E1Bo'
        });
}

function saveToCloudinary(imgUrl, imgId) {
    cloudinary.v2.uploader.upload(imgUrl, { public_id: imgId }, (error, result) => {
        return result.url;
    });
}

function loadFromCloudinary(imgUrl) {
    return cloudinary.image(`${imgUrl}`, { type: "fetch" })
}

export default {
    saveToCloudinary,
    loadFromCloudinary,
}




