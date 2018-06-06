const http = require('http');
// Teste
const NUM_RETRIES = 3;

test();

async function test() {
    let i;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            await http.get('http://google.com/this-throws-an-error');
            break;
        } catch (err) {
            throw i;
        }
    }
    console.log(i); // 3

    try {
        await http.get('http://google.com/this-throws-an-error');
    } catch (err) {
        console.log(err);
        throw err;
    }

    try {
        await http.get('http://google.com/this-throws-an-error');
    } catch (err) {
        console.log(err);
        throw 1;
    }

    try {
        await http.get('http://google.com/this-throws-an-error');
    } catch (err) {
        console.log(err);
        throw 2;
    }

    try {
        await http.get('http://google.com/this-throws-an-error');
    } catch (err) {
    }

    try {
        await http.get('http://google.com/this-throws-an-error');
    } catch (err) {
        console.log('error');
        throw 2;
    }

    try {
        await http.get('http://google.com/this-throws-an-error');
    } catch (reason) {
        console.log('error');
        return reason;
    }

}