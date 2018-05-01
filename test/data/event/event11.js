io.on('error_connection', (err) => {
    throw new Error(f(err));
});