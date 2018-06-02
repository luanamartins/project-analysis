p.then(function(){

}).catch(function(){
    throw 2;
    throw true;
}).then(function(){

});