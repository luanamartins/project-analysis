window.onerror = function (e) {
    e = new Error();
    console.log('error')
};

window.onerror = function (e) {
    e = 4.3;
    console.log('error')
    e = 2;
    console.log(e);
};

element.onerror = function (err) {
    err = 2;
    console.log(err);
    err = 'another_error'
    console.log(err);
};

element.onerror = function (e) {
    e = 2;
    console.log(e);
    e = 'another_error'
    console.log(e);
};

window.addEventListener("error", function (e) {
    e = 2;
    console.log(e);
    e = 'another_error'
    console.log(e);
});

window.addEventListener("error", function (e) {
    console.log('error')
    e = 2;
    console.log(e);
});
