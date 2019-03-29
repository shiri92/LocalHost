/* ----- DEPENDENCIES -----*/
import Axios from "axios";
var axios = Axios.create({ withCredentials: true });

/* ----- CONSTANTS -----*/
const BASE_URL =
  process.env.NODE_ENV !== "development" ? "/city" : "//localhost:3003/city";

async function queryCities(searchWord) {
  let query = searchWord ? `?searchWord=${searchWord}` : "";
  let res = await axios.get(`${BASE_URL}` + query);
  return res.data;
}

export default {
  queryCities
};
