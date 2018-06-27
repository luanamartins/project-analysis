p.then(function(){

}).catch(function(error){
    alert('he was a fun guy');
});

p.then(function(){

}).catch(function(error){
    throw 34;
});

p.then(function(){

}).catch(function(error){
    throw new Error();
});

p.then(function(){

}).catch(function(error){
    throw null;
});

p.then(function(){

}).catch(function(error){
    throw undefined;
});

p.then(function(){

}).catch(function(error){
    error = null;
    console.log(error);
});