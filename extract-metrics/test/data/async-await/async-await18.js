async function test() {
    let i;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            await http.get('http://google.com/this-returns-an-error');
            break;
        } catch (err) {
            return 1;
        }
    }
    console.log(i); // 3

    try {
        await http.get('http://google.com/this-returns-an-error');
    } catch (err) {
        console.log(err);
        return new Error();
    }

    try {
        await http.get('http://google.com/this-returns-an-error');
    } catch (err) {
        console.log(err);
        return undefined;
    }

    try {
        await http.get('http://google.com/this-returns-an-error');
    } catch (err) {
        console.log(err);
        return null;
    }

    try {
        await http.get('http://google.com/this-returns-an-error');
    } catch (err) {
        return err;
    }

}