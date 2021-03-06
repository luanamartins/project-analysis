const http = require("http");

const NUM_RETRIES = 3;

test();

async function test() {
    let i;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            await http.get("http://google.com/this-throws-an-error");
            break;
        } catch (err) {
            await handleError(err);
            console.log(err);
        } finally {
            console.log("finally here");
            console.log("finally here");
            console.log("finally here");
        }
    }
    console.log(i);
}