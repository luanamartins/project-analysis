require('dotenv').load();
const testCase = require('nodeunit').testCase;
const metricsModule = require('./../../retrieve-scripts/metrics');
const suiteCasePath = process.env.PROJECT_PATH + '/test/data/callback/';
const projectPath = process.env.RETRIEVE_SCRIPTS_ROOT_PATH;


module.exports = testCase({
    "TC01": function (test) {
        const filename = suiteCasePath + 'callback1.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        test.equal(metricsObject.callbacksNumberOfLines, 4);

        test.done();
    },

    "TC02": function (test) {
        const filename = suiteCasePath + 'callback2.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 0);
        test.equal(metricsObject.callbacksNumberOfLines, 0);

        test.done();
    },

    "TC03": function (test) {
        const filename = suiteCasePath + 'callback3.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 0);
        test.equal(metricsObject.callbacksNumberOfLines, 1);

        test.done();
    },

    "TC04": function (test) {
        const filename = suiteCasePath + 'callback4.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 4);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 3);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 3);
        test.equal(metricsObject.callbacksNumberOfLines, 17);

        test.done();
    },

    "TC05": function (test) {
        const filename = suiteCasePath + 'callback5.js';
        const metrics = metricsModule.handleMetrics([filename], projectPath);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueStatement, 1);
        test.equal(metricsObject.callbacksNumberOfFunctionsWithUniqueConsole, 1);
        test.equal(metricsObject.callbacksNumberOfLines, 4);

        test.done();
    }

});