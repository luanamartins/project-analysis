var p = new Promise(function(resolve, reject) {
    console.log("not error");
    console.log("adf4ef");
    return reject("Error");
});

p.then(function(ok) {
    console.log("not error");
    console.log("adf4ef");
}, function(err) {
    console.log("not error");
    console.log("adf4ef");
    console.log("not error");
    console.log("adf4ef");
    console.log("not error");
    console.log("adf4ef");
    console.log("not error");
});