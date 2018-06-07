process.on("uncaughtException", function(errorFound) {
    throw 5;
});

io.on("database_reason_error", function(err) {
    var i = 0;
    while (i < 10) {
        if (i > 5) {
            break;
        }
    }
});


io.once("database_reason_error", function(err) {
    var i = 0;
    while (i < 10) {
        if (i > 5) {
            throw 2;
        }
    }
});

process.on("uncaughtException", function(errorFound) {
    throw errorFound;
});

io.once("database_reason_error", function(err) {
    var i = 0;
    while (i < 10) {
        if (i > 5) {
            throw err;
        }
    }
});