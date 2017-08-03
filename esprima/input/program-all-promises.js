var p1 = Promise.resolve(10);
var p2 = Promise.resolve(19);
var p3 = Promise.reject('Ops!');

Promise.all([p1, p2, p3]).then((values) =>{
    console.log(values);
});

/*
* (node:15550) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): Ops!
 (node:15550) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

 * */