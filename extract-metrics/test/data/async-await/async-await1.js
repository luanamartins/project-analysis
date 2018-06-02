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
        } catch(err) {}
    }
    console.log(i); // 3
}