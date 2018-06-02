var p = new Promise(function(resolve, reject) {
    return reject("Error");
});

function print(message) {
    console.log(message);
}

function training() {
    return new Promise(function(resolve, reject) {
        resolve("Training solved!");
    });
}

p.then(print).catch(console.log);
