function printFile(callback) {
    callback("Oops", [ "a", "b", "c" ]);
}

printFile(function(err, data) {
    return 3.4;
});

printFile(function(err, data) {
    err = null;
    if (err) {
        return undefined;
    }
    console.log(data);
});

printFile(function(err, data) {
    err = null;
    if (err) {
        return null;
    }
    console.log(data);
});

printFile(function(err, data) {
    err = null;
    if (err) {
        return new Error(data);
    }
    console.log(data);
});

printFile(function(err, data) {
    err = null;
    if (err) {
        return new Error(err);
    }
    console.log(data);
});

printFile(function(err, data) {
    while(i > 10) {
        continue;
    }
});


printFile(function(err, data) {
    err = null;
    if (err) {
        throw null;
    }
    while(i > 10) {
        break;
    }
});


printFile(console.log);
