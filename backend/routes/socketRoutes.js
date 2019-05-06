
var connectedUsers = [];

function addRoutes(io) {
    io.on('connection', (socket) => {
        let { userId } = socket.handshake.query;
        socket.userId = userId;
        let targetSocket = findSocketByUserId(userId)
        if (!targetSocket) {
            connectedUsers.push(socket);
            console.log(`${socket.userId} connected!`);
        }

        socket.on('disconnect', () => {
            let targetSocket = findSocketByUserId(userId)
            if (targetSocket) {
                connectedUsers = connectedUsers.filter(s => s.userId !== s.userId)
                console.log(`${socket.userId} disconnected!`);
            }
        });

        socket.on('sendRequest', (targetId, request) => {
            console.log('request');
            console.log(connectedUsers);
            console.log(targetId);
            let targetSocket = findSocketByUserId(targetId);
            if (targetSocket) targetSocket.emit('sendRequest', request);
        });

        socket.on('sendResponse', (targetId, response) => {
            console.log('response');
            console.log(connectedUsers);
            console.log(targetId);
            let targetSocket = findSocketByUserId(targetId);
            if (targetSocket) {
                targetSocket.emit('sendResponse', response);
            }
        });

        socket.on('postReview', (review, targetId) => {
            io.sockets.emit('postReview', review, targetId);
        });

        socket.on('unpostReview', (reviewId, targetId) => {
            io.sockets.emit('unpostReview', reviewId, targetId);
        });

        socket.on('editReview', (review, targetId) => {
            io.sockets.emit('editReview', review, targetId);
        });

    });
}

function findSocketByUserId(userId) {
    return connectedUsers.find(s => s.userId === userId);
}

module.exports = addRoutes;