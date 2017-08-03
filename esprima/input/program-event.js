const myEmitter =  new require('events').EventEmitter;

process.on('uncaughtException', (err) => {
    console.log('whoops! there was an error');
    console.log(err);
});

myEmitter.emit('error', new Error('whoops!'));