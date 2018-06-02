function calling() {
    try {
        http.get('http://google.com/this-throws-an-error');
    } catch (err) {
        console.log(err);
    } finally {
        console.log('finally here');
        console.log('finally here');
        console.log('finally here');
    }
}