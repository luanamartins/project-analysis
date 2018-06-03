process.on("uncaughtException", function(err) {
    throw new Error(err.message);
});

process.on("uncaughtException", function(err) {
    if(20 > 21) {
        return;
    }
    console.log('Get an error');
});

process.on("uncaughtException", function(err) {
    console.log(err);
});

process.on("uncaughtException", function(e) {
    throw new Error();
});

process.on("uncaughtException", function(errorFound) {
    
});