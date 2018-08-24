io.on('error_connection', (err) => {
    throw 2;
});

promise.then().catch(() => {
    console.log('test');
    console.log('again');
    console.log('another test');
    return 'last one'
});