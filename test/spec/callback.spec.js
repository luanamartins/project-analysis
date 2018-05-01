require('dotenv').load();
const testCase = require('nodeunit').testCase;
const projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;
const suiteCasePath = process.env.PROJECT_PATH + '/test/data/callback/';
const metricsModule = require(projectPath + '/metrics');


module.exports = testCase({
    "TC01": function (test) {
        const filename = suiteCasePath + 'callback1.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);

        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 0);

        test.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 0);
        test.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 0);

        test.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.callbacksNumberOfLines, 4);

        test.done();
    },

    "TC02": function (test) {
        const filename = suiteCasePath + 'callback2.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 1);

        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 0);

        test.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 0);
        test.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 0);

        test.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.callbacksNumberOfLines, 0);

        test.done();
    },

    "TC03": function (test) {
        const filename = suiteCasePath + 'callback3.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);

        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 1);

        test.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 1);
        test.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 1);

        test.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.callbacksNumberOfLines, 1);

        test.done();
    },

    "TC04": function (test) {
        const filename = suiteCasePath + 'callback4.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 3);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 3);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);

        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 3);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 3);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 0);

        test.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 0);
        test.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 0);

        test.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.callbacksNumberOfLines, 15);

        test.done();
    },

    "TC05": function (test) {
        const filename = suiteCasePath + 'callback5.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);

        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 0);

        test.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 0);
        test.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 0);

        test.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.callbacksNumberOfLines, 4);

        test.done();
    },

    "TC06": function (test) {
        const filename = suiteCasePath + 'callback6.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 1);

        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 1);

        test.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 1);
        test.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 1);

        test.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 0);
        test.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 0);
        test.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.callbacksNumberOfLines, 1);

        test.done();
    },

    "TC07": function (test) {
        const filename = suiteCasePath + 'callback7.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArg, 0);

        test.equal(metricsObject.callbacksNumberOfEmptyFunctionsWithUniqueErrorArg, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueConsole, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueErrorArgWithUniqueStatement, 0);
        test.equal(metricsObject.callbacksNumberOfLinesOfFunctionsWithUniqueErrorArg, 0);

        test.equal(metricsObject.callbacksNumberOfReturnsOnCatches, 1);
        test.equal(metricsObject.callbacksNumberOfReturnsAnErrorOnCatches, 1);
        test.equal(metricsObject.callbacksNumberOfBreaksOnCatches, 0);

        test.equal(metricsObject.callbacksNumberOfLines, 4);

        test.done();
    }

});