io.on("error_connection", function(err) {
    return new Error(err.message);
});

io.on("err_connection", function(err) {
    return "an error happened here!";
});

io.on("database_reason_error", function(err) {
    var i = 0;
    while (i < 10) {
        if (i > 5) {
            break;
        }
    }
});
