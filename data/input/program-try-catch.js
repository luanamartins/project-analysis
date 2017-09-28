try {
    callHook();
    throw new Error('Ops');
    throw 32;
    throw 'Testing throw';
    throw true;
} catch (error) {
    test.pushFailure(hookName + " failed on " + test.testName + ": " + (error.message || error), extractStacktrace(error, 0));
}