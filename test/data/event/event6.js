const io = require("socket.io")(http);

io.once("reason", function (connection) {
    console.log('things');
});

socket.on("reason", function (data) {
    return socket.broadcast.once("reason_failure", function (err) {
        console.log('things');
        console.log('things');
        console.log('things');
        console.log('things');
    });
});
