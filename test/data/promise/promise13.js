var p = new Promise(function(resolve, reject) {
    return reject("Error");
});

p.then(function(item) {
    return console.log(item);
}).catch(function(err) {
    throw 2;
});