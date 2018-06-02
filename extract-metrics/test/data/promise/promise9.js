var p = new Promise(function(resolve, reject) {
    return reject("Error");
});

p.then(function(ok) {
    console.log("not error");
    console.log("adf4ef");
}).catch();
