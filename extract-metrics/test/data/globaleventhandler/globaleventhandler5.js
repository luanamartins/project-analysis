element.onerror = function(event) {
    throw 'error';
};

element.onerror = function(event) {
    return 2;
};

element.onerror = function(event) {
    if (i > 2) {
        return event;
    }
    throw 4;
};
