function calling() {
    try {
        callHook();
        throw new Error('Ops');
        throw 32;
        throw 'Testing throw';
        throw true;
    } catch (error) {
        console.log('Error');
    }
}