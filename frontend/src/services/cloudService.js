/* ----- DEPEND -----*/
import Axios from "axios";
var axios = Axios.create({ withCredentials: true }); // save the session cookies

/* ----- CONST -----*/
const BASE_API = process.env.NODE_ENV !== "development" ? "/cloud" : "//localhost:3003/cloud";

async function uploadPortrait(imgFile, imgPath) {
    let query = `?imgPath=${imgPath}`;
    let formData = new FormData();
    formData.append('file', imgFile);
    let res = await axios.post(`${BASE_API}/${query}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res.data;
}

export default {
    uploadPortrait,
}
