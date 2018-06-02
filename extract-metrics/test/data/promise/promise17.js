var p = new Promise(function (resolve, reject) {
    return reject("Error");
});

p.then(function (item) {
    return console.log(item);
}).catch(function (err) {
    return new Error(err.message);
});

p.catch(function (error) {
    for (var i; i < 100; i++) {
        if (i > 40) {
            break;
        }
    }
});