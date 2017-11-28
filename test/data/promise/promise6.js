var p = new Promise(function (resolve, reject) {
    return reject('Error');
});

p.then((item) => console.log(item)).catch(function(error) {
    console.log('error');
    console.log('error');
    console.log('error');
    console.log('error');
});