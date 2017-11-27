const io = require("socket.io")(http);

io.on("reason", connection => {
    socket.on("reason", data => socket.broadcast.emit("reason_failure", data));
});