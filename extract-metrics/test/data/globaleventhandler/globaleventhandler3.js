element.onerror = function (e) {
    console.log(e.error.message, "from", e.error.stack);
};

// Only Chrome & Opera have an error attribute on the event.
window.addEventListener = function (e) {
    console.log(e.error.message, "from", e.error.stack);
};

// IE <9
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