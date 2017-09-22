var p = new Promise(function(resolve, reject){
    return resolve(10);
});

p.then((item) => console.log(item));
