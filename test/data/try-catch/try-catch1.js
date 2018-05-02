window.onerror = function(message, source, lineno, colno, error) {
    console.log('myerror ', error);
    return true;
};

function calling() {
    try {} catch (error) {
        console.log("Error");
        for (i = 0; i < 100; i++) {
            console.log("hello");
        }
    } finally {
        console.log("");
        console.log("");
        console.log("");
        console.log("");
    }
}