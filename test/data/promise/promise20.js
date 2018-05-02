p.then(function() {}).then(function() {});

p2.then(function() {
    console.log("oie");
}).catch(function(err) {
    console.log(err);
});
