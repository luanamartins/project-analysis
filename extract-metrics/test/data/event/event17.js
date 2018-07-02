process.on("uncaughtException", function(errorFound) {
    alert('Wrong! System crashed!');
});

io.on("database_reason_error", function(err) {
    var i = 0;
    err = null;
    while (i < 10) {
        if (i > 5) {

        }
    }
});


io.once("database_reason_error", function(err) {
    return 1;
});

process.on("uncaughtException", function(errorFound) {
    return new Error();
});

process.on("uncaughtException", function(errorFound) {
    return errorFound;
});

io.once("database_reason_error", function(err) {
    var i = 0;
    while (i < 10) {
        if (i > 5) {
            return err;
        }
    }
});

io.once("database_reason_error", function(err) {
    var i = 0;
    while (i < 10) {
        if (i > 5) {
            return undefined;
        }
    }
});

process.on("uncaughtException", function(errorFound) {
    return null;
});