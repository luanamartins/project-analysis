const io = require("socket.io")(http);

io.on("reason", connection => {
    console.log('things');
});

socket.on("reason", data => socket.broadcast.emit("reason_failure", function (err) {
    console.log('things');
    console.log('things');
    console.log('things');
    console.log('things');
}));