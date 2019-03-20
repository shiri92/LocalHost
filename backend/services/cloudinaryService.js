
/* ----- DEPENDENCIES -----*/
const cloudinary = require('cloudinary');


// configCloudinary();

function configCloudinary() {
    cloudinary.config(  // niv details
        {
            cloud_name: 'dcl4oabi3',
            api_key: '835468792983949',
            api_secret: 'djgVO14O1DSteDPTimrKaq7E1Bo'
        });
}

function uploadToCloudinary(imgUrl, imgId) {
    cloudinary.v2.uploader.upload("https://via.placeholder.com/500",
        { public_id: "example_1" },
        (error, result) => {
            console.log(result.public_id)
            console.log(result.url)
        });
}

function getFromCloudinary(imgId) {
    return cloudinary.image(`${imgId}.jpg`, { type: "fetch" })
}
function getFromCloudinary(imgUrl) {
    return cloudinary.image(imgUrl, { type: "fetch" })
}





