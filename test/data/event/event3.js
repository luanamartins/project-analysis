const express = require("express");

const app = express();

const http = require("http").Server(app);

const io = require("socket.io")(http);

const port = process.env.PORT || 3e3;

app.use(express.static(__dirname + "/public"));

function onConnection(socket) {
    socket.on("drawing_err", data => socket.broadcast.emit("drawing", data));
}

io.on("error_connection", onConnection);

http.listen(port, () => console.log("listening on port " + port));

process.on("uncaughtException", function() {
    console.log("error");
});