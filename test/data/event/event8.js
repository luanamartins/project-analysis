const io = require("socket.io")(http);

io.once("reason", connection => {
    console.log('things');
});

socket.on("reason", data => socket.broadcast.once("reason_failure", function (err) {
    console.log('things');
    console.log('things');
    console.log('things');
    console.log('things');
}));

io.once(45, connection => {
    console.log('things');
});

io.once({}, connection => {
    console.log('things');
});

io.on('unhandledRejection', connection => {
    console.log('things');
});