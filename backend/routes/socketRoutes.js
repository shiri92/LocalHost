
var connectedUsers = [];

function addRoutes(io) {
    // User Conncet
    io.on('connection', (socket) => {
        let { userId } = socket.handshake.query;
        socket.userId = userId;
        let isExist = connectedUsers.find(s => s.userId === userId);
        if (!isExist) {
            connectedUsers.push(socket);
            console.log(`${socket.userId} connected!`);
        }
        // User Disconnect
        socket.on('disconnect', () => {
            let isExist = connectedUsers.find(s => s.userId === userId);
            if (isExist) {
                connectedUsers = connectedUsers.filter(s => s.userId !== s.userId)
                console.log(`${socket.userId} disconnected!`);
            }
        });

        socket.on('sendRequest', (request) => {
            console.log(request);
            let targetId = request.recipient.id;
            console.log('Send Guest Request From:', request.sender.firstName + ' ' + request.sender.lastName);
            console.log('Send Guest Request To:', request.recipient.firstName + ' ' + request.recipient.lastName);
            let targetSocket = findSocket(targetId);
            if (targetSocket) {
                console.log('target is connected');
                targetSocket.emit('sendRequest', request);
            }
            else
                console.log('target is not connected');

        })


    });
}

function findSocket(userId) {
    return connectedUsers.find(s => s.userId === userId);
}

module.exports = addRoutes;