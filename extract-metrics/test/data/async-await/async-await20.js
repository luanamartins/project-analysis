async function test() {
    let i;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            await http.get('http://google.com/this-returns-an-error');
            break;
        } catch (err) {
            alert('An error occurred!')
        }

        console.log(i); // 3

        try {
            await http.get('http://google.com/this-returns-an-error');
        } catch (err) {
            console.log(err);
            alert('An error occurred!')
        }

        try {
            await http.get('http://google.com/this-returns-an-error');
        } catch (err) {
            err = 34
            console.log();
        }

        try {
            await http.get('http://google.com/this-returns-an-error');
        } catch (err) {
            err = new Error();
        }

        try {
            await http.get('http://google.com/this-returns-an-error');
        } catch (err) {
            return undefined
        }

        try {
            await http.get('http://google.com/this-returns-an-error');
        } catch (err) {
            return null
        }

        try {
            await http.get('http://google.com/this-returns-an-error');
        } catch (err) {
            console.log(err)
            return null
        }

        try {
            await http.get('http://google.com/this-returns-an-error');
        } catch (err) {
            return null
        }
    }

}