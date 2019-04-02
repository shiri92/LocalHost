
var connectedUsers = [];

function addRoutes(io) {
    io.on('connection', (socket) => {
        let { userId } = socket.handshake.query;
        socket.userId = userId;
        let isExist = connectedUsers.find(s => s.userId === userId);
        if (!isExist) {
            connectedUsers.push(socket);
            console.log(`${socket.userId} connected!`);
        }

        socket.on('disconnect', () => {
            let isExist = connectedUsers.find(s => s.userId === userId);
            if (isExist) {
                connectedUsers = connectedUsers.filter(s => s.userId !== s.userId)
                console.log(`${socket.userId} disconnected!`);
            }
        });

        socket.on('sendRequest', (targetId, request) => {
            let targetSocket = findSocketByUserId(targetId);
            if (targetSocket) targetSocket.emit('sendRequest', request);
        });

        socket.on('sendResponse', (targetId, response) => {
            let targetSocket = findSocketByUserId(targetId);
            if (targetSocket) targetSocket.emit('sendResponse', response);
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