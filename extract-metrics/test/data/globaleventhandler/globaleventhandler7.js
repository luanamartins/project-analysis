window.onerror = function (e) {
    console.log();
};

window.onerror = function (e) {
    throw 1;
};

window.onerror = function (err) {
    throw err;
};

window.onerror = function (e) {
    if(10 > 3) throw e;
    throw 3;
};

window.onerror = function (e) {
    console.log();
};

window.onerror = function (e) {
    throw 1;
};

window.onerror = function (err) {
    throw err;
};

window.onerror = function (e) {
    if(10 > 3) throw e;
    throw 3;
};

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

window.addEventListener("error", function (e) {
    for(var i in array) {
        if (i > 10) {
            throw e;
        } 
    }
    console.log(e.message);
});