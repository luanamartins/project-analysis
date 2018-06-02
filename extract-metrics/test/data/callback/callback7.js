function printFile(callback) {
    callback("Oops", [ "a", "b", "c" ]);
}

printFile(function(err, data) {
    if (err) {
        return new Error(err.message);
    }
    console.log(data);
});

printFile(console.log);
