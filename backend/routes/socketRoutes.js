
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

        socket.on('sendRequest', (request) => {
            let targetId = request.recipient.id;
            let targetSocket = findSocketByUserId(targetId);
            if (targetSocket) {
                targetSocket.emit('sendRequest', request);
            }
        });
        socket.on('sendReview', (review) => {
            io.sockets.emit('sendReview', review);
        });

    });
}

function findSocketByUserId(userId) {
    return connectedUsers.find(s => s.userId === userId);
}

module.exports = addRoutes;