/* ----- DEPEND -----*/
import Axios from "axios";
var axios = Axios.create({ withCredentials: true }); // save the session cookies

/* ----- CONST -----*/
const BASE_API = process.env.NODE_ENV !== "development" ? "" : "//localhost:3003/cloud";


async function uploadProfileImg(imgFile) {
    let formData = new FormData();
    formData.append('file', imgFile);
    let res = await axios.post(BASE_API, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
}


export default {
    uploadProfileImg,
}
