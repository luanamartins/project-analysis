async function test() {
    let i;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            await http.get('http://google.com/this-returns-an-error');
            break;
        } catch (err) {
            continue;
        }

        console.log(i); // 3

        try {
            await http.get('http://google.com/this-returns-an-error');
        } catch (err) {
            console.log(err);
            continue;
        }

        try {
            await http.get('http://google.com/this-returns-an-error');
        } catch (err) {
            console.log(err);
            break;
        }

        try {
            await http.get('http://google.com/this-returns-an-error');
        } catch (err) {
            console.log(err);
            break;
        }

        try {
            await http.get('http://google.com/this-returns-an-error');
        } catch (err) {
            break;
        }
    }

}