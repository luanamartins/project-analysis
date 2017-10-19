var p1 = Promise.resolve(10);
var p2 = Promise.resolve(19);
var p3 = new Promise(function(resolve, reject){
    setTimeout(function(){
        Promise.reject('Ops!');
    }, 1000);
});

Promise.race([p3, p1, p2]).then((values) =>{
    console.log(values);
});