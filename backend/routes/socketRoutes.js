
var connectedUsers = [];

function addRoutes(io) {
    // User Conncet
    io.on('connection', (socket, userId) => {
        console.log('a user connected!');
        console.log(userId);

        // User Disconnect
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


    });
}

module.exports = addRoutes;