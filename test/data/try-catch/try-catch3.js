
function calling() {
    try {
    } catch (error) {
        console.log('Error');
        for (i = 0; i < 100; i++)
        {
            console.log('hello');
        }
    } finally {
        console.log('');
        console.log('');
        console.log('');
        throw new Error('Ops!');
    }
}