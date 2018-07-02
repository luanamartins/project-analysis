async function test() {
    let i;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            await http.get('http://google.com/this-throws-an-error');
            break;
        } catch (err) {
            throw 1;
        }
    }
    console.log(i); // 3

    try {
        await http.get('http://google.com/this-throws-an-error');
    } catch (err) {
        console.log(err);
        throw new Error();
    }

    try {
        await http.get('http://google.com/this-throws-an-error');
    } catch (err) {
        console.log(err);
        throw undefined;
    }

    try {
        await http.get('http://google.com/this-throws-an-error');
    } catch (err) {
        console.log(err);
        throw null;
    }

    try {
        await http.get('http://google.com/this-throws-an-error');
    } catch (err) {
        throw err;
    }

}