/* ----- DEPEND -----*/
import io from 'socket.io-client';
var socket = null;

function connect(userId) {
    return io('http://localhost:3003', { query: `userId=${userId}` });
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