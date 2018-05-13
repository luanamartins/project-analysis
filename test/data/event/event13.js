io.on("error_connection", function(err) {
    throw null;
});

io.on("err_connection", function(err) {
    throw true;
});

io.on("database_reason_error", function(err) {
    var i = 0;
    while (i < 10) {
        if (i > 5) {
            break;
        }
    }
});
