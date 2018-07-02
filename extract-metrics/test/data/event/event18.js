process.on("uncaughtException", function(errorFound) {
    while (i < 10) {
        continue;
    }
});

io.on("database_reason_error", function(err) {
    var i = 0;
    err = null;
    while (i < 10) {
        if (i > 5) {
            continue;
        } else {
            break;
        }
    }
});


io.once("database_reason_error", function(err) {
    var i = 0;
    while (i < 10) {
        if (i > 5) {
            break;
        }
    }
});