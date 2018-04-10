var p = new Promise(function(resolve, reject) {
    return reject("Error");
});

p.then(function(item) {
    return console.log(item);
}).catch(function(error) {
    console.log("error");
    console.log("error");
    console.log("error");
    console.log("error");
});
