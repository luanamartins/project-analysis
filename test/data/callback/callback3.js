var handleError = function(err) {
    console.log(err);
};

let f = function handler(node) {
    try {
        node.visit("paper");
    } catch (err) {
        handleError(err);
    }
};

f(null);


