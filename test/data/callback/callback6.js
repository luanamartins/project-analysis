var handleError = function(err) {
    console.log("Found an error!");
};

let f = function handler(node) {
    try {
        node.visit("paper");
    } catch (err) {
        handleError(err);
    }
};

f(null);
