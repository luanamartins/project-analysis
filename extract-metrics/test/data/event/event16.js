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
    throw 1;
});

process.on("uncaughtException", function(errorFound) {
    throw new Error();
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

io.once("database_reason_error", function(err) {
    var i = 0;
    while (i < 10) {
        if (i > 5) {
            throw undefined;
        }
    }
});

process.on("uncaughtException", function(errorFound) {
    throw null;
});