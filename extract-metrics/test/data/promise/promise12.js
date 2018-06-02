p = Promise.resolve("");

p2 = Promise.resolve("");

p.then(function(ok) {
    console.log("not error");
    console.log("adf4ef");
    console.log("insert data");
}).catch(function() {
    console.log("");
});

p2.catch(function() {
    console.log("");
});
