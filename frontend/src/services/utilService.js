export default {
    getTimeStamp
}

/* ----- FILLTERS -----*/
function getTimeStamp(date) {
    return new Date(date).getTime();
}

/* ----- RANDOM -----*/
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getRandomId() {
    var length = 3;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

/* ----- STORAGE -----*/
function saveToStorage(key, value) {
    var dataStr = JSON.stringify(value);
    localStorage.setItem(key, dataStr);
}

function loadFromStorage(key) {
    var dataStr = localStorage.getItem(key);
    return JSON.parse(dataStr);
}




