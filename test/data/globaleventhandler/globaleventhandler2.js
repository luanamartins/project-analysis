window.onerror = function (e) {
    console.log(e.error.message, "from", e.error.stack);
};