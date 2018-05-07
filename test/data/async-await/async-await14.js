async function test() {
    let i;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            await http.get('http://google.com/this-throws-an-error');
        } catch(err) {
            break;
        }
    }
    console.log(i); // 3
}