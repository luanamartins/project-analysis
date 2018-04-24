window.onerror = function(message, source, lineno, colno, error) {
    console.log('myerror ', error);
    return true;
}

function t1() {
    try{
        console.log('first');
        throw new Error('error1');

    } catch(e) {
        throw e;
    }
}

function t2() {
    try{
        t1();
    } catch (e) {
        // console.log('caught error on t2: ', e);
        throw new Error('my');
    }
}

// t2();
throw 44;

