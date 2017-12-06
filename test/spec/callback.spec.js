var testCase = require('nodeunit').testCase;
const metricsModule = require('./../../retrieve-scripts/metrics');


module.exports = testCase({
    "TC01": function (test) {
        let filename = './test/data/callback/callback1.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacksNumberOfConsoleStatementOnly, 1);

        test.done();
    },

    "TC02": function (test) {
        let filename = './test/data/callback/callback2.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 1);
        test.equal(metricsObject.callbacksNumberOfConsoleStatementOnly, 0);

        test.done();
    },

    "TC03": function (test) {
        let filename = './test/data/callback/callback3.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacksNumberOfConsoleStatementOnly, 0);

        test.done();
    },

    "TC04": function (test) {
        let filename = './test/data/callback/callback4.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 4);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacksNumberOfConsoleStatementOnly, 3);

        test.done();
    },

    "TC05": function (test) {
        let filename = './test/data/callback/callback5.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacksNumberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacksNumberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacksNumberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacksNumberOfConsoleStatementOnly, 1);

        test.done();
    }

});