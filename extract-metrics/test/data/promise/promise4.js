var p = new Promise(function(resolve, reject) {
    return resolve(10);
});

p.then(function(item) {
    return console.log(item);
});
