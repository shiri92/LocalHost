export default {
    saveToStorage,
    loadFromStorage,
    getRandomId,
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

/* Random */

function getRandomId() {
    var length = 3;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


function getRequestPromiseAxios() {
    return axios.get('https://yesno.wtf/api')
        .then(res => { return res.data; })
        .catch(err => { return err; })
        .finally(() => { console.log('Done Sending the AJAX Request') })
}

/* Page */
function copyStringToClipboard(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

/* Count Down */

// gets time in milliseconds and render count down timer
function startCountDown(ms) {
    let sec = Math.floor(ms / 1000);
    let min = Math.floor(ms / 60000);
    let timer = setInterval(() => {
        if (ms <= 0) clearInterval(timer)
        printTimer(min, sec)
        ms -= 1000
        sec = Math.floor(ms / 1000);
        min = Math.floor(ms / 60000);
    }, 1000)
}

function printTimer(min, sec) {
    min = min < 10 ? '0' + min : '' + min;
    sec = sec < 10 ? '0' + sec : '' + sec;
    console.log(`${min}:${sec}`);
}
