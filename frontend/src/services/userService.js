/* ----- DEPENDENCIES -----*/
import Axios from "axios";
var axios = Axios.create({
    withCredentials: true
}); // save the session cookies

/* ----- CONSTANTS -----*/
const BASE_API =
    process.env.NODE_ENV !== "development" ? "" : "//localhost:3003/user";

async function query(city) {
    let query = `?city=${city}`;
    let res = await axios.get(`${BASE_API}${query}`);
    return res.data;
}

async function getById(id) {
    let res = await axios.get(`${BASE_API}/${id}`);
    return res.data;
}

async function add(credentials) {
    console.log(credentials);
    let res = await axios.post(`${BASE_API}`, credentials);
    return res.data;
}

async function login(credentials) {
    let res = await axios.put(`${BASE_API}/login`, credentials);
    return res.data;
}

export default {
    query,
    getById,
    add,
    login
};
