const io = require("socket.io")(http);

io.on("reason", function(connection) {
    socket.on("reason", function(data) {
        return socket.broadcast.emit("reason_failure", handleReasonFailure);
    });
});
