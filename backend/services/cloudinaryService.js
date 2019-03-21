
const cloudinary = require('cloudinary');

configCloudinary();
// saveToCloudinary("https://via.placeholder.com/500", "example_1");

function configCloudinary() {
    cloudinary.config(  // niv details
        {
            cloud_name: 'dcl4oabi3',
            api_key: '835468792983949',
            api_secret: 'djgVO14O1DSteDPTimrKaq7E1Bo'
        });
}

function saveToCloudinary(imgUrl, imgId) {
    return cloudinary.v2.uploader.upload(imgUrl, { public_id: imgId }, function (error, result) {
        return result;
    });

}

function loadFromCloudinary(imgUrl) {
    let img = cloudinary.image(`${imgUrl}`, { type: "fetch" });
    return Promise.resolve(img);
}

module.exports = {
    saveToCloudinary,
    loadFromCloudinary
}




