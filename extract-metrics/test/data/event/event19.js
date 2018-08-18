process.on("uncaughtException", function(errorFound) {
    while (i < 10) {
        errorFound = 2
        console.log(errorFound)
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
            return 2;
        }
    }
});

io.once("database_reason_error", function(err) {
    return 'error'
});

io.once("database_reason_error", function(err) {
    return 3.5
});

io.once("database_reason_error", function(err) {
    return undefined;
});

io.once("reason_security", function(err) {
    return null;
});
