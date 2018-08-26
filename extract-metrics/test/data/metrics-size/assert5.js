window.addEventListener("error", function (e) {
    console.log();
    if(true){
        if(false){
            throw 2;
        }
    }
    console.log();
});

element.onerror = function (e) {
    console.log(e.error.message, "from", e.error.stack);
};

window.onerror = function (message, file, line, column) {
    var column = column || (window.event && window.event.errorCharacter);
    var stack = [];
    var f = arguments.callee.caller;
    while (f) {
        stack.push(f.name);
        f = f.caller;
    }
    console.log(message, "from", stack);
}