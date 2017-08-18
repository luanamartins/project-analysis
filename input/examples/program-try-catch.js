try {
    callHook();
    //throw new Error('Ops');
} catch (error) {
    test.pushFailure(hookName + " failed on " + test.testName + ": " + (error.message || error), extractStacktrace(error, 0));
}