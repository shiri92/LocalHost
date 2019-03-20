
/* ----- DEPENDENCIES -----*/
import utilService from './utilService.js';
import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});

/* ----- CONSTANTS -----*/
const BASE_URL = process.env.NODE_ENV !== 'development' ? '' : '//localhost:3003/city'




function query(filterBy) {

}

function createCity() {

}

function createCities() {

}
// function query(filterBy) {
//     let query = filterBy ? `?name=${filterBy.name}&type=${filterBy.type}&stock=${filterBy.stock}&sort=${filterBy.sort}` : '';
//     return axios.get(`${BASE_URL}/toy` + query).then(res => res.data)
// }

// function getById(toyId) {
//     return axios.get(`${BASE_URL}/toy` + '/' + toyId).then(toy => toy.data);
// }

// function addToy(toy) {
//     toy.createdAt = new Date().toLocaleString();
//     return axios.post(`${BASE_URL}/toy`, toy).then(toy => toy.data);
// }

// function removeToy(toyId) {
//     return axios.delete(`${BASE_URL}/toy` + '/' + toyId).then(toy => toy.data);
// }

// function updateToy(toy) {
//     return axios.put(`${BASE_URL}/toy` + '/' + toy._id, toy).then(toy => toy.data);
// }

// function createToy(txt, toys) {
//     return {
//         id: UtilService.makeId(),
//         txt,
//         toys,
//         isDone: false,
//         createdAt: new Date().toLocaleString()
//     }
// }


export default {
    query,
    getById,
    createToy,
    updateToy,
    addToy,
    removeToy,
}









