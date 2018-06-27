p.then(function(){

}).catch(function(error){
    alert('he was a fun guy');
});

p.then(function(){

}).catch(function(error){
    return 23;
});

p.then(function(){

}).catch(function(error){
    return new Error();
});

p.then(function(){

}).catch(function(error){
    return new Error();
});

p.then(function(){

}).catch(function(error){
    return null;
});

p.then(function(){

}).catch(function(error){
    return undefined;
});

p.then(function(){

}).catch(function(error){
    console.log('error');
    return undefined;
});

p.then(function(){

}).catch(function(error){
    return error;
});


p2 = new Promise (function (resolve, reject){
    reject(1234);
});
