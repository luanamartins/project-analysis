function printFile(callback) {
    callback("Oops", [ "a", "b", "c" ]);
}

printFile((err, data) => {
    if (err) return console.error(err);
    console.log(data);
});

printFile(console.log);