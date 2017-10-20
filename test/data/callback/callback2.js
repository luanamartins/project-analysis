function printFile(callback){
    callback('Oops', ['a', 'b', 'c']);
}

printFile(function (err, data) {

});

printFile(console.log);