/* ----- DEPEND -----*/
import io from 'socket.io-client';

var socket = null;

// function connect(userId) {
//     socket = io('http://localhost:3003', { query: `userId=${userId}` });

//     socket.on('sendRequest', () => {
//         console.log('target got requesttttt');
//     })
// }

function connect(userId) {
    return io('http://localhost:3003', { query: `userId=${userId}` });
}

// function sendRequest(targetId) {
//     socket.emit('sendRequest', targetId);
//     console.log(targetId);
// }

// function disconnect() {
//     socket.disconnect();
// }

export default {
    connect,
    // disconnect,
    // sendRequest
}