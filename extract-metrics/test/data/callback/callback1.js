function printFile(callback) {
    callback("Oops", [ "a", "b", "c" ]);
}

printFile(function(err, data) {
    if (err) {
        console.error(err);
    }
    console.log(data);
});

printFile(console.log);
