function printFile(callback) {
    callback("Oops", [ "a", "b", "c" ]);
}

printFile(function(err, data) {
    throw true;
});

printFile(function(err, data) {
    err = null;
    if (err) {
        throw true;
    }
    console.log(data);
});

printFile(function(err, data) {
    err = null;
    if (err) {
        throw err;
    }
    console.log(data);
});

printFile(function(err, data) {
    err = null;
    if (err) {
        throw new Error(data);
    }
    console.log(data);
});

printFile(function(err, data) {
    err = null;
    if (err) {
        throw undefined;
    }
    console.log(data);
});

printFile(function(err, data) {
    throw null;
});


printFile(function(err, data) {
    err = null;
    if (err) {
        throw null;
    }
    console.log(data);
});


printFile(console.log);
