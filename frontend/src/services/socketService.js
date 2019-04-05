/* ----- DEPEND -----*/
import io from 'socket.io-client';

const serverUrl = process.env.NODE_ENV !== 'development' ? '' : 'http://localhost:3003';

function connect(userId) {
    return io(serverUrl, { query: `userId=${userId}` });
}

export default {
    connect,
}