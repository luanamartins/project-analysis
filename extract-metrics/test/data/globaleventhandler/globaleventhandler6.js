window.addEventListener("error", function (e) {
    throw e;
});

window.addEventListener("error", function (e) {
    console.log();
    if(true){
        if(false){
            throw 2;
        }
    }
    console.log();
});

window.addEventListener("error", function (e) {
    for(var i in array) {
        if (i > 10) {
            return 10;
        } 
    }
    console.log(e.message);
});