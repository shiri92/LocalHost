/* ----- DEPEND -----*/
import io from 'socket.io-client';
var socket = null;

const serverUrl = process.env.NODE_ENV !== 'development' ? '' : 'http://localhost:3003';

function connect(userId) {
    return io(serverUrl, { query: `userId=${userId}` });
}

function getSocket() {
    return socket;
}

function disconnect() {
    socket.disconnect();
}


export default {
    connect,
    disconnect,
    getSocket
}