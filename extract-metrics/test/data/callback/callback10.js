function printFile(callback) {
    callback("Oops", [ "a", "b", "c" ]);
}

printFile(function(err, data) {
    alert('error');
});

printFile(function(err, data) {
    err = null;
    if (err) {
        throw err;
    }
    console.log(data);
});


printFile(console.log);
