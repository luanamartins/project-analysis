var testCase = require('nodeunit').testCase;
const metricsModule = require('./../../retrieve-scripts/metrics');


module.exports = testCase({
    "TC01": function (test) {
        let filename = './test/data/callback/callback1.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacks.numberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacks.numberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacks.numberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacks.numberOfConsoleStatementOnly, 1);

        test.done();
    },

    "TC02": function (test) {
        let filename = './test/data/callback/callback2.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacks.numberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacks.numberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacks.numberOfEmptyCallbacks, 1);
        test.equal(metricsObject.callbacks.numberOfConsoleStatementOnly, 0);

        test.done();
    },

    "TC03": function (test) {
        let filename = './test/data/callback/callback3.js';
        const reportJsonFile = './retrieve-scripts';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacks.numberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacks.numberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacks.numberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacks.numberOfConsoleStatementOnly, 0);

        test.done();
    },

    "TC04": function (test) {
        let filename = './test/data/callback/callback4.js';
        const reportJsonFile = './retrieve-scripts/report-object.json';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacks.numberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacks.numberOfFirstErrorArgFunctions, 4);
        test.equal(metricsObject.callbacks.numberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacks.numberOfConsoleStatementOnly, 3);

        test.done();
    },

    "TC05": function (test) {
        let filename = './test/data/callback/callback5.js';
        const reportJsonFile = './retrieve-scripts/report-object.json';
        const metrics = metricsModule.handleMetrics([filename], reportJsonFile);

        const metricsObject = metrics[0];

        test.equal(metricsObject.callbacks.numberOfCallbackErrorFunctions, 0);
        test.equal(metricsObject.callbacks.numberOfFirstErrorArgFunctions, 1);
        test.equal(metricsObject.callbacks.numberOfEmptyCallbacks, 0);
        test.equal(metricsObject.callbacks.numberOfConsoleStatementOnly, 1);

        test.done();
    }

});