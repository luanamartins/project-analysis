p.then(function(){

}).catch(function(error){
    if(i > f(45)){
        throw 2;
    }
    throw error;
});

p.then(function(){
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
}).catch(function(){
    throw 2;
    throw true;
});

p.then(function(){
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
}).catch(function(){
    if(i > 2){
        throw 2;
    }
    throw 2;
    throw true;
});

p.then(function(){
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
}).catch(function(err){
    if(i > 2){
        throw 2;
    }
    throw 2;
    throw 3;
});

p.then(function(){
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
}).catch(function(){
    if(i > 2){
        throw 2;
    }
    throw 2;
    throw true;
});


p.then(function(){
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
}).catch();


p.then(function(){
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
}).catch();