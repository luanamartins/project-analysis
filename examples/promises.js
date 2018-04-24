var p = Promise.resolve(42);

p.then((item)=> {
    console.log('then1');
}).catch((err) => {
    console.log('on catch1: ', err);
}).then((item) => {
    console.log('then2');
    // throw new Error('erro aqui');
    return 42;
}).catch((e) => {
    console.log('on catch2: ', e);
}).then((item) => {
    console.log('then3', item);
});