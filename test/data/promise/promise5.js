var p1 = Promise.resolve(10);

var p2 = Promise.resolve(19);

var p3 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        Promise.reject("Ops!");
    }, 1e3);
});

Promise.race([ p3, p1, p2 ]).then(function(values) {
    console.log(values);
});
