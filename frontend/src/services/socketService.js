/* ----- DEPEND -----*/
import io from 'socket.io-client';

var socket = null;

function connect() {
    userId = '123';
    socket = io('http://localhost:3003', userId);
}

function disconnect() {
    socket.disconnect();
}

export default {
    connect,
    disconnect
}