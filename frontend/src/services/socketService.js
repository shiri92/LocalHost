/* ----- DEPEND -----*/
import io from 'socket.io-client';


function connect(userId) {
    return io('http://localhost:3003', { query: `userId=${userId}` });
}


export default {
    connect,
}