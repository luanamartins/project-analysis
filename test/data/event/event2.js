const io = require("socket.io")(http);

function onConnection(socket) {
    socket.on("drawing_err", function(data) {
        return socket.broadcast.emit("drawing", data);
    });
}

io.on("error_connection", onConnection);
