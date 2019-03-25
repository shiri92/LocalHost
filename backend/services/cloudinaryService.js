
/* ----- DEPENDENCIES -----*/
const cloudinary = require('cloudinary');
configCloudinary();

function configCloudinary() {
    cloudinary.config(
        {
            // niv
            cloud_name: 'dcl4oabi3',
            api_key: '835468792983949',
            api_secret: 'djgVO14O1DSteDPTimrKaq7E1Bo'
        });
}

function saveToCloudinary(imgUrl, imgId) {
    return cloudinary.v2.uploader.upload(imgUrl, { public_id: imgId }, (error, result) => result);
}

function doUploadImg(file, onSuccess) {
    const CLOUD_NAME = 'dcl4oabi3';
    const RESOURCE_TYPE = 'image';
    var UPLOAD_URL = `https://api.cloudinart.com/v1_1/${CLOUD_NAME}/${RESOURCE_TYPE}/upload`;
    console.log(file);

    // fetch(UPLOAD_URL, {
    //     method: 'POST',
    //     body: formData
    // })
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(onSuccess)
    //     .catch(function (error) {
    //         console.error(error);
    //     })
}

function loadFromCloudinary(imgUrl) {
    let img = cloudinary.image(`${imgUrl}`, { type: "fetch" });
    return Promise.resolve(img);
}

function test() {
    console.log('heyyy');
}

module.exports = {
    saveToCloudinary,
    doUploadImg,
    loadFromCloudinary,
    test
}




